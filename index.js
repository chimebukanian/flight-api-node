const express = require("express");
const { json } = require("express");
const flights = require("./controllers/flightController");
const models = require("./models/Flight");
const routes = require("./routes/flightRoute");
const bookedflights = require('./flight.json')
const fs=require("fs")

const app = express();
app.use(json());
app.use(express.json())
app.use(express.urlencoded())

app.use("/", routes);

app.post("/Book-Flight", (req, res) => {
    bookedflights.push(req.body.newUser)

    let stringedData=JSON.stringify(bookedflights, null, 2)

    fs.writefile('bookedflights.json', stringedData, (err)=>{
        if{err}{
            return res.status(500)
        }
    })
     res.status(200).json({message:"new user created"})
    rer
})

app.get('/Flights', () => {
    
    return res.json({bookedflights})
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