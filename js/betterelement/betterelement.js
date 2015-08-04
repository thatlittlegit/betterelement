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


function Element(){
  var attributes;
  var elements;
  var name;
  var toExecuteOnRead;
  var currentReadIndex;
  var currentReadElement;

  this.addAttribute = function(attributeName) {
      this.attributes[this.attributeCount()] = new Attribute(attributeName);
      this.attributeCount += 1;
  };

  this.attributeCount = function(){
    var count = 0;
    for(; this.attributes[count] != undefined; count += 1){}
    return count;
  };

  this.delAttribute = function(attributename) {
      this.attributes[count] = undefined;
  };

  this.readElements = function() {
      this.elements = document.getElementsByTagName(this.name);
      if (toExecuteOnRead === null) {
          console.error(this.name + " executed readElements() without a toExecuteOnRead!");
      } else {
          for (var i = 0; this.elements[i] !== undefined; i += 1) {
              this.currentReadIndex = i;
              this.currentReadElement = this.elements[i];
              this.toExecuteOnRead();
          }
      }
  };

  this.getElements = function() {
      return document.getElementsByTagName(this.name);
  };

  this.getAttributes = function() {
      return this.attributes;
  };

  var getIfAttributeExists = function(attributeIndex){
    if(attributes[attributeIndex] !== undefined &&
      attributes[attributeIndex].value !== undefined){
      return true;
    } else {
      return false;
    }
  };

  var findAttribute = function(attribute){
    for(var i; attributes[i] !== undefined; return i){}
  }
}
function Attribute(attributeName){
  var InputType = new InputType();
  var name = attributeName;
  var value;
  var required = false;
  var type = InputType.TEXT;
}
function InputType(){
  this.TEXT = 0;
  this.NUMBER = 1;
  this.ID = 2;

  this.testIfCorrect = function(toTest, against){
    switch(against){
      case 0:
        return true;
      break;
      case 1:
        if(toTest.parseInt() == NaN || toTest.parseDouble() == NaN){
          return false;
        } else {
          return true;
        }
      break;
      /*
       As it is impossible to test if a string is unique, you can NOT (for now) test
       InputType.ID. This may be implemented through an array.
      */
    }
  }
}
