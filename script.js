const dogMain = document.querySelector('main');
let hashBreed;
/*-----------------------------HASH - LOCAL.HOST/#BREED-SUBBREED --------------------------------------------*/
/*----------------- it works, if after typing you refresh the page -------*/

    let id = window.location.hash;
    console.log('hash', id);

    let basicURL = window.location;
    console.log(basicURL);

    let breeds = window.location.hash.split('-');
    //console.log(breeds);

    if (id = breeds[0]) {
        dogMain.innerHTML = '';
        breed = breeds[0];
        breed = breed.substring(1); //to delete the #
        id = `${breeds[0]}`;
        basicURL = basicURL + id;
    }
    if (breeds.length === 2) {

        breed = breeds[0];
        breed = breed.substring(1);
        subbreed = breeds[1];
        id = `${breeds[0]}-${breeds[1]}`; //console.log(window.location.hash);
        dogMain.innerHTML = '';
        basicURL = basicURL + id;
    }


/*-----------------------------INDEX PAGE --------------------------------------------*/

function breedSidebar() {
    let sideList = document.querySelector('ul');

    let all_url = 'https://dog.ceo/api/breeds/list/all';
    axios.get(all_url)
        .then(response => {
            const allDogs = response.data.message; //console.log(allDogs);
            let keys = Object.keys(allDogs); //console.log(keys);

            for (let i = 0; i < keys.length; i++) {
                let dogBreed = document.createElement('li');
                dogBreed.textContent = keys[i];
                sideList.appendChild(dogBreed);

                dogBreed.addEventListener('click', function () {
                    window.location.hash = dogBreed.textContent;
                    hashBreed = window.location.hash;
                    let dogBreedName = dogBreed.innerHTML;  //console.log(dogBreedName);
                    dogMain.innerHTML = '';
                    randomBreedFoto(dogBreedName);
                })
            }
        })
        
    if (!id) {
        randomDogs();
    } else if (id === breeds[0]) {
        randomBreedFoto(breed);
    } else {
        randomSubbreedPhotos(breed, subbreed);
    }
}

function randomDogs() {
    let dog_url = 'https://dog.ceo/api/breeds/image/random/3';
    axios.get(dog_url)
        .then(response => { //renderFotos() funkció lehetne, de response undefined
            let dogFotos = response.data.message; //console.log(dogFotos);

            let headlineIndex = document.createElement('h3');
            headlineIndex.textContent = 'Not Elliott Erwitt...';
            dogMain.appendChild(headlineIndex);

            for (let i = 0; i < dogFotos.length; i++) {
                let foto = document.createElement('img');
                foto.setAttribute('src', dogFotos[i]);
                dogMain.appendChild(foto);
            }

            let refreshButton = document.createElement('button');
            refreshButton.textContent = 'Still bored';

            refreshButton.addEventListener('click', function () {
                dogMain.innerHTML = "";
                randomDogs();
            })
            dogMain.appendChild(refreshButton);
        });
};

/*-----------------------------BREED PAGE --------------------------------------------*/

function randomBreedFoto(breed) {
    let breedUrl = 'https://dog.ceo/api/breed';

    axios.get(`${breedUrl}/${breed}/images/random/3`)
        .then(response => {
            let dogFotos = response.data.message; //console.log(dogFotos);

            let headlineBreed = document.createElement('h3');
            headlineBreed.textContent = breed;
            dogMain.style.backgroundColor = "#eee";
            dogMain.appendChild(headlineBreed);
            createSubbreedLinks(breed);

            for (let i = 0; i < dogFotos.length; i++) {
                let foto = document.createElement('img');
                foto.setAttribute('src', dogFotos[i]);
                dogMain.appendChild(foto);
            }

            //refresh random fotos on the index page
            let refreshButton = document.createElement('button');
            refreshButton.textContent = 'Oh really?';

            refreshButton.addEventListener('click', function () {
                dogMain.innerHTML = "";
                randomBreedFoto(breed);
            })
            dogMain.appendChild(refreshButton);
        })
};

/*-----------------------------SUBBREED PAGE --------------------------------------------*/

function createSubbreedLinks(breed) {
    let subUrl = 'https://dog.ceo/api/breed';

    axios.get(`${subUrl}/${breed}/list`)
        .then(response => {
            let subbreeds = response.data.message;

            let subList = document.createElement('ul');
            dogMain.appendChild(subList);
            if (breed) {
                for (let i = 0; i < subbreeds.length; i++) {
                    let subListitem = document.createElement('li');
                    subListitem.textContent = subbreeds[i];
                    subList.appendChild(subListitem);

                    subListitem.addEventListener('click', function () {
                        window.location.hash = hashBreed + "-" + subListitem.textContent;
                        let subBreed = subListitem.innerHTML;
                        dogMain.innerHTML = '';
                        randomSubbreedPhotos(breed, subBreed);
                    })
                }
                return subList;
            }
        })
};

function randomSubbreedPhotos(breed, subbreed) {
    let subRandomUrl = 'https://dog.ceo/api/breed';

    axios.get(`${subRandomUrl}/${breed}/${subbreed}/images/random/3`)
        .then(response => {
            let dogFotos = response.data.message;
            console.log(dogFotos);

            let subHeadLine = document.createElement('h3');
            subHeadLine.textContent = `${subbreed} ${breed}`;
            dogMain.appendChild(subHeadLine);
            dogMain.style.backgroundColor = "lightgrey";

            for (let i = 0; i < dogFotos.length; i++) {
                let foto = document.createElement('img');
                foto.setAttribute('src', dogFotos[i]);
                dogMain.appendChild(foto);
            }

            let refreshButton = document.createElement('button');
            refreshButton.textContent = 'Oh not again';

            refreshButton.addEventListener('click', function () {
                dogMain.innerHTML = "";
                randomSubbreedPhotos(breed, subbreed);
            })
            dogMain.appendChild(refreshButton);
        })
}

breedSidebar();