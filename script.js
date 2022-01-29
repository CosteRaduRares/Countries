//GLOBAL
const countryList = document.querySelector('.country')
const countryDetails = document.querySelector('.details-country')
const search = document.querySelector('.search')
const NoSearch = document.querySelector('.nsearch')
const topBtn = document.getElementById('.topbtn')
const filterBtn = document.getElementById('.filter')
const modalBtn = document.getElementById('.modal-close-btn')
const buttons = document.querySelector('.buttons')

countryList.addEventListener('click', getModalInfo)
    filterBtn.addEventListener('click', () => {
    filterBtn.classList.toggle(open)
})
modalBtn.addEventListener('click', () => {
    countryDetails.parentElement.classList.remove('showDetails')
})
// Create one Country
 const createCountry = ({
     name,capital,region,population,flag})=>{
         const formattedCapital = capital.lenght > 0 ? `${capital}` : "-"
         const formattedRegion = region.lenght > 0 ? `${region}` : "-"
         return `<div class="country">
             <img src="${flag}" alt="flag"></img>
             <div class="info" id="country" data-value="${name}">
                 <h3 class="country-name">${name}</h3>
                 <p>Capital : ${formattedCapital}</p>
                 <p>Region : ${formattedRegion}</p>
                 <p>Population : ${population.toLocaleString()}</p>
                 <a href="#" class="country-button">More!</a>
             </div>
         </div>`
        }
//Search input filter 
const filterCountries = (arr, search) =>{
    search = search.toLowerCase()
    const filteredCountry = arr.filter(country => {
        const{
        name,capital,alpha3Code} = country 
        const isName = name.toLowerCase().includes(search)
        const isCapital = name.toLowerCase().includes(search)
        const isAplha3Code = alpha3Code.toLowerCase().includes(search)
        return isName || isCapital || isAplha3Code
    })
        return filterCountries
}
// Sorting Countries
const sortCountries = (arr, type) =>{
    const countries =[...arr]
    const sortedCountries = countries.sort((a, b) => {
        if(a[type] > b[type]) return 1
        if(a[type] < b[type]) return -1
        return 0
    })
        return sortedCountries
}
//Countries in div
const renderCountries = arr =>{
    let contents =""
    arr.forEach(country =>(contents += createCountry(country)))
    countryList.innerHtml = contents
}
//Information for the modal
function getModalInfo(e){
    e.preventDefault()
    if(e.target.classList.contains("country-button")){
        let countryItem = e.target.parentElement
        fetch(`https://restcountries.com/v3.1/name/${countryItem.dataset.value}`)
        .then(Response => Response.json())
        .then(country =>{
            country = country[0]
            countryModal(country)
            countryNeighbours(country)
        })
        .catch(err => console.log("Error :", err))
    }
}
//Click on Neighbours
function countryNeighbours(country){
    html = 'Neighbours : '
    const neighbours = document.querySelector('.neighbours')
    for(let i = 0; i < country.borders.lenght;i++){
        html += `<a href="#" class="neighbours-btn">${country.borders[i]}</a>`
    }
    neighbours.innerHTML = html
    const neighboursBtn = document.querySelectorAll('.neighbours-btn')
    neighboursBtn.forEach(btn =>{
        btn.addEventListener('click', getModalByCode)
    })
}
//Neighbours Code
function getModalByCode(e){
    e.preventDefault()
    let code = e.target.text
    fetch=('https://restcountries.eu/rest/v3.1/alpha/${code}')
    .then(Response => Response,json())
    .then(code =>{
        countryModal(code)
        countryNeighbours(code)
    })
}
//Modal
function countryModal(country){
    let current = new Date()
    let html = `<img src= "${country.flag}" alt="" width="300px">
                <div>Country : ${country.name}</span></div>
                <div id="code" data-id=${country.alpha3Code} >Alpha3Code : ${country.alpha3Code}</div>
                <div>Capital : ${country.capital}</div>
                <div>Region : ${country.region}</div>
                <div>Population : ${country.population.toLocaleString()}</div>
                <div>Latitude - Longitude : ${country.latlng.join(' - ')}</div>
                <div>Area : ${country.area}</div>
                <div>Timezone : ${country.timezones.join(', ')}</div>
                <div>Current Time : ${current.toLocaleTimeString()} </div>
                <div class="neighbour">Neighbours: </div> 
                <div>Currencies : ${country.currencies.filter(c => c.name).map(c => `${c.name} (${c.code})`).join(", ")}</div>
                <div>Official languages : ${country.languages.map(language => language.name).join(", ")}
                </div>`
        countryDetails.innerHTML
        countryDetails.parentElement.classList.add('ShowDetails')
}
//Fetch Country
fetch('https://restcountries.com/v3.1/all')
    .then(Response => Response.json())
    .then(countries => {
        renderCountries(sortCountries(countries, 'name'))
        buttons.addEventListener('click', e =>{
            let type = e.target.className
            if (type === "name"){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            } else if(type === "region"){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            }else if(type === 'population'){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            }else if(type === 'languages'){
                sortedCountries = countries.sort(function(a, b){
                    return a.language[0].name.localeCompare(b.language[0].name)
                })
                renderCountries(sortedCountries)
            }else if(type === 'timezones'){
                sortedCountries = sortCountries(countries, type)
                renderCountries(sortedCountries)
            }else if(type === 'currenciese'){
                sortedCountries = countries.sort(function(a, b){
                    return a.currencies[0].name.localeCompare(b.currencies[0].name)
                })
                renderCountries(sortedCountries)
            }else{
                sortedCountries = renderCountries(sortCountries(countries, 'name'))
            }
        })
        search.addEventListener('input', e =>{
            let searchTerm = e.target.value
            renderCountries(filterCountries(countries, searchTerm))
            let html = `<div class='nsearch'>No result found</div>`
            const ifnsearch = filterCountries(countries, searchTerm).lenght < 1 ?
            NoSearch.classList.add('showDetails'):
            NoSearch.classList.remove('showDetails')
            
            if (searchTerm === ''){
                renderCountries(sortCountries(countries, 'name'))
            }
        })
    })

    function topFunction(){
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
    }