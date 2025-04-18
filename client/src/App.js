import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import swal from 'sweetalert';

// import containers
import AddNewStore from './containers/AddNewStore';
import AddNewProduct from './containers/AddNewProduct';
import AddProductToStore from './containers/AddProductToStore';
import UpdateInventoryProduct from './containers/UpdateInventoryProduct';
import ViewStoreDetails from './containers/ViewStoreDetails';
import AddNewInventory from './containers/AddNewInventory';

// import Components
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Stores from './components/Stores';
import Products from './components/Products';
import Inventory from './components/Inventory';
import Footer from './components/Footer';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      stores: [],
      products: [],
      inventory: [],
      selectedDialect:''
    };
    this.handleDeleteStore = this.handleDeleteStore.bind(this);
    this.handleDeleteProduct= this.handleDeleteProduct.bind(this);
  }
  componentDidMount() {
    axios.get('/api/stores')
      .then(response => {
        this.setState({ stores: response.data });
        // console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });

    axios.get('/api/products')
      .then(response => {
        this.setState({ products: response.data });
        // console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });

    axios.get('/api/inventory')
      .then(response => {
        this.setState({ inventory: response.data });
        // console.log(this.state);
      })
      .catch(e => {
        console.log(e);
      });
      axios.get('/api/version')
      .then(response => {
        this.setState({ selectedDialect: response.data });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleDeleteStore = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this store's records!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // handle the deletion of a store entry in the DB
          axios.delete(`/api/stores/${id}`, { headers: { 'Accept': 'application/json' } })
            .then(response => {
              // fetch the new list of stores
              axios.get('/api/stores')
                .then(response => {
                  this.setState({ stores: response.data });
                  swal("Success! The store record has been deleted!", {
                    icon: "success",
                  });
                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
  }

  handleDeleteProduct = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this product's records! but you can always re-create it by adding a new product.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // handle the deletion of a product across all stores
          axios.delete(`http://localhost:3001/api/products/${id}`, { headers: { 'Accept': 'application/json' } })
            .then(response => {
              // fetch the new list of products
              axios.get('/api/products')
                .then(response => {
                  this.setState({ products: response.data });
                  swal("Success! The product record has been deleted!", {
                    icon: "success",
                  });
                })
                .catch(e => {
                  console.log(e);
                });
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
  }

  render() {
    return (
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route
            path="/stores"
            element={<Stores stores={this.state.stores} handleDeleteStore={this.handleDeleteStore} />}
          />
          <Route path="/stores/add" element={<AddNewStore />} />
          <Route path="/stores/products/:storeId" element={<ViewStoreDetails />} />
          <Route
            path="/products"
            element={<Products products={this.state.products} handleDeleteProduct={this.handleDeleteProduct} />}
          />
          <Route path="/products/add" element={<AddNewProduct />} />
          <Route path="/products/add/:storeName/:storeId" element={<AddProductToStore />} />
          <Route path="/inventory" element={<Inventory inventory={this.state.inventory} />} />
          <Route path="/inventory/add" element={<AddNewInventory />} />
          <Route path="/inventory/:inventoryId/:storeId" element={<UpdateInventoryProduct />} />
        </Routes>
        <Footer selectedDialect={this.state.selectedDialect} />
      </Router>
    );
  }
}

export default App;
