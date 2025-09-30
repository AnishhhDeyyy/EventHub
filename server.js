const express = require("express");
const { dbConnection } = require("./Config/dbConnection");
const { User } = require("./Models/User/app");

const app = express();

app.use(express.json());

dbConnection();
User.sync({force: true})
app.listen(5000,()=>{
    console.log("Server Started............");
    
})