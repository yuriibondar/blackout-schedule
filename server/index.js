const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/api', (req, res) => {
    console.log("req.body - ", req.body);
    //console.log("req - ", req);
    axios.post(process.env.API_BASE_URL, req.body, {
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        params: {
            "_wrapper_format": "drupal_ajax"
        }
    })
    .then(response => {
        //console.log(response);
        res.send(response.data);
    })
    .catch(error => {
        console.log("Error - ", error);
        res.status(500).send(error.message);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));