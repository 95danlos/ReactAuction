import React, { Component } from 'react';
import './../styles/App.css';
import Utils from './../utils/utils.js';

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: "",
      maxAmount: "",
      error: "",
      automaticBidding: false
    }
  }

  render() {
      return (
        <div>
            {
          this.props.products.map(function(product, index){
            if (product.id["#text"] === this.props.currentProductID && product.currentBid.bidder) {
            return (
              <div key={"currentProduct"}>
                <div className="product-info-name">{product.name["#text"]}</div>
                <div><img className="img-product-big" src={product.picture["#text"]} alt="img"/></div>
                <div className="product-info-text">{product.features["#text"]}</div>
                <div className="product-info-label">Current bid</div>
                <div className="product-info-text">$ {product.currentBid.amount["#text"]}</div>
                <div className="product-info-label">Bidder</div>
                <div className="product-info-text">{product.currentBid.bidder.name["#text"]}</div>
                <div className="product-info-label">Time left</div>
                <div className="product-info-text">{Utils.formatTime(product)}</div>
                  
                <input type="text" name="amount" value={this.state.amount} 
                    placeholder="$ 0.0" className="input" onChange={this.updateAmount.bind(this)} /><br/>
                <div className="bid-error">
                <button className="button-toggle" onClick={this.toggleAutomaticBidding.bind(this)}>
                  Enable / Disable Automatic Bidding
                </button>
                {this.automaticBidding()}
                  {this.state.error}
                </div>
                <button className="button-green" onClick={this.sendBid.bind(this)}>
                  Send Bid
                </button>
                <br/><br/>
              </div>
            );
          }
          else if (!this.props.currentProductID && index === 0) {
            return (
              <div key={"noProductSelected"}>
                <h3>Select a Product to see Details</h3>
                <br/><br/>
              </div>
            );
          }
          }.bind(this))
        }
        </div>
      );
  }

  updateAmount(event) {
    this.setState({
      amount: event.target.value
    });
  }

  updateMaxAmount(event) {
    this.setState({
      maxAmount: event.target.value
    });
  }

  sendBid(event) {
    this.props.getCredentials((email, password, isLogged) => {
      if(isLogged) {
        Utils.sendBid(this.props.currentProductID, this.state.amount, email, password, isValid => {
          if(isValid === "false") {
            this.setState({
              error: "Amount must be greater then current bid"
            });
          }
        });
        this.setState({
          error: ""
        });
      }
      else {
        this.setState({
          error: "Please Login to Send Bid"
        });
      }
    });
  }

  toggleAutomaticBidding() {
    this.setState({
      automaticBidding: !this.state.automaticBidding
    });
  }

  automaticBidding() {
    if(this.state.automaticBidding) {
      return (
        <div>
        <input type="text" name="maxAmount" value={this.state.maxAmount} 
          placeholder="$ 0.0" className="input" onChange={this.updateMaxAmount.bind(this)} /><br/>
        </div>
      );
    }
  }

}

export default ProductDetails;