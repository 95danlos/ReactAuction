import React, { Component } from 'react';
import Login from './Login.js';
import Loggedin from './Loggedin.js';
import './../styles/navbar.css';

class Navbar extends Component {

  render() {
    let loginModule = null;
    if (this.props.isLoggedIn) {
      loginModule = <Loggedin username={this.props.username} onLogout={this.props.onLogout} />;
    } else {
      loginModule = <Login onLogin={this.props.onLogin} />;
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