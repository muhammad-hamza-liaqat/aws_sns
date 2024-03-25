const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const aws_sns_routes = require("./routes/aws.routes")

// middleware
app.use(cors);
app.use(bodyParser.json());

// routes
app.use("/api", aws_sns_routes);

// server
app.listen(process.env.PORT, ()=>{
    console.log(`server is running at port ${process.env.PORT}`)
})