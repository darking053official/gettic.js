<p align="center">
  <img src="https://raw.githubusercontent.com/darking053official/gettic/main/1777062266055.png" alt="Gettic Logo" width="150">
</p>

<h1 align="center">gettic.js</h1>

<p align="center">Gettic Resmi Node.js Kütüphanesi v2.0</p>

<p align="center">
  <a href="https://www.npmjs.com/package/gettic.js"><img src="https://img.shields.io/npm/v/gettic.js.svg"></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
</p>

<hr>

<h2>📦 Kurulum</h2>
<pre><code>npm install gettic.js</code></pre>

<hr>

<h2>🚀 Hızlı Başlangıç</h2>
<pre><code>const { Client } = require('gettic.js');

const bot = new Client({
    token: 'BOT_TOKEN',
    username: 'BenimBot',
    prefix: '/'
});

bot.on('ready', () => bot.send('genel', 'Merhaba!'));
bot.command('ping', ctx => ctx.reply('Pong!'));
bot.connect();</code></pre>

<hr>

<h2>📚 Client API</h2>

<h3>new Client(options)</h3>
<table>
<tr><th>Parametre</th><th>Tip</th><th>Varsayılan</th><th>Açıklama</th></tr>
<tr><td>url</td><td>string</td><td>gettic.up.railway.app</td><td>Sunucu URL</td></tr>
<tr><td>token</td><td>string</td><td>''</td><td>Bot token</td></tr>
<tr><td>username</td><td>string</td><td>GetticBot</td><td>Bot adı</td></tr>
<tr><td>prefix</td><td>string</td><td>/</td><td>Komut öneki</td></tr>
</table>

<h3>Metodlar</h3>
<table>
<tr><th>Metod</th><th>Açıklama</th></tr>
<tr><td>connect()</td><td>Sunucuya bağlan</td></tr>
<tr><td>send(oda, mesaj)</td><td>Mesaj gönder</td></tr>
<tr><td>editMessage(id, yeni)</td><td>Mesaj düzenle</td></tr>
<tr><td>deleteMessage(id)</td><td>Mesaj sil</td></tr>
<tr><td>reactMessage(id, emoji)</td><td>Tepki ekle</td></tr>
<tr><td>joinRoom(oda)</td><td>Odaya katıl</td></tr>
<tr><td>leaveRoom(oda)</td><td>Odadan ayrıl</td></tr>
<tr><td>command(isim, fn)</td><td>Komut ekle</td></tr>
<tr><td>commands(liste)</td><td>Toplu komut ekle</td></tr>
<tr><td>setName(isim)</td><td>Ad değiştir</td></tr>
<tr><td>setPrefix(önek)</td><td>Prefix değiştir</td></tr>
<tr><td>destroy()</td><td>Botu durdur</td></tr>
</table>

<h3>Özellikler</h3>
<table>
<tr><th>Özellik</th><th>Tip</th><th>Açıklama</th></tr>
<tr><td>ready</td><td>boolean</td><td>Bot hazır mı?</td></tr>
<tr><td>ping</td><td>number</td><td>Gecikme (ms)</td></tr>
<tr><td>uptime</td><td>number</td><td>Çalışma süresi (ms)</td></tr>
<tr><td>username</td><td>string</td><td>Bot adı</td></tr>
<tr><td>prefix</td><td>string</td><td>Komut öneki</td></tr>
</table>

<hr>

<h2>📡 Olaylar</h2>
<table>
<tr><th>Olay</th><th>Parametre</th><th>Açıklama</th></tr>
<tr><td>ready</td><td>-</td><td>Bot bağlandı</td></tr>
<tr><td>message</td><td>msg</td><td>Mesaj geldi</td></tr>
<tr><td>command</td><td>name, ctx</td><td>Komut çalıştı</td></tr>
<tr><td>typing</td><td>data</td><td>Kullanıcı yazıyor</td></tr>
<tr><td>count</td><td>number</td><td>Oda sayısı</td></tr>
<tr><td>disconnect</td><td>-</td><td>Bağlantı koptu</td></tr>
<tr><td>error</td><td>Error</td><td>Hata</td></tr>
<tr><td>destroy</td><td>-</td><td>Bot durdu</td></tr>
</table>

<hr>

<h2>🎯 Context (ctx)</h2>
<table>
<tr><th>Alan</th><th>Tip</th><th>Açıklama</th></tr>
<tr><td>message</td><td>msg</td><td>Ham mesaj</td></tr>
<tr><td>args</td><td>string[]</td><td>Argümanlar</td></tr>
<tr><td>room</td><td>string</td><td>Oda ID</td></tr>
<tr><td>sender</td><td>string</td><td>Gönderen</td></tr>
<tr><td>senderId</td><td>string</td><td>Gönderen ID</td></tr>
<tr><td>reply(text)</td><td>fn</td><td>Yanıt gönder</td></tr>
<tr><td>delete()</td><td>fn</td><td>Mesajı sil</td></tr>
<tr><td>edit(text)</td><td>fn</td><td>Düzenle</td></tr>
<tr><td>react(emoji)</td><td>fn</td><td>Tepki ekle</td></tr>
</table>

<hr>

<h2>🎤 VoiceClient API</h2>
<pre><code>const { VoiceClient } = require('gettic.js');
const voice = new VoiceClient(bot, { bitrate: 64000 });</code></pre>

<table>
<tr><th>Metod</th><th>Açıklama</th></tr>
<tr><td>join(oda)</td><td>Sesliye katıl</td></tr>
<tr><td>leave()</td><td>Ayrıl</td></tr>
<tr><td>mute()</td><td>Sustur</td></tr>
<tr><td>unmute()</td><td>Aç</td></tr>
<tr><td>toggleMute()</td><td>Değiştir</td></tr>
<tr><td>deafen()</td><td>Sağırlaştır</td></tr>
<tr><td>undeafen()</td><td>Kaldır</td></tr>
<tr><td>setBitrate(bps)</td><td>Bitrate ayarla</td></tr>
<tr><td>isSpeaking()</td><td>Konuşuyor mu?</td></tr>
<tr><td>destroy()</td><td>Yok et</td></tr>
</table>

<hr>

<h2>🔗 WebhookClient API</h2>
<pre><code>const { WebhookClient } = require('gettic.js');
const webhook = new WebhookClient('URL', { username: 'Bot' });</code></pre>

<table>
<tr><th>Metod</th><th>Açıklama</th></tr>
<tr><td>send(content)</td><td>Mesaj gönder</td></tr>
<tr><td>sendEmbed(embed)</td><td>Embed gönder</td></tr>
<tr><td>setName(name)</td><td>İsim değiştir</td></tr>
</table>

<h3>Embed Objesi</h3>
<pre><code>{
  title: 'Başlık',
  description: 'Açıklama',
  fields: [{ name: 'Alan', value: 'Değer' }],
  image: 'https://...',
  footer: 'Alt bilgi'
}</code></pre>

<hr>

<h2>⚙️ RESTClient API</h2>
<pre><code>const { RESTClient } = require('gettic.js');
const api = new RESTClient({ token: 'TOKEN' });</code></pre>

<table>
<tr><th>Metod</th><th>Açıklama</th></tr>
<tr><td>getProfile()</td><td>Profil getir</td></tr>
<tr><td>updateProfile(data)</td><td>Profil güncelle</td></tr>
<tr><td>getRooms()</td><td>Odaları listele</td></tr>
<tr><td>createRoom(name, desc, cat)</td><td>Oda oluştur</td></tr>
<tr><td>getMessages(roomId)</td><td>Mesajları getir</td></tr>
<tr><td>sendMessage(roomId, content)</td><td>Mesaj gönder</td></tr>
<tr><td>getServers()</td><td>Sunucuları listele</td></tr>
<tr><td>createServer(name, tpl)</td><td>Sunucu oluştur</td></tr>
<tr><td>joinServer(inviteCode)</td><td>Davetle katıl</td></tr>
<tr><td>deleteServer(id)</td><td>Sunucu sil</td></tr>
<tr><td>getWebhooks()</td><td>Webhook listesi</td></tr>
<tr><td>createWebhook(name, srv, ch)</td><td>Webhook oluştur</td></tr>
<tr><td>deleteWebhook(id)</td><td>Webhook sil</td></tr>
<tr><td>getBots()</td><td>Bot listesi</td></tr>
<tr><td>createBot(name, prefix)</td><td>Bot oluştur</td></tr>
<tr><td>deleteBot(id)</td><td>Bot sil</td></tr>
<tr><td>regenerateBotToken(id)</td><td>Token yenile</td></tr>
</table>

<hr>

<h2>🔧 Yardımcı Fonksiyonlar</h2>
<pre><code>const { utils } = require('gettic.js');</code></pre>
<table>
<tr><th>Fonksiyon</th><th>Açıklama</th></tr>
<tr><td>sleep(ms)</td><td>Belirtilen ms kadar bekle</td></tr>
<tr><td>formatTime(date)</td><td>Saat:dakika formatı</td></tr>
<tr><td>formatDate(date)</td><td>Gün Ay Yıl formatı</td></tr>
<tr><td>randomString(length)</td><td>Rastgele string</td></tr>
<tr><td>escapeHtml(str)</td><td>HTML temizle</td></tr>
<tr><td>truncate(str, len)</td><td>Metni kısalt</td></tr>
</table>

<hr>

<h2>🎨 Sabitler</h2>
<pre><code>const { colors, badges, version } = require('gettic.js');</code></pre>

<h3>Renkler</h3>
<table>
<tr><th>İsim</th><th>Hex</th></tr>
<tr><td>blue</td><td>#5b6af0</td></tr>
<tr><td>green</td><td>#22c55e</td></tr>
<tr><td>red</td><td>#ef4444</td></tr>
<tr><td>yellow</td><td>#eab308</td></tr>
<tr><td>orange</td><td>#f97316</td></tr>
<tr><td>pink</td><td>#ec4899</td></tr>
<tr><td>purple</td><td>#8b5cf6</td></tr>
<tr><td>cyan</td><td>#06b6d4</td></tr>
</table>

<hr>

<h2>💡 Örnekler</h2>

<h3>Temel Bot</h3>
<pre><code>const { Client } = require('gettic.js');
const bot = new Client({ token: 'TOKEN', username: 'Botum', prefix: '/' });
bot.on('ready', () => bot.send('genel', 'Merhaba!'));
bot.command('ping', ctx => ctx.reply(`Pong! ${bot.ping}ms`));
bot.command('yardim', ctx => ctx.reply('/ping, /yardim'));
bot.connect();</code></pre>

<h3>Sesli Bot</h3>
<pre><code>const { Client, VoiceClient } = require('gettic.js');
const bot = new Client({ token: 'TOKEN' });
const voice = new VoiceClient(bot);
bot.command('katil', async ctx => { await voice.join(ctx.args[0]); ctx.reply('Katıldım!'); });
bot.connect();</code></pre>

<h3>Webhook</h3>
<pre><code>const { WebhookClient } = require('gettic.js');
const webhook = new WebhookClient('URL');
await webhook.send('Merhaba!');</code></pre>

<hr>

<h2>📄 Lisans</h2>
<p>MIT © 2026 Gettic</p>
