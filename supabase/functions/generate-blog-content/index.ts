import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title } = await req.json();

    console.log('Generating blog content for title:', title);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `Write a comprehensive 800-word blog post about "${title}" for an accounting services website. 

Structure the blog post as follows:
1. Engaging introduction (100-150 words)
2. Main content with 3-4 key sections (500-600 words total)
3. FAQ section with 4-5 relevant questions and answers (150-200 words)
4. Conclusion with call-to-action (50-100 words)

Make it professional, informative, and relevant for small business owners who might need accounting services. Include practical tips and actionable advice. Use a conversational but authoritative tone.

Format the response as clean markdown with proper headers (##, ###) and structure.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert content writer specializing in accounting and business finance topics. Write engaging, informative blog posts that help small business owners understand financial concepts and see the value of professional accounting services.'
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    console.log('Blog content generated successfully');

    return new Response(JSON.stringify({ 
      content: generatedContent,
      wordCount: generatedContent.split(' ').length 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-blog-content function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate content' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});