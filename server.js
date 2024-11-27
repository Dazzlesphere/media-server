const express = require('express');
const axios = require('axios'); // For fetching images
const app = express();

const PORT = 3000;

// Route to fetch and serve images
app.get('/fetch-image', async (req, res) => {
    const imageUrl = req.query.url;

    if (!imageUrl) {
        return res.status(400).send('Image URL is required.');
    }

    try {
        // Fetch the image from the given URL
        const response = await axios.get(imageUrl, {
            responseType: 'arraybuffer', // Ensures the response is treated as binary data
        });

        // Set CORS headers
        res.set('Access-Control-Allow-Origin', '*'); // Allow all origins
        res.set('Content-Type', response.headers['content-type']); // Set the original content type

        // Send the image as the response
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching image:', error.message);
        res.status(500).send('Failed to fetch image.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
