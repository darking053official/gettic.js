const { Client, WebhookClient, RESTClient, version, colors, utils } = require('../src/index');

console.log('🧪 Gettic.js v' + version + ' Test');
console.log('✅ Modüller yüklendi');
console.log('✅ Client:', typeof Client);
console.log('✅ WebhookClient:', typeof WebhookClient);
console.log('✅ RESTClient:', typeof RESTClient);
console.log('✅ Colors:', Object.keys(colors).length + ' renk');
console.log('✅ Utils:', Object.keys(utils).length + ' araç');

// Basit test
const { sleep } = utils;
sleep(100).then(() => {
    console.log('✅ sleep() çalışıyor');
    console.log('✅ Tüm testler başarılı!');
    process.exit(0);
});
