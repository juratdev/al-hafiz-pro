export function convertToEmbed(url) {
  const regex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|(?:youtube(?:-nocookie)?\.com\/(?:.*(?:\/|v=))|(?:youtube.googleapis.com\/v\/)))([^&?\s]{11})/i;
  let match
  if  (url?.length) {
    match = url.match(regex);
  }
  if (match?.length) {
    return match[1]
  }
}

export function getSingleIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}

export function formatMoneyDecimal(number, fix, option) {
  let style;
  if (["USD", "RUB"].includes(option)) {
    style = "currency";
  } else if (["kilogram", "meter", "percent"].includes(option)) {
    style = "unit";
  } else {
    style = "";
  }

  const newStyle = style;
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  };
  return number
    ? new Intl.NumberFormat("ru-RU", option2).format(number)
    : "0,00";
}

export function formatDate(date, lang) {
  const months = {
    uz: [
      "Yan",
      "Feb",
      "Mart",
      "Apr",
      "May",
      "Iyun",
      "Iyul",
      "Avg",
      "Sent",
      "Okt",
      "Noy",
      "Dek",
    ],
    ru: [
      "Янв",
      "Фев",
      "Март",
      "Апр",
      "Май",
      "Июнь",
      "Июль",
      "Авг",
      "Сен",
      "Окт",
      "Ноя",
      "Дек",
    ]
  }
  const myDate = new Date(date);
  const day = myDate.getDate();
  const month = myDate.getMonth();
  const year = myDate.getFullYear();
  return `${day} ${months[lang][month]}, ${year}`;
}

export function changeLanguageSingle(link, item, lang = 'uz') {

  const links = document.querySelectorAll(`.${item}`);
  links.forEach((el) => {
    el.href = `./${link}${lang === 'ru' ? '-ru' : ''}.html?id=${getSingleIdFromUrl()}`;
  })
}