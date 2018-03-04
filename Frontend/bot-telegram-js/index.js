const TelegramBot = require('node-telegram-bot-api');
const config = require('config');
const os = require('os');
// const Koa = require('koa');
// const Router = require('koa-router');
// const bodyParser = require('koa-bodyparser');
const Cron = require('cron').CronJob;
const request = require('request');
// const Entities = require('html-entities').AllHtmlEntities;
// const entities = new Entities();
const token = config.get('token');

const bot = new TelegramBot(token, {
  polling: true
});

// {
// webHook: {
//   port: config.get('port'),
//   authOpen: false
// }

// bot.openWebHook();
// bot.setWebHook(`${config.get('url')}/bot${token}`);

//Коа-сервер
// const app =new Koa();
//
// const router = Router();
// router.post('/bot', ctx=>{
//     const { body } = ctx.request;
//     bot.processUpdate(body);
//     ctx.status = 200
// });
//
// app.use(bodyParser());
//
// app.use(router.routes());
//
// const port =config.get('port');
// app.listen(port, () => {
//     console.log(`Listen on ${port}`)
// });


//эхо

// bot.on('message', msg =>{
//     const { chat:{ id}} = msg;
//     bot.sendMessage(id, `Выход из ${os.type()}`)
// });

bot.onText(/\/start/,(msg,[source]) =>{
  const{
    chat:{
      id,
      first_name
    }
  } = msg;

  bot.sendMessage(id, `Привет ${first_name}. Рад, что ты зашел ко мне.
Я-бот, сделанный на javascript языке. Пока умею только выдавать умные цитаты умных людей.`)
})


// Цитатки

const job = new Cron('0 */5 * * * *', () => {
  const chatId = 386795351;

  const url = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=json&json=?';

  request(url, function (error, response, body) {

    const data = JSON.parse(body);
    const text = data.quoteText;
    const author = data.quoteAuthor;
    const Quote = text + "\n" + author;
    // console.log(text + author);
    bot.sendMessage(chatId, Quote);
  })
});

job.start();
