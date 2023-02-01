import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, './build')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})

app.get('/api/test', (req, res) => {
    res.send('TEST')
})

app.post('/api', (req, res) => {
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
        res.status(response.status).send(response.data);
    })
    .catch(error => {
        console.log("API Error:", error);
        res.status(500).send(error.message);
    });
});

app.get('/api/street/:cityId', (req, res) => {
    axios.get(process.env.API_BASE_URL + '/autocomplete/read_street/' + req.params.cityId, {
        params: {
            q: req.query.q
        }
    })
    .then(response => {
        res.status(response.status).send(response.data);
    })
    .catch(error => {
        res.status(500).send(error.message);
    });
})

app.get('/api/house/:streetId', (req, res) => {
    axios.get(process.env.API_BASE_URL + '/autocomplete/read_house/' + req.params.streetId, {
        params: {
            q: req.query.q
        }
    })
    .then(response => {
        res.status(response.status).send(response.data);
    })
    .catch(error => {
        res.status(500).send(error.message);
    });
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));