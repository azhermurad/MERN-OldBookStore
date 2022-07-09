const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

app.get("/",(req,res)=>{
    res.send("okay")
})
app.listen(port, ()=>{
    console.log("Application is running on port:",port)
})