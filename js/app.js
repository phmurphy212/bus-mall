'use strict';
//global variables
let allProducts = [];
let clicks = 0;
let clicksAllowed = 25;
let buttonsClicked = 0;
let noRepeats = [];
//DOM footholds
let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');
let imageThree = document.querySelector('section img:nth-child(3)');
let getChart = document.getElementById('myChart').getContext('2d');


//constructor
function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allProducts.push(this);
}
//local storage section
//save to local storage
let storedProducts = localStorage.getItem('products');
//if there is local storage do this if, otherwise do they else
if (storedProducts) {
  let parsedProducts = JSON.parse(storedProducts);
  allProducts = parsedProducts;
} else {
  new Product('bag');
  new Product('banana');
  new Product('bathroom');
  new Product('boots');
  new Product('breakfast');
  new Product('bubblegum');
  new Product('chair');
  new Product('cthulhu');
  new Product('dog-duck');
  new Product('dragon');
  new Product('pen');
  new Product('pet-sweep');
  new Product('scissors');
  new Product('shark');
  new Product('sweep', 'png');
  new Product('tauntaun');
  new Product('unicorn');
  new Product('water-can');
  new Product('wine-glass');
}
//pick a random product number
function selectRandomProductIndex() {
  let selectedItem = Math.floor(Math.random() * allProducts.length);
  return selectedItem;
}
//show the pictures on the page
function renderRandomProducts() {
  while (noRepeats.length < 6) {
    let uniqueProduct = selectRandomProductIndex();
    while (!noRepeats.includes(uniqueProduct)) {
      noRepeats.unshift(uniqueProduct);
    }
  }
  let productOne = noRepeats.pop();
  let productTwo = noRepeats.pop();
  let productThree = noRepeats.pop();

  imageOne.alt = allProducts[productOne].name;
  imageOne.src = allProducts[productOne].src;
  allProducts[productOne].views++;

  imageTwo.alt = allProducts[productTwo].name;
  imageTwo.src = allProducts[productTwo].src;
  allProducts[productTwo].views++;

  imageThree.alt = allProducts[productThree].name;
  imageThree.src = allProducts[productThree].src;
  allProducts[productThree].views++;
}
//event handler for image clicks
function handleProductClick(event) {
  if (event.target === myContainer) {
    alert('click on an IMAGE please`');
  }
  clicks++;
  let clickedProduct = event.target.alt;
  for (let i = 0; i < allProducts.length; i++) {
    if (clickedProduct === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderRandomProducts();

  if (clicks === clicksAllowed) {
    myContainer.removeEventListener('click', handleProductClick);
  }
}
//event handler for button clicks
function handleButtonClick(event) {
  if (clicks === clicksAllowed) {
    buttonsClicked++;
  }
  if (buttonsClicked > 0) {
    myButton.removeEventListener('click', handleButtonClick);
    createChart();
    let stringProducts = JSON.stringify(allProducts);
    localStorage.setItem('products', stringProducts);
  }
}
//create our chart
function createChart() {
  let viewsArray = [];
  let clicksArray = [];
  let namesArray = [];

  for (let i = 0; i < allProducts.length; i++) {
    let oneProductName = allProducts[i].name;
    namesArray.push(oneProductName);
  }
  for (let i = 0; i < allProducts.length; i++) {
    let oneProductView = allProducts[i].views;
    viewsArray.push(oneProductView);
  }
  for (let i = 0; i < allProducts.length; i++) {
    let oneProductClick = allProducts[i].clicks;
    clicksArray.push(oneProductClick);
  }
  let myChart = new Chart(getChart, {
    type: 'bar',
    data: {
      labels: namesArray,
      datasets: [
        {
          label: 'Views',
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: viewsArray
        },
        {
          label: 'Clicks',
          borderColor: 'rgb(255, 99, 132)',
          data: clicksArray
        }
      ],
    },
  }
  );
}
//run the code
renderRandomProducts();
//event listener
myContainer.addEventListener('click', handleProductClick);
myButton.addEventListener('click', handleButtonClick);
