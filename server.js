const express = require('express');
const axios = require('axios');
const app = express();

let currentLog = "Логов пока нет. Ждем новых сообщений...";

const DISCORD_TOKEN = process.env.TOKEN; 
const CHANNEL_ID = '1401775061706346536'; 

async function fetchDiscord() {
    if (!DISCORD_TOKEN) return;
    try {
        const response = await axios.get(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1`, {
            headers: { 'Authorization': DISCORD_TOKEN }
        });
        if (response.data && response.data.length > 0) {
            currentLog = response.data[0].content;
        }
    } catch (err) {
        console.log("Fetch Error");
    }
}

setInterval(fetchDiscord, 3000);

app.get('/', (req, res) => res.send("OK"));
app.get('/get_logs', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(currentLog);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Started"));
