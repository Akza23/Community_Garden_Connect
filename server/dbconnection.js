const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/community_garden")
const db=mongoose.connection
db.on("error",(e)=>{
    console.log("Connection Failed",e)
})
db.once("open",()=>{
    console.log("Connected to MongoDB")
})