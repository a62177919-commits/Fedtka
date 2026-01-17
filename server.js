const express = require('express');
const axios = require('axios');
const app = express();

let currentLog = "Логов пока нет...";

const DISCORD_TOKEN = process.env.TOKEN; 
const CHANNEL_ID = '1329584405373849764'; // Проверь, что это ID канала из Chilli Hub

async function fetchDiscord() {
    if (!DISCORD_TOKEN) return;

    try {
        const response = await axios.get(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1`, {
            headers: { 
                // ВАЖНО: Для личного токена приставка "Bot" НЕ НУЖНА
                'Authorization': DISCORD_TOKEN 
            }
        });

        if (response.data && response.data.length > 0) {
            currentLog = response.data[0].content;
            console.log("Сообщение получено: " + currentLog);
        }
    } catch (err) {
        console.log("Ошибка запроса: " + err.message);
    }
}

// Проверка каждые 3 секунды
setInterval(fetchDiscord, 3000);

app.get('/', (req, res) => res.send("Сервер работает!"));
app.get('/get_logs', (req, res) => res.send(currentLog));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Слушаю порт " + PORT));
