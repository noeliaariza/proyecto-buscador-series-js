"use strict";

const filmSection = document.querySelector(".js-movies-container");
const favoritesSection = document.querySelector(".js-favorites-container");
const inputSearch = document.querySelector(".js-input-search");
const searchButton = document.querySelector(".js-search-button");
const resetButton = document.querySelector(".js-reset-button");
const deleteFavs = document.querySelector(".js-delete-favs-list");

const url = "https://api.jikan.moe/v4/anime?q=";
const fakeUrlfilmImage =
  "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png";

let filmList = [];
let favoritesFilms = [];

function handleAddFavorite(ev) {
  console.log(ev.currentTarget.id);
  console.log(filmList);
  const filmSelected = filmList.find((film) => {
    return Number(ev.currentTarget.id) === film.mal_id;
  });

  //search if selected item exists in favs =>
  const indexFavoritesFilms = favoritesFilms.findIndex((favoriteItem) => {
    return favoriteItem.mal_id === Number(ev.currentTarget.id);
  });

  if (indexFavoritesFilms === -1) {
    favoritesFilms.push(filmSelected);
  }
  renderFilms(favoritesFilms, favoritesSection);
  localStorage.setItem("Favorites-films", JSON.stringify(favoritesFilms));
  ev.currentTarget.classList.add("film-selected");

  //console.log("indexfavorites films esss...", indexFavoritesFilms);

  //console.log("film array favoritas ", favoritesFilms);

  //console.log("film selected ", filmSelected.mal_id);
}

const favoriteFilmsLocalStorage = JSON.parse(
  localStorage.getItem("Favorites-films")
);
//console.log("favoritoslocal ", favoriteFilmsLocalStorage);

function renderFilms(filmsList, containerDOM) {
  containerDOM.innerHTML = "";
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
    containerDOM.appendChild(filmContainer);
  }
  const allFilmsContainer = document.querySelectorAll(".js-film-container");
  for (const filmContainer of allFilmsContainer) {
    filmContainer.addEventListener("click", handleAddFavorite);
  }
}

if (favoriteFilmsLocalStorage !== null) {
  //favoritesFilms = localStorage;
  renderFilms(favoriteFilmsLocalStorage, favoritesSection);
}

function handleSearch() {
  const inputValue = inputSearch.value;
  const urlFinal = url + inputValue;
  //console.log("url es ", urlFinal);
  fetch(urlFinal)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      filmList = data.data; // <- esto es un array
      //console.log(filmList);
      renderFilms(filmList, filmSection);
    });
}

function handleReset() {
  filmSection.innerHTML = "";
  favoritesSection.innerHTML = "";
  favoritesFilms = [];
  localStorage.clear();
}

function handleResetFavs() {
  favoritesSection.innerHTML = "";
  favoritesFilms = [];
  localStorage.clear();
}

searchButton.addEventListener("click", handleSearch);
resetButton.addEventListener("click", handleReset);
deleteFavs.addEventListener("click", handleResetFavs);
