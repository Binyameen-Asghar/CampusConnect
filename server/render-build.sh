#!/usr/bin/env bash
apt-get update -y
apt-get install -y wget gnupg libxshmfence1
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google.list
apt-get update -y
apt-get install -y google-chrome-stable
