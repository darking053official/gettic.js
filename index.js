/**
 * Gettic.js - Resmi Gettic Kütüphanesi
 * github.com/darking053official/gettic.js
 * 
 * Kullanım:
 * const { Client, WebhookClient, RESTClient } = require('gettic.js');
 */

const { Client } = require('./src/client');
const { WebhookClient } = require('./src/webhook');
const { RESTClient } = require('./src/rest');

module.exports = {
    Client,
    WebhookClient,
    RESTClient,
    version: '1.0.0',
    
    createClient: (options) => new Client(options),
    createWebhook: (url, options) => new WebhookClient(url, options),
    createREST: (options) => new RESTClient(options)
};
