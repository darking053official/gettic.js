const axios = require('axios');

class RESTClient {
    constructor(options = {}) {
        this.baseURL = options.url || 'https://gettic.onrender.com';
        this.token = options.token || '';
    }

    async request(method, path, data) {
        try {
            const res = await axios({
                method, url: `${this.baseURL}${path}`, data,
                headers: { 'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json' }
            });
            return res.data;
        } catch (e) {
            throw new Error(`REST Hatası: ${e.response?.data?.error || e.message}`);
        }
    }

    getProfile() { return this.request('GET', '/api/auth/me'); }
    getRooms() { return this.request('GET', '/api/rooms'); }
    createRoom(name, description, category) { return this.request('POST', '/api/rooms', { name, description, category }); }
    getMessages(roomId) { return this.request('GET', `/api/rooms/${roomId}/messages`); }
    createWebhook(name, room) { return this.request('POST', '/api/webhooks', { name, room }); }
    getWebhooks() { return this.request('GET', '/api/webhooks'); }
    deleteWebhook(id) { return this.request('DELETE', `/api/webhooks/${id}`); }
    createBot(name) { return this.request('POST', '/api/bots', { name }); }
    getBots() { return this.request('GET', '/api/bots'); }
    deleteBot(id) { return this.request('DELETE', `/api/bots/${id}`); }
}

module.exports = { RESTClient };
