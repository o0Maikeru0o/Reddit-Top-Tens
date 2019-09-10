# Reddit Top Ten
Display your top ten subreddits, with their top ten posts and their top ten comments

## Table of Contents

1. [Requirements](#requirements)
2. [Usage](#usage)
3. [Development](#development)
4. [API Endpoints](#api-endpoints)

## Requirements

Reddit login credentials

## Usage

In the terminal:
- in the root directory, run ```npm install``` to install dependencies
- ```npm run start``` starts the server with nodemon
- (in a separate terminal window) ```npm run build``` starts webpack, building the bundle and watching for changes
- a node server will be running on port 1337, serving the static page, go to ```localhost:1337```

## Development
-Styling and animations are unfinished
-Unit testing with Jest and Enzyme planned

### Installing Dependencies
From within the root directory:
```sh
npm install
```

## API Endpoints
<pre>
GET:     /top10Subs                -->        Retrieves top 10 subs by subscriber count.
GET:     /top10Post                -->        Retrieves top 10 posts from top 10 subs by upvote score
GET:     /top10Comments            -->        Retrieves top 10 comments from top 10 posts from top 10 subs by upvote score

</pre>
