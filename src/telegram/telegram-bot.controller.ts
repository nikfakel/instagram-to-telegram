import {Controller, Logger} from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
const EventSource =  require('eventsource');

@Controller('telegram-bot')
export class TelegramBotController {
  private readonly logger: Logger = new Logger(TelegramBotController.name);
  private bot: Telegraf = null;

  constructor() {
    console.log(this.bot);
    if (!this.bot) {
      // this.initialize();
    }
  }

  async initialize() {
    const eventSourceInit = { headers: {"Authorization": "Bearer 0136d3c3d4b3d23a355cfec7d0810be3", } }
    const es = new EventSource("https://api.pipedream.com/sources/dc_eKu1qQ2/sse", eventSourceInit);

    console.log("Listening to SSE stream at https://api.pipedream.com/sources/dc_eKu1qQ2/sse\n");

    es.onmessage = event => {
      console.log(event.data);
    }

    this.bot = new Telegraf(process.env.TELEGRAM_TOKEN);

    this.applyCommands();
    this.stopBotOnAppStop();

    console.log(this.bot.secretPathComponent());

    this.bot.command('/bit', (a) => {
      console.log('bit');
      console.log(a);
    })

    this.bot.telegram.setMyCommands([
      { command: "Add instagram", description: "Set new instagram account for parsing" },
      { command: "Add instagrams", description: "Set new instagram account for parsings" },
    ]);

    this.bot.launch();
  }

  applyCommands() {
    this.onStart();
    this.bot.help((ctx) => ctx.reply('Send me a sticker'));
    this.bot.settings((ctx) => ctx.reply('Send me a settings'));
    this.bot.on(message('sticker'), (ctx) => ctx.reply('👍'));
    this.bot.hears('hi', (ctx) => ctx.reply('Hey there'));
  }

  stopBotOnAppStop() {
    process.once('SIGINT', () => {
      console.log('bot stopped SIGINT');
      this.bot.stop('SIGINT')
    });
    process.once('SIGTERM', () => {
      console.log('bot stopped SIGTERM');
      this.bot.stop('SIGTERM')
    });
  }

  onStart() {
    this.bot.start(async ctx => {
      const getChat = await ctx.getChat(); // get user data
      this.saveUser(getChat)

      ctx.reply(`Welcome! I am InstaParser Bot!!!!!
      I can parse instagram posts and reels and post them into your channel.
      `)

      ctx.reply(`Add me to your group with admin rights and tell me instagram account which you want to parse.
      Format: https://www.instagram.com/rihannaofficiall/ or rihannaofficiall`)
    });
  }

  saveUser(getChat) {
    const { id, first_name: firstName, last_name: lastName, username, type, active_usernames: activeUsernames} = getChat;
    console.log(firstName);
  }
}
