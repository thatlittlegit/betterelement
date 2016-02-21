# BetterElement
##### *A part of the wAPI*

Create your own elements through client-side JavaScript.

## Guide
*A guide to the world's unknown...*
### Basics
#### Referencing in the HTML
To start using BE, you'll need to reference it in some code. As you'll probably use client-side JS, you'll
incorperate it in the HTML.
- ~~Bower~~ (not yet working...)
* Download the wAPI source and copy the betterelement.js onto your server
    ```html
    <script src="where/you/put/your/betterelement/file.js">
    ```
* Reference BitBucket's server.
    ```html
    <script src="https://bitbucket.org/wapidstyle/wapi/raw/2da31891ed8649e7374f156d513cc02da1179699/js/betterelement/betterelement.js">
    ```
    
    Note that using the above code will give you 2.0/1. If you want to use 2.1/0 (currently in non-working beta), replace
    the SHA256 hash with `master`.
    
    
* Use [WebLibrary](https://bitbucket.org/wapidstyle/wapi/src/master/js/weblibrary/).

After you've used one of these, you can start.

#### Creating an element that turns into "Hello, World!" if the g attribute is "true"
1. Create a function and define an Element as well as name it. (If you are using 2.0/1, then you can use the
global createElement() function (which returns a new element), however this has been removed in 2.1/0. 
To keep your code working good, I would advise using 2.0/1 for now, but use `new Element()` instead.)
    ```javascript
    function doHello(){
        var hello = new Element();
    }
    ```
    
2. Run 

## JavaScript Description
### Functions
*Only includes those described in the Root Element, sub-functions defined at a smaller index*
#### `betterElement()`
Initiates default elements `<clock>` and `<random>`, described in
`DefaultBetterElements`.
#### `Element()`
Represents a custom element.
##### `attributes`
**Array.** Contains the attributes of that element.
##### `attributesExist`
**Array.** Contains if that index of `attributes` is empty.
##### `elementsToRead`
**Array.** Set when `readElements()` is executed. Value is assigned to what
`document.getElementsByTagName(name)` returns.
##### `name`
The name of the element.
##### `toExecute`
**Required.** A function to be executed each time `readElements()` loops.
##### `currentIndex`
The current index of the loop in `readElements`.
##### `elementsRead`
If `readElements` has been executed.
##### `readFailed`
**Not required.** A function to be executed if an element
is missing a required attribute.
##### `addAttribute(name)`
Adds an attribute to `attributes` and returns it.
##### `attributeCount()`
Returns the number of attributes.
> If it is over 100, then... :smile:

##### `delAttribute(attribute)`
Deletes the attribute from the array. You may also wish to set
the attribute on your end (what `addAttribute()` returned) to
`undefined` or `null`.
##### `readElements()`
Scans through the elements detected by `document.getElementsByTagName(name)`.
Executes `toExecute()` for every element and `readFailed()`, if it exists, for
every element missing a required attribute.
##### `findAttribute(attribute)`
Finds the index of the attribute.
#### `Attribute(attributeName)`
Represents an attribute for an `Element()`.
##### `name`
Receives the value of `attributeName` in the constructor.
##### `value`
The value of the attribute.
##### `required`
False by default, if the attribute is required.
##### `type`
By default `InputType.TEXT` or `0` (`InputType.TEXT` is 0), the type
of the attribute.
### Namespaces
*Only includes those described in the Root Element, sub-functions defined at a smaller index*
#### `DefaultBetterElements`
Contains the default elements in BetterElement.
##### `getTime()`
Gets the computer's time.
##### `getDate()`
Gets the computer's date.
##### `getRandom(min, max)`
Gets a random number from `Math.random()`, multiplies it by (`max`-`min`), adds
`min` and rounds with `Math.round()`.
##### `doClock()`
Executes the checking of `<clock>`.
##### `doRandom()`
Executes the checking of `<random>`.
#### `Element`
The location of `Element.create(name)`.
##### `create(name)`
Returns an empty `Element()` with a `name` variable of the name parameter.
#### `InputType`
A type of input.
##### `TEXT`
Designates that the input is text. Is internally 0.
##### `NUMBER`
Designates that the input is a number. Is internally 1.
##### `ID`
Designates that the input is an ID and is unique. Is internally 2.
##### `testIfCorrect(toTest, against)`
**Do not use for arrays.** Tests if `toTest` is a correct example
of `against`.
##### `testIfCorrectWithArray(toTest, string)`
**Use for arrays.** Tests if `string` is existent in `toTest`.
