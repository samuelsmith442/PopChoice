import { querySimilarContent } from './utils/embeddings.js';

console.log('Script loaded!');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    const form = document.querySelector('.question-container');
    const inputs = document.querySelectorAll('.input-field');
    const actionButton = document.querySelector('.action-button');
    const appContent = document.querySelector('.app-content');

    console.log('Elements found:', {
        form: form !== null,
        inputs: inputs.length,
        actionButton: actionButton !== null,
        appContent: appContent !== null
    });

    actionButton.addEventListener('click', async () => {
        console.log('Button clicked!');
        const [favoriteMovie, era, mood] = Array.from(inputs).map(input => input.value.trim());
        console.log('Input values:', { favoriteMovie, era, mood });

        if (!favoriteMovie || !era || !mood) {
            alert('Please fill in all fields');
            return;
        }

        // Show loading state
        actionButton.disabled = true;
        actionButton.textContent = 'Finding your perfect movie...';

        try {
            // Construct a query from user inputs
            const query = `${mood} movie ${era} similar to ${favoriteMovie}`;
            console.log('Sending query:', query);
            
            const recommendations = await querySimilarContent(query);
            console.log('Got recommendations:', recommendations);

            if (recommendations && recommendations.length > 0) {
                // Clear the form
                inputs.forEach(input => input.value = '');
                
                // Display the first recommendation
                displayRecommendation(recommendations[0]);
            } else {
                showError('No matching movies found. Try different criteria!');
                actionButton.textContent = 'Let\'s Go';
            }
        } catch (error) {
            console.error('Error getting recommendations:', error);
            showError('Something went wrong. Please try again.');
            actionButton.textContent = 'Let\'s Go';
        } finally {
            actionButton.disabled = false;
        }
    });
});

function displayRecommendation(movie) {
    console.log('Displaying recommendation:', movie);
    
    // Clear previous content except logo
    const logo = document.querySelector('.logo');
    const container = document.querySelector('.app-content');
    container.innerHTML = '';
    container.appendChild(logo);

    // Create recommendation display
    const recommendationDiv = document.createElement('div');
    recommendationDiv.className = 'recommendation';
    
    // Extract title and year if present
    let title = movie.content;
    if (title.includes(':')) {
        title = title.split(':')[0];
    }
    
    recommendationDiv.innerHTML = `
        <h2>${title}</h2>
        <p>${movie.content}</p>
        <button class="action-button">Go Again</button>
    `;

    container.appendChild(recommendationDiv);

    // Add event listener to new button
    const newButton = recommendationDiv.querySelector('.action-button');
    newButton.addEventListener('click', () => {
        location.reload();
    });
}

function showError(message) {
    console.error('Showing error:', message);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    const container = document.querySelector('.app-content');
    container.appendChild(errorDiv);
    
    // Remove error after 3 seconds
    setTimeout(() => errorDiv.remove(), 3000);
}