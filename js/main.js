let cartBox = document.querySelector(".cart-box");
let cartOpenBtn = document.querySelector(".cart-open");
let cartCloseBtn = document.querySelector(".cart-close");
let addCartBtn = document.querySelector(".add-to-cart");
let removeBtns = document.querySelectorAll(".remove-btn");
function openCart() {
  cartBox.style.translate = "-0.4rem";
}
function closeCart() {
  cartBox.style.translate = "120%";
}

cartOpenBtn.addEventListener("click", openCart);
cartCloseBtn.addEventListener("click", closeCart);

// products.js
const products = [
  {
    id: 1,
    name: "Wireless Earbuds Pro",
    price: 129.99,
    description: "High-quality wireless earbuds with noise cancellation",
    image: "/images/products/earbuds-pro.jpg",
    category: "Electronics",
    stock: 50,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 249.99,
    description: "Advanced smartwatch with health monitoring features",
    image: "/images/products/smart-watch-5.webp",
    category: "Wearables",
    stock: 30,
  },
  {
    id: 3,
    name: "Wireless Charging Pad",
    price: 29.99,
    description: "Fast charging pad for all Qi-enabled devices",
    image: "/images/products/wireless-charger.jpg",
    category: "Accessories",
    stock: 100,
  },
  {
    id: 4,
    name: "Bluetooth Speaker",
    price: 79.99,
    description: "Portable waterproof speaker with 12-hour battery life",
    image: "/images/products/bluetooth-speaker.jpg",
    category: "Audio",
    stock: 45,
  },
  {
    id: 5,
    name: "Laptop Backpack",
    price: 49.99,
    description: "Durable backpack with USB charging port",
    image: "/images/products/laptop-backpack.jpg",
    category: "Accessories",
    stock: 75,
  },
];

function addCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart") || []);

  let existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
  openCart();
}

function updateCartDisplay() {
  let cart = JSON.parse(localStorage.getItem("cart") || []);
  let cartBoxContent = document.querySelector(".cart-box-content ul");
  let totalPriceElement = document.querySelector(".total-price");
  let removeBtns = document.querySelectorAll(".remove-btn");
  let total = 0;

  cartBoxContent.innerHTML = "";

  cart.forEach((product) => {
    const itemTotal = product.price * product.quantity;
    total += itemTotal;

    let listItem = document.createElement("li");
    listItem.classList.add("item");
    listItem.dataset.id = product.id;

    listItem.innerHTML = `
  <img
  class="cart-item-image"
  src="${product.image}"
  alt="${product.name}"
/>

<div class="cart-item-details">
  <h3 class="name">${product.name}</h3>
  <p class="price">${product.price.toFixed(2)} x ${product.quantity}</p>
</div>
<button class="remove-btn btn" data-id="${product.id}">
  <i class="fa-solid fa-trash"></i>
</button>
`;
    cartBoxContent.appendChild(listItem);
  });

  if (totalPriceElement) {
    totalPriceElement.textContent = `Total: ${total.toFixed(2)}`;
  }

  removeBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      removeFromCart(e.target.dataset.id);
      updateCartDisplay();
    });
  });
}


function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart") || []);
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function clearCart() {
  localStorage.setItem("cart", "[]");
  updateCartDisplay();
}

// Initialize cart functionality
function initCart() {  
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", "[]");
  }
  
  updateCartDisplay();

  const clearCartBtn = document.querySelector(".clear-cart");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", clearCart);
  }
  
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      alert("Proceeding to checkout!");
    });
  }
}

document.addEventListener("DOMContentLoaded", initCart);



// Add to cart

let addCartBtns = document.querySelectorAll(".add-to-cart");
let CartModal = document.querySelector("#CartModal");

addCartBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    let productId = parseInt(e.target.dataset.id);
    let product = products.find((product) => product.id == productId);
    if (product) {
      addCart(product);      
    } else {
      CartModal.classList.add("danger");
      CartModal.showModal();
    }
    
  });
});


// Mobile menu
let mobileMenu =  document.querySelector(".mobile-menu");
let mobileMenuClose = document.querySelector(".mobile-menu-close");
let mobileMenuOpen = document.querySelector(".mobile-menu-open");

mobileMenuOpen.addEventListener("click", function () {
  mobileMenu.style.translate = "0";
});

mobileMenuClose.addEventListener("click", function () {
  mobileMenu.style.translate = "-100%";
});


  // Product details

document.addEventListener("DOMContentLoaded", function () {
  // Initialize quantity selector
  const quantityInput = document.querySelector(".quantity-selector input");
  const minusBtn = document.querySelector(
    ".quantity-selector button:first-child"
  );
  const plusBtn = document.querySelector(
    ".quantity-selector button:last-child"
  );

 if(minusBtn){
  minusBtn.addEventListener("click", function () {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
      quantityInput.value = value - 1;
    }
  });
 }

 if(plusBtn){

  plusBtn.addEventListener("click", function () {
    let value = parseInt(quantityInput.value);
    if (value < 10) {
      quantityInput.value = value + 1;
    }
  });
}

  // Thumbnail image click handler
  const thumbnails = document.querySelectorAll(".thumbnail-images img");
  const mainImage = document.querySelector(".main-image img");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      mainImage.src = this.src;
    });
  });

 

  // Initialize cart functionality
  initCart();
});
