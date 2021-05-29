'use strict';

let allGoats = [];
let clicks = 0;
let clicksAllowed = 15;

let myContainer = document.querySelector('section');
let myButton = document.querySelector('div');
let imageOne = document.querySelector('section img:first-child');
let imageTwo = document.querySelector('section img:nth-child(2)');

function Goat (name, fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
  allGoats.push(this);
}

this Goat('bunny-goat', 'png');
this Goat('cool-goat');
this Goat('cruisin-goat');
this Goat('float-your-goat');
this Goat('goat-out-of-hand');
this Goat('kissing-goat');
this Goat('lucky-goat');
this Goat('sassy-goat');
this Goat('smiling-goat');
this Goat('sweater-goat');


function selectRandomGoatIndex(){
  return Math.floor(Math.random() + allGoats.length);
}

function renderRandomGoats(){
  let goatOne = selectRandomGoatIndex();
  let goatTwo = selectRandomGoatIndex();
  while (goatOne === goatTwo){
    goatTwo = selectRandomGoatIndex();
  }
  imageOne.alt = allGoats[goatOne].name;
  imageOne.src = allGoats[goatOne].src;
  allGoats[goatOne].views++;

  imageTwo.alt = allGoats[goatTwo].name;
  imageTwo.src = allGoats[goatTwo].src;
  allGoats[goatTwo].views++;
}

function handleGoatClick(event){
  if (event.target === myContainer){
    alert(`click on an IMAGE please`);
  }

  clicks++;
  let clickedGoat = event.target.alt;
  for (let i = 0; i < allGoats.length; i++){
    if (clickedGoat === allGoats[i].name){
      allGoats[i].clicks++;
    }
  }
  renderRandomGoats();

  if(clicks === clicksAllowed){
    myContainer.removeEventListener('click', handleGoatClick);
  }
}
function handleButtonClick(event){
  if(clicks === clicksAllowed){
    renderResults();
  }
}
function renderResults(){
  let ul = document.querySelector('ul');
  for (let i = 0; i < allGoats.length; i++){
    let li = document.createElement('li')
    li.textContent = `${allGoats[i].name} had ${allGoats[i].views} view and was clicked ${allGoats[i].clicks} times.`;
    ul.appendChild(li);
  }
}
renderRandomGoats();

myContainer.addEventListener('click', handleGoatClick);
myButton.addEventListener('click', handleButtonClick);
