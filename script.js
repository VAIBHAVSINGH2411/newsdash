const API_KEY = "c5d274de8e714b00a9318dcee57b22ec"
const url = "https://newsapi.org/v2/everything?q="



async function fetchData(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    return data
}
fetchData("all").then(data => renderMain(data.articles))



let mobilemenu = document.querySelector(".mobile");
let menuBtn = document.querySelector(".menuBtn");
let menuBtnDisplay = true;

menuBtn.addEventListener("click", () => {
    mobilemenu.classList.toggle("hidden");
});

// Rest of your JavaScript code


function changeColor(element) {
    const listItems = document.querySelectorAll('nav ul li');
    listItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}




function renderMain(arr) {
    let mainHTML = '';
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].urlToImage) {
            mainHTML += ` <div class="card">
                        <a href="#" data-index="${i}" class="news-link">
                        <img src=${arr[i].urlToImage} lazy="loading" />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                           ${arr[i].description}
                        </div>
                        </a>
                     </div>
        `;
        }
    }

    document.querySelector("main").innerHTML = mainHTML;
    const newsLinks = document.querySelectorAll('.news-link');
    newsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const index = link.getAttribute('data-index');
            openNewsDetailPage(arr[index]);
        });
    });
}
function openNewsDetailPage(newsData) {
    const newWindow = window.open('newsDetail.html', '_blank');
    console.log(newsData);
    newWindow.onload = function () {
        const detailedCard = newWindow.document.createElement('div');
        detailedCard.className = 'detailed-card';

        const detailedCardImage = newWindow.document.createElement('img');
        detailedCardImage.src = newsData.urlToImage;
        console.log(detailedCardImage.src);
        detailedCardImage.alt = 'News Image';
        detailedCardImage.className = 'detailed-card-image';

        const detailedCardTitle = newWindow.document.createElement('h2');
        detailedCardTitle.className = 'detailed-card-title';
        detailedCardTitle.textContent = newsData.title;

        const detailedCardSource = newWindow.document.createElement('p');
        detailedCardSource.className = 'detailed-card-source';
        detailedCardSource.textContent = newsData.source.name;

        const detailedCardDate = newWindow.document.createElement('p');
        detailedCardDate.className = 'detailed-card-date';
        detailedCardDate.textContent = new Date(newsData.publishedAt).toLocaleDateString();

        const detailedCardDescription = newWindow.document.createElement('p');
        detailedCardDescription.className = 'detailed-card-description';
        detailedCardDescription.textContent = newsData.description;
        detailedCard.appendChild(detailedCardImage);
        detailedCard.appendChild(detailedCardTitle);
        detailedCard.appendChild(detailedCardSource);
        detailedCard.appendChild(detailedCardDate);
        detailedCard.appendChild(detailedCardDescription);
        newWindow.document.body.appendChild(detailedCard);
    };
}

function preventNavigation(event) {
    event.preventDefault();
}

const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile")
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)

})
searchBtnMobile.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)
})


async function Search(query) {
    const data = await fetchData(query)
    renderMain(data.articles)
}