const { reset } = require("../db/reset");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

// Tests
// 1) Create two users : main user and user's friend
// 2) Send a follow request to user's friend using main user's token
// 3) Accept the request using friends token
// 4) Create new friendslist
// 5) Create new poll
// 6) Get poll with data
// 7) Get poll using id
// 8) Get invited polls (using friends token)
// 9) Edit poll (update poll)
// 10) Delete poll

const expectToBe = (body, actual) => {
  expect(body).to.satisfy((arr) =>
    arr.some((poll) => expect(poll).to.deep.include(actual))
  );
};

reset()
  .then((res) => console.log(res))
  .then(
    describe("Polls ", () => {
      let userToken;
      let friendToken;
      let friendId;
      let userId;
      let pollId;
      const user = {
        name: "Red John",
        email: "john@john.com",
        password: "testing1",
      };
      const userFriend = {
        name: "David",
        email: "david@daivd.com",
        password: "testing1",
      };

      const newFriendsList = {
        users: [],
        title: "Work friends",
      };

      const newPoll = {
        question: "Which one is better?",
        friendsListId: "",
        images: [],
      };
      const updatedQuestion = "Which shoes are better?";

      before((done) => {
        chai
          .request(app)
          .post("/api/users")
          .send(user)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            res.body.should.have.property("user");
            res.body.user.should.have.property("email").eql(user.email);
            res.body.should.have.property("token");
            res.body.user.should.have.property("_id");
            userId = res.body.user._id;
            userToken = res.body.token;
            done();
          });
      });

      it("Create a friend user", (done) => {
        chai
          .request(app)
          .post("/api/users")
          .send(userFriend)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            res.body.should.have.property("user");
            res.body.user.should.have.property("email").eql(userFriend.email);
            res.body.should.have.property("token");
            res.body.user.should.have.property("_id");
            friendId = res.body.user._id;
            friendToken = res.body.token;
            done();
          });
      });

      it("Send a friend request", (done) => {
        chai
          .request(app)
          .post(`/friends/follow/${friendId}`)
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            done();
          });
      });

      it("Accept the friend request as friend", (done) => {
        chai
          .request(app)
          .post(`/friends/accept/${userId}`)
          .set("x-auth-token", `${friendToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            newFriendsList.users.push(friendId);
            done();
          });
      });

      it("Create a new friends list", (done) => {
        chai
          .request(app)
          .post("/friends-list")
          .send(newFriendsList)
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            res.should.have.status(201);
            done();
          });
      });

      it("Get my friends lists", (done) => {
        chai
          .request(app)
          .get("/friends-list")
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            expect(err).to.be.null;

            res.should.have.status(200);
            expect(res.body).to.be.an("array");
            //TODO: more comparisions
            expect(res.body).to.have.lengthOf(1);
            newPoll.friendsListId = res.body[0]._id;
            done();
          });
      });

      it("Create a new poll", (done) => {
        chai
          .request(app)
          .post("/poll")
          .send(newPoll)
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
            done();
          });
      });

      it("Get my polls", (done) => {
        chai
          .request(app)
          .get("/poll")
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.lengthOf(1);
            expectToBe(res.body, newPoll);
            pollId = res.body[0]._id;
            done();
          });
      });

      it("Get poll by ID", (done) => {
        chai
          .request(app)
          .get(`/poll/${pollId}`)
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.lengthOf(1);
            expect(res.body[0]).to.deep.include(newPoll);
            done();
          });
      });

      it("Get polls by user", (done) => {
        chai
          .request(app)
          .get(`/poll/user/${userId}`)
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expectToBe(res.body, newPoll);
            done();
          });
      });

      it("Get my polls with user data", (done) => {
        chai
          .request(app)
          .get("/poll/me/data")
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            const users = res.body[0].friendsList.users;
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expectToBe(res.body, newPoll);
            expect(users[0]).to.include.all.keys("_id", "name", "image");
            done();
          });
      });

      it("Update poll", (done) => {
        chai
          .request(app)
          .put(`/poll/${pollId}`)
          .set("x-auth-token", `${userToken}`)
          .send({question: updatedQuestion})
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.include({
              _id: pollId,
              question : updatedQuestion, 
            });
            newPoll.question = updatedQuestion
            done();
          });
      });

      it("Get invited polls", (done) => {
        chai
          .request(app)
          .get(`/poll/me/invited`)
          .set("x-auth-token", `${friendToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expectToBe(res.body, newPoll);
            done();
          });
      });

      it("Delete polls", (done) => {
        chai
          .request(app)
          .delete(`/poll/${pollId}`)
          .set("x-auth-token", `${userToken}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.have.property("message");
            expect(res.body.message).eql("Successfully deleted Poll");
            done();
          });
      });
    })
  )
  .catch((err) => console.log(err));
