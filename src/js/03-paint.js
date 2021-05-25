
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

