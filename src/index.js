import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import { listTemplate, createOptions } from './js/template';

const refs = {
  selectedElem: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds()
  .then(({ data }) => {
    const markup = createOptions(data);
    refs.selectedElem.innerHTML = markup;

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
    .then(data => {
      refs.catInfo.innerHTML = listTemplate(data);
    })
    .catch(error => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!', {
        position: 'center-center',
        width: '1000px',
        fontSize: '36px',
      });
    });
}
