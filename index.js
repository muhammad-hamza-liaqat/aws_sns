const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

// middleware
app.use(cors);
app.use(bodyParser.json());

// server
app.listen(process.env.PORT, ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})