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
    // assign all values of molecules to 0
    return this.toIntent('ClassroomIntent');
  },
  ClassroomIntent() {
    this.ask('Would you like to add a molecule?');
    this.tell('You have added' + this.)
  }
});

// s3.deleteObject(params = {}, callback) => AWS.REQUEST
// s3.deleteObjects(params = {}, callback) => AWS.REQUEST
// s3.putPublicAccessBlock(params = {}, callback) => AWS.REQUEST
// s3.putObject(params = {}, callback) => AWS.REQUEST

module.exports.alexa = alexa;