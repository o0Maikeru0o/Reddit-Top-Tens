const express = require('express');
const parser = require('body-parser');
const axios = require('axios');
const {
  user, pw, access, clientId, secret,
} = require('../config.js');

const app = express();
const PORT = 1337;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/', express.static(`${__dirname}/../public`));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
