// api/quote.js
const axios = require('axios'); 
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY; 
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

module.exports = async (req, res) => {
    // 1. Setting CORS to allow ONLY your specific domain to access this function
    res.setHeader('Access-Control-Allow-Origin', 'https://www.ekseercapital.com'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    const symbol = req.query.symbol;

    if (!symbol || !FINNHUB_API_KEY) {
        return res.status(400).send('Configuration Error.');
    }

    try {
        const finnhubUrl = `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`;
        const response = await axios.get(finnhubUrl);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Proxy Quote Error:', error.message);
        res.status(500).send('Service Error fetching quote.');
    }
};
