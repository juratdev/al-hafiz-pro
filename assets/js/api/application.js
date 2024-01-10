// import axios from './axios.js'

function sendApplication(event) {
  event.preventDefault();
  const formValues = {};
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
    .then(() => {
      alert("Ma'lumotingiz muvaffaqiyatli yuborildi.");
      for (const element of event.target.elements) {
        if (element.tagName === "INPUT" || element.tagName === "SELECT") {
          element.value = "";
        }
      }
    });
}

function sendContactForm(event) {
    event.preventDefault()
    const phoneNumber = event.target.querySelector("#contact-phone-input")
    axios.post(`https://api.telegram.org/bot6970135688:AAEBbc60YQnwnnAZrUxlDh9Vb-RMtQkhtQ8/sendMessage?chat_id=-4088019881&text=${"Номер для связи: +998" + phoneNumber.value.replace(/\D/g, "")}&parse_mode=html` )
        .then(() => {
            alert("Ma'lumotingiz muvaffaqiyatli yuborildi.");
            phoneNumber.value = "";
        });
    console.log(phoneNumber)
}
