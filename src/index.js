import axios from 'axios';
import Notiflix from 'notiflix';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form input');

const URL = 'https://pixabay.com/api';
const KEY = '32821640-07af0db556e394f2b39c0c0e4';

form.addEventListener('submit', onSubmit);

async function onSubmit(evt) {
  evt.preventDefault();

  if (input.value.trim().length === 0) {
    Notiflix.Notify.warning('Write something in the input field!');
    return;
  }

  const res = await axios.get(
    `${URL}/?key=${KEY}&q=${input.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
  );
  console.log(res.data);

  const totalCount = res.data.totalHits;

  if (totalCount === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  Notiflix.Notify.success(`Hooray! We found ${totalCount} images.`);
}
