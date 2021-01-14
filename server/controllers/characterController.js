const Character = require('../models/characterModel');

const characterController = {};

characterController.getCharacters = (req, res, next) => {
  Character.find({}, (err, data) => {
    if(err) {
      return next({
        log: `Express error handler caught in getCharacters ERROR: ${err}`,
        message: { err: 'An error occurred' },
      });
    }
    else {
      res.locals.list = data.map( ele => ele.name);
      return next();
    }
  });
};

characterController.addCharacter = (req, res, next) => {
  Character.create({name:req.body.state, spells:[]}, (err, data) => {
    if(err) {
      return next({
        log: `Express error handler caught in addCharacter ERROR: ${err}`,
        message: { err: 'An error occurred' },
      });
    }
    else {
      res.locals.added = data.toString();
      return next();
    }
  });
};

characterController.deleteCharacter = (req, res, next) => {
    //console.log(req.body.state);
    Character.findOneAndDelete({name:req.body.state}, (err, data) => {
      if(err) {
        return next({
          log: `Express error handler caught in deleteCharacter ERROR: ${err}`,
          message: { err: 'An error occurred' },
        });
      }
      else {
        res.locals.deleted = data.toString();
        return next();
      }
    });
  };

  module.exports = characterController;