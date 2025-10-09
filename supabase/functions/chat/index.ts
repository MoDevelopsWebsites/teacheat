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

  const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
  if (!geminiApiKey) {
    return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not set in Supabase secrets.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Corrected the API endpoint to use the global generativelanguage.googleapis.com
    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.text(); // Read as text to catch non-JSON errors
      console.error('Gemini API error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to get response from Gemini', details: errorData }), {
        status: geminiResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await geminiResponse.json();
    const aiMessage = data.candidates[0]?.content?.parts[0]?.text || 'No response from AI.';

    return new Response(JSON.stringify({ response: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Edge Function error during Gemini call:', error);
    // If the error is a SyntaxError from .json(), log the raw response if available
    if (error instanceof SyntaxError && error.message.includes('JSON')) {
      try {
        const rawResponse = await req.text(); // This might be the original request body, not the Gemini response
        console.error('Raw Gemini response on JSON parse failure (might be request body):', rawResponse);
      } catch (textError) {
        console.error('Failed to read raw response text after JSON parse failure:', textError);
      }
    }
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});