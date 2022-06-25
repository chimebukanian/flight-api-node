const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");

const app = express();

app.use(json());

app.use("/", routes);

app.post('/Book-Flight', () => {

})

app.get('/Flights', () => {

})

app.get('/Flights/:id', () => {

})

app.put('/Edit-Flight', () => {

})

app.delete('/Delete-Flight', () => {

})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});