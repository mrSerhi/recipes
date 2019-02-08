import { elements } from "./base";

export const renderItem = item => {
  const template = `
    <li class="shopping__item" data-itemid=${item.id}>
      <div class="shopping__count">
          <input class="shopping__count-value" type="number" value="${
            item.count
          }" step="${item.count}">
          <p>${item.unit}</p>
      </div>
      <p class="shopping__description">${item.ingredient}</p>
      <button class="shopping__delete btn-tiny">
          <svg>
              <use href="img/icons.svg#icon-circle-with-cross"></use>
          </svg>
      </button>
    </li>
    `;

  elements.shopingList.insertAdjacentHTML("beforeend", template);
};

export const deleteItem = ID => {
  const item = document.querySelector(`[data-itemid="${ID}"]`);

  if (item) item.parentElement.removeChild(item);
};
