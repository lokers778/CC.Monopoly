const playersList = document.querySelector('.playersList');
const btnNumberOfPlayers = [...document.querySelectorAll('.createNewPlayers')];

const clearNode = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  return node;
};

const newPlayers = [['krzysiu', '🧑'], ['misiu', '👱‍']];
// const newPlayers = [];

const newPlayersToPlayersList = function () {
  playersList.innerHTML = '';
  newPlayers.forEach(Item => {
    // Create new li element
    const li = document.createElement('li');
    li.className = 'playersListItem';
    li.appendChild(document.createTextNode(`${Item[1]} ${Item[0]} `));

    //Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btnDelete';
    deleteBtn.appendChild(document.createTextNode('Usuń'));
    li.appendChild(deleteBtn);

    //Add li element to list
    playersList.appendChild(li);
  })
}
newPlayersToPlayersList();

btnNumberOfPlayers.forEach(item => {
  item.addEventListener('click', function () {
    const numberOfPlayers = this.innerText;
    if (newPlayers.length !== numberOfPlayers) {
      if (newPlayers.length < numberOfPlayers) {
        for (let i = newPlayers.length; i < numberOfPlayers; i++) {
          const newPlayer = ['', ''];
          newPlayers[newPlayers.length] = newPlayer;
        }
      }
      else if (newPlayers.length > numberOfPlayers) {
        newPlayers.splice(numberOfPlayers);
      }
    }
    newPlayersToPlayersList();
  });
});

// const btnDelete = [...document.querySelectorAll('.btnDelete')]
// btnDelete.forEach(item => {
//   item.addEventListener('click', function () {
//     clearNode(this.parentNode);
//     console.log(this.parentNode);
//   })
// });

// function addNewPlayer() {
//   const newPlayer = ['', ''];
//   console.log(btnNumberOfPlayers);
//   newPlayer[0] = inputText.value;
//   inputText.value = '';
//   newPlayers[newPlayers.length] = newPlayer;
//   clearNode(playersList);
//   newPlayers.forEach(Item => {
//     // Create new li element
//     const li = document.createElement('li');
//     li.className = 'playersListItem';
//     li.appendChild(document.createTextNode(`${Item[0]}${Item[1]}`));

//     //Create delete button
//     const deleteBtn = document.createElement('button');
//     deleteBtn.className = 'btnDelete';
//     deleteBtn.appendChild(document.createTextNode('Usuń'));
//     li.appendChild(deleteBtn);

//     //Add li element to list
//     playersList.appendChild(li);
//   });
// }

// addPlayer.addEventListener('click', addNewPlayer);

function returnNewPlayers() {
  return newPlayers;
}

export default returnNewPlayers;
