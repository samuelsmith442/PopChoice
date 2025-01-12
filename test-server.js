import express from 'express';
import cors from 'cors';
import { handler } from './netlify/functions/get-recommendations.js';

const app = express();
app.use(cors());
app.use(express.json());

// Simulate Netlify function endpoint
app.post('/.netlify/functions/get-recommendations', async (req, res) => {
    try {
        const result = await handler({
            httpMethod: 'POST',
            body: JSON.stringify(req.body)
        });
        
        res.status(result.statusCode).json(JSON.parse(result.body));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Test server running on http://localhost:${PORT}`);
});
