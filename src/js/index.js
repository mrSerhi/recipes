// API key 00d3c700655c1e829d1f56184ce8fdb2
// serach https://www.food2fork.com/api/search

const axios = require("axios");

// async function getResults(q) {
//   const APIKEY = `00d3c700655c1e829d1f56184ce8fdb2`;
//   let query = await fetch(
//     `https://www.food2fork.com/api/search?key=${APIKEY}&q=${q}`
//   );
//   try {
//     let result = await query.json();
//     let recipes = result => console.log(response.data.recipes);
//     recipes(result);
//   } catch (e) {
//     console.log(e);
//   }
// }
// getResults("chicken breast");

function getResults(q) {
  const APIKEY = `00d3c700655c1e829d1f56184ce8fdb2`;
  axios(`https://www.food2fork.com/api/search?key=${APIKEY}&q=${q}`)
    .then(response => console.log(response.data.recipes))
    .catch(e => console.log(e));
}
// getResults("chicken breast");
