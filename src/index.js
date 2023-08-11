const dogImagesList = document.querySelector("#dog-image-container");
const dogBreedList = document.querySelector("#dog-breeds");

const createDog = (dog) => {
  const ul = document.createElement("ul");
  ul.className = "dog-image";
  dogImagesList.append(ul);
  const dogImage = document.createElement("img");
  dogImage.src = dog;
  ul.append(dogImage);
};

const listBreed = (breed) => {
  const ul = document.createElement("li");
  ul.className = "dog-breed-names";
  dogBreedList.append(ul);
  const dogBreed = document.createElement("li");
  dogBreed.textContent = breed;
  ul.append(dogBreed);
  dogBreed.addEventListener("click", (e) => {
    dogBreed.style.color = "pink";
  });
};

const makeDogList = (dogs) => {
  dogs.forEach((dog) => {
    createDog(dog);
  });
};

const makeBreedList = (breeds) => {
  const breedsArray = breeds;
  breedsArray.forEach((breed) => {
    listBreed(breed);
  });
};

fetch("https://dog.ceo/api/breeds/image/random/4")
  .then((r) => r.json())
  .then((data) => {
    makeDogList(data.message);
    console.log(data);
  });

let breedListArray = [];

fetch("https://dog.ceo/api/breeds/list/all")
  .then((r) => r.json())
  .then((breeds) => {
    breedListArray = Object.keys(breeds.message);
    makeBreedList(Object.keys(breeds.message));
    console.log(breeds);
  });

const selectLetter = document.querySelector("#breed-dropdown");
selectLetter.addEventListener("change", (e) => {
  const filteredArray = breedListArray.filter((breed) =>
    breed.startsWith(e.target.value)
  );
  removeAllChildNodes(dogBreedList);
  makeBreedList(filteredArray);
  console.log(filteredArray);
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
