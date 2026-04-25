// Network modülü - WebSocket ve HTTP yardımcıları
const io = require('socket.io-client');
const { sleep } = require('./utils');

class NetworkManager {
    constructor(url, options = {}) {
        this.url = url;
        this.socket = null;
        this.connected = false;
        this.listeners = {};
    }

    connect(token) {
        return new Promise((resolve, reject) => {
            this.socket = io(this.url, {
                auth: { token },
                transports: ['websocket', 'polling'],
                reconnection: true,
                timeout: 15000
            });
            this.socket.on('connect', () => { this.connected = true; resolve(this.socket); });
            this.socket.on('connect_error', (err) => reject(err));
        });
    }

    on(event, callback) {
        if (this.socket) this.socket.on(event, callback);
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    emit(event, data) {
        if (this.socket) this.socket.emit(event, data);
    }

    disconnect() {
        if (this.socket) { this.socket.disconnect(); this.socket = null; }
        this.connected = false;
    }

    async waitForEvent(event, timeout = 10000) {
        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => reject(new Error('Zaman aşımı: ' + event)), timeout);
            this.on(event, (data) => { clearTimeout(timer); resolve(data); });
        });
    }
}

module.exports = { NetworkManager };
