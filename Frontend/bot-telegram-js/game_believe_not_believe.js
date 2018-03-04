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

const bot = new TelegramBot(token, {polling:true});
