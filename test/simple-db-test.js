const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');
const simpleid = require('simpleid');

const simpleDb = require('../lib/simple-db');

const test = './test/db-test-dir';

var db;

var testOne = {
    message: 'testing'
}
var testTwo = {
    message: 'hello'
}
var testThree = {
    message: 'yo'
}
var testFour = {
    message: 'tesing 123'
}
var testFive = {
    message: 'last one'
}


before(done => {
    db = simpleDb.create(test);
    fs.stat(test, (err, stats) => {
        assert.equal(null, err);
        done();
    });
});

after(done => {
    rimraf(test, [], (err) => {
        done();
    });
});

describe('creates and deletes directory', () => {
    it('saves an object and assigns id', (done) => {
        db.save('hello', testOne, (err, result) => {
            assert.equal(testOne.message, 'testing');
            done();
        })
    });
});

describe('updates database', () => {
    it('starts with the object we saved and updates', (done) => {
        db.save('update', testTwo, (err, results) => {
            assert.equal(testTwo.message, 'hello');
            done();
        })
    })
    it('updates object', (done) => {
        process.stdout.write('changes messaged of testTwo object');
        testTwo.addProperty = 'updating';
        db.update('update', testTwo, (err, reslut) => {
            assert.equal(testTwo.addProperty, 'updating');
            done();
        })
    });
});
80a798bf57f6ab45576cc4af4a2eeebfabb27203