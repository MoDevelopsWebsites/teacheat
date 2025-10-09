import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

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

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    {
      global: {
        headers: { Authorization: req.headers.get('Authorization')! },
      },
    }
  );

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let prompt;
  let requestBodyText = '';
  try {
    // Check if Content-Type is application/json
    const contentType = req.headers.get('Content-Type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid Content-Type header:', contentType);
      return new Response(JSON.stringify({ error: `Invalid Content-Type header: ${contentType}. Expected application/json.` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Attempt to parse the request body as JSON
    const requestBody = await req.json();
    prompt = requestBody.prompt;
    console.log('Parsed request body:', requestBody);
  } catch (jsonError) {
    console.error('JSON parsing error in Edge Function:', jsonError);
    // If JSON parsing fails, try to read the raw body as text for debugging
    try {
      requestBodyText = await req.text();
      console.error('Raw request body on JSON parse failure:', requestBodyText);
    } catch (textError) {
      console.error('Failed to read raw request body as text:', textError);
    }
    return new Response(JSON.stringify({ 
      error: `Failed to parse request body as JSON: ${jsonError.message}. Raw body: "${requestBodyText}".` 
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

  const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
  if (!openaiApiKey) {
    return new Response(JSON.stringify({ error: 'OPENAI_API_KEY not set' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      }),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error('OpenAI API error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to get response from OpenAI', details: errorData }), {
        status: openaiResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await openaiResponse.json();
    const aiMessage = data.choices[0]?.message?.content || 'No response from AI.';

    return new Response(JSON.stringify({ response: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Edge Function error during OpenAI call:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});