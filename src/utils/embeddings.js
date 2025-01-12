import { openai, supabase } from '../config';

export async function querySimilarContent(query) {
    try {
        console.log('Getting embedding for query:', query);
        
        // Get embedding from OpenAI
        const embeddingResponse = await openai.embeddings.create({
            model: 'text-embedding-ada-002',
            input: query,
        });
        
        console.log('Got embedding response');
        const queryEmbedding = embeddingResponse.data[0].embedding;

        // Search Supabase
        console.log('Searching Supabase...');
        const { data: recommendations, error } = await supabase
            .rpc('match_popchoice', {
                query_embedding: queryEmbedding,
                match_threshold: 0.7,
                match_count: 5
            });

        if (error) {
            console.error('Supabase error:', error);
            throw error;
        }

        console.log('Found recommendations:', recommendations);
        return recommendations;
    } catch (error) {
        console.error('Error in querySimilarContent:', error);
        throw error;
    }
}
