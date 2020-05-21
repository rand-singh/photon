import { config } from "./config.js";

const authKey = config.AUTH,
  gallery = document.querySelector(".gallery"),
  searchInput = document.querySelector(".search-input"),
  submitButton = document.querySelector(".submit-button");
let searchValue;

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
  console.log(data);
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
