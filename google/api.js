const express = require('express');
const axios = require('axios');
const request = require('request-promise');

const router = express.Router();

router.get('/', (req,res) =>{


        console.log('process token ',process.env.TOKEN);
        const options = {
                method: 'GET',
                uri: 'https://www.googleapis.com/plus/v1/people/103497757921985294524/activities/public',
                qs:{
                        access_token: process.env.TOKEN
                }
        };
        request(options).then((gres) => {
                res.send(gres);
               //console.log(gres);
        })
})

module.exports = router;