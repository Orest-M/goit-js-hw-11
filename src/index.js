const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form input');

form.addEventListener('submit', onSubmit);

const URL = 'https://pixabay.com/api';
const KEY = '32821640-07af0db556e394f2b39c0c0e4';

async function onSubmit(evt) {
  evt.preventDefault();

  const res = await fetch(
    `${URL}/?key=${KEY}&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
  );
  const data = await res.json();

  console.log(data);
}
