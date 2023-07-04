import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { menuArray } from "./data";

const menuContainer = document.getElementById("menu-container");
let totalPrice = 0;
let orders = [];
const completeBtn = document.getElementById("complete-order");
const payBtn = document.getElementById("pay-btn");
const formEl = document.getElementById("form");

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    addItem(e.target.dataset.id);
  }

  if (e.target.dataset.remove) {
    removeItem(e.target.dataset.remove);
  }
});

// MODAL LOGIC

completeBtn.addEventListener("click", function () {
  showModal();
});

function showModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
}

function hideModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "none";
}

// FORM LOGIC

formEl.addEventListener("submit", function (e) {
  e.preventDefault();
  hideOrderCart();

  const formData = new FormData(formEl);
  const userName = formData.get("userName");

  hideModal();
  formEl.reset();
  showConfirmation(userName);
});

function showConfirmation(userName) {
  const confirmationEl = document.querySelector("#confirmation");
  confirmationEl.style.display = "block";
  confirmationEl.innerHTML = `Thanks, ${userName}! Your order is on its way!`;
}

function hideConfirmation() {
  const confirmationEl = document.querySelector("#confirmation");
  confirmationEl.style.display = "none";
}

// MENU LOGIC

function getMenuHtml() {
  let menuText = "";

  menuArray.forEach((item) => {
    menuText += `
    <section class="menu-item">
        <p class="food--icon">${item.emoji}</p>

        <div class="menu--info">
          <h3 class="food--name">${item.name}</h3>
          <p class="food--desc">${item.ingredients}</p>
          <p class="food--price">$${item.price}</p>
        </div>

        <span class="align-right" > 
           <i class="fa-solid fa-plus add-btn" data-id="${item.id}" ></i>
        </span>
      </section>
    `;
  });
  return menuText;
}

function addItem(itemId) {
  const item = getMenuItem(itemId);
  orders.push(orderItemHTML(item));

  updateTotalPrice(item.price);
  hideConfirmation();
  renderOrders();
}

function removeItem(itemId) {
  const item = getMenuItem(itemId);

  const itemIndex = orders.indexOf(item);
  orders.splice(itemIndex, 1);
  updateTotalPrice(-item.price);

  renderOrders();
}

function updateTotalPrice(price) {
  console.log(price);
  let addPrice = Number(price);
  totalPrice += addPrice;
  const totalPriceHtml = `
  <h4 class="total-price--title">Total Price:</h4>
  <p class="total-price align-right">$${totalPrice}</p>
  `;
  const orderTotalContainer = document.getElementById("order-total-container");
  orderTotalContainer.innerHTML = totalPriceHtml;
}

function orderItemHTML(item) {
  let orderHTML = `
  <div class="order--item id="${item.id}">
    <h4 class="order--title">${item.name}</h4>
    <button class="order--remove" data-remove="${item.id}">remove</button>
    <p class="order--price align-right">$${item.price}</p>
  </div>
  `;
  return orderHTML;
}

function getMenuItem(itemId) {
  return menuArray.filter(function (item) {
    return item.id === Number(itemId);
  })[0];
}

function render() {
  menuContainer.innerHTML = getMenuHtml();
}

function renderOrders() {
  let orderContainer = document.getElementById("order--container");
  orderContainer.innerHTML = "";
  for (let order of orders) {
    orderContainer.innerHTML += order;
  }
  displayOrderCart();
  console.log("total price  " + totalPrice);
}

function displayOrderCart() {
  if (orders.length > 0) {
    document.getElementById("order--section").style.display = "flex";
  } else {
    hideOrderCart();
  }
  render();
}

function hideOrderCart() {
  document.getElementById("order--section").style.display = "none";
}

render();
