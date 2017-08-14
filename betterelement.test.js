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
});
