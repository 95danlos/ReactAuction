import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      formatTime: this.formatTime.bind(this),
      checkTime: this.checkTime.bind(this)
    }
    this.sendRequest();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

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
            if (product.status["#text"] === "PUBLISHED" && this.state.checkTime(product)) {
            return (
              <tr key={index}>
                <td><img className="img-product" src={product.picture["#text"]}/></td>
                <td>{product.name["#text"]}</td>
                <td>{this.state.formatTime(product)}</td>
                <td>{product.currentBid.amount["#text"]}</td>
                <td>{product.currentBid.bidder.name["#text"]}</td>
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

  sendRequest() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          var parser = new DOMParser();
          var xml = parser.parseFromString(xmlhttp.responseText, "text/xml");
          var json = this.xmlToJson(xml);
          this.setState({ 
            products: json.products.product
          });
          
      }
    }.bind(this);
    
    setInterval(function(){ 
      xmlhttp.open("GET", "http://localhost:8080/AuctionPlace-war/webresources/entities.product", true);
      xmlhttp.send();
    }, 1000);
  }





  // Changes XML to JSON
  xmlToJson(xml) {
	
	var obj = {};

	if (xml.nodeType === 1) {
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType === 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) === "undefined") {
				obj[nodeName] = this.xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) === "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(this.xmlToJson(item));
			}
		}
	}
	return obj;
};


formatTime(product) {
  var millis = new Date(product.whenBiddingCloses["#text"]).getTime() - new Date().getTime();

  var seconds = parseInt((millis/1000)%60, 10);
  var minutes = parseInt((millis/(1000*60))%60, 10);
  var hours = parseInt((millis/(1000*60*60))%24, 10);
  var days = parseInt((millis/(1000*60*60*24))%365, 10);

days = (days < 10) ? "0" + days : days;
hours = (hours < 10) ? "0" + hours : hours;
minutes = (minutes < 10) ? "0" + minutes : minutes;
seconds = (seconds < 10) ? "0" + seconds : seconds;

return days + ":" + hours + ":" + minutes + ":" + seconds;
}

checkTime(product) {
  return (new Date(product.whenBiddingCloses["#text"]).getTime() - new Date().getTime()) > 0;
}

}

export default App;