async function serviceTravel() {
  const resp = await fetch('https://restcountries.com/v3.1/name/Ukraine');
  if (!resp.ok) {
    throw new Error('Error');
  }
  const data = await resp.json();
  console.log(data);
}

serviceTravel();
