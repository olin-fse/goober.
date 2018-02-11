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
