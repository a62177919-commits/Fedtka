const express = require('express');
const axios = require('axios');
const app = express();

let currentLog = "Логов пока нет. Ждем новых сообщений...";

// Твой личный токен берется из настроек Render (Environment Variables)
const DISCORD_TOKEN = process.env.TOKEN; 
// ID канала чилли-логов, который ты дал
const CHANNEL_ID = '1401775061706346536'; 

async function fetchDiscord() {
    if (!DISCORD_TOKEN) return;

    try {
        const response = await axios.get(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1`, {
            headers: { 
                'Authorization': DISCORD_TOKEN 
            }
        });

        if (response.data && response.data.length > 0) {
            currentLog = response.data[0].content;
            console.log("Лог обновлен: " + currentLog);
        }
    } catch (err) {
        console.log("Ошибка: " + err.message);
    }
}

// Проверка обновлений каждые 3 секунды
setInterval(fetchDiscord, 3000);

app.get('/', (req, res) => res.send("Сервер активен!"));
app.get('/get_logs', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Для доступа из Roblox
    res.send(currentLog);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Сервер запущен на порту " + PORT));
