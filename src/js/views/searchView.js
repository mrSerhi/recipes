import elements from "./base";

function renderRecipe(recipe) {
  const markup = `
    <li>
        <a class="results__link" href="${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="${recipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
`;
  elements.resultList.insertAdjacentElement('beforeend', markup);
}

export const getInputValue = () => elements.searchFormInput.value;
export const clearInputFieald = () => {
  elements.searchFormInput.value = '';
};
export const renderResults = recipes => {
  recipes.forEach(renderRecipe);
};
export const clearResults = () => {
  elements.resultList.innerHTML = '';
};
