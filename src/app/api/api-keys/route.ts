import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createOrGetUser, createApiKey, getUserApiKeys, deactivateApiKey } from '@/lib/api-keys';

// GET - List user's API keys
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user from database
    const user = await createOrGetUser(userId, ''); // Email will be updated when needed
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const apiKeys = await getUserApiKeys(user.id);
    
    // Don't return the actual API key values for security
    const safeApiKeys = apiKeys.map(key => ({
      id: key.id,
      name: key.name,
      is_active: key.is_active,
      last_used_at: key.last_used_at,
      created_at: key.created_at,
      api_key_preview: `${key.api_key.substring(0, 8)}...${key.api_key.substring(key.api_key.length - 4)}`
    }));

    return NextResponse.json({
      success: true,
      apiKeys: safeApiKeys
    });

  } catch (error: any) {
    console.error('Error getting API keys:', error);
    return NextResponse.json(
      { error: 'Failed to get API keys' },
      { status: 500 }
    );
  }
}

// POST - Create new API key
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email } = body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'API key name is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create or get user
    const user = await createOrGetUser(userId, email.trim());
    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    // Create API key
    const apiKey = await createApiKey(user.id, name.trim());
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Failed to create API key' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      apiKey: {
        id: apiKey.id,
        name: apiKey.name,
        api_key: apiKey.api_key, // Return full key only on creation
        is_active: apiKey.is_active,
        created_at: apiKey.created_at
      },
      message: 'API key created successfully. Please save it securely as you won\'t be able to see it again.'
    });

  } catch (error: any) {
    console.error('Error creating API key:', error);
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}

// DELETE - Deactivate API key
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const apiKeyId = searchParams.get('id');

    if (!apiKeyId) {
      return NextResponse.json(
        { error: 'API key ID is required' },
        { status: 400 }
      );
    }

    // Get user from database
    const user = await createOrGetUser(userId, '');
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const success = await deactivateApiKey(apiKeyId, user.id);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to deactivate API key' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'API key deactivated successfully'
    });

  } catch (error: any) {
    console.error('Error deactivating API key:', error);
    return NextResponse.json(
      { error: 'Failed to deactivate API key' },
      { status: 500 }
    );
  }
} 