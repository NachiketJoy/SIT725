const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

const Profile = require('../server/models/profileModel');

chai.use(chaiHttp);

describe('Profile API', () => {

    // Test to check the correct profile details
    it('should get the correct profile details', (done) => {
        chai.request(app)
            .get('/api/profiles')
            .end((err, res) => {
                const profileDetails = res.body[0];
                if (err) {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').that.is.equal('An error occurred!!');
                } else {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.be.greaterThan(0);
                    expect(profileDetails).to.have.property('name').that.equals('Nachiket Joyekurun');
                    expect(profileDetails).to.have.property('studentID').that.equals('S224794365');
                }
                done();
            });
    });

});
