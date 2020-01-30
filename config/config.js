// The config file should point to the correct environment variables as especified in the variables.env file
// Supported dialects are: mssql, mariadb, mysql, postgres, and sqlite

module.exports = {
    "development": {
      "database": process.env.DATABASENAME,
      "username": process.env.USERNAME,
      "password": process.env.PASSWORD,
      "host":  process.env.HOSTNAME,
      "port":  process.env.PORT,
      "dialect": 'mysql'
    },
    "production": {
        "database": process.env.DATABASENAME,
        "username": process.env.USERNAME,
        "password": process.env.PASSWORD,
        "host":  process.env.HOSTNAME,
        "port":  process.env.PORT,
        "dialect": 'mysql'
      }
}
