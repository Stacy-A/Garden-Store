// function loadHeader() {

//   fetch('/header.html')
//     .then(function(response) {
//       return response.text();
//     })
//     .then(function(html) {

//       document.querySelector('.site-header').innerHTML = html;

//       updateCartCounter(); 

//     });

// }

// loadHeader();



window.demoProducts = [
  {
    id: 'prod-1',
    title: 'Carrot Seeds',
    shortDescription: 'High quality carrot seeds',
    description: 'Grow crisp, flavorful carrots effortlessly...',
    price: 3,
    stock: 9,
    category: 'seeds',
    image: 'assets/19888 (1).jpg'
  },
  {
    id: 'prod-2',
    title: 'Gardening toolkit',
    shortDescription: 'A small toolkit that will help in your garden',
    description: 'This compact garden toolkit has everything you need...',
    price: 7.5,
    stock: 20,
    category: 'tools',
    image: 'assets/hero-back.jpg'
  },
  {
    id: 'prod-3',
    title: 'Strawberry bush',
    shortDescription: 'Easy to plant strawberry bush',
    description: 'Enjoy fresh, juicy strawberries right from your garden...',
    price: 12.99,
    stock: 15,
    category: 'plants',
    image: 'assets/45 (1).jpg'
  }
];





// Load header
async function loadHeader() {
  const response = await fetch('/header.html');
  const html = await response.text();
  document.querySelector('.site-header').innerHTML = html;

  updateCartCounter(); // after header exists
}

loadHeader();



function updateCartCounter() {

  let countElement = document.querySelector('#cart-count');

  let productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];

  let totalItems = 0;

  productsInCart.forEach(function(product) {
    totalItems += product.quantity;
  });

  countElement.textContent = " (" + totalItems + ")";

}





