const request = require("request");
const assert = require("assert");
const { PORT } = require("../app/bootstrap");

describe("POST /tasks", () => {
  it("returns 200 OK", (done) => {
    const data = {
      id: "1",
      title: "New task #1",
      description: "This is a new task #1",
    };

    const options = {
      url: `http://localhost:${PORT}/api/tasks`,
      json: data,
    };

    request.post(options, (err, res) => {
      assert.ifError(err);
      assert.equal(res.statusCode, 200);
      done();
    });
  });
});

it("returns 400 Bad Request for invalid task data", (done) => {
  const invalidData = {
    // Missing 'description' field
  };

  const options = {
    url: `http://localhost:${PORT}/api/tasks`,
    json: invalidData,
  };

  request.post(options, (err, res) => {
    assert.ifError(err);
    assert.equal(res.statusCode, 400);
    done();
  });
});
