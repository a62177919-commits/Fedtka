const axios = require('axios');

module.exports = async (req, res) => {
    const DISCORD_TOKEN = process.env.TOKEN; 
    const CHANNEL_ID = '1401775061706346536'; 

    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
        const response = await axios.get(`https://discord.com/api/v9/channels/${CHANNEL_ID}/messages?limit=1`, {
            headers: { 'Authorization': DISCORD_TOKEN }
        });

        const log = response.data[0]?.content || "Сообщений нет";
        res.status(200).send(log);
    } catch (err) {
        res.status(500).send("Ошибка: " + err.message);
    }
};
