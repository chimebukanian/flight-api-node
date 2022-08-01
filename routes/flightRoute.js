const express = require('express');
const controller = require('../controllers/flightController');
const fs = require('fs');

const router = express.Router();

/* Create - POST method */
router.post('/book-flight', controller.bookFlight)
    
/* Read - GET method */
router.get('/flights', controller.getAllFlights)

/* Read - GET method single*/
router.get('/get-flight/:flightId', controller.getFlight)

/* Update - Patch method */
router.post('/update-flight/:flightId', controller.updateFlight)

  
/* Delete - Delete method */
router.delete('/delete-flight/:flightId', controller.deleteFlight)
  
module.exports = router;
