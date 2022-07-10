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

/* Create - POST method */
app.post('/flight/add', (req, res) => {
    //get the existing user data
    const existflight = getflightData()
    
    //get the new user data from post request
    const flightData = req.body
    //check if the userData fields are missing
    if (flightData.title == null || flightData.time == null || flightData.price == null || flightData.date == null) {
        return res.status(401).send({error: true, msg: 'flight data missing'})
    }
    
    //check if the username exist already
    const findExist = existflight.find( flight => flight.title === flightData.title )
    if (findExist) {
        return res.status(409).send({error: true, msg: 'flight already exist'})
    }
    //append the user data
    existflight.push(flightData)
    //save the new user data
    saveflightData(existflight);
    res.send({success: true, msg: 'flight data added successfully'})
})
/* Read - GET method */
app.get('/flights', (req, res) => {
    const flights = getflightData()
    res.send(flights)
})
/* Update - Patch method */
app.patch('/flight/update/:title', (req, res) => {
    //get the username from url
    const title = req.params.title
    //get the update data
    const flightData = req.body
    //get the existing user data
    const existflight = getflightData()
    //check if the username exist or not       
    const findExist = existflight.find( flight => flight.title === title )
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'title not exist'})
    }
    //filter the userdata
    const updateflight = existflight.filter( flight => flight.title !== title )
    //push the updated data
    updateflight.push(flightData)
    //finally save it
    saveflightData(updateflight)
    res.send({success: true, msg: 'flight data updated successfully'})
})
/* Delete - Delete method */
app.delete('/flight/delete/:title', (req, res) => {
    const title = req.params.title
    //get the existing userdata
    const existflight = getflightData()
    //filter the userdata to remove it
    const filterflight = existflight.filter( flight => flight.title !== title )
    if ( existflight.length === filterflight.length ) {
        return res.status(409).send({error: true, msg: 'flight does not exist'})
    }
    //save the filtered data
    saveflightData(filterflight)
    res.send({success: true, msg: 'flight removed successfully'})
    
})
/* util functions */
//read the user data from json file
const saveflightData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('flight.json', stringifyData)
}
//get the user data from json file
const getflightData = () => {
    const jsonData = fs.readFileSync('flight.json')
    return JSON.parse(jsonData)    
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
