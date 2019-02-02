// index.js is a global contsoller
import { elements, spinner, clearSpinner } from "./views/base";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";

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
    spinner(elements.result); // display spinner when data loading from server, in arg must have parent element

    try {
      // 4)search for recipes
      await state.search.getResults();

      // 5)render results on UI
      clearSpinner();
      searchView.renderResults(state.search.result);
    } catch (e) {
      clearSpinner(); // clear sppinner even we have an error
      console.warn("Some error in controlSearch fn", e);
    }
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
      console.warn("Something wrong in pagination handler", e);
    }
  }
});

/**
 * Recipe controller
 */

async function controlRecipe() {
  // get to id from URL(hash)
  const ID = window.location.hash.replace("#", ""); // pure number
  if (ID) {
    // prepaire UI for changes
    recipeView.clearRecipe();
    spinner(elements.recipe);

    // highlite selected recipe item
    if (state.search) searchView.selectedRecipe(ID);

    // create new Pecipe obj and save in state
    state.recipe = new Recipe(ID);

    try {
      // get data from API
      await state.recipe.getRecipe();

      // call methods from recipe class for cacl and parse
      state.recipe.calcCookingTime();
      state.recipe.calcServingsPersons();
      state.recipe.parseIngredients();

      // render Recipe view
      clearSpinner();
      recipeView.clearRecipe();
      recipeView.renderRecipe(state.recipe);

      // console.log(state.recipe);
    } catch (e) {
      clearSpinner();
      console.warn("Something wrong in controlRecipe fn...", e);
    }
  }
}

/*
we may needed to see result even user add page to bookmark and reopen 
with selected recipes hash. For this cases we use event 'load'. When hash not selected
event do not hired, because event 'hashchange' will be hired when hash is changes
*/
["hashchange", "load"].forEach(e => window.addEventListener(e, controlRecipe));

elements.recipe.addEventListener("click", e => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // decrease is clicked
    if (state.recipe.serving >= 1) {
      state.recipe.updatingServings("dec");
      recipeView.updateServingUI(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    // increase is clicked
    state.recipe.updatingServings("inc");
    recipeView.updateServingUI(state.recipe);
  }
  console.log(state.recipe);
});
