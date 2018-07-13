const request = require('request-promise');
const express = require('express');

const router = express.Router();



router.post('/fbsearch' , (req,res) => {

    let queryTerm = 'Facebook';
    let searchType = 'page';
    // const  { queryTerm, searchType } = req.body;
    const userFieldSet = 'id, name, about, email, accounts, link, is_verified, significant_other, relationship_status, website, picture, photos, feed';
    const pageFieldSet = 'name';    
   
    const options = {
      method: 'GET',
      uri: 'https://graph.facebook.com/1794057637318601/music', /** working example */
      //uri: 'https://graph.facebook.com/1794057637318601/accounts',
      qs: {
        access_token: process.env.ACCESS_TOKEN,
        //q: queryTerm,
        //type: 'page',
        //fields:  userFieldSet
      }
    };

    request(options).then((FBres) => {
        console.log('response ' ,FBres);
        //const parsedRes = JSON.parse(FBres).data; 
        res.send(JSON.parse(FBres));
        //console.log(parsedRes);
    })
})



module.exports = router;
