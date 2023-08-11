`use strict`;
// rejected promise throw error only when there is no error
// but with an error like 404, fetch promise will still be fulfilled
// so catch error handler cannot pick up on it
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

    // console.log(languages);
    // console.log(currencies);

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

const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((response) => {
            return response.json();
            console.log(response);
        })
        .then((data) => {
            console.log(data);
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) {
                return;
            }
            // Country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const neighbour = data[0];
            renderCountry(neighbour);
        })
        .catch((err) => {
            console.error(`${err}`);
            renderError(`Something went wrong💥💥 ${err.message}. Try again`);
            // this error is an object and contains a 'message prperty
            // we can create error objeccts using error contructor
            // and any error created like that has properties
        })
        .finally(() => {
            countriesContainer.style.opacity = 1; //always needs to happen
        });
};

btn.addEventListener('click', () => {
    getCountryData('portugal');
});

getCountryData('fwfa');

// Handling rejections in promise
// 1) pass second callback function into the then() method
// that second callback function called with the argument error
// to catch any error in the promise chain, use catch() function at the end of chain
// errors propogate down the chain

// 2)finally() method ( eg: used for loading spinner)
// callback function inside finally() called no matter whether the promise is fulfilled or rejected
// works because catch itself returns a promise

// then() method only called when promise is fulfilled while
// catch() method only called when the promise is rejected
