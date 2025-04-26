set -ex
sudo dnf -y remove mysql-community-server.x86_64
sudo chmod -R 755 /var/lib/mysql/
sudo rm -rf /var/lib/mysql/*
sudo ls -l /var/lib/mysql/
sudo rm -rf /var/log/mysqld.log