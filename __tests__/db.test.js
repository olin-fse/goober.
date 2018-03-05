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
    test('When given CORRECT test Mongo URI, it should respond with readyState 1 and name test', (done) => {
        db.connectToDB(mongoTestURI).then((res) => {
            expect(res.readyState).toBe(1);
            expect(res.name).toBe('test');
            done();
        });
    });
    // test('When given a wrong MongoURI, it should respond with error', (done) => {
    //     // lets use spy instead
    //     const spy = jest.spyOn(db, 'connectToDB');
    //     const isConnecting = db.connectToDB('wrongguri');
    //     expect(spy).rejects.toThrow();
    //         // expect(res.readyState).toBe(0);
    //         done();
    //     //todo connectTODB is not throwing errors that throwError can catch
    // });
});

describe('Test Goo Model', () => {
    beforeAll(() => {
        return mongoose.connect(mongoTestURI);
    });
    afterAll(() => {
        return db.deleteAllGoo().then(() => {
            mongoose.disconnect();
        });
    });
    test('deleteAllGoo should throw error when NODE_ENV is not test', (done) => {
        function deleteAllGoo(){
            process.env.NODE_ENV = 'nottest'
            db.Goo.deleteAllGoo();
        }
        expect(deleteAllGoo).toThrowError("InvalidEnvironmentError");
        process.env.NODE_ENV = 'test';
        done();
    });
    test('saveGoo() should throw error when values have wrong data types', (done) => {
        const testGoo = {title:12312, location:12312, description:121212,
                         tags:[], people:[], title:'', location:''};
        function saveGoo(){
            db.Goo.saveGoo(testGoo);
        }
        // expect(saveGoo).toThrowError("");
        done();
    });
    test('deleteGoo() should throw error when there is no match', (done) => {
        done();
    });
});
