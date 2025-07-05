
    var NameValidation=/^[A-Za-z]{3,11}$/;
    var EmailValidation=/^[a-zA-Z0-9_]+@(gmail|yahoo|outlook|aol)+\.com$/;
    var phoneValidation=/^(01)(0|1|2|5)[0-9]{8}/;
    var cityValidation=/^[a-zA-Z]{3,}$/;

function validateForm(){
  
    var isValid=true;

    var fnameInput=document.getElementById("fname");
    var lnameInput=document.getElementById("lname");
    var EmailInput=document.getElementById("email");
    var phoneInput=document.getElementById("phone");
    var cityInput=document.getElementById("city");

    var fnameError=document.getElementById("fnameError");
    var lnameError=document.getElementById("lnameError");
    var EmailError=document.getElementById("emailError");
    var phoneError=document.getElementById("phoneError");
    var cityError=document.getElementById("cityError")

    
    if(!NameValidation.test(fnameInput.value)){
        fnameError.textContent="invalid name"
        isValid=false;
    }else{
        fnameError.textContent = "";
    }

     if(!NameValidation.test(lnameInput.value)){
        lnameError.textContent="invalid name"
        isValid=false;
    }else{
        lnameError.textContent = "";
    }

     if(!EmailValidation.test(EmailInput.value)){
        EmailError.textContent="invalid email"
        isValid=false;
    }else{
        EmailError.textContent = "";
    }

     if(!phoneValidation.test(phoneInput.value)){
        phoneError.textContent="enter valid number"
        isValid=false;
    }else{
        phoneError.textContent = "";
    }

     if(!cityValidation.test(cityInput.value)){
        cityError.textContent="invalid name"
        isValid=false;
    }else{
        cityError.textContent = "";
    }   

    return isValid;
   
}
 

document.addEventListener('DOMContentLoaded', function() {
    
    
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    
    const ordersContainer = document.getElementById('orders');
    ordersContainer.innerHTML = "";
    
    let subtotal = 0;
    
    Object.values(cart).forEach(item => {
      
        if (!item.name || !item.price || !item.quantity || !item.image) {
            return;
        }
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        // Create container for each item
        const itemElement = document.createElement('div');
        itemElement.id = 'itemDetails';
        itemElement.innerHTML = `
            <div class="order">
                <img class="orderImages" src="${item.image}" alt="${item.name}">  
                <div>
                    <p class="orderName">${item.name}</p> 
                    <p>Quantity: <span class="count">${item.quantity}</span></p>
                </div>
            </div>
            <p class="price">$${itemTotal.toFixed(2)}</p>
        `;
        ordersContainer.appendChild(itemElement);
    });
    
    
    
    var Shipping=subtotal*.1;
    document.getElementById("Subtotal").textContent= `$${(subtotal).toFixed(2)}`;
    document.getElementById("Shipping").textContent=`$${(Shipping).toFixed(2)}`;
    document.getElementById('Total').textContent = `$${(subtotal+Shipping).toFixed(2)}`;
    

    document.getElementById("payment").addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;

        }
        
        if (!validateForm()) {
            preventDefault();
            return;
        }
        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        // window.location.href = '/'; // to home page
    });


});
