// const axios = require('axios');
import axios from './axios.js'
import {formatMoneyDecimal, getSingleIdFromUrl} from "../helpers.js";

const planRows = document.getElementById('plan-row');

export function getHomePlans() {
    axios.get('tarif/', {
        params: {
            limit: 3
        }
    })
    .then((response) => {
        response.data.results.forEach((el) => renderNewsCard(el, planRows))
    })
}

// const newsListRows = document.getElementById('news-list-row');
//
//
// const listParams = {
//     limit: 9,
//     offset: 0
// }
// export function getListNews() {
//     axios.get('news/', {
//         params: listParams
//     })
//     .then((response) => {
//         response.data.results.forEach((el) => renderNewsCard(el, newsListRows))
//         document.getElementById('news-load-more').style.display = !response.data.next ? 'none' : 'inline-flex';
//     })
// }
//
// export function loadMoreNews() {
//     listParams.offset += listParams.limit;
//     getListNews();
// }
//
function renderNewsCard(item, playground){
    playground.innerHTML += `
        <div class="col-lg-4 col-md-6">
            <div class="bd-pricing mb-30">
                <div class="bd-pricing-title-wrapper text-center mb-65">
                    <h6 class="bd-pricing-subtitle mb-15">${item.title}</h6>
                    <h6 class="bd-pricing-price">${formatMoneyDecimal(item.price)}<span>.00/so’m</span></h6>
                </div>
                <ul class="mb-80">
                ${
                    item.services.map((el) => `<li style="line-height: 21px;"><i class="fal fa-check"></i>${el.name}</li>`).join('')
                }
                </ul>
                <div class="bd-pricing-btn">
                    <a href="package.html?id=${item.id}" class="theme-btn">Batafsil</a>
                </div>
            </div>
        </div>
     `
}
//
// export function getNewsDetails() {
//     axios.get(`news/${getSingleIdFromUrl()}/`)
//     .then((response) => {
//         const item = response.data;
//         document.querySelectorAll('.news-details-title')?.forEach((el) => el.innerHTML = item.title);
//         document.getElementById('news-details-content').innerHTML = item.body;
//         document.getElementById('news-details-image').src = item.image;
//     })
// }