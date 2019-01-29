import { APIKEY, proxy } from "../config";
const axios = require("axios");

class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const response = await axios(
        `${proxy}https://www.food2fork.com/api/search?key=${APIKEY}&q=${this.query}`
      );
      this.result = response.data.recipes;
      // this.result = response;
    } catch (e) {
      console.error(e);
    }
  }
}

export default Search;
