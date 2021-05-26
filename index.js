(function iife() {
  console.log("code is loaded");
})();

const data = [
  { id: 1, name: "apple", price: 0.99, size: "each", category: "fruit" },
  { id: 2, name: "bananna", price: 1.1, size: "each", category: "fruit" },
  { id: 3, name: "grapes", price: 1.99, size: "bundle", category: "fruit" },
  { id: 4, name: "apple", price: 0.89, size: "each", category: "fruit" },
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

const state = {
  items: data,
  currentItem: {
    name: "",
    size: "",
    price: 0,
    category: "",
  },
};

const changeState = (identifier) => {
  const { id, value } = identifier;
  setValue(id, value);
  if (typeof id === "undefined" || id === null) {
    return;
  }

  return {
    ...state,
    currentItem: {
      ...(state.currentItem[id] = value),
    },
  };
};

const setValue = (identifier, value) => {
  if (typeof value !== "undefined" && value !== null) {
    document.getElementById(identifier).value = value;
  }
};

const deleteItem = (item) => {
  console.log("item to delete", item);
  const itemIndex = state.items.findIndex((i) => i.id === item);
  if (itemIndex) {
    const copiedItems = Array.from(state.items);
    copiedItems.splice(itemIndex, 1);
    state.items = copiedItems;
    buildItemTable();
  }
};

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
    '<table style="width: 100%; cell-padding: 2px;"><tr><th>Product</td><th>Size</th><th>Price</th><th>Category</th><th>Delete</th></tr>';
  state.items.map((item) => {
    const { name, size, price, category } = item;
    html += `<tr><td>${name}</td><td>${size}</td><td>${price}</td><td>${category}</td><td style="cursor: pointer;" onclick="deleteItem(
      ${item.id}
    )">Trash</td></tr>`;
  });
  html += "</table";
  document.getElementById("items").innerHTML = html;
};
buildItemTable();

// make immutable unique array function
Array.prototype.unique = function (field) {
  const newArray = [];
  // for (var i = 0; i < this.length; i++) {
  //   if (!newArray.includes(this[i][field])) {
  //     newArray.push(this[i][field]);
  //   }
  // }
  // this.forEach((record) => {
  //   const value = record[field];
  //   if (!newArray.includes(value)) {
  //     newArray.push(value);
  //   }
  // });

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

const findApples = () => {
  return data.filter((i) => i.name === "apple");
};
console.log(findApples());

// dynamic filtering
const filterData = (property) => {
  return function (value) {
    return data.filter((i) => i[property] === value);
  };
};

// const filterData = (property) => {
//   return (value) => data.filter((i) => i[property] === value);
// };

// curried version of our function

const curriedFilter = filterData("category");

const fruits = curriedFilter("fruit");
console.log("fruits", fruits);
const beverages = curriedFilter("beverages");
console.log("beverages", beverages);
const candy = curriedFilter("candy");
console.log("candy", candy);

const generateCategories = () => {
  let select = `<select id="category" class="form-control" onchange="changeState(this)"><option value="0">Select a Category</option>`;
  uniqueCategories.map((category) => {
    select += `<option value="${category}">${category}</option>`;
  });
  select += "</select>";
  document.getElementById("categories").innerHTML = select;
};
generateCategories();

// lets look at reduce

const getItemTotals = () => {
  return data.reduce((acc, cur) => {
    return acc + cur.price;
  }, 0);
};
console.log("total of all items is: ", getItemTotals());

const getMostExpensiveItem = () => {
  return data.reduce((acc, cur) => {
    if (acc.price > cur.price) {
      return acc;
    } else {
      return cur;
    }
  }, 0);
};
const mostExpensive = getMostExpensiveItem();
console.log("most expensive item is : ", mostExpensive);

const getCheapestItem = () => {
  return data.reduce((acc, cur) => {
    if (acc.price < cur.price) {
      return acc;
    } else {
      return cur;
    }
  }, 9999);
};
console.log("cheapest item is: ", getCheapestItem());

// lets look at compose

const findCategoryMostExpensiveItem = (array) => {
  return array.reduce((acc, cur) => {
    return acc.price > cur.price ? acc : cur;
  }, 0);
};

function pipe(...functions) {
  return function (x) {
    return functions.reduce((value, f) => f(value), x);
  };
}

const compose =
  (...fns) =>
  (...args) =>
    fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];

const pipedFn = compose(
  findCategoryMostExpensiveItem,
  curriedFilter
)("beverages");
console.log("most expensive item in the beverages category");
console.log(pipedFn);

const saveItem = () => {
  console.log("saving item", state);
  const name = document.getElementById("name").value;
  console.log("name", name);
  const copiedItems = [...state.items, state.currentItem];
  state.items = copiedItems;
  buildItemTable();
};
