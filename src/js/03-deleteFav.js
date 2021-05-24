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