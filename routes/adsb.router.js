const express = require("express")
const router = express.Router()
const axios = require('axios');
const config = require("../config/adsb.config")

router.get("/", (req, res) => {
    res.json("Welcome to ADSB Exchange API !!!")
})

/*
    ADSBx Flight Sim Traffic
*/
router.get('/sim-traffic', async (req, res) => {
    const { 'X-RapidAPI-Key': apiKey, 'X-RapidAPI-Host': apiHost } = config;
    const lat = 40.7128;
    const lon = -74.006;

    const durationInSeconds = 10; // The desired tracking duration in seconds
    const flightData = []; 
  
    // Define a function to fetch flight data and add it to the array
    async function fetchFlightData() {
      const options = {
        method: 'GET',
        url: `https://adsbx-flight-sim-traffic.p.rapidapi.com/api/aircraft/json/lat/${lat}/lon/${lon}/dist/25/`,
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': apiHost,
        },
      };
      try {
        const response = await axios.request(options);
        flightData.push(response.data); // Add the fetched data to the array
      } catch (err) {
        console.error('Error fetching flight data:', err);
      }
    }
  
    // Start fetching data periodically
    const interval = setInterval(fetchFlightData, 1000); // Fetch data every 1 second
  
    // Stop fetching data after the specified duration
    setTimeout(() => {
      clearInterval(interval); 
      console.log('Tracking stopped after', durationInSeconds, 'seconds.');
      res.json(flightData); 
    }, durationInSeconds * 1000); 
  });

module.exports = router