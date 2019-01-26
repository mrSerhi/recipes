const axios = require("axios");

class Search {
  constructor(query) {
    this.query = query;
  }

  // getResults() {
  //   const APIKEY = `00d3c700655c1e829d1f56184ce8fdb2`;
  //   // return promise
  //   return axios(`https://www.food2fork.com/api/search?key=${APIKEY}&q=${this.query}`)
  //     .then(response => {
  //       // this.result = response.data.recipes;
  //       this.result = response;
  //     })
  //     .catch(e => console.log(e));
  // }

  async getResults() {
    const APIKEY = `00d3c700655c1e829d1f56184ce8fdb2`;
    try {
      const response = await axios(
        `https://www.food2fork.com/api/search?key=${APIKEY}&q=${this.query}`
      );
      this.result = response;
    } catch (e) {
      console.error(e);
    }
  }
}

export default Search;
