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
    // .then((token) => {
    //   console.log(token);
    //   axios({
    //     url: 'https://oauth.reddit.com/subreddits/mine/subscriber',
    //     method: 'get',
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
    // })
    // .then((result) => console.log(result))
    .catch((err) => console.log(err));
});
