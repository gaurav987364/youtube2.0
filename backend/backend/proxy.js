const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001; // Choose any available port

app.use(cors());

app.get('/api/suggestions', async (req, res) => {
    try {
        const { q } = req.query;
        const response = await axios.get('http://suggestqueries.google.com/complete/search', {
            params: {
                client: 'firefox',
                ds: 'yt',
                q: q
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch suggestions' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
