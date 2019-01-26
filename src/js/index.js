// index.js is a global contsoller
import Search from "./models/Search";

/** Global state of app:
 *  1.Serach obj
 *  2.Current recipe obj
 *  3.Shopping list obj
 *  4.Liked recipes
 */
const state = {};

async function controlSearch() {
  // 1) get query from view
  const query = "pizza"; // must be fn or method
  if (query) {
    // 2) create new Search obj and save in state
    state.search = new Search(query);
    // 3)prepare UI for display results

    // 4)search for recipes
    await state.search.getResults();

    // 5)render results on UI
    // console.log(state.search.result)
    console.log(state.search.result.status);
  }
}
document.querySelector(".search").addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
