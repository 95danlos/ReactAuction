import React, { Component } from 'react';
import './../styles/App.css';
import Utils from './../utils/utils.js';

class Auction extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    }
  }

  render() {
    return (
      <div>
        <div className="table-products">
        <div className="search-field">
        <input type="text" name="search" value={this.state.searchString} 
                    placeholder="Search" className="input" onChange={this.updateSearchString.bind(this)} /><br/>
        </div>
        <table cellSpacing="0">
          <tbody>
          <tr>
             <th>Picture</th>
             <th>Name</th>
             <th>Time left</th>
             <th>Highest bid</th>
             <th>Highest bidder</th>
          </tr>
        {
          this.props.products.map(function(product, index){
            if (product.status["#text"] === "PUBLISHED" && Utils.checkTime(product) 
              && product.currentBid.bidder && product.name["#text"].toUpperCase().includes(this.state.searchString.toUpperCase())) {
                
                var rowCss = ""
                var bidder 
                this.props.getCredentials((email, password, isLogged) => {
                  if(product.currentBid.bidder.email["#text"] === email) {
                    rowCss = "green-row";
                    bidder = (
                      <td>You</td>
                    );
                  }
                  else {
                    bidder = <td>{product.currentBid.bidder.name["#text"]}</td>
                  }  
                });                                         
                return (
                  <tr key={index} className={rowCss} onClick={() => {this.props.setCurrentProduct(product.id["#text"])}}>
                    <td><img className="img-product" src={product.picture["#text"]} alt="img"/></td>
                    <td>{product.name["#text"]}</td>
                    <td>{Utils.formatTime(product)}</td>
                    <td>{product.currentBid.amount["#text"]}</td>
                    {bidder}
                  </tr>
                );
          }
          }.bind(this))
        }
        </tbody>
        </table>
        </div>
      </div>
    );
  }

  updateSearchString(event) {
    this.setState({
      searchString: event.target.value
    });
  }

}

export default Auction;