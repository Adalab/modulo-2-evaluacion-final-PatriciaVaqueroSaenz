'use strict';

const inputShow = document.querySelector('.js-searchInput');
const searchButton = document.querySelector('.js-searchButton');
const reset = document.querySelector('.section__fav-reset');
const resultList = document.querySelector('.js-main-list');
const favoriteList = document.querySelector('.main__list-favorite');
const defaultImage = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';


let globalData=[];
let favorites = [];



// SI TIENE DATOS ALMACENADOS EN LS LOS RECUPERAMOS 
if(localStorage.getItem('favorites') !== null) {

  getLocalStorage();
}