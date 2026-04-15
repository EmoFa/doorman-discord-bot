// trackedChannels.js
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data.json');

const defaultData = {
    watchedChannels: [],
    createdChannels: [],
}

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 4));
}

function load() {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
}

function save(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
}

function getWatchedChannels() {
    return load().watchedChannels;
}

function getCreatedChannels() {
    return load().createdChannels;
}

function saveWatchedChannels(watchedChannels) {
    const data = load();
    data.watchedChannels = watchedChannels;
    save(data);
}

function saveCreatedChannels(createdChannels) {
    const data = load();
    data.createdChannels = createdChannels;
    save(data);
}

module.exports = {
    getWatchedChannels,
    getCreatedChannels,
    saveWatchedChannels,
    saveCreatedChannels,
};