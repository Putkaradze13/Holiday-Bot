const { emojiCountryCode } = require("country-code-emoji");
const TelegramApi = require("node-telegram-bot-api");
const getHoliday = require("./countryHolidaysProvider");
const { GB, RS, AR, SD, CN, US, GE, getCountryCode } = require("./countryData");

require("dotenv").config();

const { TOKEN, HOST, PORT, URL, API_KEY, HD_URL } = process.env;

const bot = new TelegramApi(TOKEN, {
  webHook: {
    host: HOST,
    port: PORT,
  },
});
bot.setWebHook(URL + TOKEN);

function keyboards() {
  const mainMenu = {
    reply_markup: {
      keyboard: [
        [{ text: GB }, { text: RS }, { text: AR }],
        [{ text: SD }, { text: CN }, { text: US }],
        [{ text: GE }],
      ],
    },
  };
  return mainMenu;
}

bot.setMyCommands([{ command: "/start", description: "Flags" }]);

bot.on("message", async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const code = getCountryCode(text);
  if (code) {
    const countryCodeArr = [];
    countryCodeArr.push(text);
    const countryCode = countryCodeArr.map(emojiCountryCode).join(",");
    const message = await getHoliday(countryCode, API_KEY, HD_URL);
    return bot.sendMessage(chatId, message);
  }
  if (text === "/start") {
    return bot.sendMessage(chatId, "Please pick the flag", keyboards());
  }
  return bot.sendMessage(chatId, `"${text}" is wrong comand`);
});

const shutdown = () => process.exit();

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
