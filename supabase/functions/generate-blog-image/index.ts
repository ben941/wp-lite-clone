import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

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

    console.log('Generating image for blog title:', title);

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create a descriptive prompt for the blog image
    const imagePrompt = `Create a professional, modern blog header image for an article titled "${title}". The image should be suitable for an accounting/business website. Style: clean, corporate, professional with a modern aesthetic. Include relevant business or accounting imagery but keep it sophisticated and not too literal. Use a color palette that works well with professional websites. Aspect ratio should be 16:9 for a blog header. High quality, ultra-realistic.`;

    console.log('Using image prompt:', imagePrompt);

    // Generate image with OpenAI DALL-E
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: imagePrompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd',
        response_format: 'url'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    // DALL-E returns URL, fetch and convert to buffer for upload
    const imageData = data.data[0];
    
    if (!imageData.url) {
      throw new Error('No image URL received from OpenAI');
    }

    // Fetch the generated image
    const imageResponse = await fetch(imageData.url);
    if (!imageResponse.ok) {
      throw new Error('Failed to fetch generated image');
    }
    
    const imageBuffer = new Uint8Array(await imageResponse.arrayBuffer());
    
    // Upload to Supabase storage
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Generate unique filename
    const fileName = `generated-${Date.now()}-${Math.random().toString(36).substring(2)}.png`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Failed to upload image: ${uploadError.message}`);
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    console.log('Image generated and uploaded successfully:', publicUrl);

    return new Response(JSON.stringify({ 
      imageUrl: publicUrl,
      altText: `Professional blog header image for "${title}"`
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-blog-image function:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to generate image' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});