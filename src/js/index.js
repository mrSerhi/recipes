// index.js is a global contsoller
import { elements, spinner, clearSpinner } from "./views/base";

import Search from "./models/Search";
import Recipe from "./models/Recipe";
import Like from "./models/Likes";
import ShopingList from "./models/ShopingList";

import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as shopingListView from "./views/shopingListView";
import * as likeView from "./views/likeView";

/** Global state of app:
 *  1.Search obj
 *  2.Current recipe obj
 *  3.Shopping list obj
 *  4.Liked recipes
 */
const state = {};
window.s = state; // for debugging

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
      recipeView.renderRecipe(state.recipe, state.like.isLiked(ID));

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
  let target = e.target;

  if (target.matches(".btn-decrease, .btn-decrease *")) {
    // decrease is clicked
    if (state.recipe.serving > 1) {
      state.recipe.updatingServings("dec");
      recipeView.updateServingUI(state.recipe);
    }
  } else if (target.matches(".btn-increase, .btn-increase *")) {
    // increase is clicked
    state.recipe.updatingServings("inc");
    recipeView.updateServingUI(state.recipe);
  } else if (target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    // add ingredients to the shopping list
    controlShopingList();
  } else if (target.matches(".recipe__love, .recipe__love *")) {
    controlLike();
  }
});

// hendle restoring likes from localStorage on load
window.addEventListener("load", () => {
  state.like = new Like(); // empty

  // get likes from storage
  state.like.readLikesFromStorage(); // fill likes[] of likes from storage

  // hide/show btn from IU
  likeView.toggleHeartLikeMenu(state.like.getNumberOfLikes());

  // rendering each liked recipe
  state.like.likes.forEach(like => likeView.renderLikeMenu(like));
});

// LIKE CONTROLLER
function controlLike() {
  if (!state.like) state.like = new Like();

  // we are needed for two stages in our like:
  // 1. when we're cliked on btn and save recipe
  // 2. when clicked in the next time - remove recipe from likes list (ex. toggle)
  const currentId = state.recipe.id;

  if (!state.like.isLiked(currentId)) {
    // User has NOT yet liked current recipe
    // 1. Add like to the state
    const like = state.like.addLike(
      state.recipe.id,
      state.recipe.title,
      state.recipe.author,
      state.recipe.imgUrl
    );

    // 2. Toggle the like btn
    likeView.toggleLikeBtn(true);

    // 3. Add like to the UI list
    likeView.renderLikeMenu(like);
  } else {
    // User Has liked current recipe
    // 1. remove like from the state
    state.like.deleteLike(currentId);

    // 2. Toggle the like btn
    likeView.toggleLikeBtn(false);

    // 3. remove like from the UI list
    likeView.removeLikeFromMenu(currentId);
  }
  likeView.toggleHeartLikeMenu(state.like.getNumberOfLikes());
}

// ShopingList controller
// window.l = new ShoppingList(); // for debugging
function controlShopingList() {
  // create a new list if there in none yet
  if (!state.shopingList) state.shopingList = new ShopingList(); // items []

  // add each recipe like item to the shopingList with addaddItems() method
  state.recipe.ingredients.forEach(el => {
    const item = state.shopingList.addItems(el.count, el.unit, el.ingredient); // item will be added in items-array and returns where we render it in UI
    shopingListView.renderItem(item);
  });
}

// handle dalete and update for shopind items
elements.shopingList.addEventListener("click", e => {
  let target = e.target;
  // should read id from each item
  let id = target.closest(".shopping__item").dataset.itemid;

  // handle the delete button
  if (target.matches(".shopping__delete, .shopping__delete *")) {
    // delete from state
    state.shopingList.deleteItem(id);

    // delete from UI
    shopingListView.deleteItem(id);
  } else if (target.matches(".shopping__count-value")) {
    // handle cound update
    const val = parseFloat(target.value, 10);
    state.shopingList.updateCount(id, val);
  }
});
