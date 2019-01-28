import { elements } from "./base";

function renderRecipe(recipe) {
  const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${trimRecipeTitle(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
`;
  elements.resultList.insertAdjacentHTML("beforeend", markup);
}

/* explanation:
  const title = 'the big pizza with tomattos';
  0 + cur.length(the) = 3 <= 17 - ['the']
  3 + cur.length(big) = 6 <= 17 - ['the', 'big']
  6 + cur.length(pizza) = 11 <= 17 - ['the', 'big', 'pizza']
  11 + cur.length(with) = 15 <= 17 - ['the', 'big', 'pizza', 'with']
  11 + cur.length(tomattos) = 23 <= 17 - return 11 + 8 (23)
*/
function trimRecipeTitle(title, max = 17) {
  const trimedTitle = [];
  if (title.length > max) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= max) {
        trimedTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${trimedTitle.join(" ")}...`;
  }
  return title;
}

/**
 *
 * @param {number} page : number of page
 * @param {string} direction : must be 'prev' or 'next'
 * data-goTo for added event-handler in the fuature
 */
function renderButton(page, direction) {
  return `
    <button class="btn-inline results__btn--${direction}" data-goTo=${
    direction === "prev" ? page - 1 : page + 1
  }>
      <svg class="search__icon">
          <use href="img/icons.svg#icon-triangle-${
            direction === "prev" ? "left" : "right"
          }">
          </use>
      </svg>
      <span>Page ${direction === "prev" ? page - 1 : page + 1}</span>
    </button>
  `;
}

/**
 *
 * @param {number} page : number of the page
 * @param {number} numOfResults : amount of the returns recipes
 * @param {number} limit : amount of the visibility recipes in the page
 */
function renderPaginationButtons(page, numOfResults, limit) {
  // how many pages we have
  const pages = Math.ceil(numOfResults / limit); // 30 / 10 = 3 or 75 / 10 = 8
  let button;

  if (page === 1 && pages > 1) {
    // only button to next
    button = renderButton(page, "next");
  } else if (page < pages) {
    // both of buttons
    button = `
      ${renderButton(page, "prev")}
      ${renderButton(page, "next")}
    `;
  } else if (page === pages && pages > 1) {
    // only button to prev
    button = renderButton(page, "prev");
  }

  elements.pagination.insertAdjacentHTML("afterbegin", button);
}

export const getInputValue = () => elements.searchFormInput.value;
export const clearInputFieald = () => {
  elements.searchFormInput.value = "";
};

/**
 * fn for pagination
 * @param {object} recipes from API
 * @param {number} page number of page
 * @param {number} limit results on page
 */
export const renderResults = (recipes, page = 1, limit = 10) => {
  // render of current page
  const start = (page - 1) * limit;
  const end = page * limit;
  recipes.slice(start, end).forEach(renderRecipe);
  // render pagination button(s)
  renderPaginationButtons(page, recipes.length, limit);
};
export const clearResults = () => {
  elements.resultList.innerHTML = "";
};
