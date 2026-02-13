#!/bin/bash

# Install PM2 globally if not present
if ! command -v pm2 &>/dev/null; then
  echo "Installing PM2..."
  npm install -g pm2 2>/dev/null || true
fi

# Install better-sqlite3 globally for quick project use
if ! node -e "require('better-sqlite3')" 2>/dev/null; then
  echo "Installing better-sqlite3..."
  npm install -g better-sqlite3 2>/dev/null || true
fi

# Check if a user project is deployed via PM2
if [ -f /home/node/.pm2/dump.pm2 ] && pm2 resurrect 2>/dev/null; then
  echo "Restored PM2 processes"
  pm2 logs --no-daemon
else
  # Fall back to Dev Workshop placeholder
  cd /home/node/app
  npm install 2>/dev/null || true
  exec node server.js
fi
