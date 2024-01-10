import axios from "./axios.js";
import {
  formatMoneyDecimal,
  getSingleIdFromUrl,
  formatDate,
} from "../helpers.js";

const planRows = document.getElementById("plan-row");

export function getHomePlans(lang = 'uz') {
  renderLoadingTariffs(planRows, 3);
  axios
    .get("tarif/", {
      params: {
        limit: 3,
      },
      headers: {
        'Accept-Language': lang
      }
    })
    .then((response) => {
      console.log(lang)
      response.data.results.forEach((el, index) =>
        renderTariffsCard(el, index, planRows, lang)
      );
    })
    .finally(() => removeLoadingTariffs());
}

const plansListRows = document.getElementById("plans-list-row");

const listParams = {
  limit: 3,
  offset: 0,
};
export function getTariffs(lang= 'uz') {
  renderLoadingTariffs(plansListRows, 3, `background-color: "#f2f2f2"};`);
  axios
    .get("tarif/", {
      params: listParams,
      headers: {
        'Accept-Language': lang
      }
    })
    .then((response) => {
      response.data.results.forEach((el, index) =>
        renderTariffsCard(
          el,
          index,
          plansListRows,
          lang,
          `background-color: ${index % 2 === 0 ? "#f2f2f2" : "#06635D"};`
        )
      );
      document.getElementById("tariffs-load-more").style.display = !response
        .data.next
        ? "none"
        : "inline-flex";
    })
    .finally(() => removeLoadingTariffs());
}

export function loadMoreTariffs() {
  listParams.offset += listParams.limit;
  getTariffs();
}

function renderTariffsCard(item, index, playground, lang = 'uz', cardStyle = "") {
  playground.innerHTML += `
        <div class="col-lg-4 col-md-6">
            <div class="bd-pricing ${
              index % 2 === 1 ? "bd-pricing-active" : ""
            } h-100 d-flex flex-column justify-content-between" style="${cardStyle}">
                <div>
                <div class="bd-pricing-title-wrapper text-center mb-20">
                    <h6 class="bd-pricing-subtitle mb-15">${item.title}</h6>
                    <h6 class="bd-pricing-price">$${formatMoneyDecimal(
                      item.price
                    )}</h6>
                </div>
                <ul class="mb-40">
                    ${item.services
                      .map(
                        (el) =>
                          `<li style="line-height: 21px;"><i class="fal fa-check"></i>${el.name}</li>`
                      )
                      .join("")}
                </ul>
                </div>
                <div class="bd-pricing-btn">
                    <a href="tarif-details${lang === 'ru' ? '-ru' : ''}.html?id=${
                      item.id
                    }" class="theme-btn">${lang === 'uz' ? 'Batafsil' : 'Подробнее'}</a>
                </div>
            </div>
        </div>
     `;
}

function renderLoadingTariffs(playground, count, cardStyle = "") {
  for (let i = 0; i < count; i++) {
    playground.innerHTML += `
      <div class="col-lg-4 col-md-6 tariffs-loading">
          <div class="bd-pricing
           h-100 d-flex flex-column justify-content-between" style="${cardStyle}">
              <div>
              <div class="bd-pricing-title-wrapper text-center mb-20">
                  <h6 class="shimmer w-80 mx-auto mb-15" style="height: 28px;"></h6>
                  <h6 class="bd-pricing-price shimmer w-75 mx-auto" style="height: 70px;"></h6>
              </div>
              <ul class="mb-40">
                  <li class="d-flex align-items-center gap-2">
                    <div class="shimmer flex-sh" style="width: 20px; height: 20px;border-radius: 4px"></div>
                    <div class="shimmer" style="width: 100%; height: 20px;border-radius: 4px"></div>
                  </li>
                  <li class="d-flex align-items-center gap-2">
                    <div class="shimmer flex-sh" style="width: 20px; height: 20px;border-radius: 4px"></div>
                    <div class="shimmer" style="width: 100%; height: 20px;border-radius: 4px"></div>
                  </li>
                  <li class="d-flex align-items-center gap-2">
                    <div class="shimmer flex-sh" style="width: 20px; height: 20px;border-radius: 4px"></div>
                    <div class="shimmer" style="width: 100%; height: 20px;border-radius: 4px"></div>
                  </li>
                  <li class="d-flex align-items-center gap-2">
                    <div class="shimmer flex-sh" style="width: 20px; height: 20px;border-radius: 4px"></div>
                    <div class="shimmer" style="width: 100%; height: 20px;border-radius: 4px"></div>
                  </li>
                  <li class="d-flex align-items-center gap-2">
                    <div class="shimmer flex-sh" style="width: 20px; height: 20px;border-radius: 4px"></div>
                    <div class="shimmer" style="width: 100%; height: 20px;border-radius: 4px"></div>
                  </li>
                  <li class="d-flex align-items-center gap-2">
                    <div class="shimmer flex-sh" style="width: 20px; height: 20px;border-radius: 4px"></div>
                    <div class="shimmer" style="width: 100%; height: 20px;border-radius: 4px"></div>
                  </li>
              </ul>
              </div>
              <div class="shimmer w-100" style="height: 50px;">

              </div>
          </div>
      </div>
   `;
  }
}

function removeLoadingTariffs() {
  const cards = document.querySelectorAll(".tariffs-loading");
  cards.forEach((el) => (el.style.display = "none"));
}

const preloader = document.getElementById("preloader");

export function getPlansDetails(lang = 'uz') {
  axios
    .get(`tarif/${getSingleIdFromUrl()}/`, {
      headers: {
        'Accept-Language': lang
      }
    })
    .then((response) => {
      renderTariffSingle(response.data);
    })
    .finally(() => (preloader.style.display = "none"));
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

  // Render Makkah hotel image
  document.getElementById("makkah-hotel-image-1").src =
    data.Makkah_hotel.image1 ?? "assets/img/about/choose-1.1.png";
  document.getElementById("makkah-hotel-image-2").src =
    data.Makkah_hotel.image2 ?? "assets/img/about/choose-2.1.png";
  document.getElementById("makkah-hotel-image-3").src =
    data.Makkah_hotel.image3 ?? "assets/img/about/choose-2.1.png";

  // Render Madinah hotel image
  document.getElementById("madinah-hotel-image-1").src =
    data.Madinah_hotel.image1 ?? "assets/img/about/choose-1.1.png";
  document.getElementById("madinah-hotel-image-2").src =
    data.Madinah_hotel.image2 ?? "assets/img/about/choose-2.1.png";
  document.getElementById("madinah-hotel-image-3").src =
    data.Madinah_hotel.image3 ?? "assets/img/about/choose-2.1.png";

  // Render Transport image
  document.getElementById("transport-image-1").src =
    data.transport.image1 ?? "assets/img/about/choose-1.1.png";
  document.getElementById("transport-image-2").src =
    data.transport.image2 ?? "assets/img/about/choose-2.1.png";
  document.getElementById("transport-image-3").src =
    data.transport.image3 ?? "assets/img/about/choose-2.1.png";

  // Render Transport title
  document.getElementById("tariff-transport-title").innerText =
    data.transport.title;

  // Render Transport subtitle
  document.getElementById("tariff-transport-subtitle").innerText =
    data.transport.subtitle;

  // Render Transport body
  document.getElementById("tariff-transport-body").innerText =
    data.transport.body;
}

export function getSelectPlans(lang="uz") {
  const applicationTariffs = document.getElementById("application-tariffs");
  axios
    .get("tarif/", {
      params: {
        limit: 100,
      },
      headers: {
        'Accept-Language': lang
      }
    })
    .then((response) => {
      response.data.results.forEach((el) => {
        applicationTariffs.innerHTML += `
        <option value="${el.id}">${el.title}</option>`;
      });
    });
}
