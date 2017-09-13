/*
 * BetterElement: Create custom HTML elements through client-side JS.
 */

/**
  * Adds a <clock> element. If the type attribute is 'time', then show
	* Date.toLocaleTimeString, and vice versa for 'date'.
	*
	* @global
	*/
function doClock() {
	var clockElement = new Element('clock');
	clockElement.toExecuteOnRead = function (index, element) {
		if (element.getAttribute('type') === 'time') {
			element.innerHTML = new Date().toLocaleTimeString();
		} else if (element.getAttribute('type') === 'date') {
			element.innerHTML = new Date().toLocaleDateString();
		}
	};
	clockElement.addAttribute('type', true, function (attribute) {
		if (attribute === 'date' || attribute === 'time') {
			return true;
		// eslint-disable-next-line no-else-return
		} else {
			return false;
		}
	});
	clockElement.readElements();
}

/**
  * Adds a <random> tag. When min and max is valid, will generate a number
	* between them.
	*
	* @global
	*/
function doRandom() {
	var randomElement = new Element('random');
	randomElement.toExecuteOnRead = function (index, element) {
		var min = Number(element.getAttribute('min'));
		var max = Number(element.getAttribute('max'));
		element.innerHTML = Math.floor((Math.random() * (max - min)) + min);
	};
	randomElement.addAttribute('min', true, Attribute.verifyPresets.number);
	randomElement.addAttribute('max', true, Attribute.verifyPresets.number);
	randomElement.readElements();
}

/**
	* An object that semi-represents an HTML attribute.
	*
	* @constructor
	* @global
	* @param {String} nameParam The name of the attribute.
	* @param {Boolean} requiredParam Weather or not the attribute is required, or if an error should be thrown if it is missing.
	* @param {Function} verifyParam A callback to be called to verify if an attribute's value is valid.
	* @param {String} valueParam The value of the attribute. Is undefined unless set.
	* @returns {Attribute} The new attribute.

	* @property {String} name The name of the attribute.
	* @property {Boolean} required Weather or not the attribute is required, or if an error should be thrown if it is missing.
	* @property {Function} verify  A callback to be called to verify if an attribute's value is valid.
	* @property {String} value The value of the attribute. Is undefined unless set.
  */
function Attribute(nameParam, requiredParam, verifyParam, valueParam) {
	this.name = nameParam;
	this.required = requiredParam || true;
	this.value = valueParam || undefined;
	this.verify = verifyParam || function () {
		return true;
	};

	return this;
}

/**
  * An object of preset verification methods.
	* @type {Object}
	* @property {Function} numbers The verification for if it is a number.
	* @property {Function} regex The verification for if it is a valid regex.
	* @memberof Attribute
	*/
Attribute.verifyPresets = {
	number: function (number) {
		return !isNaN(Number(number));
	},
	regex: function (regex) {
		try {
			// The 'new RegExp()' throws a SyntaxError, so we wrap in try/catch.
			return new RegExp(regex) !== undefined;
		} catch (err) {
			if (err instanceof SyntaxError) {
				return false;
			}

			throw err;
		}
	}
};

/**
  * A BetterElement element.
	*
	* @param {String} nameParam The name of the BetterElement (what will be inside of the <>s)
	* @global
	* @constructor
	* @returns {Element}
  */
function Element(nameParam) {
	/**
	  * The attributes of a BetterElement.
		* @type {Attribute[]}
		*/
	this.attributes = [];
	/**
	  * The number of attributes in a BetterElement.
		* @deprecated Soon we'll use Array.push instead.
		* @type {Number}
		*/
	this.attributeCount = 0;
	/**
	  * The name of the BetterElement. For example, in a <clock> tag
		* would be 'clock'.
		* @type {String}
		* @constant
		*/
	this.name = nameParam;
	/**
	  * A callback for when an element is read. Called once for each
		* element.
		* @type {Function}
		*
		* @param {Number} index The index of the element.
		* @param {String} element The element's contents.
		*/
	this.toExecuteOnRead = undefined;

	/**
	  * Adds an attribute to this.attributes.
		*
		* @param {Attribute|String} attribute The attribute itself, or a string for it's name.
		* @param {Boolean} required Weather or not it is required.
		* @param {Function} verify The verification function, called on each attribute's contents.
		* @param {String} value The value of the attribute. Currently unused.
		* @returns {Attribute} The finished attribute.
		*/
	this.addAttribute = function (attribute, required, verify, value) {
		if (attribute instanceof Attribute) {
			this.attributes[this.attributeCount] = attribute;
		} else {
			this.attributes[this.attributeCount] = new Attribute(attribute, required, verify, value);
		}
		this.attributeCount += 1;
		return this.attributes[this.attributeCount - 1];
	};

	/**
	  * Deletes an attribute from this.attributes.
		*
		* @param {String} attributename The attribute name to find and delete.
		* @returns {Attribute} The deleted attribute
		*/
	this.delAttribute = function (attributename) {
		var i = 0;
		for (; this.attributes[i].name !== attributename; i += 1) { /* empty */ }
		var attribute = this.attributes[i];
		this.attributes.splice(i, 1);
		return attribute;
	};

	/**
	  * Reads all the current elements and parses them.
		*
		* <br/><b>Note</b>: Soon this may be split into seperate functions.
		*
		* @throws <b>Error</b> if readElements is run without a toExecuteOnRead
		* @throws <b>Error</b> if an attribute is missing that is marked as required.
		* @throws <b>Error</b> if attribute verification failed.
		*/
	this.readElements = function () {
		this.elements = [].slice.call(document.getElementsByTagName(this.name));
		if (this.toExecuteOnRead) {
			var _this = this;
			this.elements.forEach(function (element, index) {
				_this.attributes.forEach(function (attribute) {
					if (attribute.required && !element.getAttribute(attribute.name)) {
						throw new Error('Missing attribute ' + attribute.name + ' in element ' + index);
					}

					if (attribute.verify) {
						if (!attribute.verify(element.getAttribute(attribute.name))) {
							throw new Error('Element verification failed (type ' +
								attribute.name + ', value ' + element.getAttribute(attribute.name) + ')');
						}
					}
				});
				_this.toExecuteOnRead(index, element);
			});
		} else {
			throw new Error(this.name + ' executed readElements() without a toExecuteOnRead!');
		}
	};

	/**
		* Fetches all appropiate elements from the DOM.
		*
		* @returns {HTMLCollection}
	  */
	this.getElements = function () {
		return document.getElementsByTagName(this.name);
	};

	/**
	  * Returns all attributes.
		* @returns {Attributes[]} The values of this.attributes.
		* @deprecated Get them from this.attributes instead.
		*/
	this.getAttributes = function () {
		return this.attributes;
	};
}

function BEinject () {
	try {
		if (module && module.exports) {
			module.exports = {
				Attribute,
				Element,
				builtins: {
					doRandom,
					doClock
				}
			};
		}
	} catch (err) {}
}

BEinject();
