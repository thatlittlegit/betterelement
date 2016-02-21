/*
 * Importer 1.0/0 by wapidstyle
 * Use it with BetterElement 2.0 to import a web page into another through
 * pure client-side javascript.
 */

// Default rules.
const defaultRules = {
    "html":false,
    "!DOCTYPE":false,
    "canvas":false,
    "script":false,
    "frame":false,
    "frameset":false,
    "style":false,
    "body":"innerHTML"
};
// Main thing, describes a placeholder.
function Placeholder(nname, uurl){
    // The name of the placeholder. For example, if the name was 'topbar', then <topbar> would import it.
    this.name = nname;
    // URL to import.
    this.urlToImport = uurl;
    
    // Fills it in.
    this.do = function(){
        var e = new Element(this.name);
        e.toExecuteOnRead = function(){
            e.elementsToRead[e.currentIndex].innerHTML = get(this.urlToImport).parseMyXML();
        };
    };
}

function xmlToJson(xml) {
    var obj = {};
    if (xml.nodeType == 1) {                
        if (xml.attributes.length > 0) {
            obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { 
        obj = xml.nodeValue;
    }            
    if (xml.hasChildNodes()) {
        for (var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof (obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof (obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    return obj;
}

function ParsableXML(xxml){
    this.innerXML = xxml;
    
    this.parseMyXML = function(rules = defaultRules){
        return xmlToJason(this.innerXML);
    };
}

// Fetch polyfill.
function get(uri){
    if(fetch){
        return fetch(uri);
    } else {
        // Yay, an XMLHttpRequest!
        var req = new XMLHttpRequest();
        req.open("GET", uri, false);
        req.send();
        return new ParsableXML(req.responseXML);
    }
}
