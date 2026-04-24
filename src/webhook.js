const axios = require('axios');

class WebhookClient {
    constructor(url, options = {}) {
        if (!url) throw new Error('Webhook URL gerekli');
        this.url = url;
        this.username = options.username || 'Webhook';
    }

    async send(content) {
        try {
            const res = await axios.post(this.url, { content, username: this.username });
            return res.data;
        } catch (e) {
            throw new Error('Webhook gönderimi başarısız: ' + e.message);
        }
    }

    async sendEmbed({ title, description, fields, footer }) {
        let content = '';
        if (title) content += `**${title}**\n`;
        if (description) content += `${description}\n`;
        if (fields) fields.forEach(f => { content += `\n**${f.name}**: ${f.value}`; });
        if (footer) content += `\n_${footer}_`;
        return this.send(content);
    }

    setName(name) { this.username = name; return this; }
}

module.exports = { WebhookClient };
