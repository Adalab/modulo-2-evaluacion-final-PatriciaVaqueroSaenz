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

  console.log(event.target); //me coge el icono con id=favorito seleccionado
  const savedFav = JSON.parse( localStorage.getItem('favorites'));
  const savedGD = JSON.parse( localStorage.getItem('globalData'));
  console.log(savedFav); //recupero los datos de ls almacenados en favorites
  console.log(savedGD);//recupero los datos de ls almacenados en globalData

  //eliminar de ls de favoritos el elemento clickado, pintar de nuevo para que quite los eliminados
  // for (const fav of savedFav) {
  //   const filteredLS = savedGD.find( data => data.show.id === fav);
  //   console.log(filteredLS);
  // }
}


function resetLS(){

  localStorage.clear();
  favoriteList.innerHTML='';
  resultList.innerHTML ='';
}

const reset = document.querySelector('.section__fav-reset');
reset.addEventListener('click', resetLS);