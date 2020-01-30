// The config file should point to the correct environment variables as especified in the variables.env file
// Supported dialects are: mssql, mariadb, mysql, postgres, and sqlite

module.exports = {
    "development": {
      "database": "FiestaDB",
      "username": "root",
      "password": "db_passwd",
      "host":  "localhost",
      "port":  "3306",
      "dialect": 'mysql'
    },
    "production": {
        "database": "FiestaDB",
        "username": "root",
        "password": "db_passwd",
        "host":  "localhost",
        "port":  "3306",
        "dialect": 'mysql'
      }
}
