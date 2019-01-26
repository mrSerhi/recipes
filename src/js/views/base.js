const elements = {
  searchForm: getElementNode("search"),
  searchFormInput: getElementNode("search__field"),
  resultList: getElementNode('results__list')
};

function getElementNode(node) {
  return document.querySelector(`.${node}`);
}

export default elements;
