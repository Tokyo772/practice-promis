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
          instance.show();
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
