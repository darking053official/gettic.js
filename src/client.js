const io = require('socket.io-client');
const EventEmitter = require('events');
const { sleep, formatTime, randomString } = require('./utils');

class Client extends EventEmitter {
    constructor(options = {}) {
        super();
        this.url = options.url || 'https://gettic-production.up.railway.app';
        this.token = options.token || '';
        this.username = options.username || 'GetticBot';
        this.prefix = options.prefix || '/';
        this.socket = null;
        this.ready = false;
        this._startTime = null;
        this._commands = new Map();
        this._reconnectAttempts = 0;
        this._maxReconnect = 10;
    }

    /**
     * Sunucuya bağlan
     */
    connect() {
        return new Promise((resolve, reject) => {
            if (this.socket) this.socket.disconnect();

            this.socket = io(this.url, {
                auth: { token: this.token },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: this._maxReconnect,
                reconnectionDelay: 3000,
                timeout: 20000
            });

            this.socket.on('connect', () => {
                this.ready = true;
                this._startTime = Date.now();
                this._reconnectAttempts = 0;
                this.socket.emit('user-online', 'bot-' + this.token);
                this.emit('ready');
                resolve(this);
            });

            this.socket.on('receive-message', (msg) => this._onMessage(msg));
            this.socket.on('user-typing', (data) => this.emit('typing', data));
            this.socket.on('room-user-count', (count) => this.emit('count', count));
            this.socket.on('disconnect', () => { this.ready = false; this.emit('disconnect'); });
            this.socket.on('connect_error', (err) => {
                this._reconnectAttempts++;
                this.emit('error', err);
                if (this._reconnectAttempts >= this._maxReconnect) {
                    reject(new Error('Bağlantı kurulamadı: ' + err.message));
                }
            });
        });
    }

    /**
     * Gelen mesajı işle
     */
    _onMessage(msg) {
        this.emit('message', msg);
        if (msg.isBot) return;
        if (msg.content && msg.content.startsWith(this.prefix)) {
            const args = msg.content.substring(this.prefix.length).trim().split(/ +/);
            const cmd = args.shift().toLowerCase();
            if (this._commands.has(cmd)) {
                const ctx = this._createContext(msg, args);
                this._commands.get(cmd)(ctx);
                this.emit('command', cmd, ctx);
            }
        }
    }

    /**
     * Komut context'i oluştur
     */
    _createContext(msg, args) {
        return {
            message: msg,
            args: args,
            room: msg.room,
            sender: msg.senderName,
            senderId: msg.sender,
            reply: (text) => this.send(msg.room, text),
            delete: () => this.deleteMessage(msg._id),
            edit: (text) => this.editMessage(msg._id, text),
            react: (emoji) => this.reactMessage(msg._id, emoji)
        };
    }

    /**
     * Mesaj gönder
     */
    send(room, content) {
        if (!this.socket || !this.ready) return this;
        this.socket.emit('send-message', {
            content: String(content),
            senderId: 'bot-' + this.token,
            senderName: this.username,
            roomId: room,
            type: 'text',
            isBot: true
        });
        return this;
    }

    /**
     * Mesaj düzenle
     */
    async editMessage(msgId, content) {
        const axios = require('axios');
        const res = await axios.put(`${this.url}/api/messages/${msgId}`, { content }, {
            headers: { 'Authorization': 'Bearer ' + this.token }
        });
        return res.data;
    }

    /**
     * Mesaj sil
     */
    async deleteMessage(msgId) {
        const axios = require('axios');
        const res = await axios.delete(`${this.url}/api/messages/${msgId}`, {
            headers: { 'Authorization': 'Bearer ' + this.token }
        });
        return res.data;
    }

    /**
     * Tepki ekle
     */
    async reactMessage(msgId, emoji) {
        const axios = require('axios');
        const res = await axios.post(`${this.url}/api/messages/${msgId}/react`, { emoji }, {
            headers: { 'Authorization': 'Bearer ' + this.token }
        });
        return res.data;
    }

    /**
     * Odaya katıl
     */
    joinRoom(roomId) {
        this.socket?.emit('join-room', roomId);
        return this;
    }

    /**
     * Odadan ayrıl
     */
    leaveRoom(roomId) {
        this.socket?.emit('leave-room', roomId);
        return this;
    }

    /**
     * Komut ekle
     */
    command(name, handler) {
        this._commands.set(name.toLowerCase(), handler);
        return this;
    }

    /**
     * Toplu komut ekle
     */
    commands(list) {
        Object.entries(list).forEach(([name, fn]) => this.command(name, fn));
        return this;
    }

    /**
     * Bot adını değiştir
     */
    setName(name) {
        this.username = name;
        return this;
    }

    /**
     * Prefix değiştir
     */
    setPrefix(prefix) {
        this.prefix = prefix;
        return this;
    }

    /**
     * Bağlantıyı sonlandır
     */
    destroy() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.ready = false;
        this.emit('destroy');
    }

    /**
     * Gecikme değeri (ms)
     */
    get ping() {
        return this.socket?.io?.engine?.transport?.pingTimeout || 0;
    }

    /**
     * Çalışma süresi (ms)
     */
    get uptime() {
        return this._startTime ? Date.now() - this._startTime : 0;
    }
}

module.exports = { Client };
