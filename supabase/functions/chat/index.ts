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

  const hfApiKey = Deno.env.get('HF_API_KEY');
  if (!hfApiKey) {
    return new Response(JSON.stringify({ error: 'HF_API_KEY not set in Supabase secrets.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    // Using Hugging Face Inference API with a different open-source model
    const hfResponse = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta", // Switched to Zephyr-7B-beta
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${hfApiKey}`,
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 1024,
            return_full_text: false, // Only return the generated text
          },
        }),
      }
    );

    if (!hfResponse.ok) {
      const errorData = await hfResponse.text();
      console.error('Hugging Face API error:', errorData);
      return new Response(JSON.stringify({ error: 'Failed to get response from Hugging Face', details: errorData }), {
        status: hfResponse.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await hfResponse.json();
    // Hugging Face Inference API returns an array of objects, usually with 'generated_text'
    const aiMessage = data[0]?.generated_text || 'No response from AI.';

    return new Response(JSON.stringify({ response: aiMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Edge Function error during Hugging Face call:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});