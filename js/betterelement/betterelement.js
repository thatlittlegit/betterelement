/*
 * BetterElement 2.1-PR7/1
 * Status: Testing & Correcting Syntax
 */
// Log a message to the console
var log = console.log || window.console.log || undefined;
var date = new Date();

function betterElement() {
  doClock();
  doRandom();
}

var getTime = function() {
  return date.toLocaleTimeString();
};

var getDate = function() {
  return date.toLocaleDateString();
};

var getRandom = function(min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var doClock = function() {
  var clock = new Element("clock");
  var type = clock.addAttribute("type");
  clock.readFailed = function(att) {
    window.console.warn("BetterElement: Index " + clock.currentIndex + " missing " + att.name + " attribute!");
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
};

var doRandom = function() {
  var random = new Element("random");
  var minatt = random.addAttribute("min");
  var maxatt = random.addAttribute("max");
  random.readFailed = function(att) {
    console.warn("BetterElement: Index " + random.currentIndex + " missing " + att.name + " attribute!");
  };
  random.toExecuteOnRead = function() {
    var min = Number.parseInt(random.attributes[random.currentIndex].value);
    var max = Number.parseInt(random.attributes[random.currentIndex].value);
    random.currentReadElement.innerHTML = getRandom(min, max);
  };
  random.readElements();
};

function Element(nname) {
  var attributes;
  var attributeExist;
  var elementsToRead;
  const name = nname;
  var toExecute;
  var currentIndex;
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
    if (this.toExecuteOnRead === undefined) {
      console.error("BetterElement: Failed to read elements for element " + name + ", no changes will be applied!");
    } else {
      var stopThisRead = false;
      var missingAttribute;
      for (var i = 0; elementsToRead[i] !== undefined; i += 1) {
        currentIndex = i;
        for (var x = 0; x == attributes.length; i += 1) {
          if (attributes[x].required === true && attributes[x].value === undefined) {
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

  var findAttribute = function(attribute) {
    var i;
    for (; attributes[i] !== undefined; i += 1) {}
    return i;
  };
}

function Attribute(attributeName) {
  var name = attributeName;
  var value;
  var required = false;
  var type = InputType.TEXT;
}

var InputType = {
  TEXT: 0,
  NUMBER: 1,
  ID: 2,

  testIfCorrect: function(toTest, against) {
    if (against === 0) {
      return true;
    } else if (against == 1) {
      if (toTest.parseInt().isNaN() === true || toTest.parseDouble().isNaN() === true) {
        return false;
      } else {
        return true;
      }
    } else if (against == 2) {
      // Use testIfCorrectWithArray(toTest, against, index) instead
      console.warn("BetterElement: Got 2 (InputType.ID) as input, however no index specified!");
      return null;
    }

    this.testIfCorrectWithArray = function(toTest, string) {
      var i;
      for (; toTest[i] !== string || toTest[i] === undefined; i += 1) {}
      if (i == toTest.length) {
        return true;
      } else {
        return false;
      }
    };
  }
};
