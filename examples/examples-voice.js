const { Client, VoiceClient, version } = require('gettic.js');

console.log('🎤 Gettic.js Voice Bot v' + version);
console.log('═══════════════════════════');

const bot = new Client({
    url: process.env.GETTIC_URL || 'https://gettic-production.up.railway.app',
    token: process.env.BOT_TOKEN || 'TOKEN',
    username: 'VoiceBot',
    prefix: '!'
});

const voice = new VoiceClient(bot, {
    bitrate: 96000  // 96kbps ses kalitesi
});

// ============ OLAYLAR ============

bot.on('ready', () => {
    console.log('✅ Bot hazır!');
    bot.send('genel', '🎤 Sesli kanal botu hazır! !yardim yaz.');
});

voice.on('join', (roomId) => {
    console.log('🎤 Sesli kanala katıldı: ' + roomId);
});

voice.on('leave', (roomId) => {
    console.log('👋 Sesli kanaldan ayrıldı: ' + roomId);
});

voice.on('mute', () => {
    console.log('🔇 Mikrofon susturuldu');
});

voice.on('unmute', () => {
    console.log('🎤 Mikrofon açıldı');
});

voice.on('error', (err) => {
    console.error('⚠️ Ses hatası:', err.message);
});

// ============ KOMUTLAR ============

bot.command('yardim', (ctx) => {
    ctx.reply(
        '🎤 **Sesli Komutlar**\n' +
        '!katil <oda> - Sesli kanala katıl\n' +
        '!ayril - Sesli kanaldan ayrıl\n' +
        '!sustur - Mikrofonu kapat\n' +
        '!ac - Mikrofonu aç\n' +
        '!durum - Ses durumu'
    );
});

bot.command('katil', async (ctx) => {
    const room = ctx.args[0] || 'genel';
    try {
        await voice.join(room);
        ctx.reply(`✅ Sesli kanala katıldım: **${room}**`);
    } catch (e) {
        ctx.reply('❌ Sesli kanala katılamadı: ' + e.message);
    }
});

bot.command('ayril', async (ctx) => {
    await voice.leave();
    ctx.reply('👋 Sesli kanaldan ayrıldım.');
});

bot.command('sustur', (ctx) => {
    voice.mute();
    ctx.reply('🔇 Mikrofonum susturuldu.');
});

bot.command('ac', (ctx) => {
    voice.unmute();
    ctx.reply('🎤 Mikrofonum açıldı.');
});

bot.command('durum', (ctx) => {
    const durum = voice.connected 
        ? `🟢 Bağlı: ${voice.roomId}`
        : '🔴 Bağlı değil';
    const mik = voice.muted ? '🔇 Susturuldu' : '🎤 Açık';
    const ses = voice.deafened ? '🔇 Sağır' : '🔊 Normal';
    ctx.reply(`${durum}\nMikrofon: ${mik}\nSes: ${ses}\nBitrate: ${voice.bitrate/1000}kbps`);
});

bot.command('bitrate', (ctx) => {
    const br = parseInt(ctx.args[0]);
    if (!br || br < 8 || br > 128) return ctx.reply('❌ Geçerli bitrate: 8-128 (kbps)');
    voice.setBitrate(br * 1000);
    ctx.reply(`✅ Bitrate ayarlandı: ${br}kbps`);
});

// ============ BAŞLAT ============
console.log('🔄 Bağlanıyor...');
bot.connect().catch(err => {
    console.error('❌ Bağlantı hatası:', err.message);
});
