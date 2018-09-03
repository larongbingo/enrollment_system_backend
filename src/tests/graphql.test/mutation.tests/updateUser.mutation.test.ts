import { expect, request } from 'chai';
import { inspect } from 'util';
import { Server } from 'http';
import 'mocha';

import { UserAttributes } from '@database/index';

export function updateUserMutationTest(server: Server) {
  describe('updateUser Mutation Test', function() {
    let user: UserAttributes = {
      firstName: 'testUser',
      middleName: 'testUser',
      lastName: 'testUser',

      username: 'testUser',
      password: 'testUser'
    };

    // Add a user
    before(function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=mutation{createUser(userDetails:${inspect(user).replace(/([\'])/g, '"')})}`)
        .then(async req => expect(req.body.data.createUser.success).to.be.equal(true))
        .then(() => done())
        .catch(err => done(err));
      })();
    });

    // LogIn
    let _token: string = '';
    beforeEach(function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=mutation{logIn(username:"${user.username}",password:"${user.password}")}`)
        .then(async (req) => { _token = req.body.data.logIn.data.token; })
        .then(async () => done())
        .catch(err => {console.log(err); done(err)});  
      })();
    });

    it('identify that the token is invalid', function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=mutation{updateUser(update:${inspect(user).replace(/([\'])/g, '"')}, token:"ASDASD")}`)
        .then(async req => expect(req.body.data.updateUser.success).to.be.equal(false))
        .then(() => done())
        .catch(err => done(err)); 
      })();
    });

    it('updates the firstName, middleName, and lastName to "This is a test"', function(done) {
      user.firstName = user.middleName = user.lastName = "This is a test";

      (async function() {
        await request(server)
        .post(`/api?query=mutation{updateUser(update:${inspect(user).replace(/([\'])/g, '"')}, token: "${_token}")}`)
        .then(async req => expect(req.body.data.updateUser.data.updatedDetails.firstName).to.be.equal("This is a test"))
        .then(() => done())
        .catch(err => done(err));
      })();
    });

    it('can find the user when queried for their firstName, middleName, and lastName at User Query', function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=query{Users(firstName:"${user.firstName}",middleName:"${user.middleName}",lastName:"${user.lastName}"){id}}`)
        .then(async req => expect(req.body.data.Users.length).to.not.be.equal(0))
        .then(() => done())
        .catch(err => done(err));
      })();
    });

    it('updates the username and password to "This is a test"', function(done) {
      user.username = user.password = "This is a test";

      (async function() {
        await request(server)
        .post(`/api?query=mutation{updateUser(update:${inspect(user).replace(/([\'])/g, '"')},token:"${_token}")}`)
        .then(async req => expect(req.body.data.updateUser.success).to.be.equal(true))
        .then(() => done())
        .catch(err => done(err));
      })();
    });

    it('recieves a proper token using "This is a test" for login', function(done) {
      (async function() {
        await request(server)
        .post(`/api?query=mutation{logIn(username:"${user.username}",password:"${user.password}")}`)
        .then(async req => expect(req.body.data.logIn.success).to.be.equal(true))
        .then(() => done())
        .catch(err => done(err));
      })();
    });
  });
}