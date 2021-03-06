import { elements, trimTitleOflimit } from "./base";

function renderRecipe(recipe) {
  const markup = `
    <li>
        <a class="results__link" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${trimTitleOflimit(recipe.title)}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
`;
  elements.resultList.insertAdjacentHTML("beforeend", markup);
}

/**
 *
 * @param {Number} page : number of page
 * @param {String} direction : must be 'prev' or 'next'
 * data-goTo for added event-handler in the fuature
 */
function renderButton(page, direction) {
  return `
    <button class="btn-inline results__btn--${direction}" data-goto=${
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
 * @param {Number} page : number of the page
 * @param {Number} numOfResults : amount of the returns recipes
 * @param {Number} limit : amount of the visibility recipes in the page
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

/**
 * fn for pagination
 * @param {Array} recipes array of objects from API
 * @param {Number} page number of page
 * @param {Number} limit results on page
 */
export const renderResults = (recipes, page = 1, limit = 10) => {
  // render of current page
  const start = (page - 1) * limit; // 0 or 10 or 20 or 30...
  const end = page * limit; // 10 or 20 or 30...
  recipes.slice(start, end).forEach(renderRecipe);
  // render pagination button(s)
  renderPaginationButtons(page, recipes.length, limit);
};

export const getInputValue = () => elements.searchFormInput.value;

export const clearInputFieald = () => {
  elements.searchFormInput.value = "";
};

export const clearResults = () => {
  elements.resultList.innerHTML = "";
  elements.pagination.innerHTML = "";
};
// selected unselected recipe
export const selectedRecipe = id => {
  const arrayFromRecipesNodes = Array.from(
    document.querySelectorAll(".results__link")
  );

  arrayFromRecipesNodes.forEach(el => {
    el.classList.remove("results__link--active");
  });

  document
    .querySelector(`.results__link[href*="${id}"]`)
    .classList.add("results__link--active");
};
