set -e

confirm() {
  read -p "Are you sure you want to uninstall mysql? (y/n) " -n 1 -r
  echo 
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    return 0
  else
    return 1
  fi
}

if confirm
then
    sudo dnf -y remove mysql-community-server.x86_64
    sudo chmod -R 755 /var/lib/mysql/
    sudo rm -rf /var/lib/mysql/*
    sudo ls -l /var/lib/mysql/
    sudo rm -rf /var/log/mysqld.log
else
    echo "Uninstall cancelled."
fi