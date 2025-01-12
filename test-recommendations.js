import { querySimilarContent } from './utils/embeddings.js';

async function testRecommendations() {
    console.log('Testing movie recommendations...\n');

    // Test cases with different types of queries
    const queries = [
        "I want to watch something fun and stupid like School of Rock",
        "I need a serious drama movie like The Shawshank Redemption",
        "Show me a classic movie about hope and redemption",
        "I want a new comedy movie that's entertaining"
    ];

    for (const query of queries) {
        console.log(`Query: "${query}"`);
        try {
            const recommendations = await querySimilarContent(query);
            console.log('Recommendations:');
            if (recommendations.length > 0) {
                recommendations.forEach((rec, index) => {
                    console.log(`\n${index + 1}. Content: ${rec.content}`);
                    console.log(`   Similarity Score: ${rec.similarity.toFixed(4)}`);
                });
            } else {
                console.log('No recommendations found.');
            }
            console.log('\n-------------------\n');
        } catch (error) {
            console.error('Error getting recommendations:', error);
        }
    }
}

console.log('Starting recommendation tests...');
testRecommendations()
    .then(() => console.log('Tests completed!'))
    .catch(error => console.error('Test failed:', error));
