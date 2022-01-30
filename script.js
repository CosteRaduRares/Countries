//GLOBAL
const countryList = document.querySelector('.country');
const countryDetails = document.querySelector('.country-details-content');
const search = document.querySelector('.search');
const NoSearch = document.querySelector('.nsearch');
const topBtn = document.getElementById('#topbtn');
const filterBtn = document.getElementById('filter');
const modalBtn = document.getElementById('modal-close-btn');
const buttons = document.querySelector('.buttons');

countryList.addEventListener('click', getModalInfo)
    filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle('open')
});
modalBtn.addEventListener('click', () => {
    countryDetails.parentElement.classList.remove('showDetails')
});

// Create one Country
 const createCountry = ({
      name,
      capital, 
      region, 
      population, 
      flags
    }) => {
        return      `<div class="countries-wrapper"> 
                    <img src="${flags.png}" alt="Flags" />
                    <div class="country-info" id="country" data-value="${name.common}">
                    <h3 class="country-name">${name.common}</h3>
                    <p>Capital: ${capital}</span>.</p>
                    <p>Region: ${region}</p>
                    <p>Population: ${population.toLocaleString()} </p>
                    <a href="#" class="country-btn">See More</a>
                     </div>
                 </div>`
        };
//Search input filter 
const filterCountries = (arr,search) =>{
        search = search
        const filteredCountries = arr (country => {
        const{
        name, capital, alpha2Code} = country 
        const iName = name.toLowerCase().includes(search)
        const iCapital = capital.toLowerCase().includes(search)
        const iAplha2Code = alpha2Code.toLowerCase().includes(search)
        return iName || iCapital || iAplha2Code
    });
        return filteredCountries;
};
     
//Countries in div
const renderCountries = arr =>{
    let contents =""
    arr.forEach(country =>(contents += createCountry(country)))
    countryList.innerHTML = contents
};
// Sorting Countries
const sortCountries = (arr, type) =>{
    const countries =[...arr]
    const sortedCountries = countries.sort((a, b) => {
        if(a[type] > b[type]) return 1
        if(a[type] < b[type]) return -1
        return 0;
    });
        return sortedCountries;
};
//Information for the modal
function getModalInfo(e){
    e.preventDefault()
    if(e.target.classList.contains("country-btn")){
        countryItem = e.target.parentElement
        fetch(`https://restcountries.com/v3.1/name/name`)
        .then(Response => Response.json())
        .then(country =>{
            country = country[0]
            // countryModal(country)
            countryNeighbours(country)
        })
        .catch(err => console.log("Error :", err))
    };
};
//Click on Neighbours
function countryNeighbours(country){
    html = 'Neighbours : '
    const neighbours = document.querySelector('.neighbour')
    for(let i = 0; i < country.borders.length;i++){
        html += `<a href="#" class="neighbour-btn">${country.borders[i]}</a>`
    };
     neighbours.innerHTML = html
    const neighboursBtn = document.querySelectorAll('.neighbour-btn')
    neighboursBtn.forEach(btn =>{
        btn.addEventListener('click', getModalByCode)
    });
};
//Neighbours Code
function getModalByCode(e){
    e.preventDefault()
    fetch=('https://restcountries.com/v3.1/alpha/${cca2}')
    .then(Response => Response.json())
    .then(code =>{
        countryModal(code)
        countryNeighbours(code)
    });
};
//Modal
function countryModal(country){
    let current = new Date()
      html = `<img src= "${country.flags.svg}" alt="" width="300px">
                <div>Country : ${country.name.common}</span></div>
                <div id="code" data-id=${country.cca2} >Alpha2Code : ${country.cca2}</div>
                <div>Capital : ${country.capital}</div>
                <div>Region : ${country.region}</div>
                <div>Population : ${country.population.toLocaleString()}</div>
                <div>Latitude - Longitude : ${country.latlng.join(' - ')}</div>
                <div>Area : ${country.area}</div>
                <div>Timezone : ${country.timezones.join(', ')}</div>
                <div>Current Time : ${current.toLocaleTimeString()} </div>
                <div class="neighbour">Neighbours: </div> 
                <div>Currency : ${country.currency}div>
                <div>Official languages : ${country.languages}</div>`
        countryDetails.innerHTML;
        countryDetails.parentElement.classList.add('ShowDetails');
        

};

//Fetch Country
fetch('https://restcountries.com/v3.1/all')
    .then(Response => Response.json())
    .then(countries => {
        renderCountries(sortCountries(countries, 'name'))
        buttons.addEventListener('click', e =>{
            let type = e.target.className
            if (type === 'name'){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            } else if(type === 'region'){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            }else if(type === 'population'){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            }else if(type === 'languages'){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            }else if(type === 'timezones'){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            }else if(type === 'currency'){
                sortedCountries = countries.sort(function (a, b) {
                    return a.currency[0].name.localeCompare(b.currency[0].name)
                  })
                  renderCountries(sortedCountries)
            }else{
                sortedCountries = renderCountries(sortCountries(countries, 'name'));
            }
        })
     
        search.addEventListener("input", e =>{
            let searchTerm = e.target.value
            renderCountries(filterCountries(countries, searchTerm));
             html = `<div class="nsearch">No result found</div>`
            const NoSearch = filterCountries(country, searchTerm).length < 1 ?
            NoSearch.classList.add('showDetails'):
            NoSearch.classList.remove('showDetails')
            
            if (searchTerm === ' '){
                renderCountries(sortCountries(countries, 'name'));
            }
        }); 
    });
    function topFunction(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    };
    