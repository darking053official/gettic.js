const { Client } = require('./system');
const { VoiceClient } = require('./voice');
const { WebhookClient } = require('./webhook');
const { RESTClient } = require('./rest');
const { version, colors, badges } = require('./types');
const { sleep, formatTime, randomString, escapeHtml } = require('./utils');

module.exports = {
    Client,
    VoiceClient,
    WebhookClient,
    RESTClient,
    version,
    colors,
    badges,
    utils: { sleep, formatTime, randomString, escapeHtml }
};
