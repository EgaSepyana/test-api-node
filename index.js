require('dotenv').config();
const express = require('express');
// const fetch = require('node-fetch');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
const port = process.env.PORT || 3001;

// Konfigurasi CORS
const corsOptions = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};

app.use(cors(corsOptions));

// Middleware untuk menangani preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, this is your backend running on Vercel!');
});

app.get('/test-ega', (req, res) => {
    res.send('Hello, this is your backend running on Vercel!');
});

// app.get('/ega', (req, res) => {
//     res.send('Hello, this is your backend running on Vercel!');
// });


app.post('/submit', async (req, res) => {
    console.log('Received data:', req.body);

    try {
        const data = req.body;
        console.log(data);
        return res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Error forwarding data to Google Sheets', details: error.message });
    }
});

// Tangani semua rute lainnya yang tidak didefinisikan
app.use((req, res) => {
    res.status(404).send('Endpoint not found');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
});
