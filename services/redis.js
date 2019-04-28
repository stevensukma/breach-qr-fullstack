const redis = require('redis');
const redis_url = process.env.REDIS_URL || "redis://localhost/";
const client = redis.createClient(redis_url);

client.on('connect', function() {
    console.log('Redis client connected');
});

client.on('error', function (err) {
    console.log('Something went wrong ' + err);
});

module.exports = client;