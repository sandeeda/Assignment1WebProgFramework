/******************************************************************************
***
* ITE5315 – Assignment 1
* I declare that this assignment is my own work in accordance with Humber Academic Policy. 
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
* 
* Name: Sandeep Das Student ID: N01472825 Date: October 4th
*
*
******************************************************************************
**/
// Import express
const express = require('express');
// Import routes
const routes = require('./routes')

// Initialize express app
const app = express();
// app.all('/', function (req, res, next) {
//      console.log('Accessing the site ...')
//      next() // pass control to the next handler
//      })
    
// Attach routes to app
app.use('/', routes)

app.all("*", (req,res) =>{
    res.status(404).sendFile('404.html', {root: __dirname })


     })

// Set constant for port
const PORT = process.env.PORT || 5500

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));