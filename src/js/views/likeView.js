import { elements } from './base';

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
  elements.likesField.getElementsByClassName.visibility = numOfLikes > 0 ? '' : 'hidden';
};