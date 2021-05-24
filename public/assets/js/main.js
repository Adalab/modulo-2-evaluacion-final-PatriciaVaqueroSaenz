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


  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;
      //almaceno en ls globaldata
      localStorage.setItem('globalData', JSON.stringify(data));
      printShows(globalData);
    });

  printFavoriteList(globalData);

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


// SI TIENE DATOS ALMACENADOS EN LS LOS COGEMOS Y PINTAMOS EN LISTA SERIES FAVORITAS
if(localStorage.getItem('favorites') !== null) {

  const savedFav = JSON.parse( localStorage.getItem('favorites'));
  const savedGD = JSON.parse( localStorage.getItem('globalData'));

  for (const fav of savedFav) {
    const filteredLS = savedGD.find( data => data.show.id === fav);
    if (filteredLS.show.image === null){
      favoriteList.innerHTML += `<li data-id="${filteredLS.show.id}" class="list-fav"><div class="div-fav"><h1 class="title-fav">${filteredLS.show.name}</h1><img class="img-fav" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/><i data-id="${filteredLS.show.id}" class="fas fa-times-circle remove-fav"></i></div></li>`;
    }else{
      favoriteList.innerHTML += `<li data-id="${filteredLS.show.id}" class="list-fav"><div class="div-fav"><h1 class="title-fav">${filteredLS.show.name}</h1><img class="img-fav" src="${filteredLS.show.image.medium}"/><i data-id="${filteredLS.show.id}" class="fas fa-times-circle remove-fav"></i></div></li>`;
    }
  }

  addListenerToIcon();
}
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable strict */

const inputShow = document.querySelector('.js-searchInput');
let filteredShows = [];

function addListenerToCards(){
  const allCards = document.querySelectorAll('.js-list-item');
  for( const  card  of allCards ) {
    card.addEventListener('click', handleClickCard);
  }
}

function handleClickCard(event) {

  //IDENTIFICAR LI PULSADA
  const whereIAddedTheEvent = event.currentTarget;

  //OBTENER ID ASOCIADO A LA SERIE CLICKADA
  const showId = whereIAddedTheEvent.dataset.id;

  // Buscar si la paleta clickada está en favoritos
  const isPresent = favorites.find( favoriteId => favoriteId === parseInt(showId));

  if( isPresent === undefined ) {
    // El ID de la serie en la que ha hecho click no está en el array de favoritos
    favorites.push( parseInt(showId));
  }
  else {
    favorites = favorites.filter( favoriteId => favoriteId !== parseInt(showId) );
  }

  localStorage.setItem('favorites', JSON.stringify(favorites));

  printFavoriteList(event);
  renderFilteredShows();
}

function printFavoriteList(event){
  if (event !== undefined){
    const whereIAddedTheEvent = event.currentTarget;
    const showId = whereIAddedTheEvent.dataset.id;
    const text = event.srcElement.innerText;
    const imageFav = event.srcElement.nextSibling.currentSrc;

    favoriteList.innerHTML += `<li data-id="${showId}" class="list-fav"><div class="div-fav"><h1 class="title-fav">${text}</h1><img class="img-fav" src="${imageFav}"/><i data-id="${showId}" class="fas fa-times-circle remove-fav"></i></div></li>`;

    console.log(favoriteList);
  }else{
    favoriteList.innerHTML='';
  }

}

function renderFilteredShows() {

  // Coger el valor actual
  const searchText = inputShow.value.toLowerCase();

  // Filtrar las series que inluyen el campo de búsqueda
  for (const data of globalData){
    filteredShows = globalData.filter((data) => data.show.name.toLowerCase().includes(searchText) );
  }
  // pintar series
  printShows(filteredShows);

}

/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable strict */

function addListenerToIcon(){
  const allIcons = document.querySelectorAll('.remove-fav');
  for( const  icon  of allIcons ) {
    icon.addEventListener('click', handleClickRemoveFav);
  }
}

function handleClickRemoveFav(event){

  console.log(event.target); //icono con id=favorito seleccionado
  console.log(event.target.dataset.id);//id del icono sleeccionado
  let nameEvent = event.target.parentNode.firstChild.innerText;
  let imageEvent= event.target.parentNode.firstChild.nextSibling.currentSrc;


  let savedFav = JSON.parse( localStorage.getItem('favorites'));//recupero los datos de ls almacenados en favorites
  let savedGD = JSON.parse( localStorage.getItem('globalData'));//recupero los datos de ls almacenados en globalData

  savedFav = savedFav.filter((favorito)=>
    favorito !== parseInt(event.target.dataset.id)
  );//me elimina de savedFav el favorito en el que hemos clickado en la x
  localStorage.setItem('favorites', JSON.stringify(savedFav));//lo borro del LS

  //SI SE RECARGA LA PÁGINA SE ACTUALIZA EL LISTADO DE FAVORITOS SINO NO
}



function resetLS(){

  localStorage.clear();
  favoriteList.innerHTML='';
  resultList.innerHTML ='';
  location.reload(); //recargar la página después de borrar
}

const reset = document.querySelector('.section__fav-reset');
reset.addEventListener('click', resetLS);
//# sourceMappingURL=main.js.map
