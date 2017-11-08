    
    
    
var Utils = {
    
        // Requests Products each sec
        getProducts: function(callback) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                  var parser = new DOMParser();
                  var xml = parser.parseFromString(xmlhttp.responseText, "text/xml");
                  var json = Utils.xmlToJson(xml);
                  callback(json.products.product);    
              }
            };
            setInterval(function(){ 
              xmlhttp.open("GET", "http://localhost:8080/AuctionPlace-war/webresources/entities.product", true);
              xmlhttp.send();
            }, 1000);
          },
        
        // Changes XML to JSON
        xmlToJson: function(xml) {
            
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
          },
          
          
        // Format time left on a product to a string on form (dd:hh:mm:ss)
        formatTime: function(product) {
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
          },
          
    
        // check if time is up on a product
        checkTime: function(product) {
            return (new Date(product.whenBiddingCloses["#text"]).getTime() - new Date().getTime()) > 0;
          }
    
    }
    
    export default Utils;