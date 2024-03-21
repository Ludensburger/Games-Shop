// Put Video Game objects here
let videoGames = [
  {
    name: "Armored Core VI: Fires of Rubicon",
    gameId: "AC01",
    price: 59.99,
  },
  {
    name: "Cyberpunk 2077",
    gameId: "CP2077",
    price: 49.99,
  },
  {
    name: "Red Dead Redemption 2",
    gameId: "RDR2",
    price: 59.99,
  },
  {
    name: "The Witcher 3: Wild Hunt",
    gameId: "WITCHER3",
    price: 39.99,
  },

  {
    name: "Command & Conquer Remastered Collection",
    gameId: "CNC01",
    price: 29.99,
  },
  {
    name: "Counter Strike: Global Offense",
    gameId: "CSGO01",
    price: 19.99,
  },
];

videoGames.sort((a, b) => (a.name > b.name ? 1 : -1));

// Shopping cart Object
let shoppingCart = [];

let selectMenu = document.getElementById("gameSelect");

videoGames.forEach((game, index) => {
  let option = document.createElement("option");
  option.value = index; // or game.gameId if you want the game's id as the value
  option.text = game.name;
  selectMenu.add(option);
});

let quantityInput = document.getElementById("quantityInput");

let cartTableBody = document.querySelector("#cartTable tbody");

shoppingCart.forEach((game, index) => {
  let row = document.createElement("tr");

  // number
  let numberCell = document.createElement("th");
  numberCell.scope = "row";
  numberCell.textContent = index + 1;
  row.appendChild(numberCell);

  // game ID
  let idCell = document.createElement("td");
  idCell.textContent = game.gameId; // game.gameId is the Game ID
  row.appendChild(idCell);

  // game name
  let nameCell = document.createElement("td");
  nameCell.textContent = game.name; // game.name is the Game Name
  row.appendChild(nameCell);

  // game price
  let priceCell = document.createElement("td");
  priceCell.textContent = game.price; // game.price is the Price
  row.appendChild(priceCell);

  // game quantity
  let qtyCell = document.createElement("td");
  qtyCell.textContent = game.quantity; // game.quantity is the Quantity
  row.appendChild(qtyCell);

  cartTableBody.appendChild(row);
});

// adding to cart button function
let addToCartButton = document.getElementById("addToCartButton");
let quantityToastElement = document.getElementById("quantityToast");
let quantityToast = bootstrap.Toast.getOrCreateInstance(quantityToastElement);

// makes the Quantity not 0 OPTIONAL FUNCTION
// quantityInput.addEventListener("input", function () {
// 	let numValue = Number(this.value);
// 	if (isNaN(numValue) || numValue < 1) {
// 		this.value = 1;
// 	}
// });

function updateTotal() {
  let total = 0;

  for (let item of shoppingCart) {
    total += item.game.price * item.quantity;
  }

  document.getElementById("totalAmount").textContent =
    "Total: $" + total.toFixed(2);
}

addToCartButton.addEventListener("click", function () {
  // variable for the selected index
  let selectedGameIndex = selectMenu.value;
  let selectedGame = videoGames[selectedGameIndex];
  let quantity = Number(document.getElementById("quantityInput").value);

  let cartItem = shoppingCart.find(
    (item) => item.game.gameId === selectedGame.gameId
  );

  if (quantity < 1) {
    quantityToast.show();
    return;
  }

  if (cartItem) {
    cartItem.quantity += Number(quantity);
  } else {
    shoppingCart.push({ game: selectedGame, quantity: Number(quantity) });
  }

  cartTableBody.innerHTML = "";
  shoppingCart.forEach((item, index) => {
    let row = document.createElement("tr");

    let numberCell = document.createElement("th");
    numberCell.scope = "row";
    numberCell.textContent = index + 1;
    row.appendChild(numberCell);

    let nameCell = document.createElement("td");
    nameCell.textContent = item.game.name;
    row.appendChild(nameCell);

    let idCell = document.createElement("td");
    idCell.textContent = item.game.gameId;
    row.appendChild(idCell);

    let priceCell = document.createElement("td");
    priceCell.textContent = item.game.price;
    row.appendChild(priceCell);

    let quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    row.appendChild(quantityCell);

    let amountCell = document.createElement("td");
    amountCell.textContent = item.quantity * item.game.price;
    row.appendChild(amountCell);

    let removeCell = document.createElement("td");
    let removeButton = document.createElement("button");
    removeButton.textContent = "X";
    removeButton.setAttribute("type", "button");
    removeButton.setAttribute("class", "btn btn-danger");
    removeButton.addEventListener("click", function () {
      shoppingCart.splice(index, 1); // Remove the item from the shoppingCart array
      row.parentNode.removeChild(row); // Remove the row from the table
      updateTotal();
    });

    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    cartTableBody.appendChild(row);

    cartTableBody.appendChild(row);
  });

  updateTotal();
});

let checkoutButton = document.getElementById("checkoutButton");
let checkoutToastElement = document.getElementById("checkoutToast");
let checkoutToast = bootstrap.Toast.getOrCreateInstance(checkoutToastElement);

checkoutButton.addEventListener("click", function () {
  checkoutToast.show();
});
