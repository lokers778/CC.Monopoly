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
const countries = [];   // tablica zawierająca dane krajów, fetch z https://restcountries-v1.p.rapidapi.com/all
const regions = [];     // tablica zawierająca kontynenty, na podstawie 'countries'
let gameRegion = '';    // kontynent ustalany globalnie przy inicjalizacji nowej gry

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
        // searchChangedCountry();
    }
    gameRegion = e.target.value;
    // document.querySelector('#chosenRegion').innerText = gameRegion
}

function chooseCountry() {
  const cs = document.querySelector('#searchCitiesForm');
  if (document.querySelector('#search')) {
      document.querySelector('#search').placeholder = 'choose the country...';
  } else {
      let el = document.createElement('input');
      el.type = 'text';
      el.id = 'search';
      el.placeholder = 'choose the country...';
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
        el = document.createElement('li');
        el.innerHTML = `<span name='${val.alpha3Code}'>${val.name}</span>`;
        // el.addEventListener('click', suggestionClickedCountry);
        parentElement.appendChild(el);
    } );
    return arr;
}

function searchChangedCountry() { // reaguje na zmiany w polu 'search' (wybór kraju)
    let res = getCountriesByRegion( document.querySelector('#regionsList').value, document.querySelector('#search').value );
    let el = document.querySelector('#citiesInitSection');
    if (res.length === 1) { // kiedy na liście podpowiedzi jest tylko jedna pozycja, udaje wybór
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

function getFlagURL(country) {
  const countryCode = countries.filter( (val) => { return (val.name === country); } )[0].alpha2Code.toLowerCase();
  return `https://www.countryflags.io/${countryCode}/shiny/64.png`;
}



export function initGeo(fields) {

  geoInit();

  document.querySelector('.mainPanel').style.display = 'none';  // ukrywa (tymczasowo) panel dodawania playerów
  document.querySelector('#citiesPanel').style.display = 'flex';
  fields = fields.filter( (val) => { return !!val.color; } );

  let qs = document.querySelector('#citiesLeft');
  let el = document.createElement('span');
  el.innerHTML = '<h4>Fields to bind:</h4>';
  qs.appendChild(el);
  
  el = document.createElement('div');
  el.id = 'initFieldsContainer';
  el.classList = 'initFieldsContainer';
  qs.appendChild(el);
  
  qs = document.querySelector('#initFieldsContainer');
  el = document.createElement('ul');
  el.id = 'initFieldsList';
  el.classList = 'initFieldsList';
  qs.appendChild(el);

  qs = document.querySelector('#initFieldsList');
  fields.forEach( (val) => {
    el = document.createElement('li');
    el.innerHTML = `<span name=${val.truename} class='initFieldsListItems' style='background-color: ${val.color};'>${val.color} (${val.truename.substr(-1,1)})</span>`;
    el.addEventListener('click', (e) => { fieldsListItemClicked(e, fields) });
    qs.appendChild(el);
  } );
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
