const Telegraf = require('telegraf')
const Composer = require('telegraf/composer')
const session = require('telegraf/session')
const Stage = require('telegraf/stage')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const rn = require('random-number');
const gen = rn.generator({
  
  min:  11
, max:  999
, integer: true
})
const stepHandler = new Composer()
stepHandler.action('next', (ctx) => {
  ctx.reply('Please enter your ETH address below to receive the points in your wallet.')
  return ctx.wizard.next()
})
stepHandler.command('next', (ctx) => {
  return ctx.wizard.next()
})
stepHandler.use((ctx) => ctx.replyWithMarkdown('Press `Next` button or type /next'))
const ref_key = gen();
const word_a = "a";
const word_d = "d";
const ref_key1 = gen();
const ref_key2 = gen();
const superWizard = new WizardScene('super-wizard',
  (ctx) => {
    ctx.replyWithMarkdown('Hello! Welcome to the Betex airdrop.Follow us  and press `Next`. ', Markup.inlineKeyboard([
      Markup.urlButton('Follow Betex, click here!', 'https://t.me/betex_ico'),
      Markup.urlButton('Follow Blockchain News, click here!', 'https://t.me/Bl0ckchain_news'), 
      Markup.callbackButton('➡️ Next', 'next')
    ]).extra())
    return ctx.wizard.next()
  },
  stepHandler,
  (ctx) => {
    ctx.reply('Your ETH has been set!')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('Your referral link is: https://telegram.me/Betex_bot?start='+gen()+word_a+gen()+word_d+gen())
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('BALANCE➖50 Points➖')
    return ctx.wizard.next()
  },
  (ctx) => {
    ctx.reply('You must wait for the end of ICO! See you soon...')
    return ctx.scene.leave()
  }
)
require('http').createServer().listen(process.env.PORT || 5000).on('request', function(req, res){
  res.end('')
})﻿
const token = '598403579:AAEw2pAZ-GAD2xp2bkvKr0cIuY2kM8n8oXA'; 
const bot = new Telegraf(token, { polling: true });
const stage = new Stage([superWizard], { default: 'super-wizard' })
bot.hears(/eth/i, (ctx) => ctx.reply('Your ETH wallet has saved, wait for the end of ICO!'))
bot.use(session())
bot.use(stage.middleware())
bot.startPolling()
