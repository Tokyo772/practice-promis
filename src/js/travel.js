import axios from 'axios';

console.log('before');
async function searchCity() {
  const search = await axios.get('https://restcountries.com/v3.1/name/Ukraine');
  return search;
}

searchCity()
  .then(data => {
    console.log(data.data[0].capital[0]);
  })
  .catch(err => console.log('dsads'));

console.log('after');
