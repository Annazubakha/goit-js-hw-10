import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const refs = {
  selectedElem: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(({ data }) => {
    const options = data
      .map(({ id, name }) => `<option value=${id}>${name} </option>`)
      .join('');
    refs.selectedElem.innerHTML = options;

    new SlimSelect({
      select: refs.selectedElem,
    });
    refs.selectedElem.classList.remove('is-hidden');
  })
  .catch(error => {
    Notify.failure('Oops! Something went wrong! Try reloading the page!', {
      position: 'center-center',
      width: '1000px',
      fontSize: '36px',
    });
  })
  .finally(() => {
    refs.loader.classList.add('is-hidden');
  });

refs.selectedElem.addEventListener('change', onBreedSelect);

function onBreedSelect(e) {
  const breedId = e.target.value;
  fetchCatByBreed(breedId)
    .then(response => {
      const dataMarkUp = response.data[0].breeds[0];
      refs.catInfo.innerHTML = `<div class="container"><img class="photo" src="${response.data[0].url}" alt="${dataMarkUp.name}"/>
    <div class="info-container">
    <h2 class="name">${dataMarkUp.name}</h2>
    <p class="description">${dataMarkUp.description}</p>
  <p class="temperament"<span>Temperament:</span> ${dataMarkUp.temperament}</p>
  </div>  </div>`;
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-center',
        width: '1000px',
        fontSize: '36px',
      });
    });
}
