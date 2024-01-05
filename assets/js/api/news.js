// const axios = require('axios');
import {convertToEmbed} from "../helpers.js";
import axios from './axios.js'

const newsRows = document.getElementById('news-row');

function getHomeNews() {
    axios.get('news/', {
        params: {
            limit: 3
        }
    })
    .then((response) => {
        response.data.results.forEach((el) => renderNewsCard(el))
    })
}

function renderNewsCard(item){
    console.log(item)
    newsRows.innerHTML += `
        <div class="col-lg-4 col-md-6">
            <div class="bd-blog mb-30">
                <div class="bd-blog-img">
                    <a href="blog-details.html">
                <img src="${item.image}" alt="blog image not found">
                            </a>
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
                            <a href="blog-details.html">Batafsil<i class="far fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     `
}

getHomeNews()