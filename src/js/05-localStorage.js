function setLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getLocalStorage() {
  //recupero el array de favoritos almacenado en ls
  favorites = JSON.parse(localStorage.getItem("favorites"));
  //pinto la lista de favoritos con lo almacenado en ls
  printFavoriteList();
  //pinto la lista de resultados
  printShows();
}
