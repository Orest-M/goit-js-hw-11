import axios from 'axios';

const URL = 'https://pixabay.com/api';
const KEY = '32821640-07af0db556e394f2b39c0c0e4';

export async function axiosRequest(q) {
  try {
    const res = await axios.get(
      `${URL}/?key=${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`
    );
    console.log(res.data);
  } catch (err) {
    console.log(err);
  }
}
