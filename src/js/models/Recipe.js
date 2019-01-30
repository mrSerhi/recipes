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
      "ounce",
      "ounces",
      "teaspoon",
      "teaspoons",
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
       * You may see in array [ozs] or [tsps], that because we use .replase method,
       * which replaced unit on part, plus added ending of replacement unit! unitLongest["ounces"] => unitShort["oz"] + "s";
       * under if else statement.
       */
      unitLongest.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });

      // remove parentheses
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " "); // should be space

      // parse ingr into count, unit and itself
      return ingredient;
    });
    this.ingredients = parseIngredients;
  }
}

export default Recipe;
