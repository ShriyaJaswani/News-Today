const API_KEY = "a027e3cf91094ce9914631952065512e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        //fetch is an aync function.
        //Hence we will not get quick response from fetch, but we do get a promise and 
        //we can await on that promise. 

        const data = await res.json();
        //json() conversion also returns a promise.
        console.log(data);
        bindData(data.articles);
    } catch (error) {
        console.log("Here's the error..", error);
    }
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const cardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = '';
    //emptying the previously added cards first before adding the new once.

    articles.forEach(article => {
        if(!article.urlToImage) return;

        const cardsClone = cardTemplate.content.cloneNode(true);
        fillDataInCard(cardsClone, article);
        cardsContainer.appendChild(cardsClone);
    
    });

}

function fillDataInCard(cardsClone, article){

    const newsImg = cardsClone.querySelector('#news-img');
    const newsTitle = cardsClone.querySelector('#news-title');
    const newsSource = cardsClone.querySelector('#news-source');
    const newDesc = cardsClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    // newsSource.innerHTML = article.source.name;
    newDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    cardsClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curActiveNavItem = null;

function onNavItemClicked(id){
    fetchNews(id);

    const navItem = document.getElementById(id);
    curActiveNavItem?.classList.remove('active');
    curActiveNavItem = navItem;
    curActiveNavItem.classList.add('active');


}

const searchText = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");

searchButton.addEventListener('click', ()=>{

    const query = searchText.value;
    if(!query) return;

    fetchNews(query);
    curActiveNavItem?.classList.remove('active');
    curActiveNavItem = null;
});

