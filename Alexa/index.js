// to zip and push to aws the command is `zip -r bundle.zip .`
const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the ChemisTRY classroom!';

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Introduction', speechText)
      .getResponse();
    console.log(response);
    return response;
  }
};

const AddOxygenIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddOxygenIntent';
  },
  handle(handlerInput) {
    const speechText = 'Oxygen ' + handlerInput  + ' has been added';

    const response =  handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Oxygen', speechText)
      .getResponse();
    console.log(response);
    return response;
  }
};

const AddHydrogenIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddHydrogenIntent';
  },
  handle(handlerInput) {
    const speechText = 'Hydrogen has been added';

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hydrogen', speechText)
      .getResponse();

    return response;
  }
};

const AddCarbonIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddCarbonIntent';
  },
  handle(handlerInput) {
    const speechText = 'Carbon has been added';

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Carbon', speechText)
      .getResponse();
    
    return response;
  }
};

const AddUraniumIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddUraniumIntent';
  },
  handle(handlerInput) {
    const speechText = 'Uranium has been added';

    const response =  handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Uranium', speechText)
      .getResponse();

    return response;
  }
};

const AddGlucoseIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddGlucoseIntent';
  },
  handle(handlerInput) {
    const speechText = 'Glucose has been added';

    const response =  handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Glucose', speechText)
      .getResponse();

    return response;
  }
};

const AddElementIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddElementIntent';
  },
  handle(handlerInput) {
    const speechText = 'Element has been added';

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Element', speechText)
      .getResponse();

    return response;
  }
};

const AddMoleculeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddMoleculeIntent';
  },
  handle(handlerInput) {
    const speechText = 'Molecule has been added';

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Molecule', speechText)
      .getResponse();

    return response;
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Help', speechText)
      .getResponse();
    
    return response;
  }
};

const NavigateHomeIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NavigateHomeIntent';
  },
  handle(handlerInput) {
    const speechText = 'Navigating back to the home conversation';

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Navigate Home', speechText)
      .getResponse();

    return response;
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    const response =  handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Cancel and Stop', speechText)
      .getResponse();

    return response;
  }
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    //any cleanup logic goes here
    return handlerInput.responseBuilder.getResponse();
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AddOxygenIntentHandler,
    AddHydrogenIntentHandler,
    AddCarbonIntentHandler,
    AddUraniumIntentHandler,
    AddGlucoseIntentHandler,
    AddElementIntentHandler,
    AddMoleculeIntentHandler,
    HelpIntentHandler,
    NavigateHomeIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();