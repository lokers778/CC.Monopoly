// let's begin with the cities...

const geoData = [];

export function citiesInit() {
    fetch("https://restcountries-v1.p.rapidapi.com/all", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "restcountries-v1.p.rapidapi.com",
            "x-rapidapi-key": "26934c6e73msh8d4ccc9eb16682ep141879jsn4a3e7dd3dc52"
        }
    })
    .then(res => res.json() )
    .then(res => {
        geoData.push(...res);
        let regions = geoData.map(collectRegions);
        regions = [...new Set(regions)];    // pozostawia w 'regions' tylko unikalne wartości
        makeHTML(regions);
    })
    .catch(err => console.log(err));
}

function collectRegions(data) {
    return data.region;
}

function makeHTML(regions) {
    const parentElement = document.getElementsByClassName('newGame')[0];
    const el = document.createElement('section');
    let html = '';
    el.id = 'citiesInitSection';
    el.className = 'citiesInitSection';
    html = `
        <h3>Lokalizacje:</h3>
        <form name='searchCitiesForm'>
            <select name='regionsList' id='regionsList'>`;
    regions.forEach( (val) => {
        if (val) {
            html += `
                <option value="${val}">${val}</option>`;
        }
    });
    html += `
            </select>
            <input type='text' id='search' placeholder='choose country'>
            <ul id='suggestions'>
            </ul>
        </form>`;
    el.innerHTML = html;
    parentElement.insertBefore(el, parentElement.childNodes[0]);
    document.getElementById('regionsList').addEventListener('change', regionChanged);
    document.querySelector('#search').addEventListener('change', searchChanged);
    document.querySelector('#search').addEventListener('keyup', searchChanged);
    getCountriesByRegion( document.querySelector('#regionsList').value, document.querySelector('#search').value );
}

function regionChanged() {  // reakcja na zmianę/wybór 'region' (kontynent)
    document.querySelector('#search').value = '';
    searchChanged();
}

function getCountriesByRegion(region, search) { // dostosowuje listę krajów w podpowiedzi do 'region' i wpisanego kryterium wyszukiwania
    const arr = geoData.filter( (val) => { 
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
        el.addEventListener('click', suggestionClicked);
        parentElement.appendChild(el);
    } );
    return arr;
}

function searchChanged() { // reaguje na zmiany w polu 'search' (wybór kraju)
    let res = getCountriesByRegion( document.querySelector('#regionsList').value, document.querySelector('#search').value );
    let el = document.querySelector('#citiesInitSection');
    if (res.length === 1) { // kiedy na liście podpowiedzi jest tylko jedna pozycja, udaje wybór
        document.querySelector('#search').value = res[0].name;
        let countryCode = geoData.filter( (val) => { return (val.name === res[0].name); } )[0].alpha2Code.toLowerCase();
        if (el.lastElementChild.name !== 'countryFlag') {   // jeśli dla wyboru nie ma flagi - pobiera grafikę
            const img = document.createElement('img');
            img.src = `https://www.countryflags.io/${countryCode}/shiny/64.png`;
            img.alt = 'country flag';
            img.name = 'countryFlag';
            img.id = 'countryFlag';
            // el.appendChild(img);
            el.insertBefore(img, el.lastElementChild);
        }

        fetchCities(countryCode.toUpperCase()); // pobranie miast

    } else {    // jeśli wybór znów nie jest jednoznaczny, usuwa flagę
        let cf = document.querySelector('#countryFlag');
        if (cf) {
            cf.parentElement.removeChild(cf);
        }
    }
}

function suggestionClicked(e) { // po kliknięciu w podpowiedź wstawia wybraną wartość w 'search' i odświeża korzystając z funkcji reagującej na zmiany w 'serach'
    document.querySelector('#search').value = e.target.innerText;
    searchChanged();
}

function fetchCities(country) {
    let url = `http://api.geonames.org/search?country=${country}&type=json&username=MarKust71`;
    let cities = [];
    fetch(url, { "method": "GET", })
    .then(res => res.json() )
    .then(res => {
        res.geonames.map( (val) => { 
            if (val.fcl === 'P') {
                cities.push( { name: val.name, population: val.population } );
            }
        });
        cities.sort( (a, b) => { return b.population - a.population; } );
        console.log(cities);
    })
    .catch(err => console.log(err));
}