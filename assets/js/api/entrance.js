// const axios = require('axios');
import {convertToEmbed} from "../helpers.js";
import axios from './axios.js'

const gallery = document.getElementById('entrance-slider');

function getData() {
    const preloader = document.getElementById('preloader')
    axios.get('slides/')
        .then(function (response) {
            response.data.forEach((el) => renderEntranceItem(el))
            mountEntranceSlider()
        }).finally(() => {
        preloader.style.display = 'none'
    })
}

function mountEntranceSlider() {
    /*------------------------------------
          Slider
      --------------------------------------*/
    if (jQuery(".bd-slider-active").length > 0) {
        let sliderActive1 = ".bd-slider-active";
        let sliderInit1 = new Swiper(sliderActive1, {
            // Optional parameters
            slidesPerView: 1,
            slidesPerColumn: 1,
            paginationClickable: true,
            loop: true,
            effect: "fade",
            allowTouchMove: false,
            autoplay: {
                delay: 5000,
            },
            a11y: false,
        });

        function animated_swiper(selector, init) {
            let animated = function animated() {
                $(selector + " [data-animation]").each(function () {
                    let anim = $(this).data("animation");
                    let delay = $(this).data("delay");
                    let duration = $(this).data("duration");

                    $(this)
                        .removeClass("anim" + anim)
                        .addClass(anim + " animated")
                        .css({
                            webkitAnimationDelay: delay,
                            animationDelay: delay,
                            webkitAnimationDuration: duration,
                            animationDuration: duration,
                        })
                        .one(
                            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                            function () {
                                $(this).removeClass(anim + " animated");
                            }
                        );
                });
            };
            animated();
            // Make animated when slide change
            init.on("slideChange", function () {
                $(sliderActive1 + " [data-animation]").removeClass("animated");
            });
            init.on("slideChange", animated);
        }
        animated_swiper(sliderActive1, sliderInit1);
    }

}

function renderEntranceItem(item){
    gallery.innerHTML += `
                    <div class="bd-single-slider bd-single-slider-overlay bd-slider-height d-flex align-items-center swiper-slide"
                        data-swiper-autoplay="5000">
                        <div class="bd-slide-bg" style="background-image: url('${item.image}')"></div>
                        <div class="container">
                            <div class="row">
                                <div class="col-12">
                                    <div class="bd-slider z-index text-center pt-95">
                                        <h1 class="bd-slider-title mb-40" data-animation="fadeInUp" data-delay=".3s">${item.title}</h1>
                                        <div class="bd-slider-btn" data-animation="fadeInUp" data-delay=".9s">
                                            <a href="tariffs.html" class="theme-btn">Safar tariflari</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
}

getData()