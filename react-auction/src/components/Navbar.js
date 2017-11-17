import React, { Component } from 'react';
import './../styles/App.css';
import Login from './Login.js';
import Loggedin from './Loggedin.js';
import './../styles/navbar.css';

class Navbar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let loginModule = null;
    if (this.props.isLoggedIn) {
      loginModule = <Loggedin username={this.props.username} onSubmit={this.props.onSubmit} />;
    } else {
      loginModule = <Login onSubmit={this.props.onSubmit} />;
    }
    
    return (
      <div className="navbar">
        <ul>
          <li className="left">Auction Place</li>
          <li className="right">{loginModule}</li>
        </ul>
      </div>
    );
  }

}

export default Navbar;