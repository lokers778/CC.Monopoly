const addPlayer = document.querySelector('.addPlayerSubmit');
const playersList = document.querySelector('.playersList');
const inputText = document.querySelector('.inputText');

const clearNode = node => {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  return node;
};

// const newPlayers = [['krzysiu', '🧑'], ['misiu', '👱‍']];
const newPlayers = [];
function addNewPlayer() {
  const newPlayer = ['', ''];
  newPlayer[0] = inputText.value;
  inputText.value = '';
  newPlayers[newPlayers.length] = newPlayer;
  clearNode(playersList);
  newPlayers.forEach(Item => {
    // Create new li element
    const li = document.createElement('li');
    li.className = 'playersListItem';
    li.appendChild(document.createTextNode(`${Item[0]}${Item[1]}`));

    //Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btnDelete';
    deleteBtn.appendChild(document.createTextNode('Usuń'));
    li.appendChild(deleteBtn);

    //Add li element to list
    playersList.appendChild(li);
  });
}

addPlayer.addEventListener('click', addNewPlayer);

function returnNewPlayers() {
  return newPlayers;
}

export default returnNewPlayers;
