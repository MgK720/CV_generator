const express = require('express')
const bodyParser = require('body-parser')
const upload_img = require('./api/upload_img')
const app = express()
const db = require('./api/create')
const { getCv } = require('./api/get');
const port = 3000


app.use(bodyParser.json())
app.use(express.urlencoded({extended: true})); 
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render('index');
  });

app.get("/cv/:id", getCv);

app.post('/cv', upload_img.uploadFile, db.createCv)

app.listen(port, () => {
      console.log(`App running on port ${port}.`)
})



