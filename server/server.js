const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const {
  user, pw, access, clientId, secret,
} = require('../config.js');

const app = express();
const PORT = 1337;

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/', express.static(`${__dirname}/../public`));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/top10', (req, res) => {
  axios({
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    url: access,
    auth: {
      username: clientId,
      password: secret,
    },
  })
    .then((result) => result.data.access_token)
    .then((token) => axios.get('https://oauth.reddit.com/subreddits/mine/subscriber?limit=100', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }))
    .then((subs) => res.status(200).send(subs.data.data.children))
    .catch((err) => console.log(err));
});
