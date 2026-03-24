const params = new URLSearchParams(window.location.search);
const productId = params.get('id');

const products = JSON.parse(localStorage.getItem('currentProducts')) || [];
let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];

const product = products.find(p => p.id === productId);

const container = document.querySelector('.product-content');

if (product) {
 container.innerHTML = `
  <img src="${product.image}" alt="${product.title}">
  <div class="product-details">
    <h2>${product.title}</h2>
    <p class="price">$${product.price}</p>
    <p class="stock">Items in stock: ${product.stock}</p>
    <p class="description">${product.description}</p>
    <div class="quantity-control">
      <button class="qty-decrease">-</button>
      <input type="number" class="qty-input" value="1" min="1">
      <button class="qty-increase">+</button>
    </div>
    <button class="add-to-cart">Add to Cart</button>
  </div>
`;
}


/* Configuring quantity */

const qtyInput = document.querySelector('.qty-input');
const qtyDecrease = document.querySelector('.qty-decrease');
const qtyIncrease = document.querySelector('.qty-increase');
const addToCartBtn = document.querySelector('.add-to-cart');
const stock = product.stock;


qtyDecrease.addEventListener('click', () => {
  let value = Number(qtyInput.value);
  if (value > 1) qtyInput.value = value - 1;
});

qtyIncrease.addEventListener('click', () => {
  let value = Number(qtyInput.value);
  if (value < stock) qtyInput.value = value + 1;
});

qtyInput.addEventListener('input', () => {
  let value = Number(qtyInput.value);
  if (value < 1) qtyInput.value = 1;
  if (value > stock) qtyInput.value = stock;
});

addToCartBtn.addEventListener('click', () => {
  const qtyToAdd = Number(qtyInput.value);
  if (qtyToAdd > stock) {
    alert("Not enough products in stock");
    return;
  }

const existingIndex = productsInCart.findIndex(p => p.id === product.id);

if (existingIndex !== -1) { //checking if product in cart
   
    const newQty = productsInCart[existingIndex].quantity + qtyToAdd;
    productsInCart[existingIndex].quantity = Math.min(newQty, product.stock);  // updating product quanlity in cart
  } else {  // to add new product
   
    productsInCart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: qtyToAdd,
      stock: product.stock
    });
  }

 
  localStorage.setItem('productsInCart', JSON.stringify(productsInCart)); // updating products in cart
  updateCartCounter();
  alert(`${qtyToAdd} ${product.title}(s) added to cart`);
  
});


// Other products section


const otherProductsGrid = document.querySelector('#other-products .grid');

const otherProducts = products.filter(function(p) {
  return p.id !== productId;
});


otherProducts.forEach(function(p) {

  let item = document.createElement('div');
  item.className = 'product-item';

  item.innerHTML = ''
    + '<img src="' + p.image + '" alt="' + p.title + '">'
    + '<div class="product-info">'
    + '<h3>' + p.title + '</h3>'
    + '<p class="price">$' + p.price + '</p>'
    + '<p>' + (p.shortDescription || '') + '</p>'
    + '<button class="buy-now">View Product</button>'
    + '</div>';

  item.querySelector('.buy-now').addEventListener('click', function() {
    window.location.href = 'product.html?id=' + encodeURIComponent(p.id);
  });

  otherProductsGrid.appendChild(item);

});
