import { createParagraph } from './utils';

let active = 0;

function navigationBar(players, controlPanel) {
  const burger = document.querySelector('.burger');
  const navBar = document.querySelector('.navBar');

  controlPlayers(players, controlPanel);

  burger.addEventListener('click', () => {
    navBar.classList.toggle('navActive');
    burger.classList.toggle('cross');
  });
}

function createPropertyParagraph(property, controlPanel) {
  function onClick() {
    controlPanel.renderFieldInActionPanel(property);
  }
  const p = createParagraph(property.truename);
  p.classList.add('full');
  p.style.cursor = 'pointer';
  p.addEventListener('click', onClick);
  return p;
}

function controlPlayers(players, controlPanel) {
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
  toggleActive(player1, 1);

  player1.addEventListener('click', () => {
    toggleActive(player1, 1);
  });

  player2.addEventListener('click', () => {
    toggleActive(player2, 2);
  });

  if (player3) {
    player3.addEventListener('click', () => {
      toggleActive(player3, 3);
    });
  }

  if (player4) {
    player4.addEventListener('click', () => {
      toggleActive(player4, 4);
    });
  }

  game.addEventListener('mousemove', () => {
    if (active) {
      const player = players[active - 1];
      info.innerHTML = `<p>Pieniądze w portfelu: </p><p class='value'>${player.currentMoneyAmount()}</p>
      <p>Karty wyjścia z więzienia: </p><p class='value'>${player.prisonEscCards()}</p>
      <p class='full'>Posiadane pola: </p>`;
      for (let property of player.currentProperies()) {
        info.appendChild(createPropertyParagraph(property, controlPanel));
      }
    }
  });
}

export function toggleActive(player, num) {
  const buttony = document.querySelector('.buttony');
  for (let i = 0; i < buttony.children.length; i++) {
    if (buttony.children[i].className === 'button active') buttony.children[i].classList.toggle('active');
  }
  player.classList.toggle('active');
  active = num;
}

export default navigationBar;
