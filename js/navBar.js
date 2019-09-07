let active = null;

function navigationBar(players) {
  const burger = document.querySelector('.burger');
  const navBar = document.querySelector('.navBar');

  controlPlayers(players);

  burger.addEventListener('click', () => {
    navBar.classList.toggle('navActive');
    burger.classList.toggle('cross');
  });
}

function controlPlayers(players) {
  const buttony = document.querySelector('.buttony');
  const info = document.querySelector('.info');
  const game = document.body;

  for (let i = 0; i < players.length; i++) {
    const button = document.createElement('button');
    button.id = `player${i + 1}`;
    button.className = 'button';
    button.type = 'button';
    button.innerHTML = `${players[i].name} ${players[i].icon}`;
    buttony.appendChild(button);
  }
  const player1 = document.querySelector('#player1');
  const player2 = document.querySelector('#player2');
  const player3 = document.querySelector('#player3');
  const player4 = document.querySelector('#player4');

  player1.addEventListener('click', () => {
    toggleActive(player1);
    active = 1;
  });

  player2.addEventListener('click', () => {
    toggleActive(player2);
    active = 2;
  });

  if (player3) {
    player3.addEventListener('click', () => {
      toggleActive(player3);
      active = 3;
    });
  }

  if (player4) {
    player4.addEventListener('click', () => {
      toggleActive(player4);
      active = 4;
    });
  }

  game.addEventListener('mousemove', () => {
    if (active) {
      info.innerHTML = `<p>Pieniądze w portfelu: </p><p class='value'>${players[active - 1].currentMoneyAmount()}</p>
      <p>Karty wyjścia z więzienia: </p><p class='value'>${players[active - 1].prisonEscCards()}</p>
      <p class='full'>Posiadane pola: </p><p class='full'>${players[active - 1].currentProperies()}</p>`;
    }
  });
}

function toggleActive(player) {
  const buttony = document.querySelector('.buttony');
  for (let i = 0; i < buttony.children.length; i++) {
    if (buttony.children[i].className === 'button active') buttony.children[i].classList.toggle('active');
  }
  player.classList.toggle('active');
}

export default navigationBar;
