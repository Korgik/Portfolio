// Здесь сложены все тестовые функции
// Клавиатура

const KEYBOARD_COMMAND = '/keyboard';
const KEYBOARD_COMMAND_SHOW = 'show';
const KEYBOARD_COMMAND_HIDE = 'hide';
const KEYBOARD_COMMAND_INLINE = 'inline';
const COMMAND_FORWARD = 'forward';
const COMMAND_REPLY = 'reply';
const COMMAND_EDIT = 'edit';
const COMMAND_DELETE = 'delete';

const inline_keyboard = [
  [{
      text: ' Forward',
      callback_data: COMMAND_FORWARD
    },
    {
      text: 'Reply',
      callback_data: COMMAND_REPLY
    }
  ],
  [{
      text: 'Edit',
      callback_data: COMMAND_EDIT
    },
    {
      text: 'Delete',
      callback_data: COMMAND_DELETE
    }
  ]
];



bot.onText(new RegExp(`${KEYBOARD_COMMAND} (.*)`), (msg, [source, matche]) => {
  const {
    chat: {
      id
    }
  } = msg;

  switch (matche) {
    case KEYBOARD_COMMAND_SHOW:
      bot.sendMessage(id, 'Showing a keyboard', {
        reply_markup: {
          keyboard: [
            [
              `${KEYBOARD_COMMAND} ${KEYBOARD_COMMAND_HIDE}`
            ]
          ]
        }
      });
      break;
    case KEYBOARD_COMMAND_HIDE:
      bot.sendMessage(id, 'Hiding a keyboard', {
        reply_markup: {
          remove_keyboard: true
        }
      });
      break;
    case KEYBOARD_COMMAND_INLINE:
      bot.sendMessage(id, 'Inline keyboard is below', {
        reply_markup: {
          inline_keyboard
        }
      });
      break;
    default:
      bot.sendMessage(id, 'Invalid parameters')
  }
});

bot.on('callback_query', async query => {
  const {
    message: {
      chat,
      message_id,
      text
    } = {}
  } = query;

  switch (query.data) {
    case COMMAND_FORWARD:
      bot.forwardMessage(chat.id, chat.id, message_id);
      break;
    case COMMAND_REPLY:
      bot.sendMessage(chat.id, 'Reply to a message', {
        reply_to_message_id: message_id
      });
      break;
    case COMMAND_EDIT:
      bot.editMessageText(`${text} (edited)`, {
        chat_id: chat.id,
        message_id: message_id,
        reply_markup: {
          inline_keyboard
        }
      });
      break;
    case COMMAND_DELETE:
      bot.deleteMessage(chat.id, message_id);
      break;
    default:
      try {
        const parsed = JSON.parse(query.data);
        switch (parsed.action) {
          case COMMAND_EDIT:
            await bot.editMessageText(`${parsed.message_text} (edited)`, {
              inline_message_id: query.inline_message_id
            });
            break
        }
      } catch (error) {
        return bot.answerCallbackQuery({
          callback_query_id: query.id,
          text: error.message
        })
      }

  }

  bot.answerCallbackQuery({
    callback_query_id: query.id
  })
});

bot.on('inline_query', query => {
  const message_text = 'Inline message text';

  bot.answerInlineQuery(query.id, [{
    id: '1',
    type: 'article',
    title: 'Send a message via this bot',
    input_message_content: {
      message_text
    },
    reply_markup: {
      inline_keyboard: [
        [{
          text: 'Arbitrary data',
          callback_data: JSON.stringify({
            action: COMMAND_EDIT,
            message_text
          })
        }]
      ]
    }
  }], {
    cache_time: 0
  })
});

// 
//обработка команды пример

bot.onText(/\/help (.+)/, (msg, [source, match]) => {
    const {
      chat: {
        id
      }
    } = msg;
    bot.sendMessage(id, match);
  });
  
  // Inline режим
  
  bot.on('inline_query', query => {
    console.log(query);
    const results = [];
  
    for (let i = 0; i < 3; i++) {
      results.push({
        id: i.toString(),
        type: 'article',
        title: `Title #${i}`,
        input_message_content: {
          message_text: `Article #${i} description should be here`
        }
      })
    }
  
  
    bot.answerInlineQuery(query.id, results, {
      cache_time: 0,
      switch_pm_text: 'Talk directly',
      switch_pm_parameter: 'hello',
    })
  });
  
  bot.on('callback_query', query => {
    bot.answerCallbackQuery(query.id, `Alert message is here: "${query.data}"`)
  });
  
  bot.onText(/\/start (.+)/, (msg, [source, match]) => {
    const {
      chat: {
        id
      }
    } = msg;
  
    bot.sendMessage(id, `Ты сказал мне "${match}". Рад тебя видеть, вот что я могу`, {
      reply_markup: {
        inline_keyboard: [
          [{
            text: 'Google',
            url: 'https://google.com'
          }],
          [{
              text: 'Back to the chat you came from',
              switch_inline_query: 'Hello again!'
            },
            {
              text: 'Stay here and talk to me again',
              switch_inline_query_current_chat: `It's love`
            }
          ],
          [{
            text: 'Show alert message',
            callback_data: 'Hello world!'
          }],
        ]
      }
    })
  });