export function convertToEmbed(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url?.match(regExp);

  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  } else {
    return "error";
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

export function formatDate(date) {
  const months = [
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
  ];

  const myDate = new Date(date);
  const day = myDate.getDate();
  const month = myDate.getMonth();
  const year = myDate.getFullYear();
  return `${day} ${months[month]}, ${year}`;
}
