const axios = require('axios');

class WebhookClient {
    constructor(url, options = {}) {
        if (!url) throw new Error('Webhook URL gerekli');
        this.url = url;
        this.username = options.username || 'Webhook';
    }

    async send(content) {
        const res = await axios.post(this.url, {
            content: String(content),
            username: this.username
        });
        return res.data;
    }

    setName(name) { this.username = name; return this; }
}

class RESTClient {
    constructor(options = {}) {
        this.baseURL = options.url || 'https://gettic-production.up.railway.app';
        this.token = options.token || '';
    }

    async request(method, path, data) {
        const res = await axios({
            method,
            url: this.baseURL + path,
            data,
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    }

    getProfile() { return this.request('GET', '/api/auth/me'); }
    getRooms() { return this.request('GET', '/api/rooms'); }
    createRoom(name, desc) { return this.request('POST', '/api/rooms', { name, description: desc }); }
    getMessages(roomId) { return this.request('GET', `/api/rooms/${roomId}/messages`); }
    createWebhook(name, room) { return this.request('POST', '/api/webhooks', { name, room }); }
    getWebhooks() { return this.request('GET', '/api/webhooks'); }
    deleteWebhook(id) { return this.request('DELETE', `/api/webhooks/${id}`); }
    createBot(name) { return this.request('POST', '/api/bots', { name }); }
    getBots() { return this.request('GET', '/api/bots'); }
    deleteBot(id) { return this.request('DELETE', `/api/bots/${id}`); }
}

module.exports = { WebhookClient, RESTClient };
