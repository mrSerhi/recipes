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

/* explanation
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

export const getInputValue = () => elements.searchFormInput.value;
export const clearInputFieald = () => {
  elements.searchFormInput.value = "";
};
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
export const clearResults = () => {
  elements.resultList.innerHTML = "";
};
