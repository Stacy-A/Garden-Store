
const productsGrid = document.querySelector('#products-grid .grid');

console.log(window.demoProducts);

// Load products from localStorage
let currentProducts = JSON.parse(localStorage.getItem('currentProducts')) || [];



// IF NOTHING IN LS!
if (currentProducts.length === 0 && Array.isArray(window.demoProducts)) {
  currentProducts = [...window.demoProducts];
  localStorage.setItem('currentProducts', JSON.stringify(currentProducts));
}



// Render all products
currentProducts.forEach(function (product) {
  renderProduct(product);
});

function renderProduct(product) {
  let productGridItem = document.createElement('div');
  productGridItem.className = 'product-item';

  productGridItem.innerHTML = ''
    + '<img src="' + product.image + '" alt="' + product.title + '">'
    + '<div class="product-info">'
    + '<h3>' + product.title + '</h3>'
    + '<p class="price">$' + product.price + '</p>'
    + '<p>' + (product.shortDescription || '') + '</p>'
    + '<button class="buy-now" onclick="goToProductPage(\'' + product.id + '\')">Buy Now</button>'
    + '</div>';

  productsGrid.appendChild(productGridItem);
}




/* Product Link */

function goToProductPage(id) {
  window.location.href = 'product.html?id=' + encodeURIComponent(id);
}


/* Category Filters */


let filterButtons = document.querySelectorAll('.filters button');  // styling the buttons on click


filterButtons.forEach(function(btn) {
  btn.addEventListener('click', function() {
    

    filterButtons.forEach(function(b) {
      b.classList.remove('active');
    });

    btn.classList.add('active');
  });
});



document.querySelector('#all-filter').addEventListener('click', function () { 
  filterProducts('all');
});

document.querySelector('#seeds-filter').addEventListener('click', function () {
  filterProducts('seeds');
});

document.querySelector('#plants-filter').addEventListener('click', function () {
  filterProducts('plants');
});

document.querySelector('#tools-filter').addEventListener('click', function () {
  filterProducts('tools');
});


function filterProducts(category) {
  productsGrid.innerHTML = ''; // clear current HTML

  let productsToShow;

  if (category === 'all') {
    productsToShow = currentProducts;
  } else {
    // productsToShow = currentProducts.filter(function (product) {
    //   return product.category === category;
    // });

    productsToShow = currentProducts.filter(function (product) {
  return product.category && product.category.toLowerCase() === category.toLowerCase();
});
  }

  productsToShow.forEach(function (product) { 
    renderProduct(product); // and render HTML again
  });
}

// console.log(currentProducts);


/* Search Filter */

let searchInput = document.querySelector('#search-filter');

searchInput.addEventListener('input', function() {

  let searchText = searchInput.value.trim().toLowerCase();
  
  let filteredProducts = currentProducts.filter(function(product) {
    return product.title.toLowerCase().includes(searchText);
  });

 
  
  productsGrid.innerHTML = '';  // clear current HTML

  if (filteredProducts.length === 0) {
    productsGrid.innerHTML = '<p>No products found</p>';
  } else {
    filteredProducts.forEach(renderProduct); // and render HTML again with matching products
  }

});