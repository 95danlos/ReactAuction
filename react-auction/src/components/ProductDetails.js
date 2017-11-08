import React, { Component } from 'react';
import './../styles/App.css';
import Utils from './../utils/utils.js';

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: []
    }
    Utils.getProducts(Products => {
      this.setState({ 
        products: Products
        });
    });
  }

  render() {
    return (
      <div>
          <h1>Product Details</h1>
      </div>
    );
  }

}

export default ProductDetails;