const chai = require('chai');
const chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));
const expect = chai.expect;

describe('goober', function() {
  beforeEach(function () {
    browser.url('http://localhost:8080');
  });
  it('renders app', function() {
    expect('GooList').to.be.visible();
  });
});
