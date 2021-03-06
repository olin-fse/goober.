const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
const axios = require('axios');
chai.use(chaiWebdriver(browser));
const expect = chai.expect;
const port = process.env.PORT | 8080;
const rootPath = (process.env.DOCKER_GOOBER_URL || 'http://localhost:') + port;
const testTime = new Date();
const goo = {title: 'test',
             description: 'test',
             location:'test',
             tags:[],
             people:[],
             startDate: testTime,
             endDate: testTime,
             maxPeople: 4 };

describe('goober home page, ', function() {
  beforeAll(function(){
      console.log(rootPath)
      axios.delete(rootPath +'/goos'); // deletes all goo before testing
      axios.post(rootPath +'/goos', goo);// add a test goo, retrieve its id
      browser.url(rootPath);
      browser.setViewportSize({
          width: 1024,
          height: 1024
      });
  });
  afterAll(function() {
      axios.delete(rootPath +'/goos'); // deletes all goo after testing
  });

  it('should have the right title', function() {
      var title = browser.getTitle();
      expect(title).to.equal('Goober.');
  });
  it('should have one NavBar react component visible', function(){
      expect('.nav-wrapper').to.be.visible();
      expect('.nav-wrapper').to.have.count(1);
  });
  it('should have the GooList react component visible', function(){
      expect('.GooList').to.be.visible();
  });
  it('should have only 1 Goo visible', function(){
      expect('.Goo').to.be.visible();
      expect('.Goo').to.have.count(1);
  });
  it('user should see title : test', function(){
      expect('.Goo .card-title').to.have.text('test');
  });
  it('user should see description : test', function(){
      expect('.Goo .location').to.have.text('@ test');
  });
  it('user should see location : test', function(){
      expect('.Goo .description').to.have.text('test');
  });
  it('user should see time/dates pass these regex', function(){
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
  it('user should see maxPeople : 4', function(){
      expect('.Goo .maxPeople').to.have.text('person 4');
  });
  it('user should see one deleteButton', function(){
      expect('.Goo .deleteButton').to.be.visible();
      expect('.Goo .deleteButton').to.have.count(1);
  });
  it('user should click delete and see the confirm alert', function(){
      browser.click('.Goo .deleteButton');
      var alertMessage = browser.alertText();
      expect(alertMessage).to.equal('Delete this Goo?')
      browser.alertDismiss();
  });
  it('user should click delete, confirm delete, see deletetoast, and zero goo', function(){
      expect('.Goo .deleteButton').to.have.count(1);
      browser.click('.Goo .deleteButton');
      browser.alertAccept();
      browser.waitForVisible('.deleteToast')
      expect('.Goo .deleteButton').to.have.count(0);
      axios.post(rootPath +'/goos', goo); // add the test goo back
  });
});

describe('Navigation Bar', function(){
    beforeEach(function(){
        browser.url(rootPath);
        browser.setViewportSize({
            width: 1024,
            height: 1024
        });
    });
    it('should have all the links visible for max size window', function(){
        expect('.nav-wrapper .homeLink').to.be.visible(1000);
        expect('.nav-wrapper .newGooLink').to.be.visible(1000);
    });
    it('should have all the links visible for responsive window', function(){
        browser.setViewportSize({
            width: 500,
            height: 500
        });
        expect('.nav-wrapper .homeLink').not.to.be.visible();
        expect('.nav-wrapper .newGooLink').not.to.be.visible();
        expect('.button-collapse').to.be.visible();
    });
    it('clicking Home link should navigate to root route /', function(){
        browser.click('.nav-wrapper .homeLink');
        var browserUrl = browser.getUrl();
        expect(browserUrl).to.equal(rootPath + '/');
    });
    it('clicking Home link(responsvie) navigate to root route /', function(){
        browser.setViewportSize({
            width: 500,
            height: 500
        });
        browser.click('.button-collapse');
        browser.waitForVisible('.side-nav')
        browser.click('=Home');
        var browserUrl = browser.getUrl();
        expect(browserUrl).to.equal(rootPath + '/');
    });
    it('clicking New Goo link should navigate to /newgoo route', function(){
        browser.click('.nav-wrapper .newGooLink');
        var browserUrl = browser.getUrl();
        expect(browserUrl).to.equal(rootPath+'/newgoo');
    });
    it('clicking New Goo link(responsive) should navigate to /newgoo route', function(){
        browser.setViewportSize({
            width: 500,
            height: 500
        });
        browser.click('.button-collapse');
        browser.waitForVisible('.side-nav')
        browser.click('=New Goo');
        var browserUrl = browser.getUrl();
        expect(browserUrl).to.equal(rootPath+'/newgoo');
    });
});

describe('New Goo Page', function(){
    beforeAll(function(){
        axios.delete(rootPath +'/goos'); // deletes all goo before testing
        browser.setViewportSize({
            width: 1024,
            height: 1024
        });
    });
    afterEach(function() {
        axios.delete(rootPath +'/goos'); // deletes all goo after testing
    });
    beforeEach(function(){
        browser.url(rootPath + '/newgoo');
    });
    it('should have Create New Goo title', function(){
        expect('.formTitle').to.be.visible();
        expect(browser.getText('.formTitle')).to.equal('Create New Goo');
    });
    it('should have all input fields with empty values', function(){
        expect(browser.getValue('.title')).to.equal('');
        expect(browser.getValue('.description')).to.equal('');
        expect(browser.getValue('.location')).to.equal('');
        expect(browser.getValue('.maxPeople')[1]).to.equal('4');
        expect(browser.getValue('.startDate')).to.equal('');
        expect(browser.getValue('.endDate')).to.equal('');
    });
    it('user should submit a new goo and see a new one on the home page', function(){
        // fill out the form
        browser.setValue('.title', 'test');
        browser.setValue('.description', 'test');
        browser.setValue('.location', 'test');

        // select startDate
        browser.click('label=startDate');
        browser.waitForVisible('#input_4_root .picker__footer')
        browser.click('#input_4_root .picker__today')
        browser.click('#input_4_root .picker__close');
        browser.waitForVisible('#input_4_root .picker__holder', 1000, true)

        // select endDate
        browser.click('label=endDate')
        browser.waitForVisible('#input_5_root .picker__footer')
        browser.click('#input_5_root .picker__today')
        browser.click('#input_5_root .picker__close');
        browser.waitForVisible('#input_5_root .picker__holder', 1000, true)

        // submit and wiat until to be redirected
        browser.click('.submitButton');
        browser.waitUntil(function(){
            return browser.getUrl()===(rootPath+'/');
        }, 5000);

        // Did the goo get created with the right info?
        expect('.Goo').to.have.count(1);
        expect('.Goo .card-title').to.have.text('test');
        expect('.Goo .location').to.have.text('@ test');
        expect('.Goo .description').to.have.text('test');
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
        expect('.Goo .maxPeople').to.have.text('person 4');
    });

});
