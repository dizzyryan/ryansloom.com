
// Copyright 2025 Ryan Chan

// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


function nameToString(){
  let nameList = [];
  let name = document.querySelector('.js-input-name');
  if (name) {
    let nameValue = name.value;
    let linesArray = nameValue.split('\n').filter(line => line.trim() !== '');
    nameList = nameList.concat(linesArray);
  } else {
    console.error('Input element with ID "js-input-name" not found.');
  }
  return nameList;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startGrouping() {
  document.querySelector('.js-name-list').innerHTML = '';
  const nameList = nameToString();
  const userInput = document.querySelector('.js-no-of-ppl');
  const peoplePerGroup = Number(userInput.value);
  
  while (nameList.length % peoplePerGroup !== 0) {
    nameList.push(' ');
  }

  let numberOfGroups =  nameList.length / peoplePerGroup;
  
  for (let counter = 0; counter < numberOfGroups; counter++) {
    let groupList = [];
  
    for (let i = 0; i < peoplePerGroup; i++) {
      let noOfNames = nameList.length;
      let pos = getRandomInt(0, noOfNames);
      while (pos > noOfNames - 1)
        pos = getRandomInt(0, noOfNames);
      groupList.push(nameList[pos]);
      removeName(pos, nameList);
    }
    printGroupList(groupList);
  }
}

function removeName(pos, arrayToMod) {
  arrayToMod.splice(pos, 1);
}

function printGroupList(gpList) {
  let inlineText = '', displayBox = '';

  for (let i = 0; i < gpList.length; i++) {
    
    if (gpList[i] != ' ') {
      inlineText += gpList[i];
      inlineText += '\n';
    }
    else
      continue;
  }

  displayBox = `<p class="group-block">${inlineText.replace(/\n/g, '<br>')}</p>`;
  document.querySelector('.js-name-list').innerHTML += displayBox;
}