"use strict";

const filmSection = document.querySelector(".js-movies-container");
const inputSearch = document.querySelector(".js-input-search");
const searchButton = document.querySelector(".js-search-button");
const resetButton = document.querySelector(".js-reset-button");
const url = "https://api.jikan.moe/v4/anime?q=";

function renderFilms(filmsList) {
  for (const film of filmsList) {
    const filmContainer = document.createElement("div");
    filmContainer.classList.add("favorite-film-container");

    const imgFilm = document.createElement("img");
    imgFilm.classList.add("film-img");
    imgFilm.setAttribute("src", film.images.jpg.image_url);
    imgFilm.setAttribute("alt", film.title);

    const h3 = document.createElement("h3");
    h3.classList.add("film-title");
    const h3Title = document.createTextNode(`${film.title}`);
    h3.appendChild(h3Title);

    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-circle-xmark");
    icon.classList.add("cross-icon");

    filmContainer.appendChild(imgFilm);
    filmContainer.appendChild(h3);
    filmContainer.appendChild(icon);
    filmSection.appendChild(filmContainer);
  }
}

function handleSearch() {
  const inputValue = inputSearch.value;
  const urlFinal = url + inputValue;
  //console.log("url es ", urlFinal);
  fetch(urlFinal)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const filmList = data.data; // <- esto es un array
      //console.log(filmList);
      renderFilms(filmList);
    });
}

searchButton.addEventListener("click", handleSearch);
