const express = require('express')
const bodyParser = require('body-parser')
const { Botact } =require('botact')

const server = express()
const bot = new Botact({
	token: '4300931cbf3a926e2163f8779645ced11d436a7556c9ff7cade58d62894138f824928ad44739b64748f69',
	confirmation: '7e5ea07d'
})

bot.on((ctx) => {console.log(ctx.body)

ctx.reply(ctx.body)
})

// Команда приветствия
bot.hears(/прив|ку|здарова/, ((ctx) => {ctx.reply("Ну здарова \n Чертяга")}))

// Команда времени
bot.hears(/время|врем|час/, ((ctx) => {
	const date =new Date()

	const h = date.getHours()
	const m = date.getMinutes()
	const s = date.getSeconds()

	const time = 'Время московское ' + h + ':' + m + ':' + s

	ctx.reply(time)
}))

// Event при подключение к группе
bot.event('group_join', ({ reply }) => reply("Спасибо за подписон, кожный мешок. Теперь попробуй со мной завести диалог. \n Прояви вежливость и поздоровайся со мной"))

server.use(bodyParser.json())

server.post('/', bot.listen)

server.listen(80)