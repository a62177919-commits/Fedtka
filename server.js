const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let currentLog = "Логов пока нет";

app.get('/', (req, res) => {
    res.send(`
        <body style="background: #111; color: white; text-align: center; font-family: sans-serif; padding: 20px;">
            <h1>FEST LOG PANEL</h1>
            <p>Текущий лог: <br><span style="color: #ff0064;">${currentLog}</span></p>
            <form action="/update" method="POST">
                <textarea name="logtext" style="width: 100%; height: 100px; border-radius: 10px; padding: 10px;"></textarea><br><br>
                <button type="submit" style="width: 100%; padding: 15px; background: #ff0064; color: white; border: none; border-radius: 10px; font-weight: bold;">ОБНОВИТЬ ЛОГ</button>
            </form>
        </body>
    `);
});

app.post('/update', (req, res) => {
    currentLog = req.body.logtext;
    res.redirect('/');
});

app.get('/get_logs', (req, res) => {
    res.send(currentLog);
});

app.listen(process.env.PORT || 3000);
