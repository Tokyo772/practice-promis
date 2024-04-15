// const elements = {
//   content: document.querySelector('.js-content'),
//   text: document.querySelector('.js-text'),
// };

// const { esbuildVersion } = require('vite');

// let count = 10;
// elements.text.textContent = `Залишилось ${count} sec`;

// const id = setInterval(() => {
//   count -= 1;
//   elements.text.textContent = `Залишилось ${count} sec`;
//   if (count === 0) {
//     clearInterval(id);
//     elements.text.style.display = 'none';
//   }
// }, 1000);

// setTimeout(() => {
//   clearInterval(id);
//   elements.text.style.display = 'none';
// }, count * 1000);
//TODO:
// setTimeout(() => {
//   console.log('hello');
// }, 0);
// console.time('for');

// for (let i = 0; i < 10000; i++) {
//   console.log(i);
// }
// for (let i = 0; i < 10000; i++) {
//   console.log(i);
// }
// console.timeEnd('for');
//TODO:
// const currentDate = new Date();
// console.log(currentDate);

// const elements = {};

// TODO: Promise

// const promise = new Promise((res, rej) => {
//   const random = Math.random();

//   if (random > 0.5) {
//     res({ name: 'Alice' });
//   } else {
//     rej('Error');
//   }
// });

// console.log(promise);

// promise
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.log('err');
//   })
//   .finally(() => {
//     console.log('done promise');
//   });

// for (let i = 0; i < 10000; i++) {
//   console.log(i);
// }
// TODO: Practice create Casino spin
import * as basicLightbox from 'basiclightbox';
const selectors = {
  spinBtn: document.querySelector('.js-start'),
  container: document.querySelector('.js-container'),
};

selectors.spinBtn.addEventListener('click', handlerStart);

function handlerStart() {
  const promises = [...selectors.container.children].map(_ => createPromise());

  Promise.allSettled(promises).then(items => {
    items.forEach((item, idx) => {
      selectors.container.children[idx].textContent = '';
      setTimeout(() => {
        selectors.container.children[idx].textContent =
          item.value || item.reason;

        if (idx === items.length - 1) {
          const instance = basicLightbox.create(
            `<h1>${isWinner ? 'Winner' : 'Loser'}</h1>`
          );
          instance.Show();
        }
      }, 1000 * (idx + 1));
    });
    const isWinner =
      items.every(item => item.status === 'fulfilled') ||
      items.every(item => item.status === 'rejected');
  });
}

function createPromise() {
  return new Promise((res, rej) => {
    const random = Math.random();
    if (random > 0.5) {
      res('🤩');
    } else {
      rej('👺');
    }
  });
}
