import { createAndStoreEmbeddings } from './utils/embeddings.js';

console.log('Starting to create and store embeddings...');
createAndStoreEmbeddings()
    .then(() => {
        console.log('Process completed!');
    })
    .catch((error) => {
        console.error('Error in main process:', error);
    });
