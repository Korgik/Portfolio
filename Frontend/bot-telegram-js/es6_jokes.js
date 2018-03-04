import TelegramBot from 'node-telegram-bot-api';
import {CronJob} from 'cron';
import request from 'request';
import {AllHtmlEntities} from 'html-entities';


const entities = new AllHtmlEntities();
const token = '548771110:AAE_R2fpIWfMg8_z2U8DrsgYjqn2k9mIJw8';

const bot =new TelegramBot(token,{polling:true});

bot.on('message', (msg) => {
    const Id = msg.from.id;
    const url = 'http://umorili.herokuapp.com/api/random?num=1';

    request(url , (error, response, body) => {
        const data = JSON.parse(body);
        // console.log(data);
        bot.sendMessage(Id, entities.decode(data[0].elementPureHtml));
    })
    // bot.sendMessage(chatId, msg.text);
    // console.log(msg);
});