(function iife() {
  console.log("code is loaded");
})();

const data = [
  { id: 1, name: "apple", price: 0.99, size: "each", category: "fruit" },
  { id: 2, name: "bananna", price: 1.1, size: "each", category: "fruit" },
  { id: 3, name: "grapes", price: 1.99, size: "bundle", category: "fruit" },
  { id: 4, name: "apple", price: 0.99, size: "each", category: "fruit" },
  {
    id: 5,
    name: "Dr. Pepper",
    price: 1.09,
    size: "12 oz",
    category: "beverages",
  },
  { id: 6, name: "Mt. Dew", price: 4.99, size: "12 pk", category: "beverages" },
  { id: 7, name: "Coke", price: 1.79, size: "2 Liter", category: "beverages" },
  { id: 8, name: "Pepsi", price: 1.79, size: "2 Liter", category: "beverages" },
  { id: 9, name: "Tic Tacs", price: 2.99, size: "12 oz", category: "candy" },
  { id: 10, name: "Snickers", price: 1.59, size: "bar", category: "candy" },
  { id: 11, name: "Almond Joy", price: 1.69, size: "bar", category: "candy" },
];

// convert function to arrow function
// function add(x, y) {
//   return x + y;
// }

const add = (x, y) => x + y;

console.log(add(2, 4));

// simple object destructuring
const obj = { name: "mike", age: 47 };
const destructure = () => {
  const { name, age } = obj;
  console.log(`my name is ${name} and i am ${age} years old`);
};
destructure();

// ***************************
// lets look at map
const buildItemTable = () => {
  let html =
    '<table style="width: 100%; cell-padding: 2px;"><tr><th>Product</td><th>Size</th><th>Price</th><th>Category</th></tr>';
  data.map((item) => {
    const { name, size, price, category } = item;
    html += `<tr><td>${name}</td><td>${size}</td><td>${price}</td><td>${category}</td></tr>`;
  });
  html += "</table";
  document.getElementById("items").innerHTML = html;
};
buildItemTable();

// make immutable unique array function
Array.prototype.unique = function (field) {
  const newArray = [];
  //   for (var i = 0; i < this.length; i++) {
  //     if (!newArray.includes(this[i][field])) {
  //       newArray.push(this[i][field]);
  //     }
  //   }
  //   this.forEach((record) => {
  //     const value = record[field];
  //     if (!newArray.includes(value)) {
  //       newArray.push(value);
  //     }
  //   });
  this.forEach((record) => {
    const { [field]: targetedField } = record;
    if (!newArray.includes(targetedField)) {
      newArray.push(targetedField);
    }
  });
  return newArray;
};

const uniqueCategories = data.unique("category");
console.log("unique categoried: ", uniqueCategories);

// *******************************
// lets look at filter
// const filterData = (property) => {
//   return (value) => data.filter((i) => i[property] === value);
//   //   return function (value) {
//   //     return data.filter((i) => i[property] === value);
//   //   };
// };

const filterData = (property) => {
  return (value) => data.filter((i) => i[property] === value);
};

// curried version of our function
const curriedFilter = filterData("category");

const fruits = curriedFilter("fruit");
console.log("fruits", fruits);
const beverages = curriedFilter("beverages");
console.log("beverages", beverages);
const candy = curriedFilter("candy");
console.log("candy", candy);

const generateCategories = () => {
  let select =
    '<select class="form-control"><option value="">Select a Category</option>';
  uniqueCategories.map((category) => {
    select += `<option value="${category}">${category}</option>`;
  });
  select += "</select>";
  document.getElementById("categories").innerHTML = select;
};
generateCategories();

// lets look at reduce

// lets look at compose

// lets look at rest/spread

// lets look at state management
