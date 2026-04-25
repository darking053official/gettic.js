const EventEmitter = require('events');

class VoiceClient extends EventEmitter {
    constructor(client, options = {}) {
        super();
        this.client = client;
        this.roomId = null;
        this.connected = false;
        this.muted = false;
        this.deafened = false;
        this.speaking = false;
        this.stream = null;
        this.bitrate = options.bitrate || 64000;
    }

    async join(roomId) {
        if (this.connected) await this.leave();
        this.roomId = roomId;

        try {
            this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.client.socket.emit('voice-join', {
                roomId: roomId,
                user: { id: this.client.token, name: this.client.username }
            });
            this.connected = true;
            this.emit('join', roomId);
        } catch (e) {
            this.emit('error', new Error('Mikrofon izni gerekli'));
        }
    }

    async leave() {
        if (!this.connected) return;
        this.client.socket.emit('voice-leave', {
            roomId: this.roomId,
            userId: this.client.token
        });
        if (this.stream) {
            this.stream.getTracks().forEach(t => t.stop());
            this.stream = null;
        }
        this.connected = false;
        this.emit('leave', this.roomId);
    }

    mute() {
        this.muted = true;
        if (this.stream) {
            this.stream.getAudioTracks().forEach(t => t.enabled = false);
        }
        this.emit('mute');
    }

    unmute() {
        this.muted = false;
        if (this.stream) {
            this.stream.getAudioTracks().forEach(t => t.enabled = true);
        }
        this.emit('unmute');
    }

    toggleMute() {
        this.muted ? this.unmute() : this.mute();
    }

    deafen() {
        this.deafened = true;
        this.emit('deafen');
    }

    undeafen() {
        this.deafened = false;
        this.emit('undeafen');
    }

    setBitrate(bitrate) {
        this.bitrate = bitrate;
    }

    isSpeaking() {
        if (!this.stream) return false;
        const audioTrack = this.stream.getAudioTracks()[0];
        return audioTrack && audioTrack.enabled && audioTrack.readyState === 'live';
    }

    destroy() {
        this.leave();
        this.removeAllListeners();
    }
}

module.exports = { VoiceClient };
