/////////////////////////////////
// BetterElement 2.0/1         /
////////////////////////////////
var date = new Date();

function betterElement() {
    doClock();
    doRandom();
}

function getTime() {
    return date.toLocaleTimeString();
}

function getDate() {
    return date.toLocaleDateString();
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function doClock() {
    var clockElement = createElement("clock");
    clockElement.toExecuteOnRead = function () {
        if (clockElement.currentReadElement.getAttribute("type") == "time") {
            clockElement.currentReadElement.innerHTML = getTime();
        } else if (clockElement.currentReadElement.getAttribute("type") == "date") {
            clockElement.currentReadElement.innerHTML = getDate();
        } else {
            clockElement.currentReadElement.innerHTML = "Failed to get time/date - invalid attribute";
            console.error("Invalid attribute \"type\" on index " + clockElement.currentReadIndex + "!");
        }
    };
    clockElement.readElements();
}

function doRandom() {
    var randomElement = createElement("random");
    randomElement.toExecuteOnRead = function(){
      if (randomElement.currentReadElement.getAttribute("min") !== undefined && randomElement.currentReadElement.getAttribute("max") !== undefined){
          var min = Number.parseInt(randomElement.currentReadElement.getAttribute("min"));
          var max = Number.parseInt(randomElement.currentReadElement.getAttribute("max"));
          randomElement.currentReadElement.innerHTML = getRandom(min, max);
      } else {
          console.error("Error on index " + randomElement.currentReadIndex + " of <random>;" +
           "missing min or max parameter(s)!");
      }
    };
    //randomElement.addAttribute("min");
    //randomElement.addAttribute("max");
    randomElement.readElements();
}

function createElement(name) {
    var blankElement = new Element();
    blankElement.name = name;
    return blankElement;
}

function Attribute(name, value) {
  var name = name;
  var value = value || null;
  
  return this;
}

function Element(){
  var attributes;
  var attributeCount = 0;
  var elements;
  var name;
  var toExecuteOnRead;
  var currentReadIndex;
  var currentReadElement;

  this.addAttribute = function(attributename) {
      this.attributes[attributeCount] = new Attribute(attributename);
      this.attributeCount += 1;
  };

  this.delAttribute = function(attributename) {
      var i = 0;
      for (; this.attributes[i] != attributename; i += 1) {}
      array.splice(i, 1);
  };

  this.readElements = function() {
      this.elements = [].slice.call(document.getElementsByTagName(this.name));
      if (toExecuteOnRead === null) {
          console.error(this.name + " executed readElements() without a toExecuteOnRead!");
      } else {
          var _this = this;
          this.elements.forEach(function(element, index) {
            _this.currentReadIndex = index;
            _this.currentReadElement = element;
            _this.toExecuteOnRead();
          });
      }
  };

  this.getElements = function() {
      return document.getElementsByTagName(this.name);
  };

  this.getAttributes = function() {
      return this.attributes;
  };
}
