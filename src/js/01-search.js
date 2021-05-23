'use strict';

console.log('>> Ready :)');

const searchButton = document.querySelector('.js-searchButton');
const resultList = document.querySelector('.js-main-list');
let showsName;
let showsImage;
let showsImageMedium;
let globalData;
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

function conectToApi(){
    const inputValue = document.querySelector('.js-searchInput').value;

    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
        globalData = data;  
        printShows(globalData);
    });
    
}

function printShows(globalData){

    //LIMPIO LA LISTA CON LOS RESULTADOS DE BÚSQUEDA
    resultList.innerHTML ='';

    for (let i=0; i< globalData.length;i++){
        //DEVUELVE EL NOMBRE DE LAS SERIES COINCIDENTES CON LO ESCRITO EN EL INPUT
        showsName = globalData[i].show.name;
        //DEVUELVE LA IMAGEN DE LAS SERIES COINCIDENTES CON LO ESCRITO EN EL INPUT
        showsImage = globalData[i].show.image;

        //PARA EL CASO EN QUE LA SERIE NO TENGA IMAGEN
        if (showsImage === null){

            resultList.innerHTML += `<li class=js-list-item><div class=js-list-div><h2 class=js-showName>${showsName}</h2><img class= js-image src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV'/></div></li>`;

        //PARA LAS SERIES CON IMAGEN LA AÑADE AL LI    
        }else{
            showsImageMedium = globalData[i].show.image.medium;
            resultList.innerHTML += `<li class=js-list-item><div class=js-list-div><h2 class=js-showName>${showsName}</h2><img class= js-image src='${showsImageMedium}'/></div></li>`;
        }
    
    }
}



function handleClik(){
    conectToApi();
}

searchButton.addEventListener('click',handleClik);