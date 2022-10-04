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