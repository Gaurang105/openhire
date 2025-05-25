import { supabase, User, ApiKey } from './supabase';
import crypto from 'crypto';

export function generateApiKey(): string {
  const prefix = 'oh_'; // OpenHire prefix
  const randomBytes = crypto.randomBytes(32).toString('hex');
  return `${prefix}${randomBytes}`;
}

export async function createOrGetUser(clerkUserId: string, email: string): Promise<User | null> {
  try {
    const { data: existingUser, error: getUserError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (existingUser && !getUserError) {
      return existingUser;
    }

    const { data: newUser, error: createUserError } = await supabase
      .from('users')
      .insert([
        {
          clerk_user_id: clerkUserId,
          email: email,
        }
      ])
      .select()
      .single();

    if (createUserError) {
      console.error('Error creating user:', createUserError);
      return null;
    }

    return newUser;
  } catch (error) {
    console.error('Error in createOrGetUser:', error);
    return null;
  }
}

export async function createApiKey(userId: string, name: string = 'Default API Key'): Promise<ApiKey | null> {
  try {
    const apiKey = generateApiKey();
    
    const { data, error } = await supabase
      .from('api_keys')
      .insert([
        {
          user_id: userId,
          api_key: apiKey,
          name: name,
          is_active: true,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating API key:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in createApiKey:', error);
    return null;
  }
}

export async function validateApiKey(apiKey: string): Promise<{ isValid: boolean; user?: User; apiKeyData?: ApiKey }> {
  try {
    const { data: apiKeyData, error } = await supabase
      .from('api_keys')
      .select(`
        *,
        users (*)
      `)
      .eq('api_key', apiKey)
      .eq('is_active', true)
      .single();

    if (error || !apiKeyData) {
      return { isValid: false };
    }

    await supabase
      .from('api_keys')
      .update({ last_used_at: new Date().toISOString() })
      .eq('id', apiKeyData.id);

    return {
      isValid: true,
      user: (apiKeyData as ApiKey & { users: User }).users,
      apiKeyData: apiKeyData
    };
  } catch (error) {
    console.error('Error validating API key:', error);
    return { isValid: false };
  }
}

export async function trackApiUsage(apiKeyId: string, endpoint: string): Promise<void> {
  try {
    const today = new Date().toISOString().split('T')[0];

    const { data: existingUsage, error: getError } = await supabase
      .from('api_usage')
      .select('*')
      .eq('api_key_id', apiKeyId)
      .eq('endpoint', endpoint)
      .eq('request_date', today)
      .single();

    if (existingUsage && !getError) {
      await supabase
        .from('api_usage')
        .update({ request_count: existingUsage.request_count + 1 })
        .eq('id', existingUsage.id);
    } else {
      await supabase
        .from('api_usage')
        .insert([
          {
            api_key_id: apiKeyId,
            endpoint: endpoint,
            request_count: 1,
            request_date: today,
          }
        ]);
    }
  } catch (error) {
    console.error('Error tracking API usage:', error);
  }
}

export async function getUserApiKeys(userId: string): Promise<ApiKey[]> {
  try {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error getting user API keys:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserApiKeys:', error);
    return [];
  }
}

export async function deactivateApiKey(apiKeyId: string, userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('api_keys')
      .update({ is_active: false })
      .eq('id', apiKeyId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error deactivating API key:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deactivateApiKey:', error);
    return false;
  }
} 