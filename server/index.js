const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
// const pt = require('periodic-table');
const s3 = new aws.S3();

const SERVER_PORT = 3000;
// require('./alexa');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('../client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'));
});


app.get('/api/chemData', (req, res) => {

  let chemData = {
    "glucose": { "count": 0 },
    "oxygen": { "count": 0 },
    "uranium": { "count": 0 }
  };

  res.send(chemData);
});


app.post('/api/alexaData', (req, res) => {
  var getParams = {
    Bucket: 'abc', // your bucket name,
    Key: 'abc.txt' // path to the object you're looking for
}

s3.getObject(getParams, function(err, data) {
    // Handle any error and exit
    if (err)
        return err;

  // No error happened
  // Convert Body from a Buffer to a String

  let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
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