import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import './style.css';

const UpdateInventoryProduct = () => {
    const { inventoryId } = useParams();
    const { storeId } = useParams();
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productComment, setProductComment] = useState('');

    useEffect(() => {
        const handleInputChange = async() => {
            const response = await axios.get(`/api/inventory/${inventoryId}`);
            setProductName(response.data.product_name);
            setProductPrice(response.data.local_price);
            setProductQty(response.data.quantity);
            setProductComment(response.data.comment);
        }; 
        handleInputChange();
    }, [inventoryId]);

        const isValidFloat = (num) => {
            let regex = /^\d*\.?\d*$/;
            if (regex.test(num)) {
                return true;
            }
            return false;
        };


    const handleSubmit = async event => {
        event.preventDefault();

        let inventory_id = this.state.inventory_id;
        let product_name = this.state.product_name;
        let product_price = this.state.product_price;
        let product_qty = this.state.product_qty;
        let product_comment = this.state.product_comment;

        if (product_name === '') {
            swal("Oops!", "Product Name is a required field.", "error");
        } else if (product_price === '') {
            swal("Oops!", "Product Price is a required field.", "error");
        } else if (isValidFloat(product_price) === false) {
            swal("Oops!", "Enter a Valid Product Price. Example: 0.00", "error");
        } else if (product_qty === '') {
            swal("Oops!", "Product Qty is a required field.", "error");
        }

        if (product_name !== '' && product_price !== '' && this.isValidFloat(product_price) === true && product_qty !== '') {
            try {
                // update the product price, qty, and comment fields if needed
                const product_insert_response = await axios.put(`/api/inventory/${inventory_id}`, { local_price: product_price, product_quantity:product_qty, product_comment: product_comment }, { headers: { 'Accept': 'application/json' } });
                if (product_insert_response.status === 200) {
                    swal("Success!", "The product has been updated!", "info")
                    .then((value) => {
                        window.location.href = `/stores/products/${storeId}`
                    })
                }
            } catch (e) {
                console.log(e);
                swal("Oops!", "Something went wrong adding this product.", "error"); // adding product to inventory depends on a successful product creation first
            }
        }


        return (
            <div className="wrapper">
                <form className="container-fluid" encType="multipart/form-data">
                    <h2 className="header">Update Product</h2>
                    <h3>Product Name: {productName}</h3>
                    <div className="add_row">
                        <label>Product Price  (*):</label>
                        <input
                            type="text"
                            id="product_price"
                            className="form-control"
                            name={"product_price"}
                            onChange={(e) => handleInputChange(e)}
                            value={productPrice || '0.00'}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Qty (*):</label>
                        <input
                            type="text"
                            id="product_qty"
                            className="form-control"
                            name={"product_qty"}
                            onChange={(e) => handleInputChange(e)}
                            value={productQty || ''}
                            required
                        />
                    </div>
                    <div className="add_row">
                        <label>Product Comments (optional):</label>
                        <input
                            type="text"
                            id="product_comment"
                            className="form-control"
                            name="product_comment"
                            onChange={(e) => handleInputChange(e)}
                            value={productComment || ''}
                        />
                    </div>
                    <div className="add_store_action_btn_block">
                        <button onClick={handleSubmit} className="btn btn-outline-primary action_btn">Submit</button>
                        <Link to={`/stores/products/${this.state.store_id}`}><button className="btn btn-outline-danger action_btn">Cancel</button></Link>
                    </div>
                </form>
            </div>
        )
    }
}
export default UpdateInventoryProduct;



