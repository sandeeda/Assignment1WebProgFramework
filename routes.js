const express = require('express')
// Create router
const router = express.Router()

const fs = require('fs');
let myData = fs.readFileSync('dataset.json');
let books = JSON.parse(myData);

// Initialize built-in middleware for urlencoding and json
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

// Create your endpoints/route handlers 

// Chained router route for Root Route
router.route("/")
    .get(function (req, res) {
        res.send('<h1>Sandeep N01472825</h1>')
    })

   

// This path will match to /data
router.get('/data', (req, res) => {
    
    console.dir(books, {'maxArrayLength': null})
    res.send("“JSON data is loaded and ready!");
})

//Get book ISBN details by ISBN index
router.get('/data/isbn/:index', (req, res) => {
    let queryIndex = req.params.index;
    if(queryIndex>=0 && queryIndex<books.length){
        res.status(200).send(books[queryIndex].ISBN);
    }
    res.send("Index out of bounds!");
    
    
})

//Get book details by ISBN
router.route('/data/search/isbn')
    .get(function(req,res)  {
        res.status(200).sendFile('searchISBN.html', {root: __dirname })
    })
    .post(function(req,res){
        let queryISBN = req.body.isbn;
        console.log(queryISBN);
        books.forEach(element => {
            if(element.ISBN == queryISBN){
                res.status(200).send(element);
            }
        });
        res.status(200).send("Tried hard! BUT not found");
    })

    
//Get book details by Title
router.route('/data/search/title')
.get(function(req,res)  {
    res.status(200).sendFile('searchTitle.html', {root: __dirname })
})
.post(function(req,res){
    let queryTitle = req.body.title;
    console.log(queryTitle);
    var booksWithTitle =  JSON.parse('{"foundBooks":[]}');
    var found = 0;
    books.forEach(element => {
        if(element.title.toLowerCase().includes(queryTitle.toLowerCase())){
            booksWithTitle['foundBooks'].push(element);
            found++;
        }
    });
    if (found != 0)
    {
        res.status(200).send(booksWithTitle.foundBooks);
    }
    
    res.status(200).send("Tried hard! BUT not found");
})

// Export router
module.exports = router