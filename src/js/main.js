"use strict";

const filmSection = document.querySelector(".js-movies-container");
const favoritesSection = document.querySelector(".js-favorites-container");
const inputSearch = document.querySelector(".js-input-search");
const searchButton = document.querySelector(".js-search-button");
const resetButton = document.querySelector(".js-reset-button");
const url = "https://api.jikan.moe/v4/anime?q=";
const fakeUrlfilmImage =
  "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";

function handleAddFavorite(ev) {
  console.log(ev.currentTarget.id);
}

function renderFilms(filmsList) {
  filmSection.innerHTML = "";
  for (const film of filmsList) {
    const filmContainer = document.createElement("div");
    filmContainer.classList.add("film-container");
    filmContainer.classList.add("js-film-container");
    filmContainer.id = film.mal_id;

    const imgFilm = document.createElement("img");
    imgFilm.classList.add("film-img");

    if (film.images.jpg.image_url === fakeUrlfilmImage) {
      imgFilm.setAttribute(
        "src",
        "https://via.placeholder.com/225x314/00ffff/666666/?text=Image%20not%20available"
      );
    } else {
      imgFilm.setAttribute("src", film.images.jpg.image_url);
    }
    imgFilm.setAttribute("alt", film.title);

    const h3 = document.createElement("h3");
    h3.classList.add("film-title");
    const h3Title = document.createTextNode(`${film.title}`);
    h3.appendChild(h3Title);

    const icon = document.createElement("i");
    icon.classList.add("fa-solid");
    icon.classList.add("fa-circle-xmark");
    icon.classList.add("cross-icon");
    icon.classList.add("hidden");

    filmContainer.appendChild(imgFilm);
    filmContainer.appendChild(h3);
    filmContainer.appendChild(icon);
    filmSection.appendChild(filmContainer);
  }
  const allFilmsContainer = document.querySelectorAll(".js-film-container");
  for (const filmContainer of allFilmsContainer) {
    filmContainer.addEventListener("click", handleAddFavorite);
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
