/////////////////////////////////
// BetterElement 1.0/0         /
////////////////////////////////
var date = new Date();

function betterElement(){
  doTime();
  doDate();
  doRandom();
}
function getTime(){return date.toLocaleTimeString();}
function getDate(){return date.toLocaleDateString();}
function getRandom(min, max){return Math.floor(Math.random() * (max - min) + min);}

function doTime(){
  var timeElements = document.getElementsByTagName("time");
  for(var count = 0; timeElements[count] != undefined; count = count + 1){
      timeElements[count].innerHTML = getTime();
  }
}
function doDate(){
  var dateElements = document.getElementsByTagName("date");
  for(var count = 0; dateElements[count] != null; count = count + 1){
    dateElements[count].innerHTML = getDate();
  }
}
function doRandom(){
  var randElements = document.getElementsByTagName("random");
  var max = null;
  var min = null;
  for(var count = 0; randElements[count] != undefined; count = count + 1){
    if(randElements[count].getAttribute("min") != undefined && randElements[count].getAttribute("min") != ""
    && randElements[count].getAttribute("max") != undefined && randElements[count].getAttribute("max") != ""){
      min = Number.parseInt(randElements[count].getAttribute("min"));
      max = Number.parseInt(randElements[count].getAttribute("max"));
      randElements[count].innerHTML = getRandom(min, max);
    } else {
      console.error("Error on index " + count + " of <random>; missing min or max parameter(s)!");
    }
  }
}
function createTag(tagname){
  return document.getElementsByTagName(tagname);
}
