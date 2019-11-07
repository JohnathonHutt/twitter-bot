# twitter-bot

This twitter bot uses node.js and the the npm twitter module.

To use: populate a config.js file with your twitter API key/credentials (see twitter docs or twitter npm for details) and enter node app.js in the command line.

Search parameters can be adjusted in the params object.

The main function getAndManipluateTweets() can be modified by removing any of the three helper functions: retweet, favoriteTweets, followUser - or by creating your own function following the twitter API documentation.



