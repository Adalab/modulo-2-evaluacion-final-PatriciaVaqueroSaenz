
function conectToApi(){

  let inputValue = inputShow.value.toLowerCase();


  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      globalData = data;
      printShows(globalData);
    });
}

function handleClik(){
  conectToApi();
}

searchButton.addEventListener('click',handleClik);


