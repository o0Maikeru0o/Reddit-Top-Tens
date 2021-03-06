const express = require('express');
const parser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { accessUrl, clientId, secret } = require('../config.js');

const app = express();
const PORT = 1337;

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use('/', express.static(`${__dirname}/../public`));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const filterTopTenSubs = (subs) => subs.sort((a, b) => b.data.subscribers - a.data.subscribers).slice(0, 10);

const getUserSubs = async (token) => {
  let userSubs = [];
  function recurseSubPages(token, after) {
    return axios.get(`https://oauth.reddit.com/subreddits/mine/subscriber?limit=100&after=${after}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (result) => {
        const { children, after } = result.data.data;
        userSubs = userSubs.concat(children);
        if (after) {
          await recurseSubPages(token, after);
        }
      });
  }
  await recurseSubPages(token);
  return filterTopTenSubs(userSubs);
};


app.get('/top10Subs', (req, res) => {
  axios({
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    url: accessUrl,
    auth: {
      username: clientId,
      password: secret,
    },
  })
    .then((result) => result.data.access_token)
    .then((token) => getUserSubs(token))
    .then((subs) => res.status(200).send(subs))
    .catch((err) => res.status(400).send(err));
});

app.get('/top10Posts/:sub', (req, res) => {
  const { sub } = req.params;
  axios.get(`https://www.reddit.com/r/${sub}/top/.json?limit=10`)
    .then((result) => result.data.data.children)
    .then((posts) => res.status(200).send(posts))
    .catch((err) => res.status(400).send(err));
});

app.get('/top10Comments/', (req, res) => {
  const { sub, id } = req.query;
  axios.get(`https://www.reddit.com/r/${sub}/comments/${id}.json?sort=top&limit=10&depth=1`)
    .then((result) => result.data[1].data.children.slice(0, 10))
    .then((comments) => res.status(200).send(comments))
    .catch((err) => res.status(400).send(err));
});
