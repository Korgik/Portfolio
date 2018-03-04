import request from "request";

const Cron = require('cron').CronJob;
//35.33 time
new Cron('* * * * * *', () =>{
 console.log('привет!');
});

const job = new CronJob('0,30 * * * * *', () =>{
    // console.log('привет!');
    const chatId = 386795351;
    const url = 'http://umorili.herokuapp.com/api/random?num=1';

    request(url , (error, response, body) => {
        const data = JSON.parse(body);
        // console.log(data);
        bot.sendMessage(chatId, entities.decode(data[0].elementPureHtml));
    })
});

job.start();