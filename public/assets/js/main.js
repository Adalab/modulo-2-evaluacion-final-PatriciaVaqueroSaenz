'use strict';

const inputShow = document.querySelector('.js-searchInput');
const searchButton = document.querySelector('.js-searchButton');
const reset = document.querySelector('.section__fav-reset');
const resultList = document.querySelector('.js-main-list');
const favoriteList = document.querySelector('.main__list-favorite');
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';


let globalData=[];
let favorites = [];



// SI TIENE DATOS ALMACENADOS EN LS LOS RECUPERAMOS 
if(localStorage.getItem('favorites') !== null) {

  getLocalStorage();
}

function conectToApi(){

  let inputValue = inputShow.value.toLowerCase();


  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;
      printShows(globalData);
    });
}

function handleClik(){
  conectToApi();
}

searchButton.addEventListener('click',handleClik);




function printShows(){

  resultList.innerHTML='';
  
  for (const data of globalData){

    // Buscar si la serie que se está pintando está en favoritos
    const isPresent = favorites.find( 
      (favoriteId) => favoriteId.show.id === data.show.id);


    // Si está en favoritos, se renderiza el li con la clase favorite
    let classFavorite = '';
    if( isPresent === undefined ) {
      classFavorite = '';
    }
    else {
      classFavorite = 'favorite';
    }

    //PARA EL CASO EN QUE LA SERIE NO TENGA IMAGEN
    if (data.show.image === null){

      resultList.innerHTML += `<li id="${data.show.id}" class="js-list-item ${classFavorite}"><div class="js-list-div"><h2 class="js-showName">${data.show.name}</h2><img class= "js-image" src=${defaultImage} /></div></li>`;

      //PARA LAS SERIES CON IMAGEN LA AÑADE AL LI
    }else{

      resultList.innerHTML += `<li id="${data.show.id}" class="js-list-item ${classFavorite}"><div class="js-list-div"><h2 class="js-showName">${data.show.name}</h2><img class="js-image" src="${data.show.image.medium}"/></div></li>`;

    }

  }
  addListenerToCards();
}



function addListenerToCards(){
  const allCards = document.querySelectorAll('.js-list-item');
  for( const  card  of allCards ) {
    card.addEventListener('click', handleClickCard);
  }
}

function handleClickCard(event) {

  //IDENTIFICAR LI PULSADA
  const selectedCard = event.currentTarget;

  //OBTENER ID ASOCIADO A LA SERIE CLICKADA
  const cardId = parseInt(selectedCard.id);

  //BUSCAMOS POR ID EN GLOBALDATA
  const showInfo = globalData.find(
    (showItem) => showItem.show.id === cardId
  );

  // Buscar si la paleta clickada está en favoritos
  const isPresent = favorites.find( 
    (favoriteId) => favoriteId .show.id === cardId);

  if( isPresent === undefined ) {
    //En la que ha hecho click no está en el array de favoritos: añadimos a favoritos
    favorites.push( showInfo);
  }
  else {
    //Si está, filtramos
    favorites = favorites.filter( 
      (favoriteId) => favoriteId.show.id !== cardId);
  }

  //guardo favoritos en LS
  setLocalStorage(); 
  //repintamos la lista de favoritos para actualizar
  printFavoriteList(); 
  //repintamos la lista de resultados para actualizar
  printShows(); 
}

function printFavoriteList(){
  
  favoriteList.innerHTML='';

  for (const fav of favorites) {
    if(fav.show.image === null){
      favoriteList.innerHTML += `<li id="${fav.show.id}" class="list-fav"><div class="div-fav"><h1 class="title-fav">${fav.show.name}</h1><img class="img-fav" src=${defaultImage}/><i id="${fav.show.id}" class="fas fa-times-circle remove-fav"></i></div></li>`;
    }else{
      favoriteList.innerHTML += `<li data-id="${fav.show.id}" class="list-fav"><div class="div-fav"><h1 class="title-fav">${fav.show.name}</h1><img class="img-fav" src="${fav.show.image.medium}"/><i id="${fav.show.id}" class="fas fa-times-circle remove-fav"></i></div></li>`;
    }
  }
  addListenerToIcon();
}


function setLocalStorage(){
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function getLocalStorage(){
    //recupero el array de favoritos almacenado en ls
    favorites = JSON.parse(localStorage.getItem("favorites"));
    //pinto la lista de favoritos con lo almacenado en ls
    printFavoriteList(); 
    //pinto la lista de resultados
    printShows();
}

function addListenerToIcon() {
  const allIcons = document.querySelectorAll('.remove-fav');
  for (const icon of allIcons) {
    //al pulsar en los iconos evaluamos con la función si están o no en favoritos y repintamos
    icon.addEventListener('click', handleClickCard);
  }
}

function resetLS() {
  //vaciamos el array de favoritos
  favorites=[]; 
  //limpiamos el ls
  localStorage.clear(); 
  //recargar la página después de borrar
  location.reload(); 
}


reset.addEventListener('click', resetLS);

//# sourceMappingURL=main.js.map
