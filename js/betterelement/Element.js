var attributes;
var attributeCount = 0;
var elements;
var name;
var toExecuteOnRead;
var currentReadIndex;
var currentReadElement;

function addAttribute(attributename) {
    this.attributes[attributeCount] = attributename;
    this.attributeCount += 1;
}

function delAttribute(attributename) {
    var i = 0;
    for (; this.attributes[i] != attributename; i += 1) {}
    this.attributes[i] = "DELETED_ELEMENT";
}

function readElements() {
    this.elements = document.getElementsByTagName(this.name);
    if (toExecuteOnRead === null) {
        console.error(this.name + " executed readElements() without a toExecuteOnRead!");
    } else {
        for (var i = 0; this.elements[i] !== undefined; i += 1) {
            this.currentReadIndex = i;
            this.currentReadElement = document.elements[i];
            this.toExecuteOnRead();
        }
    }
}

function getElements() {
    return document.getElementsByTagName(this.name);
}

function getAttributes() {
    return this.attributes;
}
