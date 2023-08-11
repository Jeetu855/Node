`use strict`;
// promise is an obejct that is used as a placeholder for the future
// result of asynchronous operation
// OR it is a container for future value
// eg: lottery ticket is like promise which will resolve in future
// States of promise
// 1)Pending : before the future value is available
// 2)Setteled : asynchronous task has finished
// a)Fulfilled : when a promise successfully resulted in a value
// b)rejected : error in fetching data
// promise is only setteled once and after that state remains unchanged

const button = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////////////////////////

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
    countriesContainer.style.opacity = 1;
};

// Promise chaining

const getCountryData = function (country) {
    // Country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        // inside then() method pass a callback that will execute when promise
        // is successfully fulfilled
        .then(
            // the argument 'response' is what we get after a fulfilled promise
            (response) => {
                return response.json();
                console.log(response);
                // to view the response body, need to call json method on respose object
                // json() method is available for all response object that is
                // coming from a fetch function so all the resolved values
                // json() function is also async function and returns a new promise
                // call another then() to handle promise from json() method
            }
        )
        .then((data) => {
            //data is the object we get from calling json()
            console.log(data);
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) {
                return;
            }
            // Country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
            // whatever we return becomes the fulfilled value of promise so for example
            // if we do
            // return 23;
        })
        .then((response) => {
            //this 'data' is fulfilled value of previous promise
            // alert(data); //will pop alert with data returned
            // console.log(response);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            const neighbour = data[0];
            renderCountry(neighbour);
        });
};
getCountryData('portugal');

// 1)fetch function returns a promise(response) which we handle using then() method
// 2)to read data from response we need to call json() method
// 3)json() returns a new promise so need to call another then() method to handle it
