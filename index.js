
require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs')
const port = process.env.PORT;

app.get('/', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    const referrer = req.headers['referer'] || ['No referrer'];
    const language = req.headers['accept-language'];
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const log = `IP: ${ip}\n, User-Agent: ${userAgent}\n, Referrer: ${referrer}\n, Language: ${language}\n, Timezone: ${timeZone}\n\n\n`;

    fs.appendFile('logs.txt', log, (err)=>{
        if (err) throw err
    })

    res.send(log)
});

app.listen(port, () => {
    console.log(`App is running on http://localhost:${port}`);
});