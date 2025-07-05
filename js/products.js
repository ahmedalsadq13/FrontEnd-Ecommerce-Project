// Initialize cart and favorites in localStorage
const initializeStorage = (key, defaultValue) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }
  return JSON.parse(localStorage.getItem(key));
};

const cart = initializeStorage('cart', {});
const favorites = initializeStorage('favorites', {});
let allProducts = [];

async function fetchAndRenderProducts(categoryId = null) {
  const container = document.getElementById('product-container');
  container.innerHTML = '<p>Loading products...</p>';

  try {
    const response = await fetch('https://jsonfakery.com/products');
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    let products = await response.json();
    allProducts = products;

    if (!Array.isArray(products)) throw new Error('API response is not an array');

    if (categoryId && categoryId !== 'all') {
      products = products.filter(product => product.product_category_id === categoryId);
    }

    if (products.length === 0) {
      container.innerHTML = '<p>No products found for this category.</p>';
      return;
    }

    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    container.innerHTML = '<p>Failed to load products. Please try again later.</p>';
  }
}

function renderProducts(products) {
  const container = document.getElementById('product-container');
  container.innerHTML = '';

  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    card.innerHTML = `
      <div class="product-cover">
        <span class="discount-flag">10% OFF</span>
        <button class="favorit" aria-label="Toggle favorite for ${product.name}">
          <i class="${favorites[product.id] ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>
        <a href="/product/${product.id}" aria-label="${product.name}">
          <img class="product-img" src="${product.image}" alt="${product.name}" loading="lazy">
        </a>
      </div>
      <div class="content">
        <h3 class="product-title">${product.name}</h3>
        <div class="product-price">
          <span class="currency">$</span>
          <span class="product-price-value">${product.price.toFixed(2)}</span>
        </div>
        <div class="product-discount">
          <span class="product-old-price"><del>${(product.price * 1.1).toFixed(2)}</del></span>
          <span class="product-discount-percentage">10%</span>
        </div>
        <span class="product-rating">
          ${'<i class="fa-solid fa-star"></i>'.repeat(4)}
          <span class="product-rating-count">(4.3k)</span>
        </span>
      </div>
      <footer style="margin-top: 10px;">
        <button class="add-to-cart" onclick="showQuantity(this)">Add to Cart</button>
        <span class="quantity-controls" style="display: ${cart[product.id] ? 'flex' : 'none'};">
          <button data-action="decrement" class="mbutton">-</button>
          <span class="quantity-label">${cart[product.id]?.quantity || 1}</span>
          <button data-action="increment" class="mbutton">+</button>
        </span>
      </footer>
    `;
    container.appendChild(card);
  });
}

function showQuantity(button) {
  const card = button.closest('.product-card');
  const controls = card.querySelector('.quantity-controls');
  const productId = card.dataset.productId;

  if (!cart[productId]) {
    cart[productId] = { 
      quantity: 1, 
      id: productId, 
      name: card.querySelector('.product-title').textContent, 
      image: card.querySelector('.product-img').src,
      price: parseFloat(card.querySelector('.product-price-value').textContent) 
    };
  } else {
    cart[productId].quantity += 1;
  }

  controls.querySelector('.quantity-label').textContent = cart[productId].quantity;
  localStorage.setItem('cart', JSON.stringify(cart));
  button.style.display = 'none';
  controls.style.display = 'flex';
}

document.addEventListener('click', event => {
  const target = event.target.closest('button');
  if (!target) return;

  if (target.matches('.quantity-controls button')) {
    const action = target.dataset.action;
    const controls = target.closest('.quantity-controls');
    const card = controls.closest('.product-card');
    const productId = card.dataset.productId;
    const quantityLabel = controls.querySelector('.quantity-label');

    if (!cart[productId]) return;

    let quantity = cart[productId].quantity;

    if (action === 'decrement') {
      quantity--;
      if (quantity < 1) {
        controls.style.display = 'none';
        card.querySelector('.add-to-cart').style.display = 'block';
        delete cart[productId];
      } else {
        cart[productId].quantity = quantity;
        quantityLabel.textContent = quantity;
      }
    } else if (action === 'increment') {
      quantity++;
      cart[productId].quantity = quantity;
      quantityLabel.textContent = quantity;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  if (target.matches('.favorit')) {
    const icon = target.querySelector('i');
    const card = target.closest('.product-card');
    const productId = card.dataset.productId;

    if (!favorites[productId]) {
      favorites[productId] = { 
      quantity: 1, 
      id: productId, 
      name: card.querySelector('.product-title').textContent, 
      image: card.querySelector('.product-img').src,
      price: parseFloat(card.querySelector('.product-price-value').textContent) 
    };
      icon.classList.replace('fa-regular', 'fa-solid');
    } else {
      delete favorites[productId];
      icon.classList.replace('fa-solid', 'fa-regular');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
});

const categories = [
  { name: 'All Categories', id: 'all', icon: 'fa-list' },
  { name: 'Beauty Products', id: '8a927012-91e2-4f51-8b65-da3eb9029cd4', icon: 'fa-magic-wand-sparkles' },
  { name: 'Home Appliances', id: 'ab5d6bed-9a11-4996-854c-81567fa191af', icon: 'fa-blender-phone' },
  { name: 'Clothing', id: '1b43132a-e746-4588-97ad-29e40ec5e37c', icon: 'fa-shirt' },
  { name: 'Pet Supplies', id: '7c2bf15d-b834-46ea-94f6-0a349e258d1f', icon: 'fa-paw' },
  { name: 'Toys', id: 'dc1fc001-5a25-4c2c-936b-72b1865f1965', icon: 'fa-puzzle-piece' },
  { name: 'Art and Crafts', id: '46eae14b-4271-4e71-a1d5-f371ecf8ebca', icon: 'fa-paintbrush' },
  { name: 'Travel Accessories', id: '0934411a-9207-4cf1-824c-6909433402d8', icon: 'fa-suitcase-rolling' },
  { name: 'Kitchenware', id: 'e7e1bc83-96c0-448d-aa9a-6103bff732e4', icon: 'fa-utensils' },
  { name: 'Garden Tools', id: 'f18dd85d-12ea-4816-b9d7-2a35bc95a394', icon: 'fa-seedling' },
  { name: 'Sports Equipment', id: '3ad7fe87-74f9-4be7-955b-a61b7ef6c8c1', icon: 'fa-football' },
  { name: 'Books', id: '6a342ad8-380c-4977-9fe9-cdb6b0e7310e', icon: 'fa-book' },
  { name: 'Furniture', id: '12b8a87a-4195-4fb7-9a59-d3ba64cbb7f6', icon: 'fa-couch' },
  { name: 'Outdoor Gear', id: '92668c60-d0ce-42e5-aef3-fb3b771ff570', icon: 'fa-hiking' },
  { name: 'Baby Products', id: '53a0ff81-1234-4092-863d-772c7becad82', icon: 'fa-baby' },
  { name: 'Jewelry', id: 'd031bd75-0906-47b2-811a-40b58bb9a0a8', icon: 'fa-gem' },
  { name: 'Office Supplies', id: 'ce8ffbf3-3a8c-49e1-b9e6-e1fc3834f5a3', icon: 'fa-pen-ruler' },
  { name: 'Automotive Parts', id: '5e3060e0-a5e7-4dbd-b644-e3f3901ad5a8', icon: 'fa-car-side' },
  { name: 'Health Supplements', id: '92f23994-84e9-4bb1-9b1a-010a79929460', icon: 'fa-capsules' },
  { name: 'Electronics', id: 'bb24adb8-ff04-425f-ae52-3fcec71886f6', icon: 'fa-microchip' }
];

function loadCategories() {
  const categoriesContainer = document.getElementById('main-left');
  categoriesContainer.innerHTML = '';

  categories.forEach(cat => {
    const button = document.createElement('button');
    button.className = 'category-button';
    button.dataset.categoryId = cat.id;
    button.setAttribute('aria-label', `Filter by ${cat.name}`);
    button.innerHTML = `<i class="fa-solid ${cat.icon || 'fa-tag'}" style="margin-right: 8px;"></i>${cat.name}`;

    button.addEventListener('click', () => {
      fetchAndRenderProducts(cat.id);
      document.querySelectorAll('.category-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });

    categoriesContainer.appendChild(button);
  });
}

window.onload = () => {
  // Initialize cart and favorites from localStorage
  
  loadCategories();
  fetchAndRenderProducts();
};

document.getElementById('search-input').addEventListener('input', function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = allProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm)
  );
  renderProducts(filtered);
});