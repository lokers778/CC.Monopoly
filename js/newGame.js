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




// =========== inicjalizacja miast ===========
// initGeo(); // wywołanie inicjalizacji miast
// import { board } from './main';
const countries = [];       // tablica zawierająca dane krajów, fetch z https://restcountries-v1.p.rapidapi.com/all
const countriesChosen = []; // pomocnicza tablica - państwa przypisane do pól
const regions = [];         // tablica zawierająca kontynenty, na podstawie 'countries'
let gameRegion = '';        // kontynent ustalany globalnie przy inicjalizacji nowej gry

let dragged;            // na potrzeby przeciągania miast na pola

export function geoInit() {
  fetch("https://restcountries-v1.p.rapidapi.com/all", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
      "x-rapidapi-key": "26934c6e73msh8d4ccc9eb16682ep141879jsn4a3e7dd3dc52"
    }
  })
  .then(res => res.json() )
  .then(res => {
    countries.push(...res);
    let regs = countries.map( (data) => { return data.region; } );
    regs = [...new Set(regs)];    // pozostawia w 'regs' tylko unikalne wartości
    regions.push(...regs);
    gameRegion = regions[0];
    setRegion();
    chooseCountry();    // !!!! wywoływane stąd tylko tymczasowo !!!!
  })
  .catch(err => console.log(err));
}

function setRegion() {

  const parentElement = document.querySelector('#citiesRight');
  const el = document.createElement('section');
  let html = '';
  el.id = 'citiesInitSection';
  el.className = 'citiesInitSection';
  html = `
    <h4>Locations to bind:</h4>
    <form name='searchCitiesForm' id='searchCitiesForm'>
      Select region: <select name='regionsList' id='regionsList'>`;
  regions.forEach( (val) => {
    if (val) {
        html += `
        <option value="${val}">${val}</option>`;
    }
  });
  html += `
      </select><br />
    </form>`;
  el.innerHTML = html;
  parentElement.insertBefore(el, parentElement.childNodes[0]);
  // document.querySelector('#chosenRegion').innerText = gameRegion
  document.getElementById('regionsList').addEventListener('click', regionChanged);
  document.getElementById('regionsList').addEventListener('change', regionChanged);
}

function regionChanged(e) {  // reakcja na zmianę/wybór 'region' (kontynent)
    const cs = document.querySelector('#search');
    if (cs) {
        cs.value = '';
        searchChangedCountry();
    }
    gameRegion = e.target.value;
    // document.querySelector('#chosenRegion').innerText = gameRegion
}

function chooseCountry() {
  const cs = document.querySelector('#searchCitiesForm');
  if (document.querySelector('#search')) {
      document.querySelector('#search').placeholder = '  search...';
  } else {
      let el = document.createElement('input');
      el.type = 'text';
      el.id = 'search';
      el.placeholder = '  search...';
      el.addEventListener('change', searchChangedCountry);
      el.addEventListener('keyup', searchChangedCountry);
      cs.appendChild(el);
      el = document.createElement('br');
      cs.appendChild(el);
      el = document.createElement('ul');
      el.id = 'suggestions';
      cs.appendChild(el);
  }
  getCountriesByRegion( document.querySelector('#regionsList').value, document.querySelector('#search').value );
}

function getCountriesByRegion(region, search) { // dostosowuje listę krajów w podpowiedzi do 'region' i wpisanego kryterium wyszukiwania
    const arr = countries.filter( (val) => { 
        const re = new RegExp(search, 'gi');
        let ret = ( (val.region === region) && val.name.match(re) );
        return ret;
    } );
    const parentElement = document.querySelector('#suggestions');
    parentElement.innerHTML = '';
    let el;
    arr.forEach( (val) => {
      if (!countriesChosen.includes(val.name)) {
        el = document.createElement('li');
        el.innerHTML = `<span name='${val.alpha3Code}' draggable='true' ondragstart='event.dataTransfer.setData("text/plain", null)'>${val.name}</span>`;
        el.addEventListener("dragstart", function(e) {
          dragged = e.target;
        }, false);
        parentElement.appendChild(el);
      }
    } );
    return arr;
}

function searchChangedCountry() { // reaguje na zmiany w polu 'search' (wybór kraju)
    let res = getCountriesByRegion( document.querySelector('#regionsList').value, document.querySelector('#search').value );
    let el = document.querySelector('#citiesInitSection');
    if (res.length === 1 && false) { // kiedy na liście podpowiedzi jest tylko jedna pozycja, udaje wybór
        document.querySelector('#search').value = res[0].name;
        let countryCode = countries.filter( (val) => { return (val.name === res[0].name); } )[0].alpha2Code.toLowerCase();
        if (el.lastElementChild.name !== 'countryFlag') {   // jeśli dla wyboru nie ma flagi - pobiera grafikę
            const img = document.createElement('img');
            img.src = getFlagURL(res[0].name);
            img.alt = 'country flag';
            img.name = 'countryFlag';
            img.id = 'countryFlag';
            el.insertBefore(img, el.lastElementChild);
        }

        el = document.querySelector('#chosenCountry'); 
        if (el) {
            el.innerText = res[0].name;
        } else {
            let ta = document.querySelector('#searchCitiesForm');
            el = document.createTextNode('Chosen country: ');
            ta.insertBefore(el, document.querySelector('#search'));
            el = document.createElement('span');
            el.id = 'chosenCountry';
            el.innerText = res[0].name;
            ta.insertBefore(el, document.querySelector('#search'));
            el = document.createElement('span');
            el.id = 'changeCountry';
            el.classList = 'changeCountry';
            el.innerText = ' [change] ';
            // el.addEventListener('click', changeCountry);
            ta.insertBefore(el, document.querySelector('#search'));            
            el = document.createElement('br');
            ta.insertBefore(el, document.querySelector('#search'));
            }
        el = document.querySelector('#search');
        el.value = '';
        el.removeEventListener('change', searchChangedCountry);
        el.removeEventListener('keyup', searchChangedCountry);
        // chooseCity( countryCode ); // wybór miasta

    } else {    // jeśli wybór znów nie jest jednoznaczny, usuwa flagę
        let cf = document.querySelector('#countryFlag');
        if (cf) {
            cf.parentElement.removeChild(cf);
        }
    }
}

function suggestionClickedCountry(e) { // po kliknięciu w podpowiedź wstawia wybraną wartość w 'search' i odświeża korzystając z funkcji reagującej na zmiany w 'search'
    // document.querySelector('#search').value = e.target.innerText;
    // searchChangedCountry();
}

function getFlagURL(country) {
  const countryCode = countries.filter( (val) => { return (val.name === country); } )[0].alpha2Code.toLowerCase();
  return `https://www.countryflags.io/${countryCode}/shiny/64.png`;
}

function dropped(target, fields) {
  // console.log(target.parentElement.fieldTrueName, dragged);
  const color = target.parentElement.style.backgroundColor;
  const fieldsCountry = fields.filter( (val) => { return val.color === color; } );
  const countryCode = dragged.attributes['name'].value;
  const countryName = countries.find( (val) => { return val.alpha3Code === countryCode; } ).name;
  fieldsCountry.forEach( (val) => { 
    if (val.name) {
      countriesChosen.splice(countriesChosen.indexOf(val.name), 1);
    }
    val.name = { name: countryName, flag: '' }; 
  } );
  countriesChosen.push(countryName);
  searchChangedCountry();
  const qs = document.querySelector('#initFieldsList tbody');
  while (qs.children.length > 1) {
    qs.removeChild(qs.lastChild);
  }
  fillWithFields(fields);
}

export function initGeo(fields) {

  geoInit();

  // ===== Ukrywa (tymczasowo) panel dodawania playerów =====
  document.querySelector('.mainPanel').style.display = 'none';
  // ========================================================

  document.querySelector('#citiesPanel').style.display = 'flex';
  fields = fields.filter( (val) => { return !!val.color; } );

  let qs = document.querySelector('#citiesLeft');
  let el = document.createElement('h4');
  el.innerText = 'Pola do opisania:';
  qs.appendChild(el);
  
  el = document.createElement('div');
  el.id = 'initFieldsContainer';
  el.classList = 'initFieldsContainer';
  qs.appendChild(el);
  
  // tabela z `fieldami`, najpierw wiersz
  qs = document.querySelector('#initFieldsContainer');
  el = document.createElement('table');
  el.id = 'initFieldsList';
  el.classList = 'initFieldsList';
  el.innerHTML = `
    <tr>
      <th>Pole</th><th>Kraj</th><th>Miasto</th><th>[x]</th>
    </tr>`;
  qs.appendChild(el);
  el.addEventListener("dragover", (e) => { e.preventDefault(); }, false);  
  el.addEventListener("drop", (e) => {
    e.preventDefault();
    dropped(e.target, fields);
  }, false);

  // wiersze tabieli - każdy `field` ma swój
  fillWithFields(fields);
  
}

// dopełnienie tabeli wierszami z `fields`
function fillWithFields(fields) {
  let qs = document.querySelector('#initFieldsList tbody');
  let allEmptyCountry = true;
  fields.forEach( (val) => {
    const el = document.createElement('tr');
    if (val.name.name) {allEmptyCountry = false;}
    el.name = val.truename;
    el.style = `background-color: ${val.color};` + (((val.color === 'black') || (val.color === 'blue')) ? `color: white;` : ``);
    el.innerHTML = `<td>${val.color} (${val.truename.substr(-1,1)})</td><td>${ (val.name.name) ? val.name.name : '' }</td><td></td><td></td>`;
    el.fieldTrueName = val.truename;
    qs.appendChild(el);
  } );
  document.querySelector('#regionsList').disabled = !allEmptyCountry;
}

function fieldsListItemClicked(e, fields) {
  let name = e.target.attributes['name'].nodeValue;
  fields.forEach( (val) => { val.bindSelected = ( (val.truename === name) ? 1 : 0 ); } );
  highlightFieldListItem(fields, name);
}

function highlightFieldListItem(fields, name) {
  const list = document.querySelectorAll('#initFieldsList span');
  list.forEach( (val) => {
    if (val.innerText[0] === '[') { val.innerText = val.innerText.substring(2, val.innerText.length - 2); }
    if (val.attributes['name'].nodeValue === name) {
        val.innerText = `[ ${val.innerText} ]`;
        val.className = `initFieldsListItemsHi`;
      } else {
        val.className = `initFieldsListItems`;
      }
    } 
  );
}
// ===========================================
