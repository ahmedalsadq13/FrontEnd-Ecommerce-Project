
function loadOrders(filterIdx = 0) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/JsonFiles/OrdersFile.json", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const orders = JSON.parse(xhr.responseText);
            const filteredOrders = filterOrders(orders, filterIdx);
            updateHeaderCounts(orders);
            renderOrders(filteredOrders);
            updateButtonStates(filterIdx);
        }
    };
    xhr.send();
}

function filterOrders(orders, idx) {
    if (idx === 0) return orders;
    if (idx === 1) return orders.filter(order => order.status === 'Pending');
    if (idx === 2) return orders.filter(order => order.status === 'Delivered');
    return orders;
}

function updateHeaderCounts(orders) {
    const allCount = orders.length;
    const pendingCount = orders.filter(order => order.status === 'Pending').length;
    const deliveredCount = orders.filter(order => order.status === 'Delivered').length;
    const counts = [allCount, pendingCount, deliveredCount];
    document.querySelectorAll('.Secondry-Header button span').forEach((span, i) => {
        span.textContent = counts[i];
    });
}

function updateButtonStates(idx) {
    document.querySelectorAll('.Secondry-Header button').forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
        const span = btn.querySelector('span');
        if (span) {
            span.classList.toggle('makeSpanbtnactive', i === idx);
            span.classList.toggle('makeSpanbtnNotactive', i !== idx);
        }
    });
}
async function renderOrders(orders) {
    const mainContainer = document.querySelector('.maincontainer');
    mainContainer.innerHTML = '';
        const response = await fetch("https://jsonfakery.com/products");
        const products = await response.json();
        orders.forEach(async order => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        let itemsListHTML = '';
        for (let item of order.items) {
            const product = products.find(p => String(p.id) === String(item.product_id));
            if (!product) {
                console.error(`Product with ID ${item.product_id} not found.`);
                continue;
            }
            const itemDetails = {
                image: product.image,
                product: product.name,
                quantity: item.quantity,
                price: product.price
            };
            itemsListHTML += '<div class="item-details">' +
                '<img src="' + itemDetails.image + '" alt="Order Image">' +
                '<p> ' + itemDetails.product + '</p>' +
                '<p>Quantity: ' + item.quantity + '</p>' +
                '<p>Unit Price: ' + itemDetails.price.toFixed(2) + 'Egp</p>' +
                '</div>';
        }
        const total = order.items.reduce((sum, item) => {
            const product = products.find(p => String(p.id) === String(item.product_id));
            return sum + (product ? product.price * item.quantity : 0);
        }, 0).toFixed(2);

        const itemCount = order.items.reduce((sum, item) => sum + item.quantity, 0);
        orderItem.innerHTML = 
            '<div class="order-header">' +
                '<p style="font-size: 20px;">Order #' + order.orderId + '</p>' +
                '<p>' + order.status + '</p>' +
            '</div>' +
            '<div class="Items-List">' +
                itemsListHTML +
            '</div>' +
            '<div class="order-footer">' +
                '<p>Total: ' + total + ' Egp (' + itemCount + ' items)</p>' +
                '<button class="btn">Details</button>' +
            '</div>';


    
        orderItem.querySelector('.btn').addEventListener('click', () => {
            const orderDetails = document.querySelector('.OrderDetailsContainer');
            orderDetails.style.display = 'block';
            orderItem.querySelector('.btn').style.backgroundColor = '#667a9e';
            const orderDetailsContainer = document.querySelector('.order-details');
            orderDetailsContainer.innerHTML = `
                <h2>Order Details</h2>
                <div class="order-info">
                    <p><span>Order Id : </span><span>#${order.orderId}</span></p>
                    <p><span>Order Date : </span><span>${order.Date || 'Un Known'}</span></p>
                    <p><span>Order Status : </span><span style="color: ${order.status === 'Pending' ? '#eb2711' : '#28a745'};">${order.status}</span></p>
                    <p><span>Payment Method : </span><span>${order.paymentMethod || 'Credit Card'}</span></p>
                    <p><span>Number of Products : </span><span>${order.items ? order.items.length : 0}</span></p>
                    <p><span>Total Amount : </span><span style="color:black">${total} Egp</span></p>
                </div>
            `;
        });

        const closeButton = document.querySelector('.OrderDetailsContainer');
        closeButton.addEventListener('click', () => {
            document.querySelector('.OrderDetailsContainer').style.display = 'none';
            orderItem.querySelector('.btn').style.backgroundColor = '#071a07';
        });
  
        
    
        
        mainContainer.appendChild(orderItem);
    });
}
function fetchProductDetails(productId, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://jsonfakery.com/products/${productId}`, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const product = JSON.parse(xhr.responseText);
            callback(product);
        }
    };
    xhr.send();
}
document.querySelectorAll('.Secondry-Header button').forEach((button, idx) => {
    button.addEventListener('click', () => loadOrders(idx));
});
loadOrders();
