import { elements } from "./base";
import Fraction from "fraction.js";

// formating count number with fraction
function formatCount(count) {
  // ex. count = 2.5 --> Fraction --> 2 1/2
  // ex. count = 0.5 --> Fraction --> 1/2
  if (count) {
    const [int, dec] = count
      .toString()
      .split(".")
      .map(num => +num);

    if (!dec) return count; // ex. 2
    if (int === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`; // ex. 1/2
    } else {
      const fr = new Fraction(count - int); // 2.5 - 2
      return `${int} ${fr.numerator}/${fr.denominator}`; // 2 1/2
    }
  }

  return "?";
}

function createIngredient(ingrObj) {
  return `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingrObj.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingrObj.unit}</span>
            ${ingrObj.ingredient}
        </div>
    </li>
    `;
}

export const renderRecipe = recipeObj => {
  const template = `
    <figure class="recipe__fig">
        <img src="${recipeObj.imgUrl}" alt="${
    recipeObj.title
  }" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipeObj.title}</span>
        </h1>
    </figure>

    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipeObj.cookingTime
            }</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipeObj.serving
            }</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
    </div>

    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipeObj.ingredients.map(createIngredient).join("")}
        </ul>

        <button class="btn-small recipe__btn">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${
              recipeObj.author
            }</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${
          recipeObj.sourceUrl
        }" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>
        </a>
    </div>
    `;
  elements.recipe.insertAdjacentHTML("afterbegin", template);
};

export const clearRecipe = () => {
  elements.recipe.innerHTML = "";
};
