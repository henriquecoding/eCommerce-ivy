const productsElements = document.querySelector(".products-container");
const shoppingBagItems = document.querySelector(".shoppingBag-items");
const subtotal = document.querySelector(".subtotal");
const totalItemsInCart = document.querySelector(".total-items-in-cart");

function renderProducts() {
  products.forEach((product) => {
    productsElements.innerHTML += `
      <div class="product">
        <div class="container-img">
          <i id="heart" class="fa-solid fa-heart"></i>
          <img src="${product.imgSrc}" alt="${product.name}">
          <div class="sizes">
            <div>XS</div>
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div><i class="fa-solid fa-gear"></i></div>
          </div>
        </div>
        <div class="product-description">
          <h3>${product.name}</h3>
          <h3 class="product-price">&euro;${product.price}</h3>
        </div>
        <a href="#"><i class="fa-solid fa-bag-shopping cart"></i></a>
        <div onclick="addToCart(${product.id})">
          <i class="fa-solid fa-bag-shopping cart"></i>
        </div>
      </div>
    `;
  });
}
renderProducts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
function addToCart(id) {
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderShoppingBagItems();
  renderSubtotal();

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotal.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCart.innerHTML = totalItems;
}

// render cart items
function renderShoppingBagItems() {
  shoppingBagItems.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    shoppingBagItems.innerHTML += `
      <div class="shoppingBag-item">
        <div class="itemInfo-container">
          <div class="itemInfo" onclick="removeItemFromCart(${item.id})">
            <img src="${item.imgSrc}" alt="${item.name}">
          </div>
          <h3>${item.name}</h3>
        </div>  
        <div class="unit-price">
        <h3 class="product-price">&euro;${item.price}</h3>
        </div>
        <div class="units">
          <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
          <div class="number">${item.numberOfUnits}</div>
          <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
        </div>
      </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
