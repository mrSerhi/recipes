// index.js is a global contsoller
import { elements, spinner, clearSpinner } from "./views/base";
import * as searchView from "./views/searchView";
import Search from "./models/Search";
import Recipe from "./models/Recipe";

/** Global state of app:
 *  1.Search obj
 *  2.Current recipe obj
 *  3.Shopping list obj
 *  4.Liked recipes
 */
const state = {};

/**
 * Search Controller
 */
async function controlSearch() {
  // 1) get query from view
  const query = searchView.getInputValue(); // must be fn or method

  if (query) {
    // 2) create new Search obj and save in state
    state.search = new Search(query);

    // 3)prepare UI for display results (cliar input fieald and results list before new search query)
    searchView.clearInputFieald();
    searchView.clearResults();
    spinner(elements.result); // display spinner when data loading from server

    // 4)search for recipes
    await state.search.getResults();

    // 5)render results on UI
    clearSpinner();
    searchView.renderResults(state.search.result);
  }
}

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

elements.pagination.addEventListener("click", e => {
  let targetButton = e.target.closest(".btn-inline");
  const currentState = state.search.result;

  if (targetButton) {
    try {
      const dataAttr = +targetButton.dataset.goto; // number of page
      searchView.clearResults(); // at now clear results and pagination
      searchView.renderResults(currentState, dataAttr);
    } catch (e) {
      console.error(e);
    }
  }
});

/**
 * Recipe controller
 */
  const recipe = new Recipe(46956);
  // recipe.getRecipe();
  // console.log(recipe)