import { openai, supabase } from '../config.js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

/* This function does three main things:
   1. Takes the user's input and converts it to a vector embedding
   2. Searches the database for similar vectors
   3. Returns the most relevant movie recommendations */
export async function querySimilarContent(query) {
    try {
        // Convert user's query to a vector embedding
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: query,
        });
        const queryEmbedding = embeddingResponse.data[0].embedding;

        // Search for similar content in Supabase
        const { data, error } = await supabase
            .rpc('match_popchoice', {
                query_embedding: queryEmbedding,
                match_threshold: 0.7, // How similar the results need to be (0-1)
                match_count: 5      // How many results to return
            });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }
        
        console.log('Found matches:', data);
        return data;
    } catch (error) {
        console.error('Error finding similar content:', error);
        throw error;
    }
}
