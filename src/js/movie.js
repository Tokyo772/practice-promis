// const elements = {
//   container: document.querySelector('.js-movie-list'),
//   loadBtn: document.querySelector('.js-load-more'),
// };

// const defaults = {
//   poster:
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PgItrmj9SWhclDBAmjlyFsC4w9tEKTcvDTbc2puQtQ&s',
//   titleNotFound: 'Title not found',
//   releaseDate: 'XXXX-XX-XX',
//   voteAverage: 'XX.XX',
// };

// elements.loadBtn.addEventListener('click', handlerLoad);

// let page = 1;

// function handlerLoad() {
//   page += 1;
//   serviceFilms(page)
//     .then(data => {
//       elements.container.insertAdjacentHTML(
//         'beforeend',
//         createMarkup(data.results)
//       );

//       if (data.page >= data.total_pages) {
//         elements.loadBtn.classList.replace('load-more', 'load-more-hidden');
//       }
//     })
//     .catch(err => {
//       elements.loadBtn.classList.replace('load-more', 'load-more-hidden');
//     });
// }

// function serviceFilms(currentPage = '1') {
//   const params = new URLSearchParams({
//     page: currentPage,
//     api_key: 'e7c82be7fbcb90103af6d6e6a6ca5896',
//   });
//   return fetch(
//     `https://api.themoviedb.org/3/trending/movie/week?${params}`
//   ).then(resp => {
//     return resp.json();
//   });
// }

// serviceFilms()
//   .then(data => {
//     if ('success' in data && !data.success) {
//       throw new Error(data.status_message);
//     }

//     elements.container.insertAdjacentHTML(
//       'beforeend',
//       createMarkup(data.results)
//     );

//     if (data.page < data.total_pages) {
//       elements.loadBtn.classList.replace('load-more-hidden', 'load-more');
//     }
//   })
//   .catch(err => {
//     console.log(err);
//   });

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({ title, release_date, vote_average, poster_path }) =>
//         `<li>
//           <img src="${
//             poster_path
//               ? 'https://image.tmdb.org/t/p/w500' + poster_path
//               : defaults.poster
//           }" alt="${title || defaults.titleNotFound}" />
//           <div>
//             <h2>${title || defaults.titleNotFound}</h2>
//             <p>Release Date: ${release_date || defaults.releaseDate}</p>
//             <p>Vote Average: ${vote_average || defaults.voteAverage}</p>
//           </div>
//         </li>`
//     )
//     .join('');
// }

/*  SCROLL INFINITY*/

const elements = {
  container: document.querySelector('.js-movie-list'),
  guard: document.querySelector('.js-guard'),
};

const defaults = {
  poster:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8PgItrmj9SWhclDBAmjlyFsC4w9tEKTcvDTbc2puQtQ&s',
  titleNotFound: 'Title not found',
  releaseDate: 'XXXX-XX-XX',
  voteAverage: 'XX.XX',
};

let page = 1;
const options = {
  rootMargin: '200px',
};
const observer = new IntersectionObserver(handlerLoadMore, options);

function serviceFilms(currentPage = '1') {
  const params = new URLSearchParams({
    page: currentPage,
    api_key: 'e7c82be7fbcb90103af6d6e6a6ca5896',
  });
  return fetch(
    `https://api.themoviedb.org/3/trending/movie/week?${params}`
  ).then(resp => {
    return resp.json();
  });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ title, release_date, vote_average, poster_path }) =>
        `<li>
          <img src="${
            poster_path
              ? 'https://image.tmdb.org/t/p/w500' + poster_path
              : defaults.poster
          }" alt="${title || defaults.titleNotFound}" />
          <div>
            <h2>${title || defaults.titleNotFound}</h2>
            <p>Release Date: ${release_date || defaults.releaseDate}</p>
            <p>Vote Average: ${vote_average || defaults.voteAverage}</p>
          </div>
        </li>`
    )
    .join('');
}

serviceFilms()
  .then(data => {
    if ('success' in data && !data.success) {
      throw new Error(data.status_message);
    }

    elements.container.insertAdjacentHTML(
      'beforeend',
      createMarkup(data.results)
    );
    if (data.page < data.total_pages) {
      observer.observe(elements.guard);
    }
  })
  .catch(err => {
    console.log(err);
  });

function handlerLoadMore(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      serviceFilms(page)
        .then(data => {
          if ('success' in data && !data.success) {
            throw new Error(data.status_message);
          }

          elements.container.insertAdjacentHTML(
            'beforeend',
            createMarkup(data.results)
          );

          if (data.page >= data.total_pages) {
            observer.unobserve(elements.guard);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
}
