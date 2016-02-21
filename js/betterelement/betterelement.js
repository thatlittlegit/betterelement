/*
 * BetterElement 2.1-PR7/3
 * Status: Testing & Correcting Syntax
 */

var empty = function() {};

// Logs a message to the console while remaining compatable with other browsers.
var log = console.log || window.console.log || empty;

// Warns the console.
var wrn = console.warn || window.console.log || empty; // OK, I purposely moved this. :|

// Causes an error or, at last resort, creates an alert.
var err = console.error || window.console.error || function(text) {
  alert(text);
};

// Used for getTime and getDate.
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
    wrn("BetterElement: Index " + clock.currentIndex + " missing " + att.name + " attribute!");
  };
  clock.toExecuteOnRead = function() {
    console.log(clock.findAttribute);
    console.log(clock.findAttribute(type));
    console.log(clock.attributes);
    console.log(clock.attributes[clock.findAttribute(type)]);
    if (clock.attributes[clock.findAttribute(type)].value == "time") {
      clock.elementsToRead[clock.currentIndex].innerHTML = getTime();
    } else if (clock.attributes[clock.findAttribute(type)].value == "date") {
      clock.elementsToRead[clock.currentIndex].innerHTML = getDate();
    } else {
      clock.elementsToRead[clock.currentIndex].innerHTML = "???";
      err("Invalid attribute \"type\" on index " + clock.currentIndex + "!");
    }
  };
  clock.readElements();
};

var doRandom = function() {
  var random = new Element("random");
  var minatt = random.addAttribute("min");
  var maxatt = random.addAttribute("max");
  random.readFailed = function(att) {
    wrn("BetterElement: Index " + random.currentIndex + " missing " + att.name + " attribute!");
  };
  random.toExecuteOnRead = function() {
    var min = Number.parseInt(random.attributeValues[random.currentIndex]);
    var max = Number.parseInt(random.attributes[random.currentIndex].value);
    random.currentReadElement.innerHTML = getRandom(min, max);
  };
  random.readElements();
};

function Element(nname) {
  this.attributes = [];
  this.attributeExist = [];
  this.elementsToRead = undefined;
  this.name = nname;
  this.toExecute = undefined;
  this.currentIndex = -1;
  this.elementsRead = false;
  this.readFailed = undefined;
  this.attributeValues = [];
}

Element.prototype.addAttribute = function(name) {
  // AttributeExist MUST come first, otherwise attributeCount() will
  // return incorrect value
  this.attributeExist[this.attributeCount()] = true;
  this.attributes[this.attributeCount()] = new Attribute(name);
  this.attributes[this.attributeCount() - 1].ref = this.attributeCount() - 1;
  return this.attributes[this.attributeCount() - 1];
};

Element.prototype.attributeCount = function() {
  var count = 0;
  for (; this.attributes[count] !== undefined; count += 1) {
    empty();
  }
  return count;
};

Element.prototype.delAttribute = function(attribute) {
  this.attributes[this.findAttribute(attribute)] = undefined;
};

Element.prototype.readElements = function() {
  // State that the elements were read
  this.elementsRead = true;
  // Fill elementsToRead with the amount of elements with a tag name of (name)
  this.elementsToRead = document.getElementsByTagName(this.name);
  // For every element, get the value of the attributes and store it under the arrays required.
  for (var count = 0; this.elementsToRead[count] !== undefined; count += 1) {
    for (var ccount = 0; this.attributes[ccount] !== undefined; ccount += 1) {
      this.attributes[ccount].value = this.elementsToRead[ccount].getAttribute(this.attributes[ccount].name);
      this.attributeValues[ccount] = this.elementsToRead[ccount].getAttribute(this.attributes[ccount].name);
    }
  }
  if (this.toExecuteOnRead === undefined) {
    err("BetterElement: Failed to read elements for element " + name + ", no changes will be applied!");
  } else {
    var stopThisRead = false;
    var missingAttribute;
    for (var i = 0; this.elementsToRead[i] !== undefined; i += 1) {
      console.log("Hello Again, I'm on index " + i);
      this.currentIndex = i;
      // Scan if there is a missing required attribute
      for (var x = 0; x == this.attributes.length; i += 1) {
        if (this.attributes[x].required === true && this.attributes[x].value === undefined) {
          this.attributes[x].missing = true;
          stopThisRead = true;
          missingAttribute = this.attributes[x];
        } else {
          stopThisRead = false;
        }
      }
      if (stopThisRead === false) {
        this.toExecuteOnRead();
      } else {
        if (this.readFailed !== undefined) {
          this.readFailed(missingAttribute);
          missingAttribute = undefined;
          stopThisRead = false;
        } else {
          empty();
        }
      }
    }
  }
};

Element.prototype.findAttribute = function(attribute) {
  var p = 0; // Needed a random name.
  for (; this.attributes[p] !== undefined; p += 1) {
    empty();
  }
  return p - 1;
};

function Attribute(attributeName) {
  const name = attributeName;
  this.value = undefined;
  this.required = false;
  this.type = InputType.TEXT;
  this.ref = undefined;
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
      for (; toTest[i] !== string || toTest[i] === undefined; i += 1) {
        empty();
      }
      if (i == toTest.length) {
        return true;
      } else {
        return false;
      }
    };
  },
};
