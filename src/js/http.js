/* Fetch */
// const options = {
//   method: 'GET',
// };

// fetch('https://rickandmortyapi.com/api/character', options)
//   .then(res => {
//     if (!res.ok) {
//       throw new Error(res.statusText);
//     }
//     return res.json();
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log(err);
//   });

/* Задача */

const elements = {
  searchForm: document.querySelector('.js-search-from'),
  list: document.querySelector('.js-list'),
};

elements.searchForm.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
  evt.preventDefault();
  const { city, days } = evt.currentTarget.elements;

  serviceWeather(city.value, days.value)
    .then(data => {
      elements.list.innerHTML = createMarkup(data.forecast.forecastday);
    })
    .catch(err => {
      console.log(err);
    });
}

function serviceWeather(city, days) {
  const BASE_URL = 'http://api.weatherapi.com/v1';
  const END_POINT = '/forecast.json';
  const API_KEY = 'cb71863de576474e981155338241604';

  const params = new URLSearchParams({
    key: API_KEY,
    q: city,
    days: days,
    lang: 'uk',
  });

  return fetch(`${BASE_URL}${END_POINT}?${params}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({
        date,
        day: {
          avgtemp_c,
          condition: { icon, text },
        },
      }) => `<li class="weather-card">
        <img src="${icon}" alt="${text}" />
        <h2 class="date">${date}</h2>
        <h3 class="weather-text">${text}</h3>
        <h3 class="temperature">${avgtemp_c} °C</h3>
      </li>`
    )
    .join('');
}
