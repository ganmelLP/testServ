const express = require('express');
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const rp = require('request-promise');
// const process = require('process');
const router = express.Router();
const NodeCache = require( "node-cache" );
const dataCache = new NodeCache();

/* GET home page. */
 router.get('/used',ensureLoggedIn, function(req, res) {
  let value = dataCache.get( "usedCars" );
  if ( value == undefined ){
      console.log("cache expired, making an API request")
      getUsed(req,res);
  } else {
    res.status(304).json(value);
  }
   
 });

 router.get('/new',ensureLoggedIn, function(req, res) {
  let value = dataCache.get( "newCars" );
  if ( value == undefined ){
      console.log("cache expired, making an API request")
      getNew(req,res);
  } else {
    console.log(value)
    res.status(304).json(value);
  }
   
 });

 router.get('/contextData',ensureLoggedIn, function(req, res) {
  getContext(req,res);
});

router.get('/dealerships',ensureLoggedIn, function(req, res) {
  let value = dataCache.get( "dealerships" );
  if ( value == undefined ){
      console.log("cache expired, making an API request")
      getDealerships(req,res);
  } else {
    console.log(value)
    res.status(304).json(value);
  }
  
});



function getUsed(req, res) {
  var options = {
    uri: 'https://api-preprod.robinsandday.co.uk/api/used/available-options',
    json: true // Automatically parses the JSON string in the response
  };
  
  rp(options)
    .then(function (resp) {
      let didSaveCache = dataCache.set( "usedCars", resp, 10000 );
      console.log(`save cache used cars: ${didSaveCache}`)
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
        let didSaveCache = dataCache.set( "newCars", resp, 10000 );
        console.log(`save cache new cars: ${didSaveCache}`)
        res.status(200).json(resp);
        
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
      console.log(err);
      res.status(500).json({ error: "There was an error getting data from Context Storage" })
    });
}


function getDealerships(req, res) {
  var options = {
    uri: `https://z2.context.liveperson.net/v1/account/34811337/data/dealerships2/properties`,
    headers:{
      'Content-Type':'application/json',
      'maven-api-key':process.env.mavenKey
    },
    json: true // Automatically parses the JSON string in the response
  };
  
  rp(options)
    .then(function (resp) {
      let didSaveCache = dataCache.set( "dealerships", resp, 10000 );
      console.log(`save cache dealerships: ${didSaveCache}`)
      res.status(200).json(resp);
        
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "There was an error getting data from Context Storage for the Dealerships" })
    });
}


module.exports = router;
