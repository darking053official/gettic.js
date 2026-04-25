const axios = require('axios');

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

    // Auth
    getProfile() { return this.request('GET', '/api/auth/me'); }
    updateProfile(data) { return this.request('PATCH', '/api/me', data); }

    // Rooms
    getRooms() { return this.request('GET', '/api/rooms'); }
    createRoom(name, description, category) { return this.request('POST', '/api/rooms', { name, description, category }); }
    getMessages(roomId) { return this.request('GET', `/api/rooms/${roomId}/messages`); }
    sendMessage(roomId, content) { return this.request('POST', `/api/channels/${roomId}/messages`, { content }); }

    // Servers
    getServers() { return this.request('GET', '/api/servers'); }
    createServer(name, template) { return this.request('POST', '/api/servers', { name, template }); }
    joinServer(inviteCode) { return this.request('POST', '/api/servers/join', { inviteCode }); }
    deleteServer(id) { return this.request('DELETE', `/api/servers/${id}`); }

    // Webhooks
    getWebhooks() { return this.request('GET', '/api/webhooks'); }
    createWebhook(name, serverId, channelId) { return this.request('POST', '/api/webhooks', { name, serverId, channelId }); }
    deleteWebhook(id) { return this.request('DELETE', `/api/webhooks/${id}`); }

    // Bots
    getBots() { return this.request('GET', '/api/bots'); }
    createBot(name, prefix) { return this.request('POST', '/api/bots', { name, prefix }); }
    deleteBot(id) { return this.request('DELETE', `/api/bots/${id}`); }
    regenerateBotToken(id) { return this.request('POST', `/api/bots/${id}/regenerate`); }
}

module.exports = { RESTClient };
