const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

const Task = require('../server/models/taskModel');

chai.use(chaiHttp);

// ensure there is no data in the database before
before(async () => {
    try {
        await Task.deleteMany({});
    } catch (err) {
        console.error('Error clearing tasks:', err);
    }
});

// after(async () => {
//     try {
//         await Task.deleteMany({}); 
//     } catch (err) {
//         console.error('Error clearing tasks:', err);
//     }
// });

describe('Task API', () => {

    // Check if database have no task
    it('should have 0 Task in the db', (done) => {
        chai.request(app)
            .get('/api/tasks')
            .end((err, res) => {
                expect(res.status).to.equal(200)
                expect(res.body).to.be.a('array');
                expect(res.body).to.have.lengthOf(0)
                // console.log('Task Length: ', res.body.length);
                done();
            });
    })

    // Test to create a task 
    it('should create a Task in the db', (done) => {
        const newTask = { title: 'Test Task', description: 'This is a test task for 6.1D' }
        chai.request(app)
        .post('/api/tasks')
        .send(newTask)
        .end((err, res) => {
            if (err) {
                expect(res).to.have.status(500);
                expect(res.body).to.have.property('message').that.is.equal('An error occurred!!');
            } else {
                expect(res).to.have.status(200);
                expect(res.body.title).to.equal('Test Task');
            }
            done();
        });
    })

    // Test to get all tasks from database
    it('should get all tasks', (done) => {
        chai.request(app)
            .get('/api/tasks')
            .end((err, res) => {
                if (err) {
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message').that.is.equal('An error occurred!!');
                } else {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                }
                done();
            });
    });

    // Test to delete a specific task 
    it('should delete a task in the db', (done) => {
        const taskID = '6760d94ef620a1563a06b760';
            chai.request(app)
            .delete(`/api/task/${taskID}`)
            .end((err, res) => {
                if (err) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').that.is.equal('Task not found!!');
                } else {
                    expect(res).to.have.status(200);
                    done();
                }
            });
    })

    // Test for missing field
    it('should get error when there is a mising field', (done) => {
        const incompleteTask = { title: '', description: 'Test'};
        chai.request(app)
            .post('/api/tasks')
            .send(incompleteTask)
            .end((err, res) => {
                if (err) {
                    expect(res).to.have.status(500);
                } else {
                    expect(incompleteTask.title).to.be.empty;
                    expect(res).to.have.status(400);
                }
                done();
            });
    });
});
