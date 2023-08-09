'use strict';

const button = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////////////////////////

const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    // new keyword used to create an object based on constructor function
    request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
    //request object requires HTTP method and URL to which we are requesting

    request.send(); //to send request

    request.addEventListener('load', () => {
        //console.log(this.responseText); // 'this' here is request object
        // can also use
        // console.log(request.responseText);
        const data = JSON.parse(request.responseText)[0];
        console.log(data);
        const languages = Object.values(data.languages);
        const currencies = Object.values(data.currencies);
        //Object.values: static method returns an array* of a given object's
        //values from key-value pairs(only returns the values of objects keys).
        console.log(languages);
        console.log(currencies);

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
        // insertAdjacentHTML(position, text)
        // 'html' is the variable we created above containing the html
        // beforeend:Just inside the element, after its last child.
        // html:The string to be parsed as HTML or XML and inserted into the tree.
        countriesContainer.style.opacity = 1;
    });
};

getCountryData('portugal');
getCountryData('australia');
getCountryData('usa');

// order may differ depending on whichever data returns first
