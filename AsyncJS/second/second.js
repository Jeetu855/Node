'use strict';

const button = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////////////////////////

const renderCountry = function (data, className = ``) {
    const languages = Object.values(data.languages);
    const currencies = Object.values(data.currencies);

    console.log(languages);
    console.log(currencies);

    const html = `<article class="country" ${className}>
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

const getCountryAndNeighbour = function (country) {
    const request = new XMLHttpRequest();

    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);

    request.send(); //to send request

    request.addEventListener('load', () => {
        const data = JSON.parse(request.responseText)[0];
        console.log(data);

        // render country 1
        renderCountry(data);

        // Get neighbour country based on border data got from AJAX call
        const [neighbour] = data.borders;
        if (!neighbour) {
            return;
        }

        // AJAX call for country 2
        const request2 = new XMLHttpRequest();
        request2.open(
            'GET',
            `https://restcountries.com/v3.1/alpha/${neighbour}`
        );
        request2.send();
        // adding callback function inside of another callback function
        // so this is dependent on previous AJAX call since
        // we get data of neighbour from previous country
        request2.addEventListener('load', () => {
            // console.log(JSON.parse(request2.responseText));
            const [data2] = JSON.parse(request2.responseText);
            // console.log(data2);
            renderCountry(data2, `neighbour`);
        });
    });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

// secondcallback function dependent on first callback
// lots of nested callbacks = callback hell
//  eg;
setTimeout(() => {
    console.log(`1 second`);
    setTimeout(() => {
        console.log(`2 second`);
        setTimeout(() => {
            console.log(`3 second`);
            setTimeout(() => {
                console.log(`4 second`);
            }, 1000);
        }, 1000);
    }, 1000);
}, 1000);
