// const axios = require('axios');
// import axios from './axios.js'
// import {getSingleIdFromUrl} from "../helpers.js";

function sendApplication(event) {
  event.preventDefault();
  const formValues = {
    people_count: 1,
  };
  for (const element of event.target.elements) {
    if (element.tagName === "INPUT" || element.tagName === "SELECT") {
      formValues[element.name] =
        element.name === "phone"
          ? "+998" + element.value.replace(/\D/g, "")
          : element.value;
    }
  }
  axios
    .post("https://al-hafiz.uz/api/application/", formValues)
    .then((response) => {
      alert("Ma'lumotingiz muvaffaqiyatli yuborildi.");
      for (const element of event.target.elements) {
        if (element.tagName === "INPUT" || element.tagName === "SELECT") {
          element.value = "";
        }
      }
      //       form.reset();
      //       form.querySelector(".alert-success").style.display = "block";
    });
}
