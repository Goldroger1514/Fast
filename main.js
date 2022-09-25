let levels = document.querySelector("select");
let description = document.querySelector(".description");
let inputt = document.querySelector("input");
let current = document.querySelector(".current-word");
let score = document.querySelector(".got");
let seconds = document.querySelector(".seconds");
let time = document.querySelector(".seconds");
let descriptionArray = [
  "On this level,lowercase letters and uppercase letter doesn't matter,you just need to write the words correctly.\nYou have 5 seconds for each word.",
  "On this level,lowercase letters and uppercase letter does matter,\nYou have 5 seconds for each word.",
  "On this level,lowercase letters and uppercase letter does matter,\nYou have 3 seconds for each word.",
];
let finish = document.querySelector(".finish");
if (!localStorage.getItem("level")) {
  changeDescription();
} else {
  description.textContent = `You are playing on ${localStorage.getItem(
    "level"
  )}`;
}
changeOption();
changeLevel();
time.innerHTML = timeChecker();
levels.onchange = function () {
  changeDescription();
  changeOption();
  time.innerHTML = timeChecker();
};
function changeDescription() {
  localStorage.setItem("level", levels.value);
  changeLevel();
}
function changeOption() {
  let options = document.querySelectorAll("option");
  options.forEach((op) => {
    if (op.value == localStorage.getItem("level")) {
      op.classList = "active";
      op.setAttribute("selected", "");
    } else {
      op.classList = "";
    }
  });
}
function changeLevel() {
  switch (localStorage.getItem("level")) {
    case "Easy":
      description.textContent = `You are playing on ${localStorage.getItem(
        "level"
      )}. ${descriptionArray[0]}`;
      break;
    case "Normal":
      description.textContent = `You are playing on ${localStorage.getItem(
        "level"
      )}. ${descriptionArray[1]}`;
      break;
    case "Hard":
      description.textContent = `You are playing on ${localStorage.getItem(
        "level"
      )}. ${descriptionArray[2]}`;
      break;
  }
}
let wordsArray = [
  "Facebook",
  "Programming",
  "Destructuring",
  "Algorithm",
  "Propaganda",
  "Always",
  "Each",
  "Before",
  "After",
  "Content",
  "Math",
  "Physics",
  "This",
  "That",
  "America",
  "Achieve",
  "Lebanon",
  "Lebanese",
  "American",
  "Play",
  "Hello",
  "By",
  "Coffe",
  "Tea",
  "Water",
  "Pepsi",
  "Cola",
  "7Up",
  "Mirenda",
  "Ships",
  "Potato",
];
let input = document.querySelector("input");
input.onpaste = function () {
  return false;
};
function levelCheck() {
  if (localStorage.getItem("level") == "Hard") {
    let hardArray = [];
    for (let i = 0; i < wordsArray.length; i++) {
      if (wordsArray[i].length > 5) {
        hardArray.push(wordsArray[i]);
      }
    }
    return hardArray;
  } else {
    let easyArray = [];
    for (let i = 0; i < wordsArray.length; i++) {
      if (wordsArray[i].length <= 5) {
        easyArray.push(wordsArray[i]);
      }
    }
    return easyArray;
  }
}
function generateWords(array) {
  let currentWord = document.querySelector(".current-word");
  currentWord.innerHTML = array[Math.floor(Math.random() * array.length)];
  let index = array.indexOf(currentWord.innerHTML);
  array.splice(index, 1);
  let upcomingWords = document.querySelector(".upcoming-words");
  upcomingWords.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let div = document.createElement("div");
    div.innerHTML = array[i];
    upcomingWords.append(div);
  }
  startPlay(array);
}
document.querySelector("button").onclick = function () {
  let array = levelCheck();
  let total = document.querySelector(".total");
  total.innerHTML = array.length;
  generateWords(array);
  this.remove();
  input.focus();
};
function timeChecker() {
  switch (localStorage.getItem("level")) {
    case "Easy":
    case "Normal":
      return 5;
    default:
      return 3;
  }
}
function startPlay(array) {
  let secondsLeft = document.querySelector(".seconds");
  secondsLeft.innerHTML = timeChecker();
  let start = setInterval(() => {
    secondsLeft.innerHTML--;
    if (secondsLeft.innerHTML == 0) {
      clearInterval(start);
      if (array.length >= 1) {
        if (wordsChecker()) {
          score.innerHTML++;
          generateWords(array);
          input.value = "";
        } else {
          let div = document.createElement("div");
          div.classList = "bad";
          div.textContent = "Game Over!";
          finish.append(div);
        }
      } else {
        let div = document.createElement("div");
        div.classList = "good";
        div.textContent = "Gongratz!";
        finish.append(div);
      }
    }
  }, 1000);
}
function wordsChecker() {
  if (localStorage.getItem("level") == "Hard") {
    if (input.value == current.innerHTML) return true;
    return false;
  } else {
    if (input.value.toLowerCase() == current.innerHTML.toLowerCase())
      return true;
    return false;
  }
}
