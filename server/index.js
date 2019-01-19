const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const aws = require('aws-sdk');
// const pt = require('periodic-table');

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


app.get('/api/data', (req, res) => {

  let chemData = {
    "glucose": { "count": 0 },
    "oxygen": { "count": 0 },
    "uranium": { "count": 0 }
  };

  res.send(chemData);
});


const s3 = new aws.S3();
params = {
  Bucket: "s3/cruzhacks",
  Key: "TILES/Level4/A3_B3_C2/.par"
}
app.post('/api/alexa', (req, res) => {
    aws.getSignedUrl('getObject', params, function (err, url) {
      console.log(url);
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