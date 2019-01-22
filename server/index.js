const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
const fetch = require('node-fetch');
const s3 = new aws.S3();
const pt = require('periodic-table');

const SERVER_PORT = 3000;
// require('./alexa');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('../docs'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'));
});


app.get('/api/chemData', (req, res) => {

  let chemData = {
    "glucose": { "amount": 0 },
    "oxygen": { "amount": 0 },
    "uranium": { "amount": 0 }
  };

  res.send(chemData);
});

app.get('/api/mData', (req, res) => {
  var allElements = pt.all();
  var o = pt.elements.Oxygen;
  var h = pt.elements.Hydrogen;
  var u = pt.elements.Uranium;

  // var molecules = [o,h,u];
  // console.log(molecules[0].symbol);
  // console.log(o.symbol);
  for (var i = 0; i < allElements.length; i++) {
    console.log(allElements[i].name + ",");
  }

});


app.post('/api/alexaData', (req, res) => {
  var params = {
    Bucket: "s3/cruzhacks",
    Key: "molecules"
  };

  s3.getObject(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      fetch('https://s3.amazonaws.com/cruzhacks/schema.json')
        .then(res => res.json())
        .then(json => console.log(json));
    }
  });



});

app.use((req, res) => {
  res.status(404).json({
    message: 'resource not found',
  });
});

http.listen(process.env.PORT || SERVER_PORT, () => {
  console.log(`Server started on http://localhost:${SERVER_PORT}`);
});