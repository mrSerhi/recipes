import { APIKEY, proxy } from "../config";
import axios from "axios";

class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const response = await axios(
        `${proxy}https://www.food2fork.com/api/get?key=${APIKEY}&rId=${this.id}`
      );
      this.title = response.data.recipe.title;
      this.author = response.data.recipe.publisher;
      this.imgUrl = response.data.recipe.image_url;
      this.sourceUrl = response.data.recipe.source_url;
      this.ingredients = response.data.recipe.ingredients;
    } catch (e) {
      console.warn("Some error in getRecipe fn", e);
    }
  }

  calcCookingTime() {
    // imagine, we have a 15 min for cooking for each 3 ingredients
    const numOfIng = this.ingredients.length;
    const periods = Math.ceil(numOfIng / 3);
    this.cookingTime = periods * 15;
  }

  calcServingsPersons() {
    this.serving = 4;
  }

  parseIngredients() {
    // parse getting ingregient from server on longest unit and replace their on short
    const unitLongest = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds"
    ];
    const unitShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound"
    ];

    const parseIngredients = this.ingredients.map(el => {
      let ingredient = el.toLowerCase();

      /**
       * replace block:
       *  output: ["tbsp", "tbsp", "oz", "ozs", "tsp", "tsps", "cup", "pound"]
       * If You see in array [ozs] or [tsps], that because in unitLongest, item comes first
       * without end "s". To swap their. ["ounces", "ounce"...]
       *
       */
      unitLongest.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });

      // remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " "); // should be space

      // parse each ingredient into count, unit and itself
      // and return like a obj altogether
      const splitedIngredient = ingredient.split(" ");
      const unitIndex = splitedIngredient.findIndex(item => {
        unitShort.includes(item);
      });
      let objIngredients;

      if (unitIndex > -1) {
        // unit in fire
        // ex. [4 , 1/2, "cup"], arrOfNum = [4, '1/2'] --> "4 + 1/2" --> eval("4 + 1/2") --> 4.5
        // ex. [4, "cup"], arrOfNum = [4]
        const arrOfNum = splitedIngredient.slice(0, unitIndex);
        let count;

        if (arrOfNum.length === 1) {
          // may comes 1st on ex. 4- or 2-, for that we need replace on plus and use fn eval
          count = eval(arrOfNum[0].replace("-", "+"));
        } else {
          count = eval(splitedIngredient.slice(0, unitIndex).join("+"));
        }

        objIngredients = {
          count,
          unit: splitedIngredient[unitIndex],
          ingredient: splitedIngredient.slice(unitIndex + 1)
        };
      } else if (parseInt(splitedIngredient[0])) {
        // comes 1st item is not a unit, but is a number
        objIngredients = {
          count: parseInt(splitedIngredient[0]),
          unit: "",
          ingredient: splitedIngredient.slice(1)
        };
      } else if (unitIndex === -1) {
        // do not have a unit or number from first position
        objIngredients = {
          count: 1,
          unit: "",
          ingredient
        };
      }

      return objIngredients;
    });
    this.ingredients = parseIngredients;
  }
}

export default Recipe;
