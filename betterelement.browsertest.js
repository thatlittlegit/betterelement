/* global doRandom, doClock */
describe('BetterElement', function () {
	it('should create a random number between two numbers when <random> is used', function () {
		document.body.innerHTML = '<random min=\'0\' max=\'100\'></random>';
		doRandom();

		Number(document.getElementsByTagName('random')[0].innerHTML).should.be.at.least(0).and.at.most(100);

		document.body.innerHTML = '';
	});

	it('should show the time when <clock type=\'time\'> is used', function () {
		document.body.innerHTML = '<clock type=\'time\'></time>';
		doClock();

		document.getElementsByTagName('clock')[0].innerHTML.should.match(new RegExp(new Date().toLocaleTimeString().replace(/[0123456789]/, '.')));

		document.body.innerHTML = '';
	});

	it('should show the date when <clock type=\'date\'> is used', function () {
		document.body.innerHTML = '<clock type=\'date\'></time>';
		doClock();

		document.getElementsByTagName('clock')[0].innerHTML.should.deep.equal(new Date().toLocaleDateString());

		document.body.innerHTML = '';
	});

	it('should throw an exception when <random> is used with no min and/or max element', function () {
		document.body.innerHTML = '<random></random>';
		doRandom.should.throw();

		document.body.innerHTML = '<random min=\'0\'></random>';
		doRandom.should.throw();

		document.body.innerHTML = '<random max=\'100\'></random>';
		doRandom.should.throw();

		document.body.innerHTML = '<random min=\'0\' max=\'100\'></random>';
		doRandom.should.not.throw();
	});

	it('should throw an exception when <clock> is used with an invalid type', function () {
		document.body.innerHTML = '<clock type=\'date\'></clock>';
		doClock.should.not.throw();

		document.body.innerHTML = '<clock type=\'time\'></clock>';
		doClock.should.not.throw();

		document.body.innerHTML = '<clock type=\'lala\'></clock>';
		doClock.should.throw();

		document.body.innerHTML = '<clock type=\'1\'></clock>';
		doClock.should.throw();
	});

	it('should show Hello, World when a custom <hello> is used');
});
