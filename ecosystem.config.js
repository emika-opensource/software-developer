module.exports = {
  apps: [{
    name: 'software-developer',
    script: 'server.js',
    env: { NODE_ENV: 'production', PORT: 3000 },
    instances: 1,
    autorestart: true,
    max_memory_restart: '256M'
  }]
};
