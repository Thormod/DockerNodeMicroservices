var assert = require('assert');
let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://192.168.99.100:8080';

describe('Users', function() {
    it('should list ALL users on /users/ GET', (done) => {
        chai.request(url)
            .get('/users/')
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should list a SINGLE user on /users/<id> GET', (done) => {
        chai.request(url)
            .get('/users/1')
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should add a SINGLE user on /users/ POST', (done) => {
        chai.request(url)
            .post('/users/')
            .send({ email: "test@gmail.com", name: "test", phone_number: "+57test5895" })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should delete a SINGLE user on /user/<id> DELETE', (done) => {
        chai.request(url)
            .delete('/users/8')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});

describe('Meetings', function() {
    it('should list ALL meeting on /meetings/ GET', (done) => {
        chai.request(url)
            .get('/meetings/')
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should list a SINGLE meeting on /meetings/<id> GET', (done) => {
        chai.request(url)
            .get('/meetings/1')
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should add a SINGLE meeting on /meetings/ POST', (done) => {
        chai.request(url)
            .post('/meetings/')
            .send({ meeting_name: "Test", meeting_date: "01/05/08", meeting_subject: "This is just a simple test passing by" })
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should delete a SINGLE meeting on /meeting/<id> DELETE', (done) => {
        chai.request(url)
            .delete('/meetings/3')
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                done();
            });
    });
});