// const axios = require('axios');
import axios from "./axios.js";
import {
  formatMoneyDecimal,
  getSingleIdFromUrl,
  formatDate,
} from "../helpers.js";

const planRows = document.getElementById("plan-row");

export function getHomePlans() {
  axios
    .get("tarif/", {
      params: {
        limit: 3,
      },
    })
    .then((response) => {
      response.data.results.forEach((el, index) => renderTariffsCard(el, index, planRows));
    });
}

const plansListRows = document.getElementById('plans-list-row');


const listParams = {
    limit: 3,
    offset: 0
}
export function getTariffs() {
    axios.get('tarif/', {
        params: listParams
    })
    .then((response) => {
        response.data.results.forEach((el, index) => renderTariffsCard(el, index, plansListRows, `background-color: ${index % 2 === 0 ? '#f2f2f2' : '#06635D' };`))
        document.getElementById('tariffs-load-more').style.display = !response.data.next ? 'none' : 'inline-flex';
    })
}

export function loadMoreTariffs() {
  listParams.offset += listParams.limit;
  getTariffs();
}

function renderTariffsCard(item, index, playground, cardStyle = "") {
  playground.innerHTML += `
        <div class="col-lg-4 col-md-6">
            <div class="bd-pricing ${index%2 === 1 ? 'bd-pricing-active' : ''} h-100 d-flex flex-column justify-content-between" style="${cardStyle}">
                <div>
                <div class="bd-pricing-title-wrapper text-center mb-20">
                    <h6 class="bd-pricing-subtitle mb-15">${item.title}</h6>
                    <h6 class="bd-pricing-price">$${formatMoneyDecimal(item.price)}</h6>
                </div>
                <ul class="mb-40">
                    ${
                        item.services.map((el) => `<li style="line-height: 21px;"><i class="fal fa-check"></i>${el.name}</li>`).join("")
                    }
                </ul>
                </div>
                <div class="bd-pricing-btn">
                    <a href="tarif-details.html?id=${
                      item.id
                    }" class="theme-btn">Batafsil</a>
                </div>
            </div>
        </div>
     `;
}

export function getPlansDetails() {
  axios.get(`tarif/${getSingleIdFromUrl()}/`).then((response) => {
    renderTariffSingle(response.data);
  });
}

function renderTariffSingle(data) {
  // Render Tariff Title
  document
    .querySelectorAll(".tariff-title")
    .forEach((el) => (el.innerText = data.title));

  // Render Tariff Subtitle
  document.getElementById(
    "tariff-subtitle"
  ).innerText = `Madina: ${data.Madinah_hotel.name} - ${data.days_in_Madinah} Kecha, Makka: ${data.Makkah_hotel.name} - ${data.days_in_Makkah} Kecha`;

  // Render Tariff Start Date
  document.getElementById("tariff-start-time").innerText = formatDate(
    data.start_time
  );

  // Render Tariff  Date
  document.getElementById("tariff-end-time").innerText = formatDate(
    data.end_time
  );

  // Render Tariff Price List
  const priceList = document.getElementById("tariff-price-list");

  data.prices.forEach((el) => {
    const peopleIcons = new Array(el.people_count)
      .fill('<i class="fas fa-user" style="margin-left: 4px;"></i>')
      .join("");

    priceList.innerHTML += `
      <div class="price-info-title">
          <p class="text-white">${el.people_count} kishilik</p>
          ${peopleIcons}
          <h5 class="text-white">${el.price}$</h5>
      </div>
    `;
  });


  // Render Tariff Services
  const servicesList = document.getElementById("tariff-services");
  data.services.forEach((el) => {
    servicesList.innerHTML += `
    <div class="col-lg-2 col-md-4">
        <div class="bd-service mb-30"  style="border-radius: 10px; padding: 25px 30px">
            <div class="bd-service-icon mb-20">
                <img src="${el.icon}" alt="${el.name}">
            </div>
            <h4 class="bd-service-title bd-service-title-2">${el.name}</h4>
        </div>
    </div>`;
  });

  //  Render Makkah hotel star
  document.getElementById("makkah-hotel-star").innerText =
    data.Makkah_hotel.star;

  //  Render Madinah hotel star
  document.getElementById("madinah-hotel-star").innerText =
    data.Madinah_hotel.star;

  //  Render Makkah hotel name
  document.getElementById("makkah-hotel-name").innerText =
    data.Makkah_hotel.name; 

  //  Render Madinah hotel name
  document.getElementById("madinah-hotel-name").innerText =
    data.Madinah_hotel.name;

  //  Render Makkah hotel distance
  document.getElementById("makkah-hotel-distance").innerText =
    data.Makkah_hotel.distance;

  //  Render Madinah hotel distance
  document.getElementById("madinah-hotel-distance").innerText =
    data.Madinah_hotel.distance;

  // Render Transport title
  document.getElementById("tariff-transport-title").innerText =
    data.transport.title;

  // Render Tranport subtitle
  document.getElementById("tariff-transport-subtitle").innerText =
    data.transport.subtitle;

  // Render Tranport body
  document.getElementById("tariff-transport-body").innerText =
    data.transport.body;


}

export function getSelectPlans() {
  const applicationTariffs = document.getElementById("application-tariffs");
  axios
    .get("tarif/", {
      params: {
        limit: 100,
      },
    })
    .then((response) => {
      response.data.results.forEach((el) => {
        applicationTariffs.innerHTML += `
        <option value="${el.id}">${el.title}</option>`;
      });
    });
}


// Render images
// const imageUrl = "https://al-hafiz.uz/api/Makkah_hotel/image1";
// document.getElementById("tariff-images").src = imageUrl;

