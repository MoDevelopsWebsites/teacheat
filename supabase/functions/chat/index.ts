import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  console.log('Incoming request:', req.method, req.url);
  const requestHeaders = Object.fromEntries(req.headers.entries());
  console.log('Request headers:', requestHeaders);

  let prompt;
  let rawBodyContent = '';
  try {
    const contentType = req.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid Content-Type header:', contentType);
      return new Response(JSON.stringify({ error: `Invalid Content-Type header: ${contentType}. Expected application/json.` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const requestBody = await req.json();
    prompt = requestBody.prompt;
    console.log('Parsed request body:', requestBody);
  } catch (jsonError) {
    console.error('JSON parsing error in Edge Function:', jsonError);
    try {
      rawBodyContent = await req.text();
      console.error('Raw request body on JSON parse failure:', rawBodyContent);
    } catch (textError) {
      console.error('Failed to read raw request body as text after JSON parse failure:', textError);
    }
    return new Response(JSON.stringify({
      error: `Failed to parse request body as JSON: ${jsonError.message}. Raw body content: "${rawBodyContent}".`
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!prompt) {
    return new Response(JSON.stringify({ error: 'Prompt is required in the request body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!anthropicApiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set in Supabase secrets.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01', // Required Anthropic API version
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // Using a widely available Claude model
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!anthropicResponse.ok) {
      const errorData = await anthropicResponse.text();
      console.error('Anthropic API error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to get response from Anthropic', details: errorData }), {
        status: anthropicResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await anthropicResponse.json();
    const aiMessage = data.content[0]?.text || 'No response from AI.';

    return new Response(JSON.stringify({ response: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Edge Function error during Anthropic call:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});