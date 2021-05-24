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

  renderFilteredShows();
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
