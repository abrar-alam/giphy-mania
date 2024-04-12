let gifCtr = 0;
const gifContainer = document.querySelector('div#gif-container');
const searchBar = document.querySelector('.search-bar')
const searchBtn = document.querySelector('.red-button');
const mainPage = document.querySelector('div.main-page');
const apiForm = document.querySelector('form.api-form');
const apiPage = document.querySelector('div.api-credentialpage');
let apiKey = '';

// When the DOM loads the main page will be invisible
// mainPage.style.display='none';

apiForm.addEventListener('submit', function(e){
    e.preventDefault();
    apiKey = apiForm.querySelector('input#api-key').value;
    mainPage.style.display='block';
    apiForm.querySelector('input#api-key').value = '';
    apiPage.style.display = 'none';
})

// A function that returns the ORIGINAL image source URL
async function getGifs(searchTopic, APIKey){
    let url = `https://api.giphy.com/v1/gifs/search?q=${searchTopic}&limit=1&api_key=${APIKey}`;
    const res = await axios.get(url);
    console.log(searchTopic);
    console.log(url);
    console.log(res.data.data[0].images);
    console.log(res.data.data[0].images.original.url);
    return res.data.data[0].images.original.url;
}


async function appendGif(searchTopic){
    const img = document.createElement('img');
    img.setAttribute('src', await getGifs(searchTopic, apiKey));
    if (gifCtr%2 === 0){
        const gifDiv = document.createElement('div');
        gifDiv.append(img);
        gifContainer.append(gifDiv);
    }
    else {
        const gifDiv = gifContainer.lastElementChild;
        gifDiv.append(img);
    }
    gifCtr ++;
}

searchBtn.addEventListener('click', function(e){
    console.log(searchBar.value);
    if (searchBar.value === ''){
        alert("A search topic is required");
    }
    else {
        appendGif(searchBar.value);
    }
})







