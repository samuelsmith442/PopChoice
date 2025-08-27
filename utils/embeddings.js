import { openai, supabase } from '../config-node.js';
import fs from 'fs';

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

export async function createAndStoreEmbeddings() {
    try {
        console.log('Reading movies.txt...');
        const moviesData = fs.readFileSync('movies.txt', 'utf8');
        const movies = moviesData.split('\n\n').filter(movie => movie.trim());

        console.log(`Found ${movies.length} movies to process`);

        for (let i = 0; i < movies.length; i++) {
            const movie = movies[i].trim();
            if (!movie) continue;

            console.log(`Processing movie ${i + 1}/${movies.length}: ${movie.split('\n')[0]}`);

            try {
                // Get embedding from OpenAI
                const embeddingResponse = await openai.embeddings.create({
                    model: 'text-embedding-ada-002',
                    input: movie,
                });

                const embedding = embeddingResponse.data[0].embedding;

                // Store in Supabase
                const { error } = await supabase
                    .from('popchoice_embeddings')
                    .insert({
                        content: movie,
                        embedding: embedding
                    });

                if (error) {
                    console.error('Error storing embedding:', error);
                    throw error;
                }

                console.log(`✅ Stored embedding for movie ${i + 1}`);

                // Add a small delay to avoid rate limiting
                await new Promise(resolve => setTimeout(resolve, 100));

            } catch (error) {
                console.error(`Error processing movie ${i + 1}:`, error);
                throw error;
            }
        }

        console.log('🎉 All embeddings created and stored successfully!');

    } catch (error) {
        console.error('Error in createAndStoreEmbeddings:', error);
        throw error;
    }
}
