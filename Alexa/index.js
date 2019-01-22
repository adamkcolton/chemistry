// to zip and push to aws the command is `zip -r bundle.zip .`

const fetch = require('node-fetch');
const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome to the Chemistry classroom!';

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Introduction', speechText)
      .getResponse();

    return response;
  }
};

const AddOxygenIntentHandler = {
  canHandle(handlerInput) {
    console.log("handleInput: ",handlerInput.requestEnvelope.request.intent.name);
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddOxygenIntent';
  },
  handle(handlerInput) {
    const number = handlerInput.requestEnvelope.request.intent.slots.number.value;
    console.log("request: ", handlerInput);
    const speechText = `${number} Oxygen have been added`;

    const body = {
      element: 'Oxygen',
      amount: number,
    };

    fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(json => console.log(json));

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Oxygen', speechText)
      .getResponse();

    return response;
  }
};

const AddHydrogenIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddHydrogenIntent';
  },
  handle(handlerInput) {
    const number = handlerInput.requestEnvelope.request.intent.slots.number.value;
    const speechText = `${number} Hydrogen has been added`;

    const body = {
      element: 'Hydrogen',
      amount: number,
    };

    fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(json => console.log(json));

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
    const number = handlerInput.requestEnvelope.request.intent.slots.number.value;
    const speechText = `${number} Carbon has been added`;

    const body = {
      element: 'Carbon',
      amount: number,
    };

    fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(json => console.log(json));

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
    const number = handlerInput.requestEnvelope.request.intent.slots.number.value;
    const speechText = `${number} Uranium has been added`;

    const body = {
      element: 'Uranium',
      amount: number,
    };

    fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(json => console.log(json));

    const response = handlerInput.responseBuilder
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
    const number = handlerInput.requestEnvelope.request.intent.slots.number.value;
    const speechText = `${number} Glucose has been added`;

    const body = {
      element: 'Glucose',
      amount: number,
    };

    fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(json => console.log(json));

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Glucose', speechText)
      .getResponse();

    return response;
  }
};

// const AddElementIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
//       handlerInput.requestEnvelope.request.intent.name === 'AddElementIntent';
//   },
//   handle(handlerInput) {
//     console.log()
//     const number = handlerInput.requestEnvelope.request.intent.slots.number.value;
//     const element = 'Oxygen';
//     const speechText = `${number} ${element} has been added`;

//     const body = {
//       element: element,
//       amount: number,
//     };

//     fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
//         method: 'post',
//         body: JSON.stringify(body),
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       })
//       .then(res => res.json())
//       .then(json => console.log(json));


//     const response = handlerInput.responseBuilder
//       .speak(speechText)
//       .withSimpleCard('Element', speechText)
//       .getResponse();

//     return response;
//   }
// };

// const AddMoleculeIntentHandler = {
//   canHandle(handlerInput) {
//     return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
//       handlerInput.requestEnvelope.request.intent.name === 'AddMoleculeIntent';
//   },
//   handle(handlerInput) {
//     const number = handlerInput.requestEnvelope.request.intent.slots.number.value;
//     const molecule = 'Glucose';
//     const speechText = `${number} ${molecule} has been added`;

//     const body = {
//       element: molecule,
//       amount: number,
//     };

//     fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
//         method: 'post',
//         body: JSON.stringify(body),
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       })
//       .then(res => res.json())
//       .then(json => console.log(json));

//     const response = handlerInput.responseBuilder
//       .speak(speechText)
//       .withSimpleCard('Molecule', speechText)
//       .getResponse();

//     return response;
//   }
// };

const AddClearIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddClearIntent';
  },
  handle(handlerInput) {
    const speechText = 'Cleared all molecules';

    const body = {
      element: 'Clear',
      amount: 1,
    };

    fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(json => console.log(json));

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Clear', speechText)
      .getResponse();

    return response;
  }
};

const AddReactIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AddReactIntent';
  },
  handle(handlerInput) {
    const speechText = 'Making a Reaction';

    const body = {
      element: 'React',
      amount: 1,
    };

    fetch('https://kex84xe01m.execute-api.us-east-1.amazonaws.com/prod/entries', {
        method: 'post',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then(json => console.log(json));

    const response = handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('React', speechText)
      .getResponse();

    return response;
  }
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
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
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NavigateHomeIntent';
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

    const response = handlerInput.responseBuilder
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
    // AddElementIntentHandler,
    // AddMoleculeIntentHandler,
    AddClearIntentHandler,
    AddReactIntentHandler,
    HelpIntentHandler,
    NavigateHomeIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler)
  .addErrorHandlers(ErrorHandler)
  .lambda();