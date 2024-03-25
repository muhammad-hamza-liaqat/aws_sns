const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(cors);

// server
app.listen(process.env.PORT, ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})