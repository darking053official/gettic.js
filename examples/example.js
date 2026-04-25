const { Client, WebhookClient, RESTClient } = require('gettic.js');

const bot = new Client({
    url: 'https://gettic-production.up.railway.app',
    token: 'BOT_TOKEN',
    username: 'BenimBot',
    prefix: '/'
});

bot.on('ready', () => {
    console.log('✅ Bot hazır!');
    bot.send('genel', 'Merhaba Gettic!');
});

bot.command('ping', (ctx) => {
    ctx.reply(`🏓 Pong! Gecikme: ${bot.ping}ms`);
});

bot.command('yardim', (ctx) => {
    ctx.reply('Komutlar: /ping, /yardim');
});

bot.connect();
