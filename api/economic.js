// api/economic.js
const axios = require('axios'); 
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY; 
const FINNHUB_BASE_URL = "https://finnhub.io/api/v1";

module.exports = async (req, res) => {
    // 1. Setting CORS to allow ONLY your specific domain to access this function
    res.setHeader('Access-Control-Allow-Origin', 'https://www.ekseercapital.com'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    
    // The indicator query is what we will use to fetch the specific data point (e.g., consumer_sentiment, inflation)
    const indicator = req.query.indicator; 

    if (!indicator || !FINNHUB_API_KEY) {
        return res.status(400).send('Configuration Error.');
    }

    try {
        // This endpoint fetches economic data for a given indicator
        const finnhubUrl = `${FINNHUB_BASE_URL}/economic/calendar?indicator=${indicator}&token=${FINNHUB_API_KEY}`;
        const response = await axios.get(finnhubUrl);
        res.status(200).json(response.data);

    } catch (error) {
        console.error('Proxy Economic Error:', error.message);
        res.status(500).send('Service Error fetching economic data.');
    }
};
