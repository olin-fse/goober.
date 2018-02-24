const db = require('.././db_wrapper')
const request = require('supertest')
const mongoose = require('mongoose');

const mongoTestURI = 'mongodb://localhost/test';

describe('Test connectToDB function of db_wrapper', () => {
    beforeEach(() => {
        return mongoose.disconnect();
    });
    afterEach(() => {
        return mongoose.disconnect();
    });
    test('When given CORRECT test Mongo URI, it should respond with ready state 1 and name test', (done) => {
        db.connectToDB(mongoTestURI).then((res) => {
            expect(res.readyState).toBe(1);
            expect(res.name).toBe('test');
            done();
        });
    });
    test('When given a wrong MongoURI, it should respond with ready state 0 and error', (done) => {

        expect(console.error).toHaveBeenCalledTimes(1);
        done(); 
    });
});

// describe('Test Goo Model', () => {
//     test('It should respond with', (done) => {
//         db.connectToDB.then((res) => {
//             expect().toBe();
//             done();
//         });
//     });
// });
