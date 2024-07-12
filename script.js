document.addEventListener("DOMContentLoaded", ()=>{
  const status = document.getElementById("status");
  const reset = document.getElementById("reset");
  const cells = document.querySelectorAll(".cell");

  let gameState = ["", "", "", "", "", "", "", "", ""];
  let winningConditions = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  let currentPlayer = "X";
  status.innerHTML = `player ${currentPlayer} should play`;
  let isGameActive = true;
  cells.forEach(cell => cell.addEventListener("click", handleFunction));
  
  function handleFunction(event){
    let cellClicked = event.target;
    let cellClickedIndex = parseInt(cellClicked.getAttribute("data-index"));
    if(gameState[cellClickedIndex] !== "" || !isGameActive ){
      return;
    }
    gameState[cellClickedIndex] = currentPlayer;
    cellClicked.innerHTML = currentPlayer;
    resultCheck();
  }

  function resultCheck(){
    let isGameWon = false;
    for(i = 0; i < winningConditions.length; i++){
      let winCondition = winningConditions[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];

      
      if(a === "" || b === "" || c === ""){
        continue;
      }
      if(a===b && b===c){
        isGameWon = true;
        break;
      }
    }

    if (isGameWon){
      status.innerHTML = `player ${currentPlayer} won this round`;
      isGameActive = false;
      return;
    }

    let isGameDrawn = !gameState.includes("");
    if (isGameDrawn){
      status.innerHTML = `its a draw game`;
      return;
    }

    currentPlayer = currentPlayer === "X"? "O": "X";
    status.innerHTML = `its ${currentPlayer}'s turn`;

  };

  reset.addEventListener("click", ()=>{
    gameState = ["", "", "", "", "", "", "", "", ""];
    isGameActive = true;
    cells.forEach(cell => cell.innerHTML = "");
    currentPlayer = "X";
    status.innerHTML = `player ${currentPlayer} should play`;
  });
});