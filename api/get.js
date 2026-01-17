const axios = require('axios');

module.exports = async (req, res) => {
    // Твой ОБНОВЛЕННЫЙ токен
    const TOKEN = 'MTM5NTA2MjEyNzY3NjM1ODc0Nw.G4PDRG.yjH51pQDZKnrx52t8Uzzx4GaSz7FsnzMWck8YA';
    const CHANNEL_ID = '1401775061706346536';

    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const response = await axios.get(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1`, {
            headers: { 'Authorization': TOKEN }
        });

        if (response.data && response.data.length > 0) {
            res.status(200).send(response.data[0].content);
        } else {
            res.status(200).send("Сообщений нет");
        }
    } catch (err) {
        const errorMsg = err.response?.data?.message || err.message;
        res.status(200).send("Ошибка Discord: " + errorMsg);
    }
};
