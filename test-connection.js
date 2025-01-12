import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        // Try to query our popchoice_embeddings table
        const { data, error } = await supabase
            .from('popchoice_embeddings')
            .select('id')
            .limit(1);

        if (error) {
            console.error('Connection Error:', error.message);
            return false;
        }

        console.log('Successfully connected to Supabase!');
        console.log('Table exists and is accessible');
        return true;
    } catch (err) {
        console.error('Test failed:', err.message);
        return false;
    }
}

testConnection();
