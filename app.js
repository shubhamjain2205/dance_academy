const express = require("express");
const path = require("path");
const app = express();
// const port = 8000;
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const Contact = mongoose.model('Contact', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

//Endpoints
app.get('/', (req, res) => {
    const params = {  }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {  }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been save to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
})


// START THE SERVER
// app.listen(port, () => {
//     console.log(`The application started successfully on port ${port}`);
// });

app.listen(process.env.PORT || 5000)
