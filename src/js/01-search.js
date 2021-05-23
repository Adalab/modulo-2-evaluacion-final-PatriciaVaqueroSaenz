'use strict';

console.log('>> Ready :)');

const searchButton = document.querySelector('.js-searchButton');
const resultList = document.querySelector('.js-main-list');
let showsName;

function conectToApi(){
    const inputValue = document.querySelector('.js-searchInput').value;

    fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
        const result = data;
        for (let i=0; i< result.length;i++){
            //DEVUELVE EL NOMBRE DE LAS SERIES COINDCIDENTES CON LO ESCRITO EN EL INPUT
            showsName = result[i].show.name;
            resultList.innerHTML += `<li class=js-list-item><div class=js-list-div><h2 class=js-showName>${showsName}</h2></div></li>`;
        }
    });

}

function printShows(){

}



function handleClik(){
    conectToApi();
    printShows();
}

searchButton.addEventListener('click',handleClik);