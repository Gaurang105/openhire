"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Plus, Trash2, Key, Eye, EyeOff, CheckCircle } from "lucide-react";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";

interface ApiKey {
  id: string;
  name: string;
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
  api_key_preview: string;
  api_key?: string; // Only available when creating new key
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState("");
  const { user } = useUser();

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/api-keys');
      const data = await response.json();
      
      if (data.success) {
        setApiKeys(data.apiKeys);
      }
    } catch (error) {
      console.error('Error fetching API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const createApiKey = async () => {
    if (!newKeyName.trim() || !user?.primaryEmailAddress?.emailAddress) {
      return;
    }

    setCreating(true);
    try {
      const response = await fetch('/api/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newKeyName.trim(),
          email: user.primaryEmailAddress.emailAddress
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setNewApiKey(data.apiKey.api_key);
        setNewKeyName("");
        setShowCreateForm(false);
        fetchApiKeys();
      }
    } catch (error) {
      console.error('Error creating API key:', error);
    } finally {
      setCreating(false);
    }
  };

  const deactivateApiKey = async (keyId: string) => {
    try {
      const response = await fetch(`/api/api-keys?id=${keyId}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        fetchApiKeys();
      }
    } catch (error) {
      console.error('Error deactivating API key:', error);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SignedOut>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-accent border-4 border-black p-8 shadow-[16px_16px_0px_black] transform rotate-2 inline-block mb-8">
              <h1 className="text-3xl md:text-6xl font-black text-white uppercase tracking-wider">
                🔒 ACCESS DENIED
              </h1>
            </div>
            <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_black] transform -rotate-1 mb-8">
              <p className="text-xl font-bold text-black uppercase tracking-wide">
                YOU NEED TO SIGN IN TO MANAGE YOUR API KEYS!
              </p>
            </div>
            <a href="/sign-in" className="bg-secondary text-black border-4 border-black px-8 py-4 font-black uppercase tracking-wider shadow-[4px_4px_0px_black] hover:shadow-[2px_2px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-75 text-lg">
              🚀 SIGN IN NOW!
            </a>
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="bg-primary border-4 border-black p-8 shadow-[16px_16px_0px_black] transform rotate-2 inline-block mb-8">
                <h1 className="text-3xl md:text-6xl font-black text-black uppercase tracking-wider">
                  API KEYS
                </h1>
              </div>
              <div className="bg-white border-4 border-black p-6 shadow-[12px_12px_0px_black] transform -rotate-1 max-w-4xl mx-auto">
                <p className="text-xl font-bold text-black uppercase tracking-wide">
                  MANAGE YOUR API KEYS TO ACCESS THE JOB SEARCH API PROGRAMMATICALLY!
                </p>
              </div>
            </div>

            {/* New API Key Success */}
            {newApiKey && (
              <div className="bg-primary border-4 border-black p-8 shadow-[12px_12px_0px_black] mb-8">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-8 w-8 text-black mr-4" />
                  <h3 className="text-2xl font-black text-black uppercase tracking-wider">
                    API KEY CREATED!
                  </h3>
                </div>
                <div className="bg-white border-4 border-black p-4 mb-4">
                  <p className="text-black font-bold uppercase tracking-wide mb-4">
                    ⚠️ SAVE THIS KEY SECURELY - YOU WON'T BE ABLE TO SEE IT AGAIN!
                  </p>
                  <div className="flex items-center bg-muted border-2 border-black p-4">
                    <code className="flex-1 font-mono text-sm font-bold text-black break-all">
                      {newApiKey}
                    </code>
                    <Button
                      onClick={() => copyToClipboard(newApiKey)}
                      className="ml-4 px-4 py-2"
                      variant="outline"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={() => setNewApiKey(null)}
                  className="bg-accent text-white"
                >
                  GOT IT!
                </Button>
              </div>
            )}

            {/* Create New API Key */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_black] mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="bg-secondary border-4 border-black p-3 inline-block">
                  <h2 className="text-xl font-black text-black uppercase tracking-wider">
                    CREATE NEW API KEY
                  </h2>
                </div>
                {!showCreateForm && (
                  <Button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-primary text-black"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    NEW API KEY
                  </Button>
                )}
              </div>

              {showCreateForm && (
                <div className="bg-muted border-4 border-black p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
                      API KEY NAME
                    </label>
                    <input
                      type="text"
                      placeholder="MY AWESOME PROJECT"
                      className="neo-input w-full px-4 py-3 text-black placeholder:text-gray-600 uppercase"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <Button
                      onClick={createApiKey}
                      disabled={creating || !newKeyName.trim()}
                      className="bg-accent text-white"
                    >
                      {creating ? "CREATING..." : "CREATE API KEY"}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewKeyName("");
                      }}
                      variant="outline"
                    >
                      CANCEL
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* API Keys List */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_black]">
              <div className="bg-accent border-4 border-black p-3 inline-block mb-6">
                <h2 className="text-xl font-black text-white uppercase tracking-wider">
                  YOUR API KEYS
                </h2>
              </div>

              {loading ? (
                <div className="text-center py-8">
                  <p className="text-black font-bold uppercase tracking-wide">LOADING...</p>
                </div>
              ) : apiKeys.length === 0 ? (
                <div className="text-center py-8">
                  <Key className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-black font-bold uppercase tracking-wide">
                    NO API KEYS YET. CREATE YOUR FIRST ONE ABOVE!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div
                      key={apiKey.id}
                      className={`border-4 border-black p-6 ${
                        apiKey.is_active ? 'bg-secondary' : 'bg-muted opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-2">
                            <h3 className="text-lg font-black text-black uppercase tracking-wide mr-4">
                              {apiKey.name}
                            </h3>
                            <span
                              className={`px-3 py-1 text-xs font-black uppercase tracking-wide border-2 border-black ${
                                apiKey.is_active
                                  ? 'bg-primary text-black'
                                  : 'bg-destructive text-white'
                              }`}
                            >
                              {apiKey.is_active ? 'ACTIVE' : 'INACTIVE'}
                            </span>
                          </div>
                          <div className="flex items-center bg-white border-2 border-black p-3 mb-2">
                            <code className="flex-1 font-mono text-sm font-bold text-black">
                              {apiKey.api_key_preview}
                            </code>
                          </div>
                          <div className="text-sm text-black font-bold uppercase">
                            <p>CREATED: {formatDate(apiKey.created_at)}</p>
                            {apiKey.last_used_at && (
                              <p>LAST USED: {formatDate(apiKey.last_used_at)}</p>
                            )}
                          </div>
                        </div>
                        <div className="ml-6">
                          {apiKey.is_active && (
                            <Button
                              onClick={() => deactivateApiKey(apiKey.id)}
                              variant="destructive"
                              className="bg-destructive text-white"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              DEACTIVATE
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Usage Instructions */}
            <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_black] mt-8">
              <div className="bg-primary border-4 border-black p-3 inline-block mb-6">
                <h2 className="text-xl font-black text-black uppercase tracking-wider">
                  HOW TO USE YOUR API KEY
                </h2>
              </div>
              
              <div className="space-y-6">
                <div className="bg-muted border-4 border-black p-6">
                  <h3 className="font-black text-black uppercase tracking-wide mb-4">
                    CURL EXAMPLE:
                  </h3>
                  <div className="bg-black border-2 border-black p-4">
                    <pre className="text-primary font-mono text-sm">
{`curl -X POST ${process.env.NEXT_PUBLIC_APP_URL}/api/search-jobs \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY_HERE" \\
  -d '{
    "keywords": "Software Developer",
    "location": "Bengaluru",
    "numJobs": 25
  }'`}
                    </pre>
                  </div>
                </div>

                <div className="bg-muted border-4 border-black p-6">
                  <h3 className="font-black text-black uppercase tracking-wide mb-4">
                    JAVASCRIPT EXAMPLE:
                  </h3>
                  <div className="bg-black border-2 border-black p-4">
                    <pre className="text-primary font-mono text-sm">
{`fetch('${process.env.NEXT_PUBLIC_APP_URL}/api/search-jobs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY_HERE'
  },
  body: JSON.stringify({
    keywords: 'Software Developer',
    location: 'Bengaluru',
    numJobs: 25
  })
})`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
    </div>
  );
} 