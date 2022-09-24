import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const BASE_URL = 'https://restcountries.com/v3.1/';




function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}`)
        .then(response => {
            if (response.status !== 200) {
                throw new Error (response.status);
            }
            return response.json();
        }
        );
}



export default { fetchCountries };