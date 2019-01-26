const axios = require("axios");

class Search {
  constructor(query) {
    this.query = query;
  }

  getResults() {
    const APIKEY = `00d3c700655c1e829d1f56184ce8fdb2`;
    axios(`https://www.food2fork.com/api/search?key=${APIKEY}&q=${this.query}`)
      .then(response => {
        this.result = response.data.recipes;
        // console.info(this.result);
      })
      .catch(e => console.log(e));
  }
}

export default Search;
