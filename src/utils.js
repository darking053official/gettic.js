function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatTime(date) {
    return new Date(date).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function randomString(length = 16) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

module.exports = { sleep, formatTime, randomString };
