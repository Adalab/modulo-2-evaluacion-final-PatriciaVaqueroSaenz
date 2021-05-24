/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable strict */



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

  const isPresent = favorites.find( favoriteId => favoriteId === showId );

  if( isPresent === undefined ) {
    // El ID de la paleta en la que ha hecho click no está en el array de favoritos
    favorites.push( showId );
  }
  else {
    favorites = favorites.filter( favoriteId => favoriteId !== showId );
  }

  console.log(favorites);

}
