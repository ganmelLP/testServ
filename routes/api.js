const express = require('express');
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const rp = require('request-promise');
// const process = require('process');
const router = express.Router();

/* GET home page. */
 router.get('/used',ensureLoggedIn, function(req, res) {
   getUsed(req,res);
 });

 router.get('/new',ensureLoggedIn, function(req, res) {
   getNew(req,res);
 });

 router.get('/contextData',ensureLoggedIn, function(req, res) {
  getContext(req,res);
});



function getUsed(req, res) {
  var options = {
    uri: 'https://api-preprod.robinsandday.co.uk/api/used/available-options',
    json: true // Automatically parses the JSON string in the response
  };
  
  rp(options)
    .then(function (resp) {
      //  console.log(resp);
        res.status(200).json(resp);
        
    })
    .catch(function (err) {
      res.status(500).json({ error: err })
    });
}

function getNew(req, res) {
  var options = {
    uri: 'https://api-preprod.robinsandday.co.uk/api/new/available-options',
    json: true // Automatically parses the JSON string in the response
  };
  
  rp(options)
    .then(function (resp) {
      //  console.log(resp);
        res.status(200).json(resp);;
        
    })
    .catch(function (err) {
      res.status(500).json({ error: err })
    });
}

function getContext(req, res) {
  let conv = req.query.convId;
  console.log(`https://z2.context.liveperson.net/v1/account/34811337/testInfo/${conv}/properties`)
  var options = {
    uri: `https://z2.context.liveperson.net/v1/account/34811337/testInfo/${conv}/properties`,
    headers:{
      'Content-Type':'application/json',
      'maven-api-key':process.env.mavenKey
    },
    json: true // Automatically parses the JSON string in the response
  };
  
  rp(options)
    .then(function (resp) {
      //  console.log(resp);
        res.status(200).json(resp);;
        
    })
    .catch(function (err) {
      res.status(500).json({ error: err })
    });
}



module.exports = router;
