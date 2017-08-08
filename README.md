# BetterElement [![Build](https://img.shields.io/travis/thatlittlegit/betterelement.svg)](https://travis-ci.org/thatlittlegit/betterelement) [![Codecov](https://img.shields.io/codecov/c/github/thatlittlegit/betterelement.svg)](https://codecov.io/gh/thatlittlegit/betterelement)[![Docs](http://inch-ci.org/github/thatlittlegit/betterelement.svg?branch=master)](http://inch-ci.org/github/thatlittlegit/betterelement)
Create your own elements through client-side JavaScript.

### Installation
```shell
npm i betterelement
# or, with Yarn,
yarn add betterelement
```
## Usage
```js
// First, create a new Element.
var element = new Element('hello');
// Then, let's add a toExecuteOnRead.
element.toExecuteOnRead = function (index, element) {
	element.innerHTML = 'hello';
	if (Math.random() < 0.51) {
		element.innerHTML += ' world!';
	} else {
		element.innerHTML += ' death!';
	}
}
// Now, let's build.
element.readElements();
```
```HTML
...
<body>
	<h1><hello></hello></h1>
	<p>
		...
	</p>
	...
</body>
...
```
Results in:
```html
...
<body>
	<h1><hello>Hello, death!</hello></h1>
	<p>
		...
	</p>
	...
</body>
...
```

For more examples, see doClock and doRandom in betterelement.js.
