import React from 'react';
import './style.css';

const Footer = props => {
    return (
        <footer className="footer-content">
            <p className="copy-right">© Nutanix 2020</p>
            <p className="copy-right">{'mssql' === 'REPLACE_DIALECT' ?  'Powered by Microsoft SQL' : null}</p>
            <p className="copy-right">{'mysql' === 'REPLACE_DIALECT' ?  'Powered by MySQL' : null}</p>
            <p className="copy-right">{'mariadb' === 'REPLACE_DIALECT' ?  'Powered by MariaDB' : null}</p>
            <p className="copy-right">{'postgres' === 'REPLACE_DIALECT' ?  'Powered by PostgreSQL' : null}</p>
            <p className="copy-right">{'sqlite' === 'REPLACE_DIALECT' ?  'Powered by SQLite' : null}</p>
        </footer>
    )
};

export default Footer;
