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
  pagination: getElementNode("results__pages")
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
