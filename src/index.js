const { Client } = require('./client');
const { VoiceClient } = require('./voice');
const { WebhookClient } = require('./webhook');
const { RESTClient } = require('./rest');
const { NetworkManager } = require('./network');
const { version, colors, badges } = require('./types');
const { sleep, formatTime, formatDate, randomString, escapeHtml, truncate } = require('./utils');

module.exports = {
    Client,
    VoiceClient,
    WebhookClient,
    RESTClient,
    NetworkManager,
    version,
    colors,
    badges,
    utils: { sleep, formatTime, formatDate, randomString, escapeHtml, truncate }
};
