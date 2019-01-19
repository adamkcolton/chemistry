'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { GoogleAssistant } = require('jovo-platform-googleassistant');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const alexa = new App();

alexa.use(
  new Alexa(),
  new GoogleAssistant(),
  new JovoDebugger(),
  new FileDb()
);

// ------------------------------------------------------------------
// APP Logic
// ------------------------------------------------------------------

alexa.setHandler({
  LAUNCH() {
    return this.toIntent('ChemistryIntent');
  },
  ChemistryIntent() {
    this.ask('What would you like to learn today');
  }
});

module.exports.alexa = alexa;