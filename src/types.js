/**
 * @gettic/types - TypeScript Tip Tanımlamaları
 * Bu dosya JavaScript için JSDoc tip tanımları içerir.
 */

/**
 * @typedef {Object} ClientOptions
 * @property {string} [url='https://gettic.onrender.com'] - Sunucu URL'si
 * @property {string} [token=''] - Bot token'ı
 * @property {string} [username='GetticBot'] - Bot kullanıcı adı
 * @property {string} [prefix='/'] - Komut prefix'i
 */

/**
 * @typedef {Object} MessageContext
 * @property {Object} message - Orijinal mesaj objesi
 * @property {string[]} args - Komut argümanları
 * @property {string} room - Oda ID'si
 * @property {string} sender - Gönderen kullanıcı adı
 * @property {function(string): Client} reply - Mesaja yanıt verme
 * @property {function(): Promise} delete - Mesajı silme
 * @property {function(string): Promise} edit - Mesajı düzenleme
 */

/**
 * @typedef {Object} WebhookOptions
 * @property {string} [username='Webhook'] - Webhook gönderici adı
 */

/**
 * @typedef {Object} EmbedOptions
 * @property {string} [title] - Başlık
 * @property {string} [description] - Açıklama
 * @property {Array<{name: string, value: string}>} [fields] - Alanlar
 * @property {string} [footer] - Alt bilgi
 */

/**
 * @typedef {Object} RESTOptions
 * @property {string} [url='https://gettic.onrender.com'] - Sunucu URL'si
 * @property {string} [token=''] - Kullanıcı token'ı
 */

module.exports = {
    ClientOptions: null,
    MessageContext: null,
    WebhookOptions: null,
    EmbedOptions: null,
    RESTOptions: null
};
