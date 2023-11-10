import { CatsAPI } from "./cat-api.js";
import { CatOneAPI } from "./cat-api.js";
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

const catsAPI = new CatsAPI();
const select = document.querySelector("#select-breed");
const loading = document.querySelector(".loader");
const errors = document.querySelector(".error")

loading.style.visibility = "hidden";
errors.style.visibility = "hidden";

// console.log(catsAPI.getBreed());

catsAPI.getBreed().then(breeds => {
  breeds.forEach(breed => {
    const markup = listCreat(breed);
    select.insertAdjacentHTML('beforeend', markup);
  });
  new SlimSelect({
    select: '#select-breed'
  });
});

function listCreat(list) {
  const { id, name } = list;
  return `<option value="${id}">${name}</option>`;
};

const catOneAPI = new CatOneAPI();

select.addEventListener("change", addCat);

const catDiv = document.querySelector(".cat-info")

async function addCat(e) {
  loading.style.visibility = "visible";
  const chosenIndex = e.currentTarget.selectedIndex;
  const breedId = e.currentTarget.options[chosenIndex].value;
  // console.log(breedId);
  catDiv.innerHTML = '';
  try {
    catOneAPI.fetchCatByBreed(breedId)
        .then(response => {
          const markup = createMarkup(response[0]);
          catDiv.innerHTML= markup;
        })
        .catch(error => {
          errors.style.visibility = "visible";
          Notiflix.Notify.success(
            `${error}'Info about this breed not find"`,
            {
              timeout: 4000,
            },
          );
        })
    const breeds = await catsAPI.getBreed();
    const catObj = breeds.find(option => option.id === breedId);
    if (catObj) {
      const name = catObj.name;
      const description = catObj.description;
      const temperament = catObj.temperament;
      const markup = createMarkupInfo(name, description, temperament);
      catDiv.insertAdjacentHTML("beforeend", markup);
      loading.style.visibility = "hidden";
    }
  } catch (error) {
    errors.style.visibility = "visible";
    console.error('Info about this breed not find', error);
  }
}

function createMarkup(breed) {
  const {url, width, height} = breed;
  return `<a href="${url}" class="imglink"><img src="${url}"alt="Cat Image" class="im" width="${width}" height="${height}" ></a>`;
};

function createMarkupInfo(name, description, temperament) {
  return `<div class="info">
            <h2 class="catbreed">${name}</h2>
            <p class="temperament">Temperament: ${ temperament}</p>
            <p class="desc">${description}</p>
          </div>`;
};





