import React from 'react';
import './style.css';

const Footer = props => {
    const selected_dialect = props.selectedDialect;
    let displayed_dialect;
    switch (selected_dialect) {
        case 'mssql':
            displayed_dialect = " Powered by Microsoft SQL"
            break;
        case 'mysql':
            displayed_dialect = "Powered by MySQL"
            break;
        case 'mariadb':
            displayed_dialect = "Powered by MariaDB"
            break;
        case 'postgres':
            displayed_dialect = "Powered by PostgreSQL"
            break;
        case 'sqlite':
            displayed_dialect = "Powered by SQLite"
            break;
        default:
            displayed_dialect = ''
    }
    return (
        <footer className="footer-content">
            <p className="copy-right">© Nutanix 2020</p>
            <p className="copy-right">{displayed_dialect}</p>
        </footer>
    )
};

export default Footer;
