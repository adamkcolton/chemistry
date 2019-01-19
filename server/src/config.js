// ------------------------------------------------------------------
// APP CONFIGURATION
// ------------------------------------------------------------------

module.exports = {
  logging: true,
  intentMap: {
    'AMAZON.StopIntent': 'END'
  },
  db: {
    FileDB: {
      pathToFile: '../db/db.json'
    }
  }
};