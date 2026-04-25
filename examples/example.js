const { Client, WebhookClient, RESTClient, version } = require('gettic.js');

console.log('🚀 Gettic.js v' + version);
console.log('============================');

// Bot örneği
const bot = new Client({
    url: 'https://gettic-production.up.railway.app',
    token: process.env.BOT_TOKEN || 'TOKEN',
    username: 'BenimBot',
    prefix: '!'
});

bot.on('ready', () => {
    console.log('✅ Bot hazır!');
    console.log('📡 Ping:', bot.ping + 'ms');
    bot.send('genel', 'Merhaba! Ben bir Gettic botuyum.');
});

bot.on('message', (msg) => {
    console.log(`📩 ${msg.senderName}: ${msg.content}`);
});

bot.on('error', (err) => {
    console.error('❌ Hata:', err.message);
});

// Komutlar
bot.command('ping', (ctx) => {
    ctx.reply(`🏓 Pong! Gecikme: ${bot.ping}ms`);
});

bot.command('yardim', (ctx) => {
    ctx.reply('📋 Komutlar: !ping, !yardim, !sunucu');
});

bot.command('sunucu', (ctx) => {
    ctx.reply(`🏠 Sunucu: Gettic\n📍 Oda: ${ctx.room}\n👤 Sen: ${ctx.sender}`);
});

// Webhook örneği
async function webhookDemo() {
    const wh = new WebhookClient('https://gettic-production.up.railway.app/api/webhook/TOKEN');
    await wh.send('Bu bir webhook mesajıdır!');
    console.log('✅ Webhook gönderildi');
}

// REST API örneği
async function restDemo() {
    const api = new RESTClient({ token: 'TOKEN' });
    const rooms = await api.getRooms();
    console.log('📁 Odalar:', rooms.map(r => r.name).join(', '));
}

// Başlat
console.log('============================');
console.log('Bot başlatılıyor...');
bot.connect().catch(err => {
    console.log('⚠️ Bağlantı bekleniyor (sunucu kapalı olabilir)');
    console.log('Token veya URL kontrol et.');
});
