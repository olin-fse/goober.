const app = require('.././app');
const request = require('supertest');

let goo;
let goo_id;

beforeEach(function() {
    goo = {tags:[], people:[], title:'', location:''};
    app.db.Goo.saveGoo(goo).then((data) => {
        goo_id = data._id;
    });
});

afterEach(function() {
    app.db.Goo.deleteGoo(goo_id);
});

describe('Test the root path', () => {
    test('It should response the GET method with 200', (done) => {
        request(app).get('/').then((res) => {
            expect(res.statusCode).toBe(200);
            done();
        });
    });
});
describe('Test the /goo/:gooid path', () => {
    test('It should response the GET method with 200 with a JSON if the goo with gooid exists', (done) => {
        request(app).get('/goo/'+ goo_id ).then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8')
            done();
        });
    });
    test('It should response the GET method with 400 with error message if the id format is wrong(12digit hex)', (done) => {
        const wrong_goo_id = 'wronggooid' // mongo id with the wrong syntax
        request(app).get('/goo/' + wrong_goo_id).then((res) => {
            expect(res.statusCode).toBe(400); // 400 - bad request
            // expect(res.text).toBe('')
            done();
        });
    });
    test('It should response the GET method with 404 with a JSON if the goo with gooid does not exist', (done) => {
        const fake_goo_id = '5a88afe5a8ba7c1af90f0a24' // fake mongo id with the right syntax
        request(app).get('/goo/'+ fake_goo_id ).then((res) => {
            expect(res.statusCode).toBe(404); // content not found
            expect(res.header['content-type']).toBe('application/json; charset=utf-8')
            done();
        });
    });
    test('It should response the DELETE method with 200 with success message if the Goo with the id exsists', (done) => {
        request(app).delete('/goo/' + goo_id).then((res) => {
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe('DELETE request succesful')
            done();
        });
    });
    test('It should response the DELETE method with 400 with error message if the id format is wrong(12digit hex)', (done) => {
        const wrong_goo_id = 'wronggooid' // mongo id with the wrong syntax
        request(app).delete('/goo/' + wrong_goo_id).then((res) => {
            expect(res.statusCode).toBe(400);
            // expect(res.text).toBe('')
            done();
        });
    });
    test('It should response the DELETE method with 404 with error message if the Goo with the id does not exist', (done) => {
        // create dummy goo with goo_id
        const fake_goo_id = '5a88afe5a8ba7c1af90f0a24'
        request(app).delete('/goo/' + fake_goo_id).then((res) => {
            expect(res.statusCode).toBe(404);
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
