const addPlayer = docuemnt.querySelector(".addPlayerSubmit");
const playersList = docuemnt.querySelector('.playersList');
const inputText = document.querySelector('.inputText');

// Add player
function addItem() {
  let newPlayerName = inputText.value;

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

addPlayer.addEventListener('click', addItem);
