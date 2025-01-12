import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!OPENAI_API_KEY || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('Missing environment variables:', {
        hasOpenAIKey: !!OPENAI_API_KEY,
        hasSupabaseUrl: !!SUPABASE_URL,
        hasSupabaseKey: !!SUPABASE_ANON_KEY
    });
    throw new Error('Missing required environment variables. Please check your .env file.');
}

// Ensure Supabase URL is properly formatted
const supabaseUrl = SUPABASE_URL.startsWith('http') 
    ? SUPABASE_URL 
    : `https://${SUPABASE_URL}.supabase.co`;

// Initialize OpenAI
export const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

// Initialize Supabase
export const supabase = createClient(
    supabaseUrl,
    SUPABASE_ANON_KEY
);
