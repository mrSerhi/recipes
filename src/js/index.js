// index.js is a global contsoller
import elements from "./views/base";
import * as searchView from "./views/searchView";

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
  const query = searchView.getInputValue(); // must be fn or method

  if (query) {
    // 2) create new Search obj and save in state
    state.search = new Search(query);
    // 3)prepare UI for display results (cliar input fieald and results list before new search query)
    searchView.clearInputFieald();
    searchView.clearResults();
    // 4)search for recipes
    await state.search.getResults();
    // 5)render results on UI
    // searchView.renderResults(state.search.result);
  }
}
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
