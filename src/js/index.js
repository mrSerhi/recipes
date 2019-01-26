import str from "./views/searchView";
// import { sum, mult, ID } from "./models/Search";
// import { sum as sumOfNum, mult as multOfNum, ID } from "./models/Search";
import * as searchModels from "./models/Search";

console.log(`Sum of two numbers = ${searchModels.sum(2, 4)}`);
console.log(`Multy = ${searchModels.mult(2)}`);
console.log(`what the string come for: ${str} and ID: ${searchModels.ID}`);
