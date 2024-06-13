'use strict';

var blockContainer = document.querySelector('.blockContainer');
const backBtn = document.querySelector('.backbtn');
const homeBtn = document.querySelector('.home');
const inputField = document.querySelectorAll('.inputField');
const lowerNum = document.querySelector('.lower');
let targetNum = document.querySelector('.target');
const randomDisplay = document.querySelector('.randomDisplay');
const operation = document.querySelector('.operation');
const reload = document.querySelector('.fa-rotate-right');
const binarySearch = document.querySelector('.binarysearch');
const refresh = document.querySelector('.reload');
const goBtn = document.querySelector('.searching');

const speedController = document.querySelector('#input');
const showData = document.querySelector('.result');

let delay = 1000;
var block = blockContainer.childNodes;

function waitforme(millisec) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('');
    }, millisec);
  });
}

speedController.addEventListener('input', () => {
  showData.textContent = speedController.value;
  delay = 500 - parseInt(speedController.value);
});

backBtn.addEventListener('click', () => {
  window.history.back();
  console.log('hi');
});

userDisplay.classList.add('hidden');

refresh.addEventListener('click', () => {
  reload.classList.toggle('rotate');

  inputField.forEach(e => {
    e.value = '';
  });

  location.reload(true);

  blockContainer.innerHTML = '';
  operation.innerHTML = 'Operational performed';
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

let target = parseInt(targetNum.value);

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

function disabledBinary() {
  binarySearch.disabled = true;
  binarySearch.style.cursor = 'not-allowed';
}

function enabledBinary() {
  binarySearch.disabled = false;
  binarySearch.style.cursor = 'default';
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

goBtn.addEventListener('click', () => {
  blockContainer.innerHTML = '';
  array = [];
  createDiv();
});

let array = [];
let arrayElements = [];

function generatingArray() {
  let lower = parseInt(lowerNum.value);
  let upper = parseInt(upperNum.value);

  for (let i = lower; i <= upper; i++) {
    let value = randomNumber(lower, upper);
    array.push(value);
  }
}

async function createDiv() {
  generatingArray();
  for (let i = 0; i < array.length; i++) {
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

binarySearch.addEventListener('click', async () => {
  disabledLinear();
  let block = blockContainer.childNodes;
  array.sort((a, b) => a - b);
  for (let i = 0; i < array.length; i++) {
    block[i].textContent = array[i];
  }
  let target = parseInt(targetNum.value);
  await waitforme(delay);
  await searching(0, array.length - 1, target);
  enabledLinear();
});

//searching in an array

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to perform binary search
async function searching(left, right, target) {
  let found = false;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midElement = array[mid];
    let temp;
    let tempOne;
    const midElementDiv = arrayElements[mid];
    const midValue = parseInt(midElementDiv.innerHTML);
    const firstElement = arrayElements[left];
    const lastElement = arrayElements[right];
    midElementDiv.classList.add('mid');
    firstElement.classList.add('low');
    lastElement.classList.add('high');

    await waitforme(delay);
    if (midValue === target) {
      operation.innerHTML = `${target}` + ' found at' + ` ${mid + 1}`;
      midElementDiv.classList.add('found');
      document.querySelector('.time-complexity-random').innerHTML =
        'Time Complexity:- O(logn)';
      found = true;
      break;
    } else if (target > midValue) {
      temp = left;
      left = mid + 1;

      removeElementsBefore(left, right);
      // removeElements(temp, left - 1);
    } else {
      tempOne = right;
      right = mid - 1;
      //created by ujjwal kumar
      removeElementsAfter(right, left);

      //created by abhishek singh
      // removeElements(right + 1, tempOne);
    }
    midElementDiv.classList.remove('mid');
    await waitforme(delay);
    if (!found) {
      if (midElement < target) {
        operation.innerHTML = `${midElement} < ` + `${target}`;
      } else if (midElement > target) {
        operation.innerHTML = `${midElement} > ` + `${target}`;
      }
      await waitforme(delay);
    }
    operation.innerHTML = `${target} ` + 'not found';
  }
}
