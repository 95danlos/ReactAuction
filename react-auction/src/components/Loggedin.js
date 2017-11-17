import React, { Component } from 'react';
import './../styles/App.css';

class Loggedin extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    // TODO logout functionality
    this.props.handleChange(this.props.username, false);
  }

  render() {
    return (
      <div className="account">
        {this.props.username}
        <button onClick={this.handleSubmit}>Log out</button>
      </div>
    );
  }

}

export default Loggedin;