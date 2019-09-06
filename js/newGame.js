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
const cities = [];          // zmienna pomocnicza: miasta dla wskazanego kraju
let gameRegion = '';        // kontynent ustalany globalnie przy inicjalizacji nowej gry

let dragged;                // na potrzeby przeciągania państw/miast na pola gry

export function initGeo(fields) {

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
  
  el = document.createElement('div');
  el.id = 'fieldsListButtons';
  el.classList = 'fieldsListButtons';
  el.innerHTML = `
    <input type='button' name='fieldsSave' id='fieldsSave' value='Zapisz' style='display: none;'>
    <input type='button' name='fieldsRestore' id='fieldsRestore' value='Odtwórz'>
    `;
  qs.appendChild(el);
  document.querySelector('#fieldsSave').addEventListener('click', () => { localStorage.setItem('fields', JSON.stringify(fields)); } );
  document.querySelector('#fieldsRestore').addEventListener('click', () => { 
    const arr = JSON.parse(localStorage.getItem('fields'));
    let field;
    arr.forEach( (val) => {
      field = fields.find( (val1) => { return val1.truename === val.truename } );
      field.name = JSON.parse(JSON.stringify(val.name));
    } ); 
    const qs = document.querySelector('#initFieldsList tbody');
    while (qs.children.length) {
      qs.removeChild(qs.lastChild);
    }
    fillWithFields(fields);
    document.querySelector('#fieldsSave').style.display = ( (chosenCountries(fields).length) ? '' : 'none' );
  } );
  
  geoInit();

  // tabela z `fieldami`, najpierw wiersz
  qs = document.querySelector('#initFieldsContainer');
  el = document.createElement('table');
  el.id = 'initFieldsList';
  el.classList = 'initFieldsList';
  el.innerHTML = `
    <thead>
      <tr>
        <th>Pole</th><th>Kraj</th><th>Miasto</th><th>[x]</th>
      </tr>
    </thead>
    <tbody>
    </tbody>`;
  qs.appendChild(el);
  el.addEventListener("dragover", (e) => { e.preventDefault(); }, false);  
  el.addEventListener("drop", (e) => { e.preventDefault(); dropped(e.target, fields); }, false);

  // wiersze tabieli - każdy `field` ma swój
  fillWithFields(fields);
  
}

function geoInit() {
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
  let el = document.createElement('section');
  let html = '';
  el.id = 'citiesInitSection';
  el.className = 'citiesInitSection';
  html = `
    <h4>Lokalizacje do wyboru:</h4>
    <form name='searchCitiesForm' id='searchCitiesForm'>
      Wybierz kontynent: <select name='regionsList' id='regionsList'>`;
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
  el = document.querySelector('#regionsList'); 
  if (localStorage.getItem('region')) { el.value = localStorage.getItem('region'); } else { localStorage.setItem('region', el.value); }
  el.addEventListener('click', regionChanged);
  el.addEventListener('change', regionChanged);

  el = document.createElement('div');
  el.id = 'localeListButtons';
  el.classList = 'localeListButtons';
  el.innerHTML = `
    <input type='button' name='btnBack' id='btnBack' value='Wróć do listy krajów' style='display: none;'>
    `;
  parentElement.appendChild(el);
  const qs = document.querySelector('#btnBack');
  qs.addEventListener('click', () => {
    qs.style.display = 'none';
    const el = document.querySelector('#search');
    if (el) { 
      el.placeholder = '  wybierz kraj...';
      el.removeEventListener('change', () => { getCitiesByCountry(cities, country, fields, document.querySelector('#search').value); });
      el.removeEventListener('keyup', () => { getCitiesByCountry(cities, country, fields, document.querySelector('#search').value); });
      el.addEventListener('change', searchCountry);
      el.addEventListener('keyup', searchCountry);
      el.value = ''; 
      searchCountry(); }
  } );

}

function regionChanged(e) {  // reakcja na zmianę/wybór 'region' (kontynent)
    const qs = document.querySelector('#search');
    localStorage.setItem('region', e.target.value);
    if (qs) {
      qs.value = '';
      searchCountry();
    }
    gameRegion = e.target.value;
}

function chooseCountry() {
  const cs = document.querySelector('#searchCitiesForm');
  if (document.querySelector('#search')) {
    document.querySelector('#search').placeholder = '  wyszukaj kraj...';
  } else {
    let el = document.createElement('input');
    el.type = 'text';
    el.id = 'search';
    el.placeholder = '  wyszukaj kraj...';
    el.addEventListener('change', searchCountry);
    el.addEventListener('keyup', searchCountry);
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
  const qs = document.querySelector('#suggestions');
  qs.innerHTML = '';
  let el;
  arr.forEach( (val) => {
    if (!countriesChosen.includes(val.name)) {
      el = document.createElement('li');
      el.innerHTML = `<span name='${val.alpha3Code}' typ='country' draggable='true' ondragstart='event.dataTransfer.setData("text/plain", null)'>${val.name}</span>`;
      el.addEventListener("dragstart", function(e) { dragged = e.target; }, false);
      qs.appendChild(el);
    }
  } );
  return arr;
}

function searchCountry() { // reaguje na zmiany w polu 'search' (wybór kraju)
  getCountriesByRegion( document.querySelector('#regionsList').value, document.querySelector('#search').value );
}

function getFlagURL(country) {
  const countryCode = countries.filter( (val) => { return (val.name === country); } )[0].alpha2Code.toLowerCase();
  return `https://www.countryflags.io/${countryCode}/shiny/64.png`;
}

function dropped(target, fields) {
  const color = target.parentElement.style.backgroundColor;
  const fieldsCountry = fields.filter( (val) => { return val.color === color; } );
  switch(dragged.attributes['typ'].value) {
    case 'country': {
      const countryCode = dragged.attributes['name'].value;
      const countryName = countries.find( (val) => { return val.alpha3Code === countryCode; } ).name;
      fieldsCountry.forEach( (val) => { 
        val.name = { country: countryName, region: document.querySelector('#regionsList').value, flag: getFlagURL(countryName) }; 
      } );
      countriesChosen.splice(0, countriesChosen.length);
      countriesChosen.push(...chosenCountries(fields));
      searchCountry();
      document.querySelector('#fieldsSave').style.display = ( (chosenCountries(fields).length) ? '' : 'none' );
      break;
    }
    case 'city': {
      const field = fields.find( (val) => { return val.truename === target.parentElement.fieldTrueName; } );
      if (field) { 
        field.name.name = dragged.attributes.name.value;
        field.name.population = dragged.attributes.population.value;
      }
      getCitiesByCountry(cities, field.name.country, fields, document.querySelector('#search').value);
      break;
    }
  }
  const qs = document.querySelector('#initFieldsList tbody');
  while (qs.children.length) {
    qs.removeChild(qs.lastChild);
  }
  fillWithFields(fields);
}

// dopełnienie tabeli wierszami z `fields`
function fillWithFields(fields) {
  let qs = document.querySelector('#initFieldsList tbody');
  let allEmptyCountry = true;
  fields.forEach( (val) => {
    let el = document.createElement('tr');
    if (val.name.country) {allEmptyCountry = false;}
    el.name = val.truename;
    el.style = `background-color: ${val.color};` + (((val.color === 'black') || (val.color === 'blue')) ? `color: white;` : ``);
    el.innerHTML = `<td>${val.color} (${val.truename.substr(-1,1)})</td>
      <td>${ (val.name.country) ? val.name.country : '' }</td>
      <td>${ (val.name.name) ? val.name.name : '' }</td>
      <td></td>`;
    el.fieldTrueName = val.truename;
    el.addEventListener('click', (e) => { 
      let country = e.target.parentElement.children[1].innerText;
      if (country) {
        // jeśli jest już państwo, to wybierz miasto
        document.querySelector('#btnBack').style.display='';
        suggestCities(country, fields);
      } else {
        console.log('A państwo gdzie?');
      }
    } )
    qs.appendChild(el);
  } );
  document.querySelector('#regionsList').disabled = !allEmptyCountry;
  // console.log(fields);
}

function chosenCountries(fields) {
  let ret = [];
  fields.forEach( (val) => {
    if (val.name.country) { ret.push(val.name.country); }
  } )
  ret = [...new Set(ret)];
  return ret;
}

function chosenCities(fields) {
  let ret = [];
  fields.forEach( (val) => {
    if (val.name.name) { 
      ret.push(val.name.name);
    }
  } )
  ret = [...new Set(ret)];
  return ret;
}

function suggestCities(country, fields) {
  // console.log(country);
  let qs = document.querySelector('#suggestions');
  while (qs.children.length) { qs.removeChild(qs.lastChild); }
  const countryCode = countries.filter( (val) => { return (val.name === country); } )[0].alpha2Code;
  chooseCity(countryCode, country, fields);
}

function chooseCity(code, country, fields) { // pobiera obiekty miast dla podanego kraju i prowadzi do wyboru
  const url = `http://api.geonames.org/search?country=${code.toUpperCase()}&type=json&username=MarKust71`;
  cities.splice(0, cities.length);
  fetch(url, { "method": "GET", })
  .then(res => res.json() )
  .then(res => {
    res.geonames.map( (val) => { 
      if (val.fcl === 'P') {
          cities.push( { name: val.name, population: val.population } );
      }
    });
    cities.sort( (a, b) => { return b.population - a.population; } );
    const qs = document.querySelector('#search');
    qs.placeholder = '  wybierz miasto...';
    qs.removeEventListener('change', searchCountry);
    qs.removeEventListener('keyup', searchCountry);
    qs.addEventListener('change', () => { getCitiesByCountry(cities, country, fields, document.querySelector('#search').value); });
    qs.addEventListener('keyup', () => { getCitiesByCountry(cities, country, fields, document.querySelector('#search').value); });
    getCitiesByCountry(cities, country, fields, qs.value);
  })
  .catch(err => console.log(err));
}

function getCitiesByCountry(cities, country, fields, search) {
  const arr = cities.filter( (val) => { 
    const re = new RegExp(search, 'gi');
    let ret = ( val.name.match(re) );
    return ret;
  } );
  const qs = document.querySelector('#suggestions');
  qs.innerHTML = '';  // usunięcie poprzednich podpowiedzi
  const citiesChosen = chosenCities(fields);
  let el;
  arr.forEach( (val) => {  // pomija miasta wcześniej wybrane
    if (!citiesChosen.filter( (val1) => { return (val.name === val1); } ).length) {
      el = document.createElement('li');
      el.innerHTML = `<span 
        name='${val.name}' 
        country='${country}' 
        typ='city' 
        population='${val.population}'
        draggable='true' 
        ondragstart='event.dataTransfer.setData("text/plain", null)'>${val.name}, ${val.population}
        </span>`;
      el.addEventListener("dragstart", function(e) { dragged = e.target; }, false);
      qs.appendChild(el);
    }
  } );
}

// ===========================================
