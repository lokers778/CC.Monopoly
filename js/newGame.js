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
        regions = [...new Set(regions)];
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
        <form>
            <select name='regionsList'>`;
    regions.forEach( (val) => {
        if (val) {
            html += `
                <option value="${val}">${val}</option>`;
        };
    });
    html += `
            </select>
            <input type='text' id='search' placeholder='choose country'>
            <ul id='suggestions'>
            </ul>
        </form>`;
    el.innerHTML = html;
    el.addEventListener('change', chooseRegion);
    parentElement.insertBefore(el, parentElement.childNodes[0]);
    document.querySelector('#search').addEventListener('change', searchChanged);
    document.querySelector('#search').addEventListener('keyup', searchChanged);
    getCountriesByRegion( document.getElementsByName('regionsList')[0].value, document.querySelector('#search').value );
}

function chooseRegion(e) {
    getCountriesByRegion( document.getElementsByName('regionsList')[0].value, document.querySelector('#search').value );
}

function getCountriesByRegion(region, search) {
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
}

function searchChanged(e) {
    getCountriesByRegion( document.getElementsByName('regionsList')[0].value, document.querySelector('#search').value );
}

function suggestionClicked(e) {
    document.querySelector('#search').value = e.target.innerText;
    searchChanged();
}