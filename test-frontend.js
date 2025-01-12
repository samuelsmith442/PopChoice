// Function to test the frontend API call
async function testFrontendAPI() {
    console.log('Testing frontend API call...');

    try {
        const query = 'fun movie new similar to The Matrix';
        
        // Test local development endpoint
        console.log('\nTesting local endpoint...');
        const response = await fetch('/.netlify/functions/get-recommendations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Recommendations received:', data);

        // Test recommendation display
        console.log('\nTesting recommendation display...');
        if (data && data.length > 0) {
            const recommendation = data[0];
            console.log('First recommendation:', recommendation);
            
            // Test parsing of recommendation content
            let title = recommendation.content;
            if (title.includes(':')) {
                title = title.split(':')[0];
            }
            console.log('Parsed title:', title);
        }

        console.log('\nFrontend tests completed successfully!');
    } catch (error) {
        console.error('Frontend test failed:', error);
    }
}

// Run the test when the page loads
window.addEventListener('load', testFrontendAPI);
