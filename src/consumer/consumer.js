const request = require('superagent');

//const API_ENDPOINT = `${API_HOST}:${API_PORT}`;

class Consumer {
  async fetchDate(API_ENDPOINT, givenDate) {
    try {
      return await request.get(
        `${API_ENDPOINT}/provider/validDate?date=${givenDate}`
      );
    } catch (err) {
      return err.response;
    }
  }

  async getDetails(API_ENDPOINT, givenDate) {
    const response = await this.fetchDate(API_ENDPOINT, givenDate);
    if (response == undefined) {
      return response;
    }else{
      return {
        date: response.body.date,
        expiry: 'lifetime',
        count: response.body.count * 0.5
      }
     }
    }
}

const consumer = new Consumer();
module.exports = { Consumer: consumer };
