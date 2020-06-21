// generate array with random numbers on click
const numberArray = [];
const arrayLength = 30;
const sortTime = 10000;

// animation array
const animationArray = [];
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
