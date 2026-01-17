const axios = require('axios');

module.exports = async (req, res) => {
    // Вставляем токен и ID прямо в код для надежности
    const TOKEN = 'MTM5NTA2MjEyNzY3NjM1ODc0Nw.GnFr1i.yytqQipHIZ3Wm1Z1e0gmA9XO_MvS8ZzpdS-smY';
    const CHANNEL_ID = '1401775061706346536';

    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const response = await axios.get(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1`, {
            headers: { 'Authorization': TOKEN }
        });

        if (response.data && response.data.length > 0) {
            // Отправляем только текст сообщения
            res.status(200).send(response.data[0].content);
        } else {
            res.status(200).send("Сообщений в канале пока нет.");
        }
    } catch (err) {
        // Если ошибка, выводим её текст
        const errorMsg = err.response?.data?.message || err.message;
        res.status(200).send("Ошибка Discord: " + errorMsg);
    }
};
