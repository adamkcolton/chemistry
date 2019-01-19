const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const bodyParser = require('body-parser');
const pt = require('periodic-table');

const SERVER_PORT = 3000;
require('./alexa');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('../client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + 'index.html'));
});



app.get('/api/symbol', (req, res) => {
  let he = pt.elements.Helium
  elemSymbol = he.symbol;
  res.send(elemSymbol);
});

app.use((req, res) => {
  res.status(404).json({
    message: 'resource not found',
  });
});

http.listen(process.env.PORT || SERVER_PORT, () => {
  console.log(`Server started on http://localhost:${SERVER_PORT}`);
});