/*
 * BetterElement: Create custom HTML elements through client-side JS.
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

function Attribute(nameParam, requiredParam, verifyParam, valueParam) {
	this.name = nameParam;
	this.required = requiredParam || true;
	this.value = valueParam || undefined;
	this.verify = verifyParam || function () {
		return true;
	};

	return this;
}

Attribute.verifyPresets = {
	number: function (number) {
		return !isNaN(Number(number));
	},
	regex: function (regex) {
		try {
			return new RegExp(regex) !== undefined;
		} catch (err) {
			return false;
		}
	}
};

function Element(nameParam) {
	this.attributes = [];
	this.attributeCount = 0;
	this.name = nameParam;
	this.toExecuteOnRead = undefined;

	this.addAttribute = function (attribute, required, verify, value) {
		if (attribute instanceof Attribute) {
			this.attributes[this.attributeCount] = attribute;
		} else {
			this.attributes[this.attributeCount] = new Attribute(attribute, required, verify, value);
		}
		this.attributeCount += 1;
	};

	this.delAttribute = function (attributename) {
		var i = 0;
		for (; this.attributes[i] !== attributename; i += 1) { /* empty */ }
		this.attributes.splice(i, 1);
	};

	this.readElements = function () {
		this.elements = [].slice.call(document.getElementsByTagName(this.name));
		if (this.toExecuteOnRead === null) {
			throw new Error(this.name + ' executed readElements() without a toExecuteOnRead!');
		} else {
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
		}
	};

	this.getElements = function () {
		return document.getElementsByTagName(this.name);
	};

	this.getAttributes = function () {
		return this.attributes;
	};
}

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
} catch (err) {
	if (err instanceof ReferenceError) {
		// ignore
	} else {
		throw err;
	}
}
