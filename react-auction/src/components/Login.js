import React, { Component } from 'react';
import './../styles/App.css';
import Utils from './../utils/utils.js';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
        email: "kari@gmail.com",
        password: "12345678",
        error: "",
        isLogged: false
      }
  }

  render() {
    if(!this.state.isLogged) {
    return (
      <div>
        <input type="text" name="email" value={this.state.email} 
            placeholder="Email" className="login-input" onChange={this.updateEmail.bind(this)} />

        <input type="password" name="password" value={this.state.password} 
            placeholder="Password" className="login-input" onChange={this.updatePassword.bind(this)} />

        <button className="button-login" onClick={this.login.bind(this)}>
            Login
        </button>
        <div className="login-error">
          {this.state.error}
        </div>
        <a className="register-link" href="http://localhost:8080/AuctionPlace-war/register.xhtml" >Register</a>
      </div>
    );
    }
    else {
      return (
        <div> 
          <div className="email">
            {this.state.email}
          </div>
          <button className="button-login" onClick={this.logout.bind(this)}>
              Logout
          </button>
        </div>
      );
    }
  }

  updateEmail(event) {
    this.setState({
      email: event.target.value
    });
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  login(event) {
    if(this.state.email !== "" && this.state.password !== "") {
      Utils.login(this.state.email, this.state.password, (isValid) => {
        if(isValid === "true") {
          this.props.setCredentials(this.state.email, this.state.password, true);
          this.setState({
            isLogged: true
          });
        }
        else {
          this.setState({
            error: "Wrong Email or Password"
          });
        }
      });
    }
    else {
      this.setState({
        error: "Please Enter Email and Password"
      });
    }
  }

  logout(event) {
    this.props.setCredentials("", "", false);
    this.setState({
      email: "",
      password: "",
      isLogged: false
    });
  }

}

export default Login;