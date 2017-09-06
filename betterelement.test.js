/* global Attribute expect */
describe('The Element constructor', function () {
	it('should adjust the name when a different nameParam is supplied', function () {
		new Element('test').name.should.deep.equal('test');
	});

	it('should adjust the attributes when addAttributes and delAttributes is used', function () {
		var element = new Element('hi');
		var verifyFunction = function (value) {
			return Boolean(value) !== undefined;
		};

		element.addAttribute('jargon', true, verifyFunction);
		element.attributes[0].should.deep.equal(new Attribute('jargon', true, verifyFunction));

		element.delAttribute('jargon');
		// Use expect because should fails
		// eslint-disable-next-line no-unused-expressions
		expect(element.attributes[0]).to.be.undefined;
	});

	it('should throw an error if readElements is thrown without a toExecuteOnRead', function () {
		var wrapper = function (element) {
			return element.readElements.bind(element);
		};

		var element = new Element('hi');
		wrapper(element).should.throw();

		element.toExecuteOnRead = function () {};
		wrapper(element).should.not.throw();
	});

	it('should return an HTMLCollection from getElements that is valid', function () {
		document.body.innerHTML = '<hi></hi>';

		var element = new Element('hi');
		element.getElements().should.be.an.instanceof(HTMLCollection);
		element.getElements().should.deep.equal(document.getElementsByTagName('hi'));
	});

	it('should duplicate an attribute if an attribute is provided to addAttribute', function () {
		var element = new Element('hi');
		element.addAttribute(new Attribute('hi'));
		element.attributes[0].toString().should.deep.equal(new Attribute('hi').toString());
	});
});

describe('The Attribute constructor', function () {
	it('should change the name and required statement depending on the nameParam', function () {
		new Attribute('hi').name.should.equal('hi');
		new Attribute('hi', 'peanut').required.should.equal('peanut');
	});

	it('should assume a dummy function if the verify function is not passed', function () {
		new Attribute('dummy').verify().should.equal(true);
		new Attribute('dummy', false, function () {
			return false;
		}).verify().should.equal(false);
	});

	it('number preset should return true on numbers and false otherwise', function () {
		Attribute.verifyPresets.number(2).should.equal(true);
		Attribute.verifyPresets.number('boo').should.equal(false);
	});

	it('regex preset should return true on regexes and false otherwise', function () {
		Attribute.verifyPresets.regex('.*').should.equal(true);
		Attribute.verifyPresets.regex('$^*').should.equal(false);
	});
});
