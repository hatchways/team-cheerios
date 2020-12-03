const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app.js");
const mongoose = require("mongoose");
const Poll = require("../models/pollModel.js");

const { expect } = chai;

chai.should();
chai.use(chaiHttp);

describe("Polls ", () => {
  let token;
  const user = {
    email: "althaf@althaf.com",
    password: "testing1",
  };
  const newPoll = {
    question: "Which one is better?",
    images: [],
    friendsListId: "",
  };
  const aFriendsPoll = {

  };
  beforeEach((done) => {
    chai
      .request(app)
      .post("/api/auth")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.token;
        done();
      });
  });

  it("Create a new poll", (done) => {
    chai
      .request(app)
      .post("/poll")
      .send(poll)
      .set("x-auth-token", `${token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        res.shoud.have.status(200);
      });
  });

  it("Get my polls with 200", (done) => {
    chai
      .request(app)
      .get("/poll")
      .set("x-auth-token", `${token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        res.should.have.status(200);
        done();
      });
  });
});
