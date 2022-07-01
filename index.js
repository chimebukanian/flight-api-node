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

    save()
    return res.status(200).json({message:"new user created"})
})

app.get('/Flights', (req, res) => {
    
    return res.json({bookedflights})
})
app.get('/Flights/:id', (req, res) => {

})

app.put('/Edit-Flight/:title', (req, res) => {
    bookedflights=bookedflights.map((flight))=>{
        if (flight.title===req.params.title){
            return req.body
        }else{
            return flight
        }
    });
        save()
        res.json({status:"success", updated_flight:req.body});
    })


app.delete('/Delete-Flight', (req, res) => {
    bookedflights=bookedflights.filter((flight )=>flight.id)
})
const save = () => {
    fs.writeFile(
      "./bookedflights.json",
      JSON.stringify(bookedflights, null, 2),
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
  };
  Read
  app.get method correspond to the http get request. As shown below, we read the entire bookedflights file using app.get with “/flights” route; app.get("/flights",callback function)or a specific object using the app.get with “/stats/:name” route; app.get("/flights/:name",callback function)
  
  //Read(R) in CRUD
  app.get("/flights", (req, res) => {
    res.json(bookedflights);
  });
  app.get("/flights/:name", (req, res) => {
    const findflight = bookedflights.find((flight) => flight.flight === req.params.name);
    res.json(findflight);
  });
  Create
  the app.post method corresponds to the http post request. We create a new flight object as shown below using app.post method with three attributes/parameters; app.post("route",bodyParser.json(),callback function)
  
  We use push method to add the new flight object to existing array of objects(bookedflights) and invoke the save function to persist the updated array, we then send a response with res.json()
  
  //Create(C) in CRUD
  app.post("/flights", bodyParser.json(), (req, res) => {
    bookedflights.push(req.body);
    save();
    res.json({
      status: "success",
      flightInfo: req.body,
    });
  });
  Update
  the app.put method corresponds to the http put request.We update one flight object as shown below using app.put method with three attributes/parameters; app.put("/flights/:name",bodyParser.json(),callback function)
  
  We use map function to update one flight object in question and return the others unchanged. We invoke the save function to persist the updated array, we then send a response with res.json()
  
  //Update(U) in CRUD
  app.put("/flights/:name", bodyParser.json(), (req, res) => {
  bookedflights = bookedflights.map((flight) => {
      if (flight.flight === req.params.name) {
        return req.body;
      } else {
        return flight;
      }
    });
    save();
  res.json({
      status: "success",
      flightInfo: req.body,
    });
  });
  Delete
  the app.delete method corresponds to the http delete request.We delete one flight object as shown below using app.delete method app.delete("/flights/:name",callback function) We used the filter method to delete the specific object in question.
  
  //Delete(D) in CRUD
  app.delete("/flights/:name", (req, res) => {
    bookedflights = bookedflights.filter((flight) => flight.flight !== req.params.name);
    save();
    res.json({
      status: "success",
      removed: req.params.name,
      newLength: bookedflights.length,
    });
  });
  const save = () => {
    let stringedData=JSON.stringify(bookedflights, null, 2)

    fs.writefile('bookedflights.json', stringedData, (err)=>{
        if{err}{
            return res.status(500)
        }
    })
  }; 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});