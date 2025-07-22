var express = require("express");

var samplecontroller = require("./controllers/samplecontroller");

var route = express.Router();

route.post('/sample/register', samplecontroller.uploadimg,samplecontroller.savesample);
// route.post('/gardner/login', gardnercontroller.logingardner);
// route.post("/gardner/forgotpassword", gardnercontroller.forgotGardnerPassword);
// route.post('/gardner/viewone/:id', gardnercontroller.viewGardnerById);
// route.post("/gardner/profileupdate/:id", gardnercontroller.updateGardnerById);
// route.post("/gardner/viewallgardner", gardnercontroller.viewAllGardners);


module.exports = route;