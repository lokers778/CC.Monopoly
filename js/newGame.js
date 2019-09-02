// let's begin with the cities...

const countries = [];   // tablica zawierająca dane krajów, fetch z https://restcountries-v1.p.rapidapi.com/all
const regions = []      // tablica zawierająca kontynenty, na podstawie 'countries'
const gameCities = [];  // tablica zawierająca obiekty wybranych miast - do przypisania do pól
let gameRegion = '';    // kontynent ustalany globalnie przy inicjalizacji nowej gry
let cities = [];        // zmienna pomocnicza: miasta dla wskazanego kraju

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
        // makeHTML();
        gameRegion = regions[0];
        setRegion();
        chooseCountry();    // !!!! wywoływane stąd tylko tymczasowo !!!!
    })
    .catch(err => console.log(err));
}

function setRegion() {

    document.querySelector('.mainPanel').style.display = 'none'; // ukrywa 'mainPanel'; w to miejsce pokazuje wybór miast

    const parentElement = document.querySelector('.newGame');
    const el = document.createElement('section');
    let html = '';
    el.id = 'citiesInitSection';
    el.className = 'citiesInitSection';
    html = `
        <h3>Choosing location</h3>
        <div class='citiesInitSectionContainer'>
            <div class='citiesInitSectionLeft'>
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
                </form>
            </div>
            <div class='citiesInitSectionRight'>
                <span>Chosen places:</span><br />
                Region: <span id='chosenRegion'>...</span>
            </div>
        </div>`;
    el.innerHTML = html;
    parentElement.insertBefore(el, parentElement.childNodes[0]);
    document.querySelector('#chosenRegion').innerText = gameRegion
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
    document.querySelector('#chosenRegion').innerText = gameRegion
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
        el.addEventListener('click', suggestionClickedCountry);
        parentElement.appendChild(el);
    } );
    return arr;
}

// function makeHTML() {
//     const parentElement = document.querySelector('.newGame');
//     const el = document.createElement('section');
//     let html = '';
//     el.id = 'citiesInitSection';
//     el.className = 'citiesInitSection';
//     html = `
//         <h3>Lokalizacje:</h3>
//         <div class='citiesInitSectionContainer'>
//             <div class='citiesInitSectionLeft'>
//                 <form name='searchCitiesForm'>
//                     Select region: <select name='regionsList' id='regionsList'>`;
//     regions.forEach( (val) => {
//         if (val) {
//             html += `
//                         <option value="${val}">${val}</option>`;
//         }
//     });
//     html += `
//                     </select>
//                     <input type='text' id='search' placeholder='choose the country...'>
//                     <ul id='suggestions'>
//                     </ul>
//                 </form>
//             </div>
//             <div class='citiesInitSectionRight'>
//                 <span>Chosen places:</span>
//                 Region: <span id='chosenRegion'>...</span>
//             </div>
//         </div>`;
//     el.innerHTML = html;
//     document.querySelector('.mainPanel').style.display = 'none'; // ukrywa 'mainPanel'; w to miejsce pokazuje wybór miast
//     parentElement.insertBefore(el, parentElement.childNodes[0]);
//     document.getElementById('regionsList').addEventListener('change', regionChanged);
//     document.querySelector('#search').addEventListener('change', searchChangedCountry);
//     document.querySelector('#search').addEventListener('keyup', searchChangedCountry);
//     getCountriesByRegion( document.querySelector('#regionsList').value, document.querySelector('#search').value );
// }

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
            el.addEventListener('click', changeCountry);
            ta.insertBefore(el, document.querySelector('#search'));            
            el = document.createElement('br');
            ta.insertBefore(el, document.querySelector('#search'));
            }
        el = document.querySelector('#search');
        el.value = '';
        el.removeEventListener('change', searchChangedCountry);
        el.removeEventListener('keyup', searchChangedCountry);
        chooseCity( countryCode ); // wybór miasta

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

function suggestionClickedCountry(e) { // po kliknięciu w podpowiedź wstawia wybraną wartość w 'search' i odświeża korzystając z funkcji reagującej na zmiany w 'search'
    document.querySelector('#search').value = e.target.innerText;
    searchChangedCountry();
}

function chooseCity(countryCode) { // pobiera obiekty miast dla podanego kraju i prowadzi do wyboru
    let url = `http://api.geonames.org/search?country=${countryCode.toUpperCase()}&type=json&username=MarKust71`;
    cities = [];
    fetch(url, { "method": "GET", })
    .then(res => res.json() )
    .then(res => {
        res.geonames.map( (val) => { 
            if (val.fcl === 'P') {
                cities.push( { name: val.name, population: val.population } );
            }
        });
        cities.sort( (a, b) => { return b.population - a.population; } );

        document.querySelector('#search').placeholder = 'choose the city...';
        fillCitiesSuggestions();
    })
    .catch(err => console.log(err));
}

function fillCitiesSuggestions() {
    let parentElement = document.querySelector('#suggestions');
    parentElement.innerHTML = '';  // usunięcie podpowiedzi miast dla kraju
    let el;
    cities.forEach( (val) => {  // pomija miasta wcześniej wybrane
        if (!gameCities.filter( (val1) => 
                {
                    return (val.name === val1.name && val1.country === document.querySelector('#chosenCountry').innerText); 
                } ).length) {
            el = document.createElement('li');
            el.innerHTML = `<span name='${val.name}'>${val.name}, ${val.population}</span>`;
            el.addEventListener('dblclick', suggestionClickedCity);
            parentElement.appendChild(el);
        }
    } );
}

function suggestionClickedCity(e) { // po kliknięciu w podpowiedź wstawia wybraną wartość w 'search' i odświeża korzystając z funkcji reagującej na zmiany w 'search'
    if (gameCities.length <= 24) {
        let country = document.querySelector('#chosenCountry').innerText;
        if ( gameCities.filter( (val) => { return val.country === country; } ).length < 3 ) {
            let res = cities.find( (val) => {
                return e.target.innerText === (val.name + ', ' + val.population);
            } );
            let ind = cities.indexOf(res);
            gameCities.push(
                { 
                    name: res.name, 
                    population: res.population, 
                    country: country, 
                    region: gameRegion,
                    flag: getFlagURL(country)
                }
            );
            cities.splice(ind, 1);  // usuwa z listy miasto dodane do gry
            document.querySelector('#search').value = e.target.innerText;
            document.querySelector('#regionsList').disabled = true;
            document.querySelector('#changeCountry').style.display = 'inline';
            // tymczasowo - wypchnięcie zawartości 'gameCities' do JSON w nowym oknie
            if (gameCities.length === 24) {
                let myWin = window.open();
                myWin.document.write(JSON.stringify(gameCities, null, 3));
            }
            // ======================================================================
        } else {
            console.log('Max 3 miasta dla kraju!!!');
        }
        showGameCities();
        fillCitiesSuggestions();
        searchChangedCity();
    }
}

function searchChangedCity() { // reaguje na zmiany w polu 'search' (wybór kraju)
    // let res = getCountriesByRegion( document.querySelector('#regionsList').value, document.querySelector('#search').value );
    // let el = document.querySelector('#citiesInitSection');
    // if (res.length === 1) { // kiedy na liście podpowiedzi jest tylko jedna pozycja, udaje wybór
    //     document.querySelector('#search').value = res[0].name;
    //     let countryCode = countries.filter( (val) => { return (val.name === res[0].name); } )[0].alpha2Code.toLowerCase();
    //     if (el.lastElementChild.name !== 'countryFlag') {   // jeśli dla wyboru nie ma flagi - pobiera grafikę
    //         const img = document.createElement('img');
    //         img.src = `https://www.countryflags.io/${countryCode}/shiny/64.png`;
    //         img.alt = 'country flag';
    //         img.name = 'countryFlag';
    //         img.id = 'countryFlag';
    //         el.insertBefore(img, el.lastElementChild);
    //     }

    //     el = document.querySelector('#chosenCountry'); 
    //     if (el) {
    //         el.innerText = res[0].name;
    //     } else {
    //         let ta = document.querySelector('.citiesInitSectionRight')
    //         el = document.createElement('br');
    //         ta.appendChild(el);
    //         el = document.createTextNode("Country: ");
    //         ta.appendChild(el);
    //         el = document.createElement('span');
    //         el.id = 'chosenCity';
    //         el.innerText = res[0].name;
    //         ta.appendChild(el);
    //     }
    //     chooseCity( countryCode.toUpperCase() ); // wybór miasta

    // } else {    // jeśli wybór znów nie jest jednoznaczny, usuwa flagę
    //     let cf = document.querySelector('#countryFlag');
    //     if (cf) {
    //         cf.parentElement.removeChild(cf);
    //     }
    // }
}

function showGameCities() {
    let parentElement = document.querySelector('.citiesInitSectionRight')
    let el = document.querySelector('#tabGameCities'); 
    if (el) {
        el.innerHTML = '';
    } else {
        let el = document.createElement('br');
        parentElement.appendChild(el);
        el = document.createElement('div');
        el.classList = 'tabGameCities';
        parentElement.appendChild(el);
        parentElement = parentElement.lastChild;
        el = document.createElement('table');
        el.id = 'tabGameCities';
        parentElement.appendChild(el);
    }
    parentElement = document.querySelector('#tabGameCities');
    el = document.createElement('tr');
    el.innerHTML = `<th>Country</th><th>City</th><th>Population</th><th></th>`;
    parentElement.appendChild(el);
    gameCities.forEach( (val, ind) => {
        el = document.createElement('tr');
        el.innerHTML = `<td>${val.country}</td><td>${val.name}</td><td>${val.population}</td><td><span class='removeGameCity' id='removeCity${ind}'>[x]</span></td>`
        parentElement.appendChild(el);
        document.querySelector(`#removeCity${ind}`).addEventListener('click', removeGameCity);
    } );
}

function removeGameCity(e) {
    let el = e.target.parentElement.parentElement.children;
    let country = el[0].innerText;
    let city = el[1].innerText;
    let res = gameCities.find( (val) => { return (val.name === city && val.country === country); } )
    let ind = gameCities.indexOf(res);
    gameCities.splice(ind, 1);
    showGameCities();
    fillCitiesSuggestions();
}

function changeCountry(e) {
    document.querySelector('#search').value = '';
    searchChangedCountry(); // nie pominął już użytych!!!!!
                            // nie ma '[change]', kiedy wybrało się kraj, co ma juz 3 miasta na liście!!!!
    document.querySelector('#chosenCountry').innerText = '';
    e.target.style.display = 'none';
}