import { config } from "./config.js";

const authKey = config.AUTH,
  gallery = document.querySelector(".gallery"),
  searchInput = document.querySelector(".search-input"),
  form = document.querySelector(".search-form"),
  more = document.querySelector(".more");
let searchValue,
  page = 1,
  fetchLink,
  currentSearch;

searchInput.addEventListener("input", updateInput);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);

function updateInput(e) {
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authKey,
    },
  });
  const data = await dataFetch.json();
  console.log(data);
  return data;
}

function generatePictures(data) {
  if (data.total_results === 0) {
    console.log("No results");
  } else {
    clear();
    data.photos.forEach((photo) => {
      const galleryImg = document.createElement("div");
      galleryImg.classList.add("gallery-img");
      galleryImg.innerHTML = `
                <div class="gallery-info">
                    <p>${photo.photographer}</p>
                    <a href=${photo.src.original}>Download</a>
                </div>
                <img src=${photo.src.large}/>
        `;

      gallery.appendChild(galleryImg);
    });
  }
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

function clear() {
  console.log("clear");
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

curatedPhotos();
