const dogMain = document.querySelector('main');

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/*-----------------------------INDEX PAGE --------------------------------------------*/
//to create breed-list aside
function breedSidebar() {
    let sideList = document.querySelector('ul');

    let all_url = 'https://dog.ceo/api/breeds/list/all';
    axios.get(all_url)
        .then(response => {
            const allDogs = response.data.message; //console.log(allDogs);
            let keys = Object.keys(allDogs); //console.log(keys);

            for (let i = 0; i < keys.length; i++) {
                let dogBreed = document.createElement('li');
                dogBreed.innerHTML = keys[i];
                sideList.appendChild(dogBreed);
                //calling randomBreedFoto here?
                dogBreed.addEventListener('click', function () {
                    let dogBreedName = dogBreed.innerHTML;  //console.log(dogBreedName);
                    dogMain.innerHTML = '';
                    randomBreedFoto(dogBreedName);
                })
            }
        })
    randomDogs();
}

//random photos on the index page
function randomDogs() {
    let dog_url = 'https://dog.ceo/api/breeds/image/random/3';
    axios.get(dog_url)
        .then(response => { //renderFotos() funkció lehetne, de response undefined
            let dogFotos = response.data.message;
            console.log(dogFotos);

            let dogIndex = document.createElement('div');
            dogIndex.className = 'index-container';
            dogMain.appendChild(dogIndex);
            for (let i = 0; i < dogFotos.length; i++) {
                let foto = document.createElement('img');
                foto.setAttribute('src', dogFotos[i]);
                dogIndex.appendChild(foto);
            }

            //refresh random fotos on the index page
            let refreshButton = document.createElement('button');
            refreshButton.textContent = 'Still bored';

            refreshButton.addEventListener('click', function () {
                dogIndex.innerHTML = "";
                dogMain.innerHTML = "";
                randomDogs();
            })
            dogMain.appendChild(refreshButton);
        });
};

/*-----------------------------BREED PAGE --------------------------------------------*/

//to get random 3 breed fotos
function randomBreedFoto(breed) {
    let breedUrl = 'https://dog.ceo/api/breed';
    
    axios.get(`${breedUrl}/${breed}/images/random/3`)
        .then(response => {
            let dogFotos = response.data.message;
            //console.log(dogFotos);
            
            let headlineBreed = document.createElement('h3');
            headlineBreed.textContent = breed;
            let dogIndex = document.createElement('div');
            dogIndex.className = 'index-container';
            dogMain.style.backgroundColor = "#eee";
            dogMain.appendChild(dogIndex);
            dogIndex.appendChild(headlineBreed);
            //calling here createSubbreedLinks function
            createSubbreedLinks(breed);

            for (let i = 0; i < dogFotos.length; i++) {
                let foto = document.createElement('img');
                foto.setAttribute('src', dogFotos[i]);
                dogIndex.appendChild(foto);
            }

            //refresh random fotos on the index page
            let refreshButton = document.createElement('button');
            refreshButton.textContent = 'Oh really?';

            refreshButton.addEventListener('click', function () {
                dogIndex.innerHTML = "";
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
            //console.log(subbreeds);

            let subList = document.createElement('ul');
            dogMain.appendChild(subList);
            if (breed) {
                for (let i = 0; i < subbreeds.length; i++) {
                    let subListitem = document.createElement('li');
                    subListitem.textContent = subbreeds[i];
                    subList.appendChild(subListitem);

                    subListitem.addEventListener('click', function(){
                        let subBreed = subListitem.innerHTML;
                        dogMain.innerHTML = '';
                        randomSubbreedPhotos(breed, subBreed);
                    })
                }
                return subList;
            }
        })
};

function randomSubbreedPhotos(breed, subbreed){
    let subRandomUrl = 'https://dog.ceo/api/breed';

    axios.get(`${subRandomUrl}/${breed}/${subbreed}/images/random/3`)
        .then(response => {
            let dogFotos = response.data.message;
            console.log(dogFotos);

            let subHeadLine = document.createElement('h3');
            subHeadLine.textContent = `${subbreed} ${breed}`;
            dogMain.appendChild(subHeadLine);

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