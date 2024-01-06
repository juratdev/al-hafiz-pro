// const axios = require('axios');
import axios from './axios.js'

const newsRows = document.getElementById('news-row');

export function getHomeNews() {
    axios.get('news/', {
        params: {
            limit: 3
        }
    })
    .then((response) => {
        response.data.results.forEach((el) => renderNewsCard(el, newsRows))
    })
}

const newsListRows = document.getElementById('news-list-row');


const listParams = {
    limit: 9,
    offset: 0
}
export function getListNews() {
    axios.get('news/', {
        params: listParams
    })
    .then((response) => {
        response.data.results.forEach((el) => renderNewsCard(el, newsListRows))
        document.getElementById('news-load-more').style.display = !response.data.next ? 'none' : 'inline-flex';
    })
}

export function loadMoreNews() {
    listParams.offset += listParams.limit;
    getListNews();
}

function renderNewsCard(item, playground){
    playground.innerHTML += `
        <div class="col-lg-4 col-md-6">
            <div class="bd-blog mb-30">
                <div class="bd-blog-img" style="aspect-ratio: 470/273">
                    <img style="width: 100%; height: 100%; object-fit: cover" src="${item.image}" alt="blog image not found">
                </div>
                <div class="bd-blog-text">
                    <div class="bd-blog-meta mb-15">
                        <ul>
                            <li><a href="blog-details.html"><i class="flaticon-calendar"></i>21 Feb 2022</a>
                            </li>
                        </ul>
                    </div>
                    <h4 class="bd-blog-title mb-40">${item.title}</h4>
                    <div class="bd-blog-author d-flex justify-content-end">
                        <div class="bd-blog-author-link">
                            <a href="blog-details.html?id=${item.id}">Batafsil<i class="far fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
     `
}
