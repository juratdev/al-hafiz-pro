import axios from "./axios.js";
import { getSingleIdFromUrl, formatDate } from "../helpers.js";

const newsRows = document.getElementById("news-row");

export function getHomeNews() {
  renderNewsCardLoading(3, newsRows);
  axios
    .get("news/", {
      params: {
        limit: 3,
      },
    })
    .then((response) => {
      response.data.results.forEach((el) => renderNewsCard(el, newsRows));
    })
    .finally(() => {
      removeLoadingCards();
    });
}

const newsListRows = document.getElementById("news-list-row");

const listParams = {
  limit: 9,
  offset: 0,
};

export function getListNews() {
  renderNewsCardLoading(9, newsListRows);
  axios
    .get("news/", {
      params: listParams,
    })
    .then((response) => {
      response.data.results.forEach((el) => renderNewsCard(el, newsListRows));
      document.getElementById("news-load-more").style.display = !response.data
        .next
        ? "none"
        : "inline-flex";
    })
    .finally(() => removeLoadingCards());
}

export function loadMoreNews() {
  listParams.offset += listParams.limit;
  getListNews();
}

function renderNewsCard(item, playground) {
  playground.innerHTML += `
        <div class="col-lg-4 col-md-6 mb-4">
            <div class="bd-blog mb-30 h-100 d-flex flex-column">
                <div class="bd-blog-img flex-shrink-0" style="aspect-ratio: 470/273">
                    <img style="width: 100%; height: 100%; object-fit: cover" src="${item.image}" alt="blog image not found">
                </div>
                <div class="bd-blog-text h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="bd-blog-meta mb-15">
                            <ul>
                                <li>
                                <a href="news-details.html" id="news-start-time"><i class="flaticon-calendar"></i>21 Feb 2022</a>
                                </li>
                            </ul>
                        </div>
                        <h4 class="bd-blog-title">${item.title}</h4>
                    </div>
                    <div class="bd-blog-author d-flex justify-content-end">
                        <div class="bd-blog-author-link">
                            <a href="news-details.html?id=${item.id}">Batafsil<i class="far fa-arrow-right"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     `;
}

function renderNewsCardLoading(count, playground) {
  for (let i = 0; i < count; i++) {
    playground.innerHTML += `
        <div class="col-lg-4 col-md-6 news-card-loading">
            <div class="bd-blog mb-30 h-100 d-flex flex-column">
                <div class="bd-blog-img flex-shrink-0" style="aspect-ratio: 470/273">
                    <div class="shimmer w-100 h-100"></div>
                </div>
                <div class="bd-blog-text h-100 d-flex flex-column justify-content-between">
                    <div>
                        <div class="bd-blog-meta mb-15">
                            <ul>
                                <li class="d-flex align-items-center gap-2"><div class="shimmer" style="width: 16px; height: 16px; border-radius: 4px;"></div><div class="shimmer" style="width: 100px; height: 16px; border-radius: 4px;"></div>
                                </li>
                            </ul>
                        </div>
                        <div class="shimmer w-100" style=" height: 28px; border-radius: 4px;margin-bottom: 4px;"></div>
                        <div class="shimmer w-100" style=" height: 28px; border-radius: 4px; "></div>
                    </div>
                    <div class="bd-blog-author d-flex justify-content-end">
                        <div class="bd-blog-author-link d-flex align-items-center gap-2">
                        <div class="shimmer" style="width: 100px; height: 16px; border-radius: 4px;"></div><div class="shimmer" style="width: 16px; height: 16px; border-radius: 4px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     `;
  }
}

function removeLoadingCards() {
  const loadingCards = document.querySelectorAll(".news-card-loading");
  loadingCards.forEach((el) => {
    el.style.display = "none";
  });
}

export function getNewsDetails() {
  axios.get(`news/${getSingleIdFromUrl()}/`).then((response) => {
    const item = response.data;
    document
      .querySelectorAll(".news-details-title")
      ?.forEach((el) => (el.innerHTML = item.title));
    document.getElementById("news-details-content").innerHTML = item.body;
    document.getElementById("news-details-image").src = item.image;
    renderNewsSingle(item);
  });
}

function renderNewsSingle(data) {
  // Render News Start Date
  document.getElementById("news-start-time").innerText = formatDate(
    data.start_time
  );
}
