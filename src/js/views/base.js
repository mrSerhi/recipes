const elements = {
  searchForm: getElementNode("search"),
  searchFormInput: getElementNode("search__field")
};

function getElementNode(node) {
  return document.querySelector(`.${node}`);
}

export default elements;
