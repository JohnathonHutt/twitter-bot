//jshint esversion:6

const Twitter = require('twitter');
const config = require('./config.js');
const T = new Twitter(config);

//defining parameters
var params = {
  q: '#100DaysOfCode #javascript',
  count: 5,
  result_type: 'recent',
  lang: 'en'
};

//find tweets based on query and perform other functions on them
function getAndManipulateTweets() {
  //searching tweets
  T.get('search/tweets', params, function(err, data, response) {
      //throw error message
      if (err) console.log(err);

      if (!err) {
        //get tweetId
        let tweets = data.statuses;
        tweets.map(function(tweet) {
          let id = {id: tweet.id_str};
          let screenName = {id: tweet.user.screen_name};
          favoriteTweets(id);
          retweet(id);
          followUser(screenName);
        });
      }
    });
}

//retweets tweets once retrieved
function retweet(id) {
  //id is tweet id objects {id: tweet.id_str}
  T.post('statuses/retweet', id, function (err, response){
    if (err) console.log(err);

    if (!err) {
      let userName = response.user.screen_name;
      let tweetId = response.id_str;
      console.log(`Retweeted: https://twitter.com/${userName}/status/${tweetId}`);
    }
  });
}

//favorites tweets once retrieved
function favoriteTweets(id) {
  //id is tweet id objects {id: tweet.id_str}
  T.post('favorites/create', id, function (err, response){
    if (err) console.log(err);

    if (!err) {
      let userName = response.user.screen_name;
      let tweetId = response.id_str;
      console.log(`Liked: https://twitter.com/${userName}/status/${tweetId}`);
    }
  });
}

//follows user
function followUser(screenName) {
  //screenName is object with user name {id: id: tweet.user.screen_name}
  T.post('friendships/create', screenName, function (err, response){
    if (err) console.log(err);

    if (!err) {
      console.log(`Folowed: ${screenName.id}`);
    }
  });
}



getAndManipulateTweets();
//run operations every 60 seconds
setInterval(getAndManipulateTweets, 60000);
