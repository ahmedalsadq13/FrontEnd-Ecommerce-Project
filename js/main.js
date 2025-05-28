let cartBox = document.querySelector(".cart-box");
let cartOpenBtn = document.querySelector(".cart-open");
let cartCloseBtn = document.querySelector(".cart-close");
let addCartBtn = document.querySelector(".add-to-cart");
cartOpenBtn.addEventListener("click", () => {
  cartBox.style.translate = "-0.4rem";
});
cartCloseBtn.addEventListener("click", () => {
  cartBox.style.translate = "120%";
});



function addCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart") || []);

  let existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart))
}



addCartBtn.addEventListener("click",function (){
    addCart({id:1,name:"Iphone 14 pro", imagePath:"/images/products/iphone-14-pro.jpg", description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis expedita enim optio hic. Provident voluptas beatae numquam doloremque nam ex.",price:4000})
})

function loadCart() {}
