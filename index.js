const { Client } = require('./system');
const { WebhookClient } = require('./network');
const { RESTClient } = require('./network');
const { sleep, formatTime, randomString } = require('./utils');

module.exports = {
    Client,
    WebhookClient,
    RESTClient,
    version: '2.0.0',
    utils: { sleep, formatTime, randomString }
};
