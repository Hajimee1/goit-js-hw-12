import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const loader = document.querySelector('.loader');
const btn = document.querySelector('button');
const repBtn = document.querySelector('.rep-btn');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input');

axios.defaults.baseURL = 'https://pixabay.com/api';

const key = '56102185-c22f62e167e3da8dca248fc51';

let page = 1;
let query = '';
let hasSearched = false;
let totalHits = 0;
btn.addEventListener('click', e => {
  repBtn.classList.add('hidden');
  e.preventDefault();

  if (query === input.value) return;
  gallery.innerHTML = '';
  query = input.value;

  loadImages();
});

repBtn.addEventListener('click', () => {
  page++;
  loadImages();
});

const lightbox = new SimpleLightbox.default('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const fetchImages = (query, page) =>
  axios
    .get('/', {
      params: {
        key,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40,
      },
    })
    .then(res => res.data);

async function loadImages() {
  try {
    loader.classList.remove('hidden');

    const result = await fetchImages(query, page);

    const data = result.hits;
    totalHits = result.totalHits;

    if (!data.length) {
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }
    repBtn.classList.remove('hidden');
    const markup = data
      .map(
        ({
          webformatURL,
          largeImageURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => `
<li class="gallery-item">
  <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" class="gallery-image">
  </a>

  <table class="info-table">
    <tr>
      <th>Likes</th>
      <th>Views</th>
      <th>Comments</th>
      <th>Downloads</th>
    </tr>
    <tr>
      <td>${likes}</td>
      <td>${views}</td>
      <td>${comments}</td>
      <td>${downloads}</td>
    </tr>
  </table>
</li>`
      )
      .join('');

    gallery.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();

    const card = document.querySelector('.gallery-item');

    if (card) {
      const cardHeight = card.getBoundingClientRect().height;

      window.scrollBy({
        top: cardHeight * 1.2,
        behavior: 'smooth',
      });
    }

    const loadedItems = page * 40;

    if (loadedItems > totalHits) {
      repBtn.classList.add('hidden');

      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
        position: 'topRight',
      });
    }
  } catch (err) {
    iziToast.error({
      message: err.message,
      position: 'topRight',
    });
  } finally {
    loader.classList.add('hidden');
  }
}
