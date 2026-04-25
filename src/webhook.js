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

    async sendEmbed({ title, description, fields, footer, image }) {
        let msg = '';
        if (title) msg += `**${title}**\n`;
        if (description) msg += `${description}\n`;
        if (fields) fields.forEach(f => msg += `\n**${f.name}**: ${f.value}`);
        if (image) msg += `\n${image}`;
        if (footer) msg += `\n_${footer}_`;
        return this.send(msg);
    }

    setName(name) { this.username = name; return this; }
}

module.exports = { WebhookClient };
