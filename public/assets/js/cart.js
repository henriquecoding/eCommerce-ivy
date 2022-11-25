const productsElements = document.querySelector(".products-container");
const shoppingBagItems = document.querySelector(".shoppingBag-items");
const subtotal = document.querySelector(".subtotal");
const totalItemsInCart = document.querySelector(".total-items-in-cart");
const shoppingBag = document.querySelector(".shoppingBag");
const shoppingBagBtnClose = document.querySelector(".shoppingBag-btnClose");
const shoppingBagContainer = document.querySelector(".shoppingBag-container");

if(shoppingBag) {
  shoppingBag.addEventListener('click', () => {
    shoppingBagContainer.classList.add('active')
  })
}

if(shoppingBagBtnClose) {
  shoppingBagBtnClose.addEventListener('click', () => {
    shoppingBagContainer.classList.remove('active')
  })
}

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
    
        
        <svg onclick="addToCart(${product.id})" version="1.1" id="Shopping_Bag" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
            y="0px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve">
          <path d="M31.3,24.2h-1.4c-0.2,0-0.3-0.1-0.3-0.3V13c0-0.7-0.1-1.4-0.3-2.1c-1-3.1-3.4-6.8-5-6.8h-6.7
          c-1.6,0-4.1,3.6-5,6.8c-0.2,0.7-0.3,1.4-0.3,2.1v10.9c0,0.2-0.1,0.3-0.3,0.3h-1.4c-0.2,0-0.3-0.1-0.3-0.3V13c0-1,0.2-2,0.5-3
          c0.7-2.2,3.4-7.9,6.8-7.9h6.7c3.5,0,6.1,5.7,6.8,7.9c0.3,1,0.5,2,0.5,3v10.9C31.6,24.1,31.5,24.2,31.3,24.2z M43.1,18.2
          c-2.6-0.6-6.9-0.4-6.9-0.4h-3.4v7.4c0,0.2-0.1,0.3-0.3,0.3h-3.9c-0.2,0-0.3-0.1-0.3-0.3v-7.4H25H13.8c0,0-0.1,0-0.2,0v7.4
          c0,0.2-0.1,0.3-0.3,0.3h-4c-0.2,0-0.3-0.1-0.3-0.3v-7.3c-0.8,0.1-1.5,0.2-2.2,0.3c-1.2,0.3-2,1.5-1.9,2.7l2.5,21.8
          c0,0,0.4,3.9,7.5,4.2h10h10c7.1-0.3,7.5-4.2,7.5-4.2L45,20.9C45.2,19.6,44.3,18.5,43.1,18.2z M22.5,15.2h-1.4
          c-0.2,0-0.3-0.1-0.3-0.3V13c0-0.9,0.1-1.8,0.4-2.7c0.5-1.5,1.2-3.1,2.1-4.5c0.1-0.1,0.3-0.2,0.4-0.1l1.2,0.8C25,6.7,25,6.8,24.9,7
          c-0.8,1.2-1.5,2.7-1.9,4c-0.2,0.7-0.3,1.4-0.3,2.1V15C22.8,15.1,22.7,15.2,22.5,15.2z M41.8,15.2h-1.4c-0.2,0-0.3-0.1-0.3-0.3V13
          c0-0.7-0.1-1.4-0.3-2.1c-1-3.1-3.4-6.8-5-6.8h-4.9c-0.2,0-0.3-0.1-0.3-0.3V2.4c0-0.2,0.1-0.3,0.3-0.3h4.9c3.5,0,6.1,5.7,6.8,7.9
          c0.3,1,0.5,2,0.5,3v1.9C42.1,15.1,42,15.2,41.8,15.2z"/>
          </svg>
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

  subtotal.innerHTML = `<h3><strong>Subtotal (${totalItems} itens)</strong>: &euro;${totalPrice.toFixed(2)}</h3>`;
  totalItemsInCart.innerHTML = totalItems;
}

// render cart items
function renderShoppingBagItems() {
  shoppingBagItems.innerHTML = ""; // Limpar elementos do saco
  cart.forEach((item) => {
    shoppingBagItems.innerHTML += `
      <div class="shoppingBag-item">
        <div class="itemInfo-container">
          <div class="itemInfo" onclick="removeItemFromShoppingBag(${item.id})">
            <img src="${item.imgSrc}" alt="${item.name}">
            <i id="trash" class="fa-solid fa-trash"></i>
          </div>
          <h3>${item.name}</h3>
        </div>  
        <div class="units">
          <h3 class="product-price">&euro;${item.price}</h3>
          <button class="units-btn" onclick="changeNumberOfUnits('minus', ${item.id})">-</button>
          <div class="number">${item.numberOfUnits}</div>
          <button class="units-btn" onclick="changeNumberOfUnits('plus', ${item.id})">+</button>           
        </div>
      </div>
      `;
  });
}

// Remover itens do Saco
function removeItemFromShoppingBag(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
   
    if (item.id === id) {
      if (action === "minus" && numberOfUnits >= 1) {
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
