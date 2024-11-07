#!/usr/bin/env bash
apt-get update -y
apt-get install -y wget gnupg
wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
apt-get update -y
apt-get install -y google-chrome-stable
apt-get install -y libxshmfence1
git