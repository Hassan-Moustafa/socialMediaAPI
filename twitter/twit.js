const Twit = require('twit');
const express = require('express');
const axios = require('axios');

const router = express.Router();

var T = new Twit({
  consumer_key:         'TQOEgWp57LxtyBJeny52Xmbze',
  consumer_secret:      'EiErpnJh3813riQMN2uQeRtK3hKAHuYtjhQpjUbjRsJCRKJT0p',
  access_token:         'temp_text_to_create_the_object',
  access_token_secret:  'temp_text_to_create_the_object',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})
    

router.get('/' , (req,res) => {

    //console.log(T);
    T.config.access_token = process.env.TWIT_ACCESS_TOKEN;
    T.config.access_token_secret =  process.env.TWIT_ACCESS_TOKEN_SECRET
    T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
        console.log(data);
        res.send(data);
        });

})

router.get('/search' , (req,res) => {
    T.config.access_token = process.env.TWIT_ACCESS_TOKEN;
    T.config.access_token_secret =  process.env.TWIT_ACCESS_TOKEN_SECRET
    T.get('search/tweets', { q: 'banana since:2018-07-13', count: 100 }, function(err, data, response) {
        console.log(data);
        res.send(data);
    })
})

router.get('/lists' , (req,res) => {
    T.config.access_token = process.env.TWIT_ACCESS_TOKEN;
    T.config.access_token_secret =  process.env.TWIT_ACCESS_TOKEN_SECRET
    T.get('https://api.twitter.com/1.1/lists/list.json', { user_id: '1017742656653398017', count: 100 }, function(err, data, response) {
        console.log(data);
        res.send(data);
    })
})


module.exports = router;
    