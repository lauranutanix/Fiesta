import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import './style.css';

const ViewStoreDetails = () => {
    const { storeId } = useParams();
    const [storeName, setStoreName] = useState('');
    const [storeProducts, setStoreProducts] = useState([]);
    const [storeIdState, setStoreId] = useState('');
    const [isStoreEmpty, setIsStoreEmpty] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsRes = await axios.get(`/api/stores/products/${storeId}`);
                if (Object.entries(productsRes.data).length > 0) {
                    setIsStoreEmpty(false);
                    setStoreProducts(productsRes.data);
                }

                const storeRes = await axios.get(`/api/stores/${storeId}`);
                if (Object.entries(storeRes.data).length > 0) {
                    setStoreId(storeId);
                    setStoreName(storeRes.data.store_name);
                }
            } catch (e) {
                console.log(e);
            }
        };

        getProducts();
    }, [storeId]);

    const handleDelete = (event, id) => {
        event.preventDefault();
        swal({
            title: "Are you sure?",
            text: "You are about to remove the selected product from this store.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                axios.delete(`/api/inventory/${id}`, { headers: { 'Accept': 'application/json' } })
                    .then(() => {
                        const updated = storeProducts.filter(prod => prod.id !== id);
                        setStoreProducts(updated);
                        if (updated.length <= 0) {
                            setIsStoreEmpty(true);
                        }
                    })
                    .catch(e => console.log(e));
            }
        });
    };

    return (
        <div className="wrapper">
            <h2 className="header">Store Details Page</h2>
            <h3>Store Name: {storeName}</h3>
            <div id="add_btn_store">
                <Link to={`/products/add/${storeName}/${storeIdState}`}>
                    <button className="btn btn-outline-primary action_btn_store">Add New Store Product</button>
                </Link>
            </div>
            {isStoreEmpty ? (
                <div>
                    *** This store does not have any products associated. Please <Link to={`/products/add/${storeName}/${storeIdState}`}>add</Link> some merchandise or <Link to={`/stores`}>return</Link> to the stores page. ***
                </div>
            ) : (
                <form>
                    <div className="store_container">
                        <div className="store_row_header">
                            <h3>Product Name</h3>
                            <h3>Local Price</h3>
                            <h3>Local Quantity</h3>
                            <h3>Comments</h3>
                            <h3>Actions</h3>
                        </div>
                        {storeProducts.map(product => (
                            <div className="store_row" key={product.id}>
                                <div className="store_col">{product.product_name}</div>
                                <div className="store_col">${Number.parseFloat(product.local_price).toFixed(2)}</div>
                                <div className="store_col">{product.quantity}</div>
                                <div className="store_col">{product.comment}</div>
                                <div id="action_btn_block">
                                    <div id="add_btn_store">
                                        <Link to={`/inventory/${product.id}/${product.store_id}`}>
                                            <button className="btn btn-outline-primary action_btn">Update</button>
                                        </Link>
                                    </div>
                                    <button
                                        onClick={(e) => handleDelete(e, product.id)}
                                        type="submit"
                                        className="btn btn-outline-danger action_btn"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </form>
            )}
        </div>
    );
};

export default ViewStoreDetails;