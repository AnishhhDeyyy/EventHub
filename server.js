const express = require("express");
const { dbConnection } = require("./Config/dbConnection");
const { User } = require("./Models/User/app");
const authrouter = require("./Routes/AuthRoutes/app");
const { UserOtp } = require("./Models/UserOtp/app");

const app = express();

app.use(express.json());
app.use('/api',authrouter);

dbConnection();
User.sync({force: true});
UserOtp.sync({force: true});
app.listen(5000,()=>{
    console.log("Server Started............");
    
})