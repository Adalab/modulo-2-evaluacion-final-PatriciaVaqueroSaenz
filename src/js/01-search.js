/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
'use strict';

console.log('>> Ready :)');

const searchButton = document.querySelector('.js-searchButton');
const resultList = document.querySelector('.js-main-list');
const favoriteList = document.querySelector('.main__list-favorite');
let showsName;
let showsImage;
let showsImageMedium;
let showId;
let globalData;
let favorites = [];
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';


function conectToApi(){
  const inputValue = document.querySelector('.js-searchInput').value;

  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;
      printShows(globalData);
    });

}

function printShows(globalData){

  //LIMPIO LA LISTA CON LOS RESULTADOS DE BÚSQUEDA
  resultList.innerHTML ='';

  for (let i=0; i< globalData.length;i++){
    //DEVUELVE EL NOMBRE DE LAS SERIES COINCIDENTES CON LO ESCRITO EN EL INPUT
    showsName = globalData[i].show.name;
    //DEVUELVE LA IMAGEN DE LAS SERIES COINCIDENTES CON LO ESCRITO EN EL INPUT
    showsImage = globalData[i].show.image;
    //DEVUELVE EL ID DE LAS SERIES COINCIDENTES CON LO ESCRITO EN EL INPUT
    showId = globalData[i].show.id;

    // Buscar si la paleta que se está pintando está en favoritos
    const isPresent = favorites.find( favoriteId => favoriteId === showId);


    // Si el id está en favoritos, se renderiza el li con la clase favorite
    let classFavorite = '';
    if( isPresent === undefined ) {
      classFavorite = '';
    }
    else {
      classFavorite = 'favorite';
    }

    //PARA EL CASO EN QUE LA SERIE NO TENGA IMAGEN
    if (showsImage === null){

      resultList.innerHTML += `<li data-id="${showId}" class="js-list-item ${classFavorite}"><div class="js-list-div"><h2 class="js-showName">${showsName}</h2><img class= "js-image" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/></div></li>`;

      //PARA LAS SERIES CON IMAGEN LA AÑADE AL LI
    }else{
      showsImageMedium = globalData[i].show.image.medium;

      resultList.innerHTML += `<li data-id="${showId}" class="js-list-item ${classFavorite}"><div class="js-list-div"><h2 class="js-showName">${showsName}</h2><img class="js-image" src="${showsImageMedium}"/></div></li>`;

    }

  }
  addListenerToCards();
}

function handleClik(){
  conectToApi();
}

searchButton.addEventListener('click',handleClik);
