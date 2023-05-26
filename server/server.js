const express = require('express')
const bodyParser = require('body-parser')
const upload_img = require('./upload_img')
const app = express()
const db = require('./queries')
const port = 3000


app.use(bodyParser.json())
app.use(express.urlencoded({extended: true})); 
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.post('/cv', upload_img.upload, db.createCv)

app.listen(port, () => {
      console.log(`App running on port ${port}.`)
})



