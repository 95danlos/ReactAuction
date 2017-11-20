import React, { Component } from 'react';
import logo from './../images/logo.svg';
import './../styles/App.css';
import Utils from './../utils/utils.js';
import Login from './Login.js';
import Auction from './Auction.js';
import ProductsDetails from './ProductDetails.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentProductID: null,
      products: [],
      email: "",
      password: "",
      isLogged: false
    }
    Utils.getProducts(products => {
      this.setState({ 
        products: products,
        });
    });
  }

  render() {
    return (
      <div>
        <header className="App-header">
          <div className="login-window">
            <Login  setCredentials={this.setCredentials.bind(this)}/>
          </div>
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="window">
          <div className="auction-window">
            <Auction products={this.state.products} setCurrentProduct={this.setCurrentProduct.bind(this)}
              getCredentials={this.getCredentials.bind(this)} />
          </div>
          <div className="product-details-window">
            <ProductsDetails products={this.state.products} currentProductID={this.state.currentProductID} 
              getCredentials={this.getCredentials.bind(this)} />
          </div>
        </div>
      </div>
    );
  }

  setCurrentProduct(currentProductID) {
    this.setState({ 
      currentProductID: currentProductID,
      });
  }

  setCredentials(email, password, isLogged) {
    this.setState({ 
      email: email,
      password: password,
      isLogged: isLogged
    });
  }

  getCredentials(callback) {
    callback(this.state.email, this.state.password, this.state.isLogged);
  }

}

export default App;

  
