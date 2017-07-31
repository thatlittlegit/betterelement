describe("BetterElement", function() {
  it("should create a random number between two numbers when <random> is used", function() {
    document.body.innerHTML = "<random min='0' max='100'></random>";
    doRandom();
    
    Number.parseInt(document.getElementsByTagName("random")[0].innerHTML).should.be.at.least(0).and.at.most(100);
    
    document.body.innerHTML = "";
  });
  
  it("should show the time when <clock type='time'> is used", function() {
    document.body.innerHTML = "<clock type='time'></time>";
    doClock();
    
    document.getElementsByTagName("clock")[0].innerHTML.should.deep.equal(new Date().toLocaleTimeString());
    
    document.body.innerHTML = "";
  });
  
  it("should show the date when <clock type='date'> is used", function() {
    document.body.innerHTML = "<clock type='date'></time>";
    doClock();
    
    document.getElementsByTagName("clock")[0].innerHTML.should.deep.equal(new Date().toLocaleDateString());
    
    document.body.innerHTML = "";
  });
  
  it("should show Hello, World when a custom <hello> is used");
});