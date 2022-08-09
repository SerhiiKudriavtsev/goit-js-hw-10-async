import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import countryCardsTpl from './templates/country-card.hbs';
import countriesListTpl from './templates/country-list.hbs';
const debounce = require('lodash.debounce');
import fetchCountries from './fetchCountries';

Notiflix.Notify.init({
  position: 'center-center',
  clickToClose: true,
});

const DEBOUNCE_DELAY = 300;
let markup;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  cardConteiner: document.querySelector('.country-info'),
}

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  if (refs.searchBox.value.trim() !== "") {
    const searchQery = refs.searchBox.value.trim();
    fetchCountries(searchQery)
      .then(renderCountryCard)
      .catch(error => Notiflix.Notify.failure('Oops, there is no country with that name'))
  }
  else {
    refs.cardConteiner.innerHTML = [];
    }
  }

function renderCountryCard(countries) {
  if (countries.length > 10) {
    refs.cardConteiner.innerHTML = [];
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  };
  if (countries.length === 1) {
    markup = countryCardsTpl(countries[0]);
  }
    else {
      markup = countriesListTpl({countries});
    }
  refs.cardConteiner.innerHTML = markup;
}

