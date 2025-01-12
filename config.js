import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

// Use Vite's import.meta.env instead of dotenv
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize OpenAI
export const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true // Required for browser usage
});

// Initialize Supabase
export const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);