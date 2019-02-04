// const uniqid = require('uniqid');
import uniqid from "uniqid";

class ShopingList {
  constructor() {
    this.items = [];
  }

  addItems(count, unit, ingredient) {
    // for each of items needs unique ID, for this case we use lib 'uniqid'
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };

    this.items.push(item);
    return item;
  }

  deleteItem(ID) {
    const index = this.items.findIndex(el => el.id === ID);

    this.items.splice(index, 1);
  }

  updateCount(ID, newCount) {
    this.items.find(el => el.id === ID).count = newCount;
  }
}

export default ShopingList;
