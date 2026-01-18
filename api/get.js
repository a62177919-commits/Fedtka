const axios = require('axios');

module.exports = async (req, res) => {
    // Твой новый токен
    const TOKEN = 'MTM5NTA2MjEyNzY3NjM1ODc0Nw.GiSUmU.M8uAfti7GUkwZN91rcNFJgKTzr0fQ5rJt2wt0E';
    // ID канала, из которого читаем логи
    const CHANNEL_ID = '1401775061706346536';

    // Разрешаем запросы из Roblox (CORS)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');

    try {
        const response = await axios.get(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1`, {
            headers: { 
                'Authorization': TOKEN,
                'Content-Type': 'application/json'
            }
        });

        if (response.data && response.data.length > 0) {
            // Отправляем текст последнего сообщения
            res.status(200).send(response.data[0].content);
        } else {
            res.status(200).send("Сообщений в канале нет");
        }
    } catch (err) {
        // Если ошибка — выводим её статус
        const status = err.response?.status || "Unknown";
        const message = err.response?.data?.message || err.message;
        res.status(200).send(`Ошибка Discord (${status}): ${message}`);
    }
};
