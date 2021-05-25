
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
