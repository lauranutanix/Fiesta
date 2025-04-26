#!/bin/bash
set -ex

sudo dnf -y install "http://repo.mysql.com/mysql80-community-release-el9-5.noarch.rpm"
sudo dnf -y update
sudo setenforce 0
sudo sed -i 's/enforcing/disabled/g' /etc/selinux/config /etc/selinux/config
sudo systemctl stop firewalld || true
sudo systemctl disable firewalld || true
sudo dnf install -y mysql-community-server.x86_64

sudo /bin/systemctl start mysqld
sudo /bin/systemctl enable mysqld