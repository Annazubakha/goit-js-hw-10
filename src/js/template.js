export const listTemplate = ({ data }) => {
  const dataMarkUp = data[0].breeds[0];
  return `<div class="container"><img class="photo" src="${data[0].url}" alt="${dataMarkUp.name}"/>
    <div class="info-container">
    <h2 class="name">${dataMarkUp.name}</h2>
    <p class="description">${dataMarkUp.description}</p>
  <p class="temperament"> <span>Temperament:</span> ${dataMarkUp.temperament}</p>
  </div>  </div>`;
};

export const createOptions = options => {
  return options
    .map(({ id, name }) => `<option value=${id}>${name} </option>`)
    .join('');
};
