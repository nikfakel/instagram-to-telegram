import {Controller, Logger} from '@nestjs/common';
import { Telegraf,Markup  } from 'telegraf';
import {callbackQuery, message} from 'telegraf/filters';
import {FirebaseService} from "../services/firebase.service";
import {TelegramApiService} from "./telegram-api.service";
const EventSource =  require('eventsource');

@Controller('telegram-bot')
export class TelegramBotController {
  private readonly logger: Logger = new Logger(TelegramBotController.name);
  private bot: Telegraf = null;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly telegramApiService: TelegramApiService,
  ) {
    if (this.bot) {
      this.bot.stop('reinitialize')
    }

    this.initialize();
  }

  async initialize() {
    const token = process.env.TELEGRAM_TOKEN;
    if (token === undefined) {
      throw new Error('BOT_TOKEN must be provided!')
    }

    this.bot = new Telegraf(token);

    this.applyCommands();
    this.stopBotOnAppStop();
    this.setCommands();

    this.bot.launch();
  }

  applyCommands() {
    this.onStart();
    this.onAddParser();
    this.onGetParsers();
    this.onPressSaveButton();

    this.bot.help((ctx) => ctx.reply('Send me a help'));
    this.bot.settings((ctx) => ctx.reply('Send me a settings'));
    this.bot.on(message('sticker'), (ctx) => {
      console.log(ctx.message);  ctx.reply('👍')});
    this.bot.hears('hi', (ctx) => ctx.reply('Hey there'));
  }

  onPressSaveButton() {
    this.bot.on(callbackQuery('data'), async (ctx) => {
      const { update: { callback_query: { data, id, from: { id: userId } }  }} = ctx;

      const dataCommand = JSON.parse(data);

      if (dataCommand.c === 'save_changes') {
        ctx.reply('Setting were saved')
        this.firebaseService.saveNewChannel({
          userId,
          channel: dataCommand.ch,
          instagram: dataCommand.i,
        })
        return this.bot.telegram.answerCbQuery(id, 'New channel was saved')
      }
    });
  }

  onAddParser() {
    this.bot.command('addparser', (ctx) => {
      const words = ctx.message.text.split(' ');

      if (words.length === 3 && words[0] === '/addparser') {
        const instaLink = `https://www.instagram.com/${words[1]}/`;
        const channelLink = `https://t.me/${words[2]}`;

        ctx.reply(instaLink)
        ctx.reply(channelLink)

        const data = JSON.stringify({c: 'save_changes', i: words[1], ch: words[2] })
        return ctx.reply('Check this links. If it\'s correct, press <b>Save</b> button', {
          parse_mode: 'HTML',
          ...Markup.inlineKeyboard([
            Markup.button.callback('Save', data),
          ])
        })
      } else {
        ctx.reply(`Wrong command usage. Please use command /addinstagram as this: 
        /addinstagram instagram_account telegram_channel
      `)
      }
    })
  }

  onGetParsers() {
    this.bot.command('getactiveparsers', async (ctx) => {
      try {
        ctx.reply('Load parsers list')
        console.log(ctx.message.from);
        const activeParsers = await this.firebaseService.getActiveParsers(ctx.message.from.id);
        console.log(activeParsers);

        ctx.reply(`Your active parsers:
${activeParsers.map(parser => `${parser.channel} with instagram ${parser.instagram}`)}
`)
      } catch(e) {
        this.logger.error(e);
      }
    });
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

  setCommands() {
    this.bot.telegram.setMyCommands([{
      command: "addparser", description: "Set new instagram account for parsing",
    },{
      command: "getactiveparsers", description: "Get list of your active parsers",
    },
    ]);
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
    const {
      id,
      first_name: firstName,
      last_name: lastName,
      username,
      type,
      active_usernames: activeUsernames
    } = getChat;

    const user = {
      id,
      firstName,
      lastName,
      username,
      type,
      activeUsernames
    }

    try {
      this.firebaseService.saveUser(user)
    } catch(e) {
      this.logger.error(e)
    }
  }
}
