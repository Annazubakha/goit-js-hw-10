import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_6aV081bfDzGUJfsphuO2Wu9MrQ2eCd2oQa2n6zgRShYo1N5hpZ7Vt1jhpbiHXYBi';

export function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/breeds';
  const url = `${BASE_URL}${END_POINT}`;
  return axios.get(url);
}

export function fetchCatByBreed(breedId) {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/images/search';
  const PARAMS = {
    params: { breed_ids: breedId },
  };

  const url = `${BASE_URL}${END_POINT}`;
  return axios.get(url, PARAMS);
}
