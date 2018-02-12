const app = require('.././app');
const request = require('supertest');

describe('Test the root path', () => {
    test('It should response the GET method with 200', (done) => {
        request(app).get('/').then((res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });
});
describe('Test the /goos path', () => {
    test('It should response the GET request with 200 with a JSON', (done) => {
        request(app).get('/goos').then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8')
            done();
        });
    });
    test('It should response the POST request with 200, with save succesful', (done) => {
        const testGoo = {tags:[], people:[], title:'', location:''};
        request(app)
          .post('/goos')
          .send(testGoo).then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe("new Goo was saved succesfully")
            done();
        });
    });
});
