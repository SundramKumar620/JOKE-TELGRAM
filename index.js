const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/joke/, async (msg) => {
    try {
        const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
        const setup = response.data.setup;
        const punchline = response.data.punchline;

        bot.sendMessage(msg.chat.id, setup + " - " + punchline);
    } catch (error) {
        console.error('Error fetching joke:', error);
        bot.sendMessage(msg.chat.id, "Sorry, I couldn't fetch a joke at the moment.");
    }
});
