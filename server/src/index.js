'use strict';

const {
  Webhook,
  ExpressJS,
  Lambda
} = require('jovo-framework');
const {
  alexa
} = require('./alexa.js');
const DB = require('./dynamo');
const Dynamo = new DB();

const done = response => {
  return {
    statusCode: '200',
    body: JSON.stringify(response),
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*'
    }
  }
}

const molecules = {
  oxygen: '78',
  hydrogen: '143',
  carbon: '46',
  helium: '56',
  uranium: '7',
}

const getmolecules = event => {
  let element = event.pathParameters.element;
  return molecules[element];
}

const putmolecules = async event => {
  let {
    molecules
  } = JSON.parse(event.body);
  let element = event.pathParameters.element;
  let ID = `${molecules}-${element}`;
  return Dynamo.increment(ID, 'molecules-element')
}

// ------------------------------------------------------------------
// HOST CONFIGURATION
// ------------------------------------------------------------------

// ExpressJS (Jovo Webhook)
if (process.argv.indexOf('--webhook') > -1) {
  const port = process.env.PORT || 3000;
  Webhook.jovoApp = alexa;

  Webhook.listen(port, () => {
    console.info(`Local server listening on port ${port}.`);
  });

  Webhook.post('/webhook', async (req, res) => {
    await alexa.handle(new ExpressJS(req, res));
  });
}

// AWS Lambda
exports.handler = async (event, context, callback) => {
  console.log(event);
  if (event.httpMethod === 'PUT') {
    let response = await putmolecules(event)
    return done(response);
  } else if (event.httpMethod === 'GET') {
    let response = getmolecules(event);
    return done(response);
  }

  await alexa.handle(new Lambda(event, context, callback));
};