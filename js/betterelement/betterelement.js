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
  var attributeExist;
  var elementsToRead;
  var name;
  var toExecute;
  var currentIndex;

  this.create = function(){

  };

  var addAttribute = function(name) {
    // AttributeExist MUST come first, otherwise attributeCount() will
    // return incorrect value
    attributeExist[attributeCount()] = true;
    attributes[attributeCount()] = new Attribute(attributeName);
  };

  var attributeCount = function(){
    var count = 0;
    for(; attributes[count] !== undefined; count += 1){}
    return count;
  };

  var delAttribute = function(attribute) {
    attributes[findAttribute(attribute)] = undefined;
  };

  var readElements = function() {
      elements = document.getElementsByTagName(name);
      if (toExecuteOnRead === undefined) {
          console.error("BetterElement: Failed to read elements for element " + name + ", no changes will be applied!");
      } else {
          for (var i = 0; elements[i] !== undefined; i += 1) {
              currentIndex = i;
              toExecuteOnRead();
          }
      }
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
    for(var i; attributes[i] !== undefined; i += 1){}
    return i;
  };
}
function Attribute(attributeName){
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
      case 1:
        if(toTest.parseInt().isNaN() === true || toTest.parseDouble().isNaN === true){
          return false;
        } else {
          return true;
        }
      case 2:
        // Use testIfCorrect(toTest, against, index) instead
        console.warn("BetterElement: Got 2 (InputType.ID) as input, however no index specified!");
    }
  };

  this.testIfCorrect = function(toTest, against, index){
    switch(against){
      case 0:
        return true;
      case 1:
        if(toTest.parseInt().isNaN() === true || toTest.parseDouble().isNaN() === true){
          return false;
        } else {
          return true;
        }
      case 2:
        var i;
        for(; toTest[i] !== toTest[index] || i === index; i += 1){}
        if(i == array.length){
          return true;
        } else {
          return false;
        }
    }
  };
}
