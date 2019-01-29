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
      console.warn(e);
    }
  }
}

export default Recipe;
