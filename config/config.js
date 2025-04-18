
// Supported dialects are: mssql, mariadb, mysql, postgres, and sqlite
module.exports = {
    DB_NAME: 'fiestadb',
    DB_HOST_ADDRESS: 'localhost',
    DB_DIALECT: 'mysql',
    DB_DOMAIN_NAME: 'localhost',
    DB_USER_NAME: 'root', // default: "Administrator" for MSSQL and "root" for all others
    DB_PASSWORD: '' // only applicable to MS SQL connections
}