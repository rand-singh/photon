import { config } from "./config.js";

const authKey = config.AUTH,
  gallery = document.querySelector(".gallery"),
  searchInput = document.querySelector(".search-input"),
  form = document.querySelector(".search-form");
let searchValue;

searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

function updateInput(e) {
  searchValue = e.target.value;
}

async function curatedPhotos() {
  const dataFetch = await fetch(
    "https://api.pexels.com/v1/curated?per_page=15",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authKey,
      },
    }
  );

  const data = await dataFetch.json();

  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <img src="${photo.src.large}"/> 
        <p>${photo.photographer}</p>
    `;

    gallery.appendChild(galleryImg);
  });
}

async function searchPhotos(query) {
  const dataFetch = await fetch(
    `https://api.pexels.com/v1/search?query=${query}&per_page=10`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: authKey,
      },
    }
  );
  const data = await dataFetch.json();

  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <img src="${photo.src.large}"/> 
        <p>${photo.photographer}</p>
    `;

    gallery.appendChild(galleryImg);
  });
}

curatedPhotos();
