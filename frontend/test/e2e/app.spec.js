const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
const axios = require('axios');
chai.use(chaiWebdriver(browser));
const expect = chai.expect;

describe('goober home page, ', function() {
  // test Goo setup
  const testTime = new Date();
  const goo = {title: 'test',
               description: 'test',
               location:'test',
               tags:[],
               people:[],
               startDate: testTime,
               endDate: testTime,
               maxPeople: 4 };

  beforeAll(function(){
      axios.delete('http://localhost:8080/goos'); // deletes all goo before testing
      axios.post('http://localhost:8080/goos', goo);// add a test goo, retrieve its id
      browser.url('http://localhost:8080');
  });
  afterAll(function() {
      axios.delete('http://localhost:8080/goos'); // deletes all goo after testing
  });

  it('should have the right title', function() {
      var title = browser.getTitle();
      expect(title).to.equal('Goober.');
  });
  it('should have one NavBar react component visible', function(){
      expect('.nav-wrapper').to.be.there();
      expect('.nav-wrapper').to.be.visible();
      expect('.nav-wrapper').to.have.count(1);
  });
  it('should have the GooList react component visible', function(){
      expect('.GooList').to.be.there();
      expect('.GooList').to.be.visible();
  });
  it('should have only 1 Goo visible', function(){
      expect('.Goo').to.be.there();
      expect('.Goo').to.be.visible();
      expect('.Goo').to.have.count(1);
  });
  it('goo should have title : test', function(){
      expect('.Goo .card-title').to.have.text('test');
  });
  it('goo should have description : test', function(){
      expect('.Goo .location').to.have.text('@ test');
  });
  it('goo should have location : test', function(){
      expect('.Goo .description').to.have.text('test');
  });
  it('goo should have time/dates pass these regex', function(){
      expect('.Goo .startTime').to.have.text(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/); // hh:mm
      expect('.Goo .endTime').to.have.text(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/); // hh:mm
      var re1='((?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Tues|Thur|Thurs|Sun|Mon|Tue|Wed|Thu|Fri|Sat))';	// Day Of Week 1
      var re2='(.)';	// Any Single Character 1
      var re3='(.)';	// Any Single Character 2
      var re4='((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Sept|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?))';	// Month 1
      var re5='(.)';	// Any Single Character 3
      var re6='((?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])';	// Day 1
      var re7='((?:[a-z][a-z]+))';	// Word 1
      var dateregex = new RegExp(re1+re2+re3+re4+re5+re6+re7,["i"]);
      expect('.Goo .date').to.have.text(dateregex); // dddd, MMMM Do
  });
  it('goo should have maxPeople : 4', function(){
      expect('.Goo .maxPeople').to.have.text('person 4');
  });
  it('goo shouldhave one deleteButton', function(){
      expect('.Goo .deleteButton').to.be.there();
      expect('.Goo .deleteButton').to.be.visible();
      expect('.Goo .deleteButton').to.have.count(1);
  });
  it('should click delete and see the confirm alert', function(){

  });
});

describe('Navigation Bar', function(){
    beforeAll(function(){
        browser.url('http://localhost:8080');
    });
    it('should have the link to Home visible', function(){

    });
    it('clicking Home link should navigate to root route /', function(){

    });
    it('should have the link to New Goo visible', function(){

    });
    it('clicking New Goo link should navigate to /newGoo route', function(){

    });
});
