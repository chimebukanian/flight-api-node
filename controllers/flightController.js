const FlightModels = require("../models/Flight");

exports.bookFlight = (req, res, next) => {
  
  const flightData = req.body
    //check if the flightdata fields are missing
    if (flightData.title == null || flightData.time == null || flightData.price == null) {
      return res.status(401).send({error: true, msg: 'flight data missing'})
  }

  const flightTitle = flightData.title;
  const flightTime = flightData.time;
  const flightPrice = flightData.price;
  const flightDate = new Date();
  
  const flightModels = new FlightModels(
    flightTitle,
    flightTime,
    flightPrice,
    flightDate
  );
  flightModels.bookFlight();

  res.json({
    Message: "You have successfully booked a flight with following feature",
    flightTitle,
    flightTime,
    flightPrice,
    flightDate,
  });
};

exports.getFlight = (req, res, next) => {
  const urlParameter = req.params.flightId;
  flightModels.getFlight(urlParameter, (flight) => {
    res.json(flight.response);
  });
};

exports.getAllFlights = (req, res, next) => {
  flightModels.getAllFlights((flights) => {
    res.status(201).json(flights.response);
  });
};

exports.deleteFlight = (req, res, next) => {
  const param = req.params.flightId;
  flightModels.deleteFlight(param, (deleteFlight) => {
    res.json({...deleteFlight});
  });
};

exports.updateFlight = (req, res, next) => {
  const param = req.params.flightId;
  // console.log(param);
  const flightTitle = req.body.title;
  const flightTime = req.body.time;
  const flightPrice = req.body.price;
  const flightDate = new Date();
  const updatedFlight = new FlightModels(
    flightTitle,
    flightTime,
    flightPrice,
    flightDate
  );
  updatedFlight.updateFlight(param, (response) => {
    res.json({...response});
  });
};