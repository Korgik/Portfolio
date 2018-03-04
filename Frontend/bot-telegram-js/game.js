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


// Игра Верю не верю
// bot.on('polling_error', (error) => {
//   console.log(error.code);  // => 'EFATAL'
// });

bot.onText(/\/game/, (msg, [sourse, match]) => {
  const { chat:{ id }} =msg;
  bot.sendMessage(id, ` Давай поиграем в Верю-не верю. \n Я загадываю вопрос, ты на него отвечаешь да или нет.`, {
    reply_markup: {
      inline_keyboard: [
        [{
        text: 'Начали',
        callback_data: 'start'
      }]
    ]
    }
  });

  const inline_keyboard_game = [
    [{
      text: 'Да',
      callback_data: 'yes'
    },
  {
    text: 'Нет',
    callback_data: 'no'
  }]
  ];

  bot.on('callback_query', query => {
    const {
      message: {
        callback_data
      } = {}
    } = query;
    bot.answerCallbackQuery({
      callback_query_id: query.id
    })
    bot.sendMessage(id, `Римляне носили штаны?`, {
      reply_markup: {
        inline_keyboard: inline_keyboard_game
      }
    })
    bot.on
      switch (inline_keyboard_game.text) {
        case 'Да':
          bot.sendMessage(id, 'Правильно');
          break;
        case 'Нет':
          bot.sendMessage(id, 'Не верно');
          break;
        default:
          bot.sendMessage(id, 'Что-то не так')
          break;
      }
    })
})

// // функция игры

// bot.onText(/\/game/, (msg, [sourse, match]) => {
//   const {
//     chat: {
//       id
//     }
//   } = msg;
//   bot.sendMessage(id, ` Давай поиграем в Верю-не верю. \n Я загадываю вопрос, ты на него отвечаешь да или нет.`, {
//     reply_markup: {
//       inline_keyboard: [
//         [{
//           text: 'Начали',
//           callback_data: 'start'
//         }]
//       ]
//     }
//   });

//   const inline_keyboard_game = [
//     [{
//         text: 'Да',
//         callback_data: 'yes'
//       },
//       {
//         text: 'Нет',
//         callback_data: 'no'
//       }
//     ]
//   ];

  
//   })