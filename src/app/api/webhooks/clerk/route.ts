import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { createOrGetUser, createApiKey } from '@/lib/api-keys';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  if (!webhookSecret) {
    console.error('CLERK_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  const payload = await request.text();

  const wh = new Webhook(webhookSecret);

  let evt: unknown;

  try {
    evt = wh.verify(payload, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  const eventData = evt as { type: string; data: { id: string; email_addresses: Array<{ id: string; email_address: string }>; primary_email_address_id: string } };
  const eventType = eventData.type;
  
  if (eventType === 'user.created') {
    try {
      const { id: clerkUserId, email_addresses } = eventData.data;
      const primaryEmail = email_addresses.find((email: { id: string; email_address: string }) => email.id === eventData.data.primary_email_address_id);
      
      if (!primaryEmail) {
        console.error('No primary email found for user:', clerkUserId);
        return NextResponse.json({ error: 'No primary email found' }, { status: 400 });
      }

      const user = await createOrGetUser(clerkUserId, primaryEmail.email_address);
      
      if (user) {
        const apiKey = await createApiKey(user.id, 'Default API Key');
        
        if (apiKey) {
          console.log(`Created default API key for user: ${primaryEmail.email_address}`);
        } else {
          console.error('Failed to create default API key for user:', clerkUserId);
        }
      } else {
        console.error('Failed to create user in database:', clerkUserId);
      }
    } catch (error) {
      console.error('Error handling user.created webhook:', error);
      return NextResponse.json({ error: 'Failed to process webhook' }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
} 