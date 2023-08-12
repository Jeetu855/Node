`use strict`;

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////////////////////////

const renderError = function (msg) {
    countriesContainer.insertAdjacentText('beforeend', msg);
    // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data) {
    const languages = Object.values(data.languages);
    const currencies = Object.values(data.currencies);

    const html = `<article class="country">
    <img class="country__img" src="${data.flags.svg}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${data.population}</p>
      <p class="country__row"><span>🗣️</span>${languages[0]}</p>
      <p class="country__row"><span>💰</span>${currencies[0].name}</p>
    </div>
  </article>`;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    // countriesContainer.style.opacity = 1;
};

const getJson = function (url, errMsg = 'Something went wrong') {
    return fetch(`${url}`).then((response) => {
        if (!response.ok) {
            // in this response object, it has a property 'ok':false(coz 'ok' means 200)
            // which tells that we were unable to fetch data
            throw new Error(`${errMsg} (${response.status})`);
            // create and error object using error contructor
            // throw keyword immediately terminates the function like return keyword
            // throwing an error inside then method means promise in rejected
            // so the error propogates to the catch() function
            // any kind of error will cause promise to reject
            // but here we create our own error and catch and at bottom of chain
        }
        return response.json(); //this passed onto next one in promise chain
    });
};

const getCountryData = function (country) {
    getJson(
        `https://restcountries.com/v3.1/name/${country}`,
        'Country not found'
    )
        .then((data) => {
            console.log(data);
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];
            // const neighbour = 'ffasfas';
            // above throws error 400
            if (!neighbour) {
                throw new Error('No neighbour found');
            }
            // Country 2
            return getJson(
                `https://restcountries.com/v3.1/alpha/${neighbour}`,
                'Country not found'
            );
        })
        .then((data) => {
            console.log(data);
            const neighbour = data[0];
            renderCountry(neighbour);
        })
        .catch((err) => {
            console.error(`${err}`);
            renderError(`Something went wrong💥💥 ${err.message}. Try again`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
};

// btn.addEventListener('click', () => {
//     getCountryData('portugal');
// });

//getCountryData('fwfa'); //should show error 404 but fetch only throws error
// when there is no internet, so even if we type a country name that dosent
// exist, promise will be fulfilled and catch() wont get the 404 error
// in this case we have to throw errors manually

// handling error for country with no neighbours with shared border
btn.addEventListener('click', () => {
    getCountryData('australia');
});
