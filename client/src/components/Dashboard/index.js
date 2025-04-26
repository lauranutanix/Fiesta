import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./style.css";
import storeimg from './../../img/stores.png';
import prodimg from './../../img/products.png';
import inventoryimg from './../../img/inventory.png';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connectionString: 'Loading...'
        };
        }
    componentDidMount() {
    // Fetch the connection string when the component mounts
    fetch("/api/db-connection")
        .then(res => res.json())
        .then(data => {
        this.setState({ connectionString: data.connectionString });
        })
        .catch(err => {
        this.setState({ connectionString: 'Error loading connection string.' });
        console.error(err);
        });
    }
    render() {
        return (
            <div className="wrapper">
                <div className="jumbotron jumbotron-fluid jumbotron_local">
                    <div className="container">
                        <h1 className="display-4">Welcome to Fiesta!</h1>
                        <p className="lead">An inventory management app for stores that sell party supplies.</p>
                        <p><strong>Connected to database:</strong></p>
                        <pre>{this.state.connectionString}</pre>
                    </div>
                </div>
                <div className="options">
                    <Link to='/stores'>
                        <div className="card">
                            <p>Stores</p>
                            <img className="icon" alt="stores icon" src={storeimg} />
                        </div>
                    </Link>
                    <Link to='/products'>
                        <div className="card">
                            <p>Products</p>
                            <img className="icon" alt="product icon" src={prodimg} />
                        </div>
                    </Link>
                    <Link to='/inventory'>
                        <div className="card">
                            <p>Inventory</p>
                            <img className="icon" alt="inventory icon" src={inventoryimg} />
                        </div>
                    </Link>
                </div>

            </div>
        )
    }
}
export default Dashboard;
