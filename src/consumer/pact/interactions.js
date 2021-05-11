const { somethingLike: like, term } = require("@pact-foundation/pact").Matchers;
const dateRegex =
  '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\+|\\-)\\d{2}:\\d{2}'
const EXPECTED_BODY = {
  test: "NO",
  validDate: term({generate:"2018-11-29T15:45:45+00:00", matcher: dateRegex}),
  count: like(5)
};

const EXPECTED_BODY_NULL_DATE = { error: "validDate is required" };

module.exports = {
  validDate: {
    state: "Valid Date",
    uponReceiving: "a request for JSON data",
    withRequest: {
      method: "GET",
      path: "/provider/validDate",
      query: { date: "2021-05-13" }
    },
    willRespondWith: {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: EXPECTED_BODY
    }
  },

  invalidDate: {
    state: "Null Date",
    uponReceiving: "a request for JSON data",
    withRequest: {
      method: "GET",
      path: "/provider/validDate",
      query: { date: "" }
    },
    willRespondWith: {
      status: 400,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: EXPECTED_BODY_NULL_DATE
    }
  }
};
