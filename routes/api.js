const express = require('express');
const passport = require('passport');
const refresh = require('passport-oauth2-refresh');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
const rp = require('request-promise');
const router = express.Router();
const NodeCache = require( "node-cache" );
const dataCache = new NodeCache();

const CACHE_EXPIRY_TIME = 10000;
const ACCOUNT_ID = '34811337';
const CONTEXT_WAREHOUSE_EMEA = 'z2.context.liveperson.net'


 router.get('/used',ensureLoggedIn, function(req, res) {
  let value = dataCache.get( "usedCars" );
  console.log(`This is the  value of used: ${JSON.stringify(value)}`)
  if ( value == undefined ){
      console.log("cache expired, making an API request")
      getUsed(req,res);
  } else {
    res.status(302).json(value);
 } // disabled cacheing for used vehicles as it seems to be not 100% stable, sometimes it fails to get anything in the browser side and I am not sure what is the reason.
   
 });

 router.get('/new',ensureLoggedIn, function(req, res) {
  let value = dataCache.get( "newCars" );
  console.log(`This is the value of new: ${JSON.stringify(value)}`)
  if ( value == undefined ){
      console.log("cache expired, making an API request")
      getNew(req,res);
  } else {
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
    res.status(304).json(value);
  }
  
});



function getUsed(req, res) {
  var options = {
    uri: 'https://api-preprod.robinsandday.co.uk/api/used/available-options',
    json: true
  };
  
  rp(options)
    .then(function (resp) {
      let didSaveCache = dataCache.set( "usedCars", resp, CACHE_EXPIRY_TIME );
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
    json: true 
  };
  
  rp(options)
    .then(function (resp) {
        let didSaveCache = dataCache.set( "newCars", resp, CACHE_EXPIRY_TIME );
        console.log(`save cache new cars: ${didSaveCache}`)
        res.status(200).json(resp);
        
    })
    .catch(function (err) {
      res.status(500).json({ error: err })
    });
}

// Get the data saved from the website and collected by the bot saved to the Context Warehouse, the
// Key part to the functionality is the conversationID (@ - conv ) this is how we know to pull the data saved by the bot on the same conversation
// and collect it for this current conversation (we know the current conversationID as we receive it from the Agent Widget SDK running on the widgetScript)
function getContext(req, res) {
  let conv = req.query.convId;
  console.log(`https://${CONTEXT_WAREHOUSE_EMEA}/v1/account/${ACCOUNT_ID}/testInfo/${conv}/properties`)
  var options = {
    uri: `https://${CONTEXT_WAREHOUSE_EMEA}/v1/account/${ACCOUNT_ID}/testInfo/${conv}/properties`,
    headers:{
      'Content-Type':'application/json',
      'maven-api-key':process.env.mavenKey
    },
    json: true 
  };
  
  rp(options)
    .then(function (resp) {
        res.status(200).json(resp);;
        
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "There was an error getting data from Context Storage" })
    });
}

// Data is cached using FaaS into the Context Warehouse(Function as a service) on the Conversational Cloud account, we then retrieve it from the
// Context Warehouse.
function getDealerships(req, res) {
  var options = {
    uri: `https://${CONTEXT_WAREHOUSE_EMEA}/v1/account/${ACCOUNT_ID}/data/dealerships2/properties`,
    headers:{
      'Content-Type':'application/json',
      'maven-api-key':process.env.mavenKey
    },
    json: true
  };
  
  rp(options)
    .then(function (resp) {
      let didSaveCache = dataCache.set( "dealerships", resp, CACHE_EXPIRY_TIME ); // Cache on the server side, save to a key and return key unless the key data expired, in which case calls the API again
      console.log(`save cache dealerships: ${didSaveCache}`)
      res.status(200).json(resp);
        
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).json({ error: "There was an error getting data from Context Storage for the Dealerships" })
    });
}


module.exports = router;
