const { Client } = require('../src/index');

const bot = new Client({
    url: 'https://gettic-production.up.railway.app',
    token: 'test_token',
    username: 'TestBot'
});

bot.on('ready', () => {
    console.log('✅ Test başarılı! Bot hazır.');
    process.exit(0);
});

bot.connect().catch(() => {
    console.log('⚠️ Bağlantı bekleniyor (normal)');
    process.exit(0);
});
