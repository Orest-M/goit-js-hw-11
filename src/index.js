import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('.search-form input');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

const URL = 'https://pixabay.com/api';
const KEY = '32821640-07af0db556e394f2b39c0c0e4';

let totalCount = null;
let page = 1;

form.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onLoad);

async function onSubmit(evt) {
  evt.preventDefault();

  gallery.innerHTML = '';

  if (input.value.trim().length === 0) {
    callNotiflix('warn');
    return;
  }

  try {
    await axiosRequest();

    if (totalCount === 0) {
      callNotiflix('fail');
      return;
    }

    callNotiflix('success');

    if (totalCount > 40) {
      loadMore.style.display = 'block';
    }
  } catch (err) {
    console.log(err);
  }
}

async function axiosRequest(page = 1) {
  try {
    const res = await axios.get(
      `${URL}/?key=${KEY}&q=${input.value.trim()}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );

    totalCount = res.data.totalHits;

    createImageCard(res.data.hits);

    if (dataArray.length < 40) {
      loadMore.style.display = 'none';
    }

    return res;
  } catch (err) {
    console.log(err);
  }
}

function callNotiflix(status) {
  if (status === 'success') {
    return Notiflix.Notify.success(`Hooray! We found ${totalCount} images.`);
  } else if (status === 'fail') {
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else if (status === 'warn') {
    return Notiflix.Notify.warning('Write something in the input field!');
  }
}

function createImageCard(dataArray) {
  const cards = dataArray
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<a class="gallery__item" href="${largeImageURL}" style="text-decoration: none; color: black">
          <div class="photo-card" style="display: flex; flex-direction: column; align-items: center; border: 1px solid #363636; width: 370px">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="100%" height="250px" />
            <div class="info" style="display: flex; gap: 30px">
              <p class="info-item" style="display: flex; flex-direction: column; align-items: center;">
                <b>Likes</b>
                <span>${likes}</span>
              </p>
              <p class="info-item" style="display: flex; flex-direction: column; align-items: center">
                <b>Views</b>
                <span>${views}</span>
              </p>
              <p class="info-item" style="display: flex; flex-direction: column; align-items: center">
                <b>Comments</b>
                <span>${comments}</span>
              </p>
              <p class="info-item" style="display: flex; flex-direction: column; align-items: center">
                <b>Downloads</b>
                <span>${downloads}</span>
              </p>
            </div>
          </div>
        </a>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', cards);

  lightbox.refresh();
}

function onLoad() {
  page += 1;
  axiosRequest(page);
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});
