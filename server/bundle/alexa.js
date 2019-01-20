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
    let speech = 'Welcome to chemistry class!';
    let reprompt = 'Please answer with yes or no.';
    this.followUpState('ChemistryClassroom').ask(speech, reprompt);
  },

  'ChemistryClassroom': {
    addOxygen() {
      this.ask('adding six oxygen');
    },
    addGlucose() {
      this.ask('adding one glucose');
    },
    addActivationEnergy() {
      this.ask('adding activation energy');
    },
    resetClass() {
      this.ask('Done');
    },
    addUranium() {
      this.ask('Be careful!');
    }
  }
});
// this.tell('Add one glucose');
//     this.ask('Done');
//     this.tell('Add six Oxygen');
//     this.ask('Done');
//     this.tell('Add activation energy');
//     this.ask('Kaplow!');
//     this.tell('Clear');
//     this.ask('Done');
//     this.tell('Add Uranium');
//     this.ask('Carefull with that!');

// s3.deleteObject(params = {}, callback) => AWS.REQUEST
// s3.deleteObjects(params = {}, callback) => AWS.REQUEST
// s3.putPublicAccessBlock(params = {}, callback) => AWS.REQUEST
// s3.putObject(params = {}, callback) => AWS.REQUEST

module.exports.alexa = alexa;