// 'use strict';

var blockContainer = document.querySelector('.blockContainer');
const backBtn = document.querySelector('.backbtn');
const homeBtn = document.querySelector('.home');
const inputField = document.querySelectorAll('.inputField');
const lowerNum = document.querySelector('.lower');
const tragetNum = document.querySelector('.target');
const randomDisplay = document.querySelector('.randomDisplay');
const operation = document.querySelector('.operation');
const reload = document.querySelector('.fa-rotate-right');
const binarySearch = document.querySelector('.binarysearch');
const refresh = document.querySelector('.reload');
const goBtn = document.querySelector('.searching');

backBtn.addEventListener('click', () => {
  window.history.back();
  console.log('hi');
});

refresh.classList.add('hidden');
randomDisplay.classList.add('hidden');

refresh.addEventListener('click', () => {
  reload.classList.toggle('rotate');

  inputField.forEach(e => {
    e.value = '';
  });

  blockContainer.innerHTML = '';
  operation.innerHTML = '';

  document.querySelector('.time-complexity-binary').innerHTML = '';
});

homeBtn.addEventListener('click', () => {
  window.history.go(-2); //history.go method to go previous page in web application
  //provide delta value in it
});

//defer -> it specify that the script is downloaded in parallel to parsing the page, and executed after the page has finished parsing.

inputField.forEach(e => {
  e.onkeydown = function (e) {
    if (isNaN(e.key) && e.key == 'backspace') {
      e.preventDefault();
    }
  };
});

inputField.forEach(e => {
  e.value = '';
});

//generating number between lower and upper
var first;
var second;
var target;

lowerNum.onkeyup = () => {
  first = lowerNum.value;
};

tragetNum.onkeyup = () => {
  target = tragetNum.value;
};

var keyCount = 0;
var num;

function removeAnimation() {
  blockContainer.childNodes.forEach(e => {
    e.classList.remove('scaleitem');
  });
}

function animate() {
  console.log('hi there');
  blockContainer.childNodes.forEach(e => {
    e.classList.add('scaleitem');
  });
}

function disabledbtn() {
  binarySearch.disabled = true;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

goBtn.addEventListener('click', () => {
  blockContainer.innerHTML = '';
  createDiv();
});

let array = [];
let arrayElements = [];

function generateSortedArray(lowerNum, upperNum) {}

async function createDiv() {
  // generateSortedArray(lowerNum.value, upperNum.value);
  array = [];
  for (let i = lowerNum.value; i <= upperNum.value; i++) {
    array[i] = random(lowerNum.value, upperNum.value);
  }
  array.sort((a, b) => a - b); // Sort the array
  console.log(array);

  for (let i = 0; i < array.length - 1; i++) {
    const element = document.createElement('div');
    element.textContent = array[i];

    element.style.border = '2px solid blanchedalmond';
    element.style.width = '2.8em';
    element.style.padding = '15px';
    element.style.borderRadius = '50%';
    element.style.transition = 'all 1s ease-in-out';
    element.style.animation = 'animate 1s 1';
    blockContainer.appendChild(element);
    element.className = 'array-element';

    arrayElements.push(element);

    await sleep(50);
  }
}

binarySearch.addEventListener('click', () => {
  console.log(target);
  searching(0, array.length - 1, target);
});

//searching in an array

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to perform binary search
async function searching(left, right, target) {
  let found = false;

  console.log('right', right);
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const midElement = array[mid];
    let n = arrayElements.length - 1;
    const midElementDiv = arrayElements[mid];
    const firstElement = arrayElements[left];
    const lastElement = arrayElements[n];
    midElementDiv.classList.add('mid');
    firstElement.classList.add('low');
    lastElement.classList.add('high');

    await sleep(1000); // Delay for animation

    if (midElementDiv.innerHTML === target) {
      operation.innerHTML = `${target}` + ' found at' + ` ${mid}`;
      midElementDiv.classList.add('found');
      found = true;
      break;
    } else if (midElementDiv.innerHTML < target) {
      left = mid + 1;
      removeElementsBefore(left, right);
      console.log(arrayElements);
      // previousEnd++;
    } else {
      right = mid - 1;
      removeElementsAfter(right, left);
    }
    midElementDiv.classList.remove('mid');
    await sleep(500); // Delay for animation

    if (!found) {
      operation.innerHTML = `${target} ` + 'not found';
      if (midElement < target) {
        operation.innerHTML = `${midElement} < ` + `${target}`;
      } else {
        operation.innerHTML = `${midElement} > ` + `${target}`;
      }
      await sleep(100);
    }
  }
}
