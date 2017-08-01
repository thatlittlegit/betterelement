/*
 * BetterElement: Create custom HTML elements through client-side JS.
 */

function doClock() {
	var clockElement = new Element('clock');
	clockElement.toExecuteOnRead = function (index, element) {
		if (element.getAttribute('type') == 'time') {
			element.innerHTML = new Date().toLocaleTimeString();
		} else if (element.getAttribute('type') == 'date') {
			element.innerHTML = new Date().toLocaleDateString();
		} else {
			element.innerHTML = 'Failed to get time/date - invalid attribute';
			throw new Error('Invalid "type" attribute on index ' + index + '!');
		}
	};
	clockElement.readElements();
}

function doRandom() {
	var randomElement = new Element('random');
	randomElement.toExecuteOnRead = function (index, element) {
		if (element.getAttribute('min') !== undefined && element.getAttribute('max') !== undefined) {
			var min = Number(element.getAttribute('min'));
			var max = Number(element.getAttribute('max'));
			element.innerHTML = Math.floor(Math.random() * (max - min) + min);
		} else {
			throw new Error('Error on index ' + index + ' of <random>;' +
           'missing min or max parameter(s)!');
		}
	};
    // randomElement.addAttribute("min");
    // randomElement.addAttribute("max");
	randomElement.readElements();
}

function Attribute(name, value) {
	var name = name;
	var value = value || null;

	return this;
}

function Element(nameParam) {
	this.attributes = [];
	this.attributeCount = 0;
	this.name = nameParam;
	this.toExecuteOnRead = undefined;

	this.addAttribute = function (attributename) {
		this.attributes[attributeCount] = new Attribute(attributename);
		this.attributeCount += 1;
	};

	this.delAttribute = function (attributename) {
		var i = 0;
		for (; this.attributes[i] != attributename; i += 1) {}
		array.splice(i, 1);
	};

	this.readElements = function () {
		this.elements = [].slice.call(document.getElementsByTagName(this.name));
		if (this.toExecuteOnRead === null) {
			throw new Error(this.name + ' executed readElements() without a toExecuteOnRead!');
		} else {
			var _this = this;
			this.elements.forEach(function (element, index) {
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
