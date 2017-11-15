import React, { Component } from 'react';
import './../styles/login.css';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Updates both username and password fields when something is typed in
  handleInput(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onLogin(this.state.username, this.state.password);
  }

  validate() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  render() {
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} method="post">
          <input type="text" name="username" placeholder="Name" value={this.state.username} onChange={this.handleInput} />
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleInput} />
          <input type="submit" value="Log in" disabled={!this.validate()} />
        </form>
      </div>
    );
  }

}

export default Login;