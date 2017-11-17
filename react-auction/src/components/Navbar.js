import React, { Component } from 'react';
import './../styles/App.css';
import Login from './Login.js';
import Loggedin from './Loggedin.js';
import './../styles/navbar.css';

class Navbar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isLoggedIn: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(username, isLoggedIn) {
    this.setState({username, isLoggedIn});
  }

  render() {
    let loginModule = null;
    if (this.state.isLoggedIn) {
      loginModule = <Loggedin username={this.state.username} handleChange={this.handleChange} />;
    } else {
      loginModule = <Login handleChange={this.handleChange} />;
    }
    
    return (
      <div class="navbar">
        <ul>
          <li class="left">Auction Place</li>
          <li class="right">{loginModule}</li>
        </ul>
      </div>
    );
  }

}

export default Navbar;