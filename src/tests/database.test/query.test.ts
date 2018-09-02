import { expect, request } from 'chai';
import { inspect } from 'util';
import { Server } from 'http';
import 'mocha';

import { UserAttributes, Models } from '@database/index';

export function queryTest(server: Server) {
  describe('Query Tests', function() {
    describe('user.query tests', function() {
      const admin: UserAttributes = {
        firstName: 'admin',
        middleName: 'admin',
        lastName: 'admin',
        username: 'admin',
        password: 'admin'
      };

      before(function(done) {
        (async function() {
          await request(server)
          .post(`/api?query=mutation{createUser(userDetails:${inspect(admin).replace(/([\'])/g, '"')})}`)
          .then(() => done())
          .catch(done);
        })();
      });

      after(function(done) {
        (async function() {
          await Models.Users.findOne({ where: { username: admin.username } })
          .then(user => user!.destroy())
          .then(() => done())
          .catch(done);
        })();
      });

      it('find ONE user, firstname is "admin"', function(done) {
        (async function() {
          await request(server)
          .post(`/api?query=query{Users(firstName:"${admin.firstName}"){id}}`)
          .then(req => expect(req.body.data.Users.length).to.be.equal(1))
          .then(() => done())
          .catch(done);
        })();
      });

      it('finds any user/s, where the firstname contains letter "a"', function(done) {
        (async function() {
          await request(server)
          .post(`/api?query=query{Users(firstName:"a"){id}}`)
          .then(req => expect(req.body.data.Users.length).to.not.be.equal(0))
          .then(() => done())
          .catch(done);
        })();
      });
    });
  });
}