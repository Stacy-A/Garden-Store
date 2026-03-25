console.log("Loaded");

console.log('JS Loaded', document.getElementById('admin-login'), document.getElementById('manage-page'));

const productForm = document.querySelector('#product-form');
const titleInput = productForm.querySelector('#product-title');
const shortdescriptionInput = productForm.querySelector('#short-description');
const descriptiomInput = productForm.querySelector('#product-description');
const priceInput = productForm.querySelector('#product-price');
const imageInput = productForm.querySelector('#product-image');
const stockInput = productForm.querySelector('#product-stock');
const categoryInput = productForm.querySelector('#category-select');


let editingProductId = null;

let productsGrid = document.querySelector('#products-grid .grid');


// product class
class Product {
  constructor(data) {
    this.id = data.id || Product.generateId();
    this.title = data.title;
    this.shortDescription = data.shortDescription;
    this.description = data.description;
    this.price = Number(data.price);
    this.stock = Number(data.stock);
    this.image = data.image;
    this.category = data.category;
  }

  static generateId() {
    return 'prod-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
}






// Load products from LS 
let currentProducts = JSON.parse(localStorage.getItem('currentProducts')) || []; 

renderAllProducts();



// Functions on form submit
productForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (editingProductId) {
    editProductSubmit();
  } else {
    createProduct();
  }
});

// Function to create a product
function createProduct() {
  let title = titleInput.value.trim();
  let shortDescription = shortdescriptionInput.value;
  let description = descriptiomInput.value;
  let price = Number(priceInput.value);
  let stock = Number(stockInput.value);
  let imageFile = imageInput.files[0];
  let productCategory = categoryInput.value;

  if (!title || !price || !stock || !imageFile) {
    alert("Please fill in all required fields!");
    return;
  }

  let reader = new FileReader();
  reader.onload = function () {
    let product = new Product({
      title: title,
      shortDescription: shortDescription,
      description: description,
      price: price,
      stock: stock,
      image: reader.result,
      category: productCategory
    });

    currentProducts.push(product);
    localStorage.setItem('currentProducts', JSON.stringify(currentProducts));
    renderAllProducts();
    productForm.reset();
  };
  alert("Product has been created")
  reader.readAsDataURL(imageFile);
}

// Function to edit a product
function editProductSubmit() {
  let productIndex = -1;

  for (let i = 0; i < currentProducts.length; i++) {
    if (currentProducts[i].id === editingProductId) {
      productIndex = i;
      break;
    }
  }

  if (productIndex === -1) return;

  let product = currentProducts[productIndex];

  product.title = titleInput.value.trim();
  product.shortDescription = shortdescriptionInput.value;
  product.description = descriptiomInput.value;
  product.price = Number(priceInput.value);
  product.stock = Number(stockInput.value);
  product.category = categoryInput.value;

  let imageFile = imageInput.files[0];

  if (imageFile) {
    let reader = new FileReader();
    reader.onload = function () {
      product.image = reader.result;
      finishEdit();
    };
    reader.readAsDataURL(imageFile);
  } else {
    finishEdit();
  }

  function finishEdit() {
    localStorage.setItem('currentProducts', JSON.stringify(currentProducts));
    renderAllProducts();
    productForm.reset();
    editingProductId = null;
  }
  alert("Product has been edited")
}

// Renedering all products
function renderAllProducts() {
  productsGrid.innerHTML = '';
  for (let i = 0; i < currentProducts.length; i++) {
    renderProduct(currentProducts[i]);
  }
}

// Renedering one product
function renderProduct(product) {
  let productGridItem = document.createElement('div');
  productGridItem.className = 'product-item';

  productGridItem.innerHTML = ''
    + '<img src="' + product.image + '" alt="' + product.title + '">'
    + '<div class="product-info">'
    + '<h3>' + product.title + '</h3>'
    + '<p class="price">$' + product.price + '</p>'
    + '<p>' + (product.shortDescription || '') + '</p>'
    + '<div class="manage-btns">'
    + '<button class="manage-edit">Edit Product</button>'
    + '<button class="manage-remove">Delete Product</button>'
    + '</div>'
    + '</div>';

  // Populating form on edit button click
  let editBtn = productGridItem.querySelector('.manage-edit');
  editBtn.addEventListener('click', function () {
    editingProductId = product.id;

    titleInput.value = product.title;
    shortdescriptionInput.value = product.shortDescription;
    descriptiomInput.value = product.description;
    priceInput.value = product.price;
    stockInput.value = product.stock;
    product.productCategory = categoryInput.value;

    productForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // Delete button ckick
  let removeBtn = productGridItem.querySelector('.manage-remove');
  removeBtn.addEventListener('click', function () {
    if (confirm("Delete this product?")) {
      currentProducts = currentProducts.filter(function (p) {
        return p.id !== product.id;
      });
      localStorage.setItem('currentProducts', JSON.stringify(currentProducts));
      alert("Product has been deleted")
      renderAllProducts();
    }
  });

  productsGrid.appendChild(productGridItem);
}


// // Admin login


document.addEventListener('DOMContentLoaded', () => {

  const adminUsername = "admin";
  const adminPassword = "admin";

  const loginForm = document.getElementById("admin-login");
  const manageContent = document.getElementById("manage-page");
  const loginBtn = document.getElementById("login-btn");
  const loginError = document.getElementById("login-error");

 
  manageContent.style.display = "none"; // if JS not loaded yet hiding the management content
  loginForm.style.display = "block";
  loginError.style.display = "none";

 
  if (localStorage.getItem("isAdmin")) {
    loginForm.style.display = "none";
    manageContent.style.display = "block";
  }

  loginBtn.addEventListener("click", () => {
    const username = document.getElementById("admin-username").value;
    const password = document.getElementById("admin-password").value;

    if (username === adminUsername && password === adminPassword) {
      localStorage.setItem("isAdmin", true); // save login session
      loginForm.style.display = "none";
      manageContent.style.display = "block";
      loginError.style.display = "none";
    } else {
      loginError.style.display = "block";
    }
  });

});
