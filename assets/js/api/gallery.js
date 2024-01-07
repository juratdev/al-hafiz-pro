// const axios = require('axios');
import {convertToEmbed} from "../helpers.js";
import axios from './axios.js'

const gallery = document.getElementById('gallery-section');

function getData() {
    axios.get('gallery/')
        .then(function (response) {
            response.data.forEach((el) => renderGalleryItem(el))
            mountGallerySlider()
        })
}

function mountGallerySlider() {
    if (jQuery(".bd-team-active").length > 0) {
        let portfolio = new Swiper('.bd-team-active', {
            slidesPerView: 1,
            spaceBetween: 30,
            // direction: 'vertical',
            loop: true,
            grabCursor: true,
            autoplay: {
                delay: 5000,
            },

            // If we need pagination
            pagination: {
                el: '.team-pagination',
                clickable: true,
            },

            // Navigation arrows
            navigation: {
                nextEl: '.brand-button-next',
                prevEl: '.brand-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            breakpoints: {
                550: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 2,
                },
                1200: {
                    slidesPerView: 3,
                },
            }
        });
    }
}

function renderGalleryItem(item){
    gallery.innerHTML += `
     <div class="swiper-slide">
        <div class="bd-portfolio bd-team-four mb-30">
            ${item.youtube_link ? `<iframe id="youtubeiframe_1_578762316" width="100%" height="500" src="https://www.youtube.com/embed/${convertToEmbed(item.youtube_link)}" frameborder="0" allowfullscreen=""></iframe>` : `<img src="${item.image}" alt="porfolio not found">`}
        </div>
     </div>`
}

getData()