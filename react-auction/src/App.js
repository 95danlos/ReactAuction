import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: [],
      formatTime: this.formatTime.bind(this)
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
            return (
              <tr key={index}>
                <td><img className="img-product" src={product.picture["#text"]}/></td>
                <td>{product.name["#text"]}</td>
                <td>{this.state.formatTime(product)}</td>
                <td>{product.currentBid.amount["#text"]}</td>
                <td>{product.currentBid.bidder.name["#text"]}</td>
              </tr>
            );
          }.bind(this))
        }
        </tbody>
        </table>
        </div>

          {/* <c:forEach items="${productController.products}" var="product" varStatus="loop">
                <c:if test="${productController.isPublished(product) 
                              and productController.filter(product)}">
            <tr>
                <td><img class="img-product" src="${product.picture}"/></td>
                <h:form><td>
                        <h:commandLink action="product_details">${product.name}
                            <f:actionListener binding="#{productController.setProduct(product)}" />
                        </h:commandLink></td></h:form>
                <td>${productController.formatTimeLeft(product)}</td>
                <td>${product.currentBid.amount}</td>
               <c:if test = "${product.currentBid.bidder.email == customerController.customer.email}">
                    <td style="color: green">${product.currentBid.bidder.name}</td>
                </c:if>
                <c:if test = "${product.currentBid.bidder.email != customerController.customer.email}">
                    <td>${product.currentBid.bidder.name}</td>
                </c:if>
                
                <h:form><td>
                        <h:commandButton id="submit" 
                                         value="Place a bid"
                                         action="#{customerController.navigateIfLogged('place_bid')}">
                            <f:actionListener binding="#{productController.setProduct(product)}" />
                        </h:commandButton>
                    </td></h:form>
            </tr>
            </c:if>
                
                
                
                
                <c:if test="${productController.isSold(product) and 
                              product.currentBid.bidder.email
                              == customerController.customer.email
                              and productController.filter(product)}">
            <tr>
                <td><img class="img-product" src="${product.picture}"/></td>
                <h:form><td>
                        <h:commandLink action="product_details">${product.name}
                            <f:actionListener binding="#{productController.setProduct(product)}" />
                        </h:commandLink></td></h:form>
                <td>${productController.formatTimeLeft(product)}</td>
                <td>${product.currentBid.amount}</td>
                <td style="color: green">You won</td>
                
                <h:form><td>
                        <h:commandButton id="submit" 
                                         value="Give feedback"
                                         action="#{customerController.navigateIfLogged('product_details')}">
                            <f:actionListener binding="#{productController.setProduct(product)}" />
                        </h:commandButton>
                    </td></h:form>
            </tr>
            </c:if>
        </c:forEach>
         */}
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

}

export default App;