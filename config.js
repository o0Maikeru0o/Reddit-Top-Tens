
const user = 'DummyRedditTopTen';
const pw = 'transperfect1337';
const clientId = 'bXFFG4rVHlS9Cw';
const secret = 'wjjV4YVDcGJt_OAQklaeO2qfoO8';
// const randomString = [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
// const uri = 'localhost:1337/top_ten';
// const scope = 'identity edit mysubreddits read report save';

const accessUrl = `https://www.reddit.com/api/v1/access_token?grant_type=password&username=${user}&password=${pw}`;

module.exports = {
  clientId,
  secret,
  accessUrl,
};
