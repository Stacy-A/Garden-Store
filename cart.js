let cartGrid = document.querySelector('#cart-grid'); 
let checkoutBtn = document.querySelector('#checkout');

let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];

renderCart();   // getting added product from LS


function renderCart() {

  cartGrid.innerHTML = '';

  productsInCart.forEach(function(product) {
    renderCartItem(product);
  });

  updateCartTotal();


 if (productsInCart.length === 0) { // adding empty cart styles
    document.querySelector('#empty-cart-msg').style.display = 'block';
    checkoutBtn.style.opacity = '0.2';
    checkoutBtn.style.pointerEvents = 'none';
  } else {
    document.querySelector('#empty-cart-msg').style.display = 'none';
    checkoutBtn.style.opacity = '1';
    checkoutBtn.style.pointerEvents = 'auto';
  }



}


function renderCartItem(product) {

  let cartItem = document.createElement('div');
  cartItem.className = 'product-item';

  cartItem.innerHTML = ''
    + '<img src="' + product.image + '" alt="' + product.title + '">'
    + '<div class="product-info">'
    + '<h3>' + product.title + '</h3>'
    + '<p class="price">$' + product.price + '</p>'

    + '<div class="quantity-control">'
    + '<button class="qty-decrease">-</button>'
    + '<input type="number" class="qty-input" value="' + product.quantity + '" min="1" readonly>'
    + '<button class="qty-increase">+</button>'
    + '</div>'

    + '<button class="manage-remove">Remove</button>'
    + '</div>';


  let decreaseBtn = cartItem.querySelector('.qty-decrease');
  let increaseBtn = cartItem.querySelector('.qty-increase');
  let qtyInput = cartItem.querySelector('.qty-input');


  decreaseBtn.addEventListener('click', function() {

    let value = Number(qtyInput.value);

    if (value > 1) {
      value--;
      qtyInput.value = value;
      product.quantity = value;
    }

    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    updateCartTotal();
  });


  increaseBtn.addEventListener('click', function() {

    let value = Number(qtyInput.value);

    if (value < product.stock) {
      value++;
      qtyInput.value = value;
      product.quantity = value;
    }

    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    updateCartTotal();
  });


  let removeBtn = cartItem.querySelector('.manage-remove');

  removeBtn.addEventListener('click', function() {

    productsInCart = productsInCart.filter(function(p) {
      return p.id !== product.id;
    });

    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));

    renderCart();
    updateCartCounter();
  });


  cartGrid.appendChild(cartItem);
}


// updaing on qty change
function updateCartTotal() {

  let total = 0;

  productsInCart.forEach(function(product) {
    total += product.price * product.quantity;
  });

  var totalPriceElement = document.querySelector('.cart-totals .price');
  totalPriceElement.textContent = '$' + total;

}


// checkout btn



// checkoutBtn.addEventListener('click', function() {

//   let totalItems = 0;
//   let totalPrice = 0;

//   productsInCart.forEach(function(product) {
//     totalItems += product.quantity;
//     totalPrice += product.price * product.quantity;
//   });

//   alert('You have purchased ' + totalItems + ' products with total price of $' + totalPrice);

// });


checkoutBtn.addEventListener('click', function() {

  let totalItems = 0;
  let totalPrice = 0;

  productsInCart.forEach(function(product) {
    totalItems += product.quantity;
    totalPrice += product.price * product.quantity;
  });

  document.querySelector('#popup-message').textContent = 'You have purchased ' + totalItems + ' products with total price of $' + totalPrice;
  document.querySelector('#checkout-popup').style.opacity = '1';

});

document.querySelector('#popup-close').addEventListener('click', function() {
  document.querySelector('#checkout-popup').style.opacity = '0';
});

// empty the cart if user is not admin

document.querySelector('#popup-close').addEventListener('click', function() {
  document.querySelector('#checkout-popup').style.display = 'none';

  let currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!sessionStorage.getItem('isAdmin')) {
    productsInCart = [];
    localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
    renderCart();
    updateCartCounter();
  }

});