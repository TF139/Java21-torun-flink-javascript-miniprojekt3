//väljer button från html och lägger in den i en variabel
const btn = document.querySelector("button");

//skapar en eventlistener med funktion click
btn.addEventListener("click", function (event) {
    //tar bort bilder
    clearImages();
    //väljer input från html och lagrar i en variael
    const input = document.querySelector("input");
    const KEY = '92dba6f72da7a64852c838f608c1a577';
    //sparar värdet i inputen
    let searchText = input.value;

    //bygger ihop url med nyckeln och input
    const url = `https://www.flickr.com/services/rest/?api_key=${KEY}&method=flickr.photos.search&text=${searchText}&format=json&nojsoncallback=1&per_page=1&page=1&sort=relevance`;

    fetch(url).then(
        function (response) {
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            }
            else {
                throw alert("ERROR, something went wrong\n Try again!");
            }
        }
    ).then(
        function (data) {
            //Hämtar första bilden
            getImageUrl(data.photos.photo[0]);
        }
    ).catch(
        function (error) {
            //skapar en alert om användaren skriver in fel
            alert("Could not find a picture with that word, try again!");
        }
    );
})

//här ska vi pussla ihop bild-urlen
function getImageUrl(photoObject) {
    let photo = photoObject;
    let size = 'b';

    let imgUrl = `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_${size}.jpg`;

    displayImg(imgUrl);
}

//för att visa bilden
function displayImg(url) {
    let img = document.createElement('img');
    img.src = url;
    document.body.appendChild(img);
}

//väljer alla bilder och lagrar i variabel sen loopar jag igenom och tar bort dem
function clearImages(){
    const images = document.querySelectorAll('img');
    
    for(const img of images){
        img.remove();
    }
}