const addPlayer = document.querySelector(".addPlayerSubmit");
const playersList = document.querySelector('.playersList');
const inputText = document.querySelector('.inputText');

// Add player
export default function newGame() {

  function addNewPlayer() {
    let newPlayerName = inputText.value;
    inputText.value = '';

    // Create new li element
    const li = document.createElement('li');
    li.className = 'playersListItem';
    li.appendChild(document.createTextNode(newPlayerName));

    //Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btnDelete';
    deleteBtn.appendChild(document.createTextNode('X'));
    li.appendChild(deleteBtn);

    //Add li element to list
    playersList.appendChild(li);
  }

  addPlayer.addEventListener('click', addNewPlayer);
}
