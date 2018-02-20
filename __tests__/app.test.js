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
describe('Test the /goo/:gooid path', () => {
    test('It should response the GET method with 200 with a JSON', (done) => {
        request(app).get('/goo/'+ goo_id ).then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8')
            done();
        });
    });
    test('It should response the DELETE method with 200 with success message if the Goo with the id exsists', (done) => {
        const goo_id = ''
        request(app).delete('/goo/' + goo_id).then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('DELETE request succesful')
            done();
        });
    });
    test('It should response the DELETE method with 500 with error message if the Goo with the id does not exist', (done) => {
        // create dummy goo with goo_id
        const goo_id = ''
        request(app).get('/goo/' + goo_id).then((res) => {
            expect(res.statusCode).toBe(500);
            expect(res.text).toBe('')
            done();
        });
    });
    test('It should response the DELETE method with 500 with error message if the id format is wrong(12digit hex)', (done) => {
        const goo_id = 'wrongid'
        request(app).get('/goo/' + goo_id).then((res) => {
            expect(res.statusCode).toBe(500);
            expect(res.text).toBe('')
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
