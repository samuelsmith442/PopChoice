import { handler } from './get-recommendations.js';

// Test event object
const mockEvent = {
    httpMethod: 'POST',
    body: JSON.stringify({
        query: 'fun movie new similar to The Matrix'
    })
};

// Test the handler
async function testRecommendationsFunction() {
    console.log('Testing recommendations function...');
    
    try {
        // Test 1: Valid request
        console.log('\nTest 1: Valid request');
        const response = await handler(mockEvent);
        console.log('Status Code:', response.statusCode);
        console.log('Response:', JSON.parse(response.body));

        // Test 2: Invalid method
        console.log('\nTest 2: Invalid method');
        const invalidMethodResponse = await handler({ ...mockEvent, httpMethod: 'GET' });
        console.log('Status Code:', invalidMethodResponse.statusCode);
        
        // Test 3: Invalid query
        console.log('\nTest 3: Invalid query');
        const invalidQueryResponse = await handler({
            httpMethod: 'POST',
            body: JSON.stringify({})
        });
        console.log('Status Code:', invalidQueryResponse.statusCode);

        console.log('\nAll tests completed!');
    } catch (error) {
        console.error('Test failed:', error);
    }
}

testRecommendationsFunction();
