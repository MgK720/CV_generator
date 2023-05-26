const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.post('/cv', db.createCv)

app.listen(port, () => {
      console.log(`App running on port ${port}.`)
})



