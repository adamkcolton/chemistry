'use strict';

const { Webhook, ExpressJS, Lambda } = require('jovo-framework');
const { alexa } = require('./alexa.js');
const DB = require('./dynamo');
const Dynamo = new DB();

const putMolecule = async event => {
    let { molecule } = JSON.parse(event.body);
    let amount = event.pathParameters.amount;
    let ID = `${molecule}-${amount}`;
    return Dynamo.increment(ID, 'chemistry-api')
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
    if (event.httpMethod === 'PUT') {
        let response = await putMolecule(event)
        return done(response);
    }
    await alexa.handle(new Lambda(event, context, callback));
};
