import React, { Component } from 'react';
import logo from './../images/logo.svg';
import './../styles/App.css';
import Utils from './../utils/utils.js';
import Auction from './Auction.js';
import ProductsDetails from './ProductDetails.js';
import Navbar from './Navbar.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      username: null,
      password: null,
      isLoggedIn: false
    }
    Utils.getProducts(Products => {
      this.setState({ 
        products: Products,
        show: false
        });
    });

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(username, password, isLoggingIn) {
    if (isLoggingIn) {
      // TODO log in
      
      // if successful
      this.setState({
        username, 
        password, 
        isLoggedIn: true
      });
    } else {
      // TODO log out

      // if successful
      this.setState({
        username: null, 
        password: null, 
        isLoggedIn: false
      });
    }
  }

  render() {
    return (
      <div>
        <Navbar 
          username={this.state.username} 
          isLoggedIn={this.state.isLoggedIn} 
          onSubmit={this.onSubmit} 
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="window">
          <div className="auction-window">
            <Auction/>
          </div>
          <div className="product-details-window">
            <ProductsDetails/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;

  
