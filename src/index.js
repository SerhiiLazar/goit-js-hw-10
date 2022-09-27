

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import API from './fetchCountries';

import './css/styles.css';

const refs = {
    inputElement: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};


const DEBOUNCE_DELAY = 300;

refs.inputElement.addEventListener('input', debounce(onCountriesInput, DEBOUNCE_DELAY))

function onCountriesInput(event) {
    event.preventDefault();
    const name = refs.inputElement.value.trim();
    if (!name) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
    }
    API.fetchCountries(name)
    .then(onAddCountries)
    .catch(onError)

}

function onAddCountries(countries) {

    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';

    if(countries.length >= 10) {
      return  Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    }

    if(countries.length >= 2 && countries.length <= 10) {
        const list = countries.map(({flags, name}) => {
            return `<li class="country-list__item"><img src="${flags.svg}" alt="" width="70" height="70"><h2>${name.official}</h2></li>`;
        })
        refs.countryList.innerHTML = list;
    }

    if(countries.length === 1) {
        const markup = countries.map(({flags, name, capital, population, languages }) => {
            return `
                <ul class="country-info__item">
                    <li class="country-info__list--title">
                        <img src="${flags.svg}" alt="" width="70" height="70">
                        <h2>${name.official}</h2>
                    </li>
                    <li class="country-info__list">
                        <p><span>Capital:</span> ${capital}</p>
                    </li>
                    <li class="country-info__list">
                        <p><span>Population:</span> ${population}</p>
                    </li>
                    <li class="country-info__list">
                        <p><span>Languages:</span> ${Object.values(languages)}</p>
                    </li>
                </ul>
            `
        }).join('')
        refs.countryInfo.innerHTML = markup;
    }
}


function onError(name){
    if(name === '') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        return (refs.countryInfo.innerHTML = ''),
        (refs.countryList.innerHTML = '');
        
    }
}


// fetch('https://restcountries.com/v3.1/name/france')
// .then(response => {
//     return response.json();
// })
// .then(name => {
//     console.log('name', name);
// })
// .catch(error => {
//     console.log(error)
// });