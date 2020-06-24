// generate array with random numbers on click
const numberArray = [];
const arrayLength = 30;
const sortTime = 10000;
const mergeSortTime = 500;

// animation array
const animationArray = [];

const PRIMARY_COLOR = "rgb(204, 122, 184)";
const SECONDARY_COLOR = "red";

// generate some array on page load
window.onload = () => {
  document.querySelector("#generate-array").click();
};

// generate an array on click
document.querySelector("#generate-array").addEventListener("click", () => {
  // enable sorting buttons
  enableButtons();
  //   empty existing array
  numberArray.splice(0, arrayLength);
  animationArray.splice(0, animationArray.length);
  //   empty inner items of bar-diagram container
  document.querySelector(".bar-diagram").innerHTML = "";
  //   push random numbers in the array
  for (var i = 0; i < arrayLength; i++) {
    numberArray.push(Math.floor(Math.random() * 100) + 20);
  }
  //   generate bar-diagram
  generateBarDiagram();
});

// function to generate bar-diagrams
function generateBarDiagram() {
  for (var i = 0; i < arrayLength; i++) {
    //   create a div with id bar
    var bar = document.createElement("div");
    bar.classList.add = "bar";
    // style the bar by giving appropriate width, height and background
    bar.style.height = `${(numberArray[i] / 120) * 100}%`;
    bar.style.width = `${100 / (arrayLength + 10)}%`;
    bar.style.backgroundColor = "rgb(204, 122, 184)";

    // finally append div to container
    document.querySelector(".bar-diagram").appendChild(bar);
  }
}

// triggering bubble sort function on click
document.querySelector("#bubble-sort").addEventListener("click", () => {
  bubbleSort();
  disableButtons();
});

// Buble sort algorithm
function bubbleSort() {
  var n = arrayLength;

  //   apply bubble sort algorithm

  for (var i = 0; i < n - 1; i++) {
    var flag = false;
    for (var j = 0; j < n - i - 1; j++) {
      if (numberArray[j] > numberArray[j + 1]) {
        animationArray.push([j, j + 1, true]);
        flag = true;
      } else {
        animationArray.push([j, j + 1, false]);
      }
    }
    if (flag === false) break;
  }
  //   animate and change the bars accordingly
  animateBubbleBars();
}
// fuction to animate and change bar color and height as per need
function animateBubbleBars() {
  console.log(animationArray);
  var n = animationArray.length;

  const allBars = document.querySelectorAll(".bar-diagram div");
  animationArray.forEach((arr, index) => {
    setTimeout(() => {
      allBars[arr[0]].style.backgroundColor = "red";
      allBars[arr[1]].style.backgroundColor = "red";
    }, (index / n) * sortTime);
    // console.log((index / n) * 5000, ((index + 1) / n) * 5000);
  });
  animationArray.forEach((arr, index) => {
    setTimeout(() => {
      if (numberArray[arr[0]] > numberArray[arr[1]]) {
        var temp = numberArray[arr[0]];
        numberArray[arr[0]] = numberArray[arr[1]];
        numberArray[arr[1]] = temp;

        temp = allBars[arr[1]].style.height;
        allBars[arr[1]].style.height = allBars[arr[0]].style.height;
        allBars[arr[0]].style.height = temp;
      }
      allBars[arr[0]].style.backgroundColor = "rgb(204, 122, 184)";
      allBars[arr[1]].style.backgroundColor = "rgb(204, 122, 184)";
    }, ((index + 0.99) / n) * sortTime);
  });
  setTimeout(() => {
    allBars.forEach((bar) => {
      bar.style.backgroundColor = "rgb(241, 132, 30)";
    });
  }, sortTime + 100);
}

// triggering bubble sort function on click
document.querySelector("#selection-sort").addEventListener("click", () => {
  selectionSort();
  disableButtons();
});

// Selection sort algorithm
function selectionSort() {
  var n = arrayLength;

  // copied array used for animation
  var copiedArray = [];
  for (let i = 0; i < n; i++) {
    copiedArray.push(numberArray[i]);
  }
  for (let i = 0; i < n - 1; i++) {
    var minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (numberArray[j] < numberArray[minIndex]) {
        minIndex = j;
        animationArray.push([i, j, true]);
      } else {
        animationArray.push([i, j, false]);
      }
    }
    var temp = numberArray[i];
    numberArray[i] = numberArray[minIndex];
    numberArray[minIndex] = temp;
  }
  animateSelectionBars(copiedArray);
}
// animate selection sort algorithm bars
function animateSelectionBars(copiedArray) {
  console.log(animationArray);
  console.log(copiedArray);
  var n = animationArray.length;

  const allBars = document.querySelectorAll(".bar-diagram div");
  animationArray.forEach((arr, index) => {
    setTimeout(() => {
      allBars[arr[0]].style.backgroundColor = "red";
      allBars[arr[1]].style.backgroundColor = "red";
    }, (index / n) * sortTime);
    // console.log((index / n) * 5000, ((index + 1) / n) * 5000);
  });

  animationArray.forEach((arr, index) => {
    setTimeout(() => {
      if (copiedArray[arr[0]] > copiedArray[arr[1]]) {
        var temp = copiedArray[arr[0]];
        copiedArray[arr[0]] = copiedArray[arr[1]];
        copiedArray[arr[1]] = temp;

        temp = allBars[arr[1]].style.height;
        allBars[arr[1]].style.height = allBars[arr[0]].style.height;
        allBars[arr[0]].style.height = temp;
      }
      allBars[arr[0]].style.backgroundColor = "rgb(204, 122, 184)";
      allBars[arr[1]].style.backgroundColor = "rgb(204, 122, 184)";
    }, ((index + 0.99) / n) * sortTime);
  });

  setTimeout(() => {
    allBars.forEach((bar) => {
      bar.style.backgroundColor = "rgb(241, 132, 30)";
    });
  }, sortTime + 100);
}

// disable buttons while algo is running
function disableButtons() {
  document.querySelectorAll(".algorithms button").forEach((btn) => {
    btn.disabled = true;
    btn.style.cursor = "default";
    btn.style.color = "black";
  });
}

// enable buttons
function enableButtons() {
  document.querySelectorAll(".algorithms button").forEach((btn) => {
    btn.disabled = false;
    btn.style.cursor = "pointer";
    btn.style.color = "white";
  });
}

// trigger merge sort algo on click
document.querySelector("#merge-sort").addEventListener("click", () => {
  disableButtons();
  mergeSort(numberArray);
});
// Animation array for merge sort algorithm---

function mergeSort(numberArray) {
  const animations = getMergeSortAnimations(numberArray);
  for (let i = 0; i < animations.length; i++) {
    const arrayBars = document.querySelectorAll(".bar-diagram div");
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;
      const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
      setTimeout(() => {
        barOneStyle.backgroundColor = color;
        barTwoStyle.backgroundColor = color;
      }, (i * mergeSortTime) / arrayLength);
    } else {
      setTimeout(() => {
        const [barOneIdx, newHeight] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        barOneStyle.height = `${(newHeight / 120) * 100}%`;
      }, (i * mergeSortTime) / arrayLength);
    }
  }
  setTimeout(() => {
    const arrayBars = document.querySelectorAll(".bar-diagram div");
    arrayBars.forEach((bar) => {
      bar.style.backgroundColor = "rgb(241, 132, 30)";
    });
  }, animations.length * mergeSortTime + 100);
}

function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

// Quick sort implementation--------
document.querySelector("#quick-sort").addEventListener("click", () => {
  quickSort();
  disableButtons();
});

// quicksort function--
function quickSort() {
  var copyArray = numberArray.slice();
  var quickAnimations = getQuickSortAnimations(copyArray);
  animateQuickBars(quickAnimations);
}

// Quick sort animations--
function getQuickSortAnimations(copyArray) {
  var quickAnimations = [];
  quickSortHelper(copyArray, 0, copyArray.length - 1, quickAnimations);
  return quickAnimations;
}
function quickSortHelper(copyArray, start, end, quickAnimations) {
  if (start >= end) return;
  var pivotIndex = findPivot(copyArray, start, end, quickAnimations);
  quickSortHelper(copyArray, start, pivotIndex - 1, quickAnimations);
  quickSortHelper(copyArray, pivotIndex + 1, end, quickAnimations);
}

function findPivot(copyArray, start, end, quickAnimations) {
  var i = start - 1;
  var pivotValue = copyArray[end];
  for (var j = start; j < end; j++) {
    if (copyArray[j] < pivotValue) {
      i++;
      quickAnimations.push([i, j]);
      var temp = copyArray[j];
      copyArray[j] = copyArray[i];
      copyArray[i] = temp;
    }
  }
  i++;
  quickAnimations.push([i, j]);
  var temp = copyArray[end];
  copyArray[end] = copyArray[i];
  copyArray[i] = temp;
  return i;
}

function animateQuickBars(quickAnimations) {
  var n = quickAnimations.length;

  const allBars = document.querySelectorAll(".bar-diagram div");
  quickAnimations.forEach((arr, index) => {
    setTimeout(() => {
      allBars[arr[0]].style.backgroundColor = "red";
      allBars[arr[1]].style.backgroundColor = "red";
    }, (index / n) * sortTime);
    // console.log((index / n) * 5000, ((index + 1) / n) * 5000);
  });
  quickAnimations.forEach((arr, index) => {
    setTimeout(() => {
      if (numberArray[arr[0]] > numberArray[arr[1]]) {
        var temp = numberArray[arr[0]];
        numberArray[arr[0]] = numberArray[arr[1]];
        numberArray[arr[1]] = temp;

        temp = allBars[arr[1]].style.height;
        allBars[arr[1]].style.height = allBars[arr[0]].style.height;
        allBars[arr[0]].style.height = temp;
      }
      allBars[arr[0]].style.backgroundColor = "rgb(204, 122, 184)";
      allBars[arr[1]].style.backgroundColor = "rgb(204, 122, 184)";
    }, ((index + 0.99) / n) * sortTime);
  });
  setTimeout(() => {
    allBars.forEach((bar) => {
      bar.style.backgroundColor = "rgb(241, 132, 30)";
    });
  }, sortTime + 100);
}
