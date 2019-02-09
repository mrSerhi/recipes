import { elements } from "./base";

/**
 *
 * @param {Boolean} isToggled if toogle - true else false
 * @returns undefined
 */
export const toggleLikeBtn = isToggled => {
  // <use href="img/icons.svg#icon-heart-outlined"></use>
  const svgStr = isToggled ? "icon-heart" : "icon-heart-outlined";

  document
    .querySelector(".recipe__love use")
    .setAttribute("href", `img/icons.svg#${svgStr}`);
};

/**
 *
 * @param {Number} numOfLikes
 */
export const toggleHeartLikeMenu = numOfLikes => {
  elements.likesField.getElementsByClassName.visibility =
    numOfLikes > 0 ? "" : "hidden";
};

/**
 * Rendering menu of likes in UI
 * @param {Object} like
 */
export const renderLikeMenu = like => {
  const template = `
    <li>
      <a class="likes__link" href="${like.id}">
          <figure class="likes__fig">
              <img src="${like.img}" alt="${like.title}">
          </figure>
          <div class="likes__data">
              <h4 class="likes__name">${like.title}</h4>
              <p class="likes__author">${like.author}</p>
          </div>
      </a>
    </li>
  `;
  elements.likesMenu.insertAdjacentHTML("beforeend", template);
};

/**
 * Removing parent ele-t <Li> from like list in UI
 * @param {Number} id
 */
export const removeLikeFromMenu = id => {
  const element = document.querySelector(`.likes__link[href*="${id}"]`)
    .parentElement;
  if (element) element.remove();
};
