#!/bin/bash
set -ex

# Modify DB config file

sudo sed -i 's/REPLACE_DB_NAME/@@{db_name}@@/g' ~/Fiesta/config/config.js
sudo sed -i 's/REPLACE_DB_HOST_ADDRESS/@@{MySQL.address}@@/g' ~/Fiesta/config/config.js
sudo sed -i 's/REPLACE_DB_DIALECT/@@{db_dialect}@@/g' ~/Fiesta/config/config.js
sudo sed -i 's/REPLACE_DB_USER_NAME/@@{db_username}@@/g' ~/Fiesta/config/config.js
db_password='@@{db_password}@@'
db_escaped_pass="${db_password//\//\\/}"
sudo sed -i "s/REPLACE_DB_PASSWORD/`echo $db_escaped_pass`/g" ~/Fiesta/config/config.js

# Create the unit file
echo '[Service]

ExecStart=/usr/bin/node /home/rocky/Fiesta/index.js
Restart=always
RestartSec=2s

StandardOutput=journal
StandardError=journal

SyslogIdentifier=fiesta

User=root
Group=root

Environment=NODE_ENV=production PORT=5001

[Install]
WantedBy=multi-user.target' | sudo tee /etc/systemd/system/fiesta.service

# Reload daemons and start service
sudo systemctl daemon-reload
sudo systemctl start fiesta
sudo systemctl enable fiesta
sudo systemctl status fiesta -l

