const dogMain = document.querySelector('main');

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
            }
        })
    randomDogs();
}

breedSidebar();

//random photos on the index page
function randomDogs() {
    let dog_url = 'https://dog.ceo/api/breeds/image/random/3';
    axios.get(dog_url)
        .then(response => {
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
            refreshButton.textContent = 'Refresh Photos';

            refreshButton.addEventListener('click', function () {
                dogIndex.innerHTML = "";
                dogMain.innerHTML = "";
                randomDogs();
            })
            dogMain.appendChild(refreshButton);
        });
};

/*-----------------------------BREED PAGE --------------------------------------------*/


