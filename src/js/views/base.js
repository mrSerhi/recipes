function getElementNode(node) {
  return document.querySelector(`.${node}`);
}

const elementsClassString = {
  loader: "loader"
};

export const elements = {
  searchForm: getElementNode("search"),
  searchFormInput: getElementNode("search__field"),
  result: getElementNode("results"),
  resultList: getElementNode("results__list"),
  pagination: getElementNode("results__pages"),
  recipe: getElementNode("recipe"),
  shopingList: getElementNode("shopping__list"),
  likesField: getElementNode("likes__field"),
  likesMenu: getElementNode("likes__list")
};

export const spinner = parent => {
  const template = `
    <div class="${elementsClassString.loader}">
      <svg>
        <use href="img/icons.svg#icon-cw"></use>
      </svg>
    </div>
  `;
  parent.insertAdjacentHTML("afterbegin", template);
};

export const clearSpinner = () => {
  const loader = getElementNode(elementsClassString.loader);
  // if set up loader when removing
  if (loader) loader.remove();
};

/* explanation:
  const title = 'the big pizza with tomattos';
  0 + cur.length(the) = 3 <= 17 - ['the']
  3 + cur.length(big) = 6 <= 17 - ['the', 'big']
  6 + cur.length(pizza) = 11 <= 17 - ['the', 'big', 'pizza']
  11 + cur.length(with) = 15 <= 17 - ['the', 'big', 'pizza', 'with']
  11 + cur.length(tomattos) = 23 <= 17 - return 11 + 8 (23)
*/
export function trimTitleOflimit(title, max = 17) {
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
