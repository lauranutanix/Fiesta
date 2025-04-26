#!/bin/bash
set -ex

# Update and install packages
sudo dnf -y update
sudo dnf -y install wget git vim gcc gcc-c++ nginx

# Install node
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo dnf install -y nodejs
node --version

# Clone Repo
git clone https://github.com/lauranutanix/Fiesta.git
cd ~/Fiesta
npm install
cd ~/Fiesta/client
npm install
npm run build
npm install nodemon concurrently