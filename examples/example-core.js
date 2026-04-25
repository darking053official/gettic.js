const { Client, version } = require('gettic.js');

console.log('🚀 Gettic.js Core Bot v' + version);
console.log('═══════════════════════════');

const bot = new Client({
    url: process.env.GETTIC_URL || 'https://gettic-production.up.railway.app',
    token: process.env.BOT_TOKEN || 'TOKEN',
    username: 'CoreBot',
    prefix: '/'
});

// ============ OLAYLAR ============

bot.on('ready', () => {
    console.log('✅ Bot hazır!');
    console.log('📡 Gecikme: ' + bot.ping + 'ms');
    console.log('⏱ Çalışma: ' + Math.floor(bot.uptime / 1000) + 's');
    bot.send('genel', 'Merhaba! Ben CoreBot. /yardim yazarak komutları görebilirsin.');
});

bot.on('message', (msg) => {
    console.log(`📩 [${msg.room}] ${msg.senderName}: ${msg.content}`);
});

bot.on('typing', (data) => {
    console.log(`⌨️ ${data.userName} yazıyor...`);
});

bot.on('disconnect', () => {
    console.log('❌ Bağlantı koptu!');
});

bot.on('error', (err) => {
    console.error('⚠️ Hata:', err.message);
});

// ============ KOMUTLAR ============

bot.command('ping', (ctx) => {
    ctx.reply(`🏓 Pong! Gecikme: ${bot.ping}ms`);
});

bot.command('sa', (ctx) => {
    ctx.reply(`Aleyküm selam ${ctx.sender}! 👋`);
});

bot.command('yardim', (ctx) => {
    ctx.reply(
        '📋 **Komut Listesi**\n' +
        '/ping - Gecikme testi\n' +
        '/sa - Selamlaşma\n' +
        '/yardim - Bu menü\n' +
        '/sunucu - Sunucu bilgisi\n' +
        '/temizle <sayı> - Mesaj temizle\n' +
        '/anket Soru|Seç1|Seç2 - Anket başlat\n' +
        '/kullanici @isim - Kullanıcı bilgisi'
    );
});

bot.command('sunucu', (ctx) => {
    ctx.reply(
        `🏠 **Sunucu Bilgisi**\n` +
        `📍 Oda: ${ctx.room}\n` +
        `👤 Sen: ${ctx.sender}\n` +
        `🤖 Bot: ${bot.username}\n` +
        `⏱ Uptime: ${Math.floor(bot.uptime / 1000)}s`
    );
});

bot.command('temizle', (ctx) => {
    const sayi = parseInt(ctx.args[0]) || 5;
    ctx.reply(`🧹 ${sayi} mesaj temizleniyor...`);
});

bot.command('anket', (ctx) => {
    const full = ctx.args.join(' ');
    const parts = full.split('|');
    if (parts.length < 3) {
        return ctx.reply('❌ Kullanım: /anket Soru|Seçenek1|Seçenek2');
    }
    ctx.reply(`📊 **${parts[0]}**\n🔵 ${parts[1]}\n🟢 ${parts[2]}`);
});

bot.command('kullanici', (ctx) => {
    const hedef = ctx.args[0] || ctx.sender;
    ctx.reply(`👤 Kullanıcı: ${hedef}\n🎯 Durum: Çevrimiçi`);
});

bot.command('otorol', (ctx) => {
    ctx.reply('✅ Otorol ayarlandı! Yeni gelenlere @Üye rolü verilecek.');
});

bot.command('duyuru', (ctx) => {
    const mesaj = ctx.args.join(' ');
    if (!mesaj) return ctx.reply('❌ /duyuru <mesaj>');
    ctx.reply(`📢 **DUYURU:** ${mesaj}`);
});

// ============ BAŞLAT ============
console.log('🔄 Bağlanıyor...');
bot.connect().catch(err => {
    console.error('❌ Bağlantı hatası:', err.message);
    console.log('💡 İpucu: Sunucu URL\'sini ve token\'ı kontrol et.');
});
