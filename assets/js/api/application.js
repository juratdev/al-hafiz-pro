// const axios = require('axios');
// import axios from './axios.js'
// import {getSingleIdFromUrl} from "../helpers.js";



function sendApplication(event) {
        event.preventDefault()
        const formValues = {}
        for (const element of event.target.elements) {
                if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                        formValues[element.name] = element.name === 'phone' ? '+998' + element.value.replace(/\D/g, '') : element.value
                }
        }
        console.log(formValues)
        // axios.post('application/', form)
        //     .then((response) => {
        //         console.log(response);
        //         form.reset();
        //         form.querySelector('.alert-success').style.display = 'block';
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         form.querySelector('.alert-danger').style.display = 'block';
        //     })
}