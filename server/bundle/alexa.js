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
    return this.toIntent('LessonOneIntent');
  },
  ChemistryIntent() {
    this.tell('What would you like to learn today');
    this.toIntent('LessonOneIntent');
  },
  LessonOneIntent() {
    this.tell('Dan where are all my molecules');
    this.tell('You know, because we are learning about Molecular Structures');
    this.ask('What Molecular Structure would you like to learn today');
  },
  LessonTwoIntent() {
    this.tell('Brian what is lesson two about');
    this.ask('Would you like to discuss, Stoichiometry')
    if (this.types[2].values.value == 'yes') {
      this.ask('What would you like to learn about Stoichiometry today');
      this.tell('yeah aight');
    }
  }
});

module.exports.alexa = alexa;