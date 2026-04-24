const io = require('socket.io-client');
const EventEmitter = require('events');

class Client extends EventEmitter {
    constructor(options = {}) {
        super();
        this.url = options.url || 'https://gettic.onrender.com';
        this.token = options.token || '';
        this.username = options.username || 'GetticBot';
        this.prefix = options.prefix || '/';
        this.socket = null;
        this.ready = false;
        this._startTime = null;
        this._commands = new Map();
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.socket = io(this.url, {
                auth: { token: this.token },
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 10,
                reconnectionDelay: 3000
            });

            this.socket.on('connect', () => {
                this.socket.emit('user-online', 'bot-' + this.token);
                this.ready = true;
                this._startTime = Date.now();
                this.emit('ready');
                resolve(this);
            });

            this.socket.on('receive-message', (msg) => this._onMessage(msg));
            this.socket.on('disconnect', () => { this.ready = false; this.emit('disconnect'); setTimeout(() => this.connect(), 5000); });
            this.socket.on('connect_error', (err) => reject(err));
        });
    }

    _onMessage(msg) {
        if (msg.isBot) return;
        this.emit('message', msg);
        if (msg.content && msg.content.startsWith(this.prefix)) {
            const args = msg.content.substring(this.prefix.length).trim().split(/ +/);
            const cmd = args.shift().toLowerCase();
            if (this._commands.has(cmd)) {
                const ctx = {
                    message: msg,
                    args: args,
                    room: msg.room,
                    sender: msg.senderName,
                    reply: (text) => this.send(msg.room, text),
                    delete: () => this.deleteMessage(msg._id),
                    edit: (text) => this.editMessage(msg._id, text)
                };
                this._commands.get(cmd)(ctx);
                this.emit('command', cmd, ctx);
            }
        }
    }

    send(room, content) {
        if (!this.socket || !this.ready) return this;
        this.socket.emit('send-message', {
            content: content,
            senderId: 'bot-' + this.token,
            senderName: this.username,
            roomId: room,
            type: 'text',
            isBot: true
        });
        return this;
    }

    async editMessage(msgId, content) {
        const axios = require('axios');
        return axios.put(`${this.url}/api/messages/${msgId}`, { content }, {
            headers: { 'Authorization': 'Bearer ' + this.token }
        });
    }

    async deleteMessage(msgId) {
        const axios = require('axios');
        return axios.delete(`${this.url}/api/messages/${msgId}`, {
            headers: { 'Authorization': 'Bearer ' + this.token }
        });
    }

    joinRoom(roomId) { this.socket?.emit('join-room', roomId); return this; }
    leaveRoom(roomId) { this.socket?.emit('leave-room', roomId); return this; }

    command(name, handler) { this._commands.set(name.toLowerCase(), handler); return this; }

    commands(list) { Object.entries(list).forEach(([name, fn]) => this.command(name, fn)); return this; }

    setName(name) { this.username = name; return this; }
    setPrefix(prefix) { this.prefix = prefix; return this; }

    destroy() { this.socket?.disconnect(); this.ready = false; this.emit('destroy'); }

    get ping() { return this.socket?.io?.engine?.transport?.pingTimeout || 0; }
    get uptime() { return this._startTime ? Date.now() - this._startTime : 0; }
}

module.exports = { Client };
