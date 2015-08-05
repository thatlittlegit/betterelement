/////////////////////////////////
// BetterElement 2.0/1         /
////////////////////////////////
var date = new Date();

function betterElement() {
  DefaultBetterElements.doClock();
  DefaultBetterElements.doRandom();
}
var DefaultBetterElements = {

  getTime: function() {
    return date.toLocaleTimeString();
  },

  getDate: function() {
    return date.toLocaleDateString();
  },

  getRandom: function(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  },

  doClock: function() {
    var clock = Element.create("clock");
    var type = clock.addAttribute("type");
    clock.readFailed = function(att) {
      console.warn("BetterElement: Index " + clock.currentIndex + " missing " + att.name + " attribute!")
    };
    clock.toExecuteOnRead = function() {
      if (clock.attributes[clock.findAttribute(type)] == "time") {
        clock.elementsToRead[clock.currentIndex].innerHTML = getTime();
      } else if (clock.attributes[clock.findAttribute(type)] == "date") {
        clock.elementsToRead[clock.currentIndex].innerHTML = getDate();
      } else {
        clock.elementsToRead[clock.currentIndex].innerHTML = "???";
        console.error("Invalid attribute \"type\" on index " + clock.currentIndex + "!");
      }
    };
    clock.readElements();
  },

  doRandom: function() {
    var random = createElement("random");
    var minatt = random.addAttribute("min");
    var maxatt = random.addAttribute("max");
    random.readFailed = function(att) {
      console.warn("BetterElement: Index " + random.currentIndex + " missing " + att.name + " attribute!")
    }
    random.toExecuteOnRead = function() {
      if (random.attributes[random.currentIndex] !== undefined && random.attributes[random.currentIndex] !== undefined) {
        var min = Number.parseInt(random.attributes[random.currentIndex].value);
        var max = Number.parseInt(random.attributes[random.currentIndex].value);
        random.currentReadElement.innerHTML = getRandom(min, max);
      } else {
        console.error("Error on index " + random.currentReadIndex + " of <random>;" +
          "missing min or max parameter(s)!");
      }
    };
    random.readElements();
  }
}

var Element = {
  // Use Element.create(name)
  create: function(name){
    var i = new Element();
    i.name = name;
    return i;
  }
}
function Element() {
  var attributes;
  var attributeExist;
  var elementsToRead;
  var name;
  var toExecute;
  var currentIndex;
  var attributeMissing;
  var elementsRead = false;
  var readFailed;

  var addAttribute = function(name) {
    // AttributeExist MUST come first, otherwise attributeCount() will
    // return incorrect value
    attributeExist[attributeCount()] = true;
    attributes[attributeCount()] = new Attribute(name);
    return attributes[attributeCount() - 1];
  };

  var attributeCount = function() {
    var count = 0;
    for (; attributes[count] !== undefined; count += 1) {}
    return count;
  };

  var delAttribute = function(attribute) {
    attributes[findAttribute(attribute)] = undefined;
  };

  var readElements = function() {
    elementsRead = true; // For later compat, couldn't find an event
    elementsToRead = document.getElementsByTagName(name);
    for (var count = 0; elementsToRead[count] !== undefined; count += 1) {
      attributes[count].value = elementsToRead[count].getAttribute(attributes[count].name);
    }
    if (toExecuteOnRead === undefined) {
      console.error("BetterElement: Failed to read elements for element " + name + ", no changes will be applied!");
    } else {
      var stopThisRead = false;
      var missingAttribute;
      for (var i = 0; elements[i] !== undefined; i += 1) {
        currentIndex = i;
        for (var x = 0; x == attributes.length; i += 1) {
          if (attributes[x].required == true && attributes[x].value === undefined) {
            attributes[x].missing = true;
            stopThisRead = true;
            missingAttribute = attributes[x];
          } else {
            stopThisRead = false;
          }
        }
        if (stopThisRead !== true) {
          toExecute();
        } else {
          if (readFailed === undefined) {} else {
            readFailed(missingAttribute);
            missingAttribute = undefined;
            stopThisRead = false;
          }
        }
      }
    }
  };

  var getIfAttributeExists = function(attributeIndex) {
    if (attributes[attributeIndex] !== undefined &&
      attributes[attributeIndex].value !== undefined) {
      return true;
    } else {
      return false;
    }
  };

  var findAttribute = function(attribute) {
    for (var i; attributes[i] !== undefined; i += 1) {}
    return i;
  };
}

function Attribute(attributeName) {
  var name = attributeName;
  var value;
  var required = false;
  var type = InputType.TEXT;
}

function InputType() {
  this.TEXT = 0;
  this.NUMBER = 1;
  this.ID = 2;

  this.testIfCorrect = function(toTest, against) {
    switch (against) {
      case 0:
        return true;
      case 1:
        if (toTest.parseInt().isNaN() === true || toTest.parseDouble().isNaN === true) {
          return false;
        } else {
          return true;
        }
      case 2:
        // Use testIfCorrect(toTest, against, index) instead
        console.warn("BetterElement: Got 2 (InputType.ID) as input, however no index specified!");
    }
  };

  this.testIfCorrect = function(toTest, against, index) {
    switch (against) {
      case 0:
        return true;
      case 1:
        if (toTest.parseInt().isNaN() === true || toTest.parseDouble().isNaN() === true) {
          return false;
        } else {
          return true;
        }
      case 2:
        var i;
        for (; toTest[i] !== toTest[index] || i === index; i += 1) {}
        if (i == array.length) {
          return true;
        } else {
          return false;
        }
    }
  };
}
}
