function addListenerToCards() {
  const allCards = document.querySelectorAll(".js-list-item");
  for (const card of allCards) {
    card.addEventListener("click", handleClickCard);
  }
}

function handleClickCard(event) {
  //IDENTIFICAR LI PULSADA
  const selectedCard = event.currentTarget;

  //OBTENER ID ASOCIADO A LA SERIE CLICKADA
  const cardId = parseInt(selectedCard.id);

  //BUSCAMOS POR ID EN GLOBALDATA
  const showInfo = globalData.find((showItem) => showItem.show.id === cardId);

  // Buscar si la paleta clickada está en favoritos
  const isPresent = favorites.find(
    (favoriteId) => favoriteId.show.id === cardId
  );

  if (isPresent === undefined) {
    //En la que ha hecho click no está en el array de favoritos: añadimos a favoritos
    favorites.push(showInfo);
  } else {
    //Si está, filtramos
    favorites = favorites.filter((favoriteId) => favoriteId.show.id !== cardId);
  }

  //guardo favoritos en LS
  setLocalStorage();
  //repintamos la lista de favoritos para actualizar
  printFavoriteList();
  //repintamos la lista de resultados para actualizar
  printShows();
}

function printFavoriteList() {
  favoriteList.innerHTML = "";

  for (const fav of favorites) {
    if (fav.show.image === null) {
      favoriteList.innerHTML += `<li id="${fav.show.id}" class="list-fav"><div class="div-fav"><h1 class="title-fav">${fav.show.name}</h1><img class="img-fav" src=${defaultImage}/><i id="${fav.show.id}" class="fas fa-times-circle remove-fav"></i></div></li>`;
    } else {
      favoriteList.innerHTML += `<li data-id="${fav.show.id}" class="list-fav"><div class="div-fav"><h1 class="title-fav">${fav.show.name}</h1><img class="img-fav" src="${fav.show.image.medium}"/><i id="${fav.show.id}" class="fas fa-times-circle remove-fav"></i></div></li>`;
    }
  }
  addListenerToIcon();
}
