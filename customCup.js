let container = document.querySelector(".container");
let playerName = document.getElementById("newPlayer");
let playersContainer = document.getElementById("listUl");
let addPlayerBtn = document.getElementById("addNewPlayer");
let startGameBtn = document.getElementById("createCup");
let list = document.querySelector(".list");
let clearBtn = document.getElementById("clear");

let playerList = [];
let count = 1;
let matchNum = 1;

addPlayerBtn.onclick = () => {
  if (playerName.value !== "") {
    addPlayer(playerName.value);
    createPlayer(playerName.value);
    playerName.value = "";
  }
};

const addPlayer = (player) => {
  playerList.includes(player) ? "" : playerList.push(player);
  if (playerList.length > 0) {
    list.classList.add("active");
    if (playerList.length > 1) {
      startGameBtn.classList.add("active");
    }
  }
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const startGame = (gameList, count, matchNum) => {
  if (gameList.length == 1 || gameList.length == 0) {
    return;
  }
  let div = document.createElement("div");
  let divTitle = document.createElement("h2");
  let roundList = [];

  shuffleArray(gameList);

  divTitle.innerText = `Round ${count}`;
  div.appendChild(divTitle);
  div.className = "roundsContainer";

  for (let i = 0; i < parseInt(gameList.length); i += 2) {
    if (i == parseInt(gameList.length - 1) && gameList.length % 2 != 0) {
      roundList.push(gameList[gameList.length - 1]);
    } else {
      roundList.push(`Match ${matchNum}`);

      let li = document.createElement("li");
      li.innerHTML = `<h3>Match ${matchNum}</h3> <div class='spans'>
        <span>${gameList[i]}</span> VS <span>${gameList[i + 1]}</span>
      </div>`;
      div.appendChild(li);
      console.log(`Match ${matchNum}: \t ${gameList[i]} VS ${gameList[i + 1]}`);
    }
    console.log(div);

    container.appendChild(div);

    matchNum++;
  }

  count++;

  startGame(roundList, count, matchNum);
};

const createPlayer = (player) => {
  let li = document.createElement("li");
  li.innerHTML = `${player}`;
  li.id = "listLi";
  li.setAttribute("data-name", player);
  playersContainer.appendChild(li);
};

startGameBtn.onclick = () => {
  startGame(playerList, count, matchNum);
  clearBtn.classList.add("active");
};

clearBtn.onclick = () => {
  console.log("hi");
  playerList = [];
  count = 1;
  matchNum = 1;
  let divs = document.querySelectorAll(".roundsContainer");
  divs.forEach((div) => {
    container.removeChild(div);
  });
  playersContainer.innerHTML = "";
  list.classList.remove("active");
  startGameBtn.classList.remove("active");
  clearBtn.classList.remove("active");
};
