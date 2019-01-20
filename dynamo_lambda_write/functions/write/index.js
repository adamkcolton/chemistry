console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

exports.handle = function(e, ctx, callback) {
  var params = {
    Item: {
      date: Date.now(),
      element: e.element,
      amount: e.amount,
    },
    TableName: 'guestbook'
  };

  docClient.put(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
}
