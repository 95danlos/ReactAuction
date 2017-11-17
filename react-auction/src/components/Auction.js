import React, { Component } from 'react';
import './../styles/App.css';
import Utils from './../utils/utils.js';

class Auction extends Component {

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
        <div className="table-products">
        <table cellSpacing="0">
          <tbody>
          <tr>
             <th>Picture</th>
             <th>Name</th>
             <th>Time left (dd:hh:mm:ss)</th>
             <th>Highest bid</th>
             <th>Highest bidder</th>
          </tr>
        {
          this.state.products.map(function(product, index){
            if (product.status["#text"] === "PUBLISHED" && Utils.checkTime(product)) {
            return (
              <tr key={index}>
                <td><img className="img-product" src={product.picture["#text"]}/></td>
                <td>{product.name["#text"]}</td>
                <td>{Utils.formatTime(product)}</td>
                <td>{product.currentBid.amount["#text"]}</td>
                <td>{product.currentBid.bidder.name["#text"]}</td>
              </tr>
            );
          }
          })
        }
        </tbody>
        </table>
        </div>
      </div>
    );
  }

}

export default Auction;