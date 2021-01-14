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
  Character.create({name:req.body.name, spells:[]}, (err, data) => {
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
    Character.findOneAndDelete({name:req.body.name}, (err, data) => {
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

  characterController.loadSpells = (req, res, next) => {
    Character.findOne({name:req.params.charName}, (err, data) => {
      if(err) {
        return next({
          log: `Express error handler caught in loadSpells ERROR: ${err}`,
          message: { err: 'An error occurred' },
        });
      }
      else {
        res.locals.list = data.spells;
        return next();
      }
    });
  };

  characterController.updateSpellList = (req, res, next) => {
    Character.findOneAndUpdate({name:req.body.name}, {spells:req.body.spells}, (err, data) => {
      if(err) {
        return next({
          log: `Express error handler caught in updateSpellList ERROR: ${err}`,
          message: { err: 'An error occurred' },
        });
      }
      else {
        res.locals.oldList = data.spells;
        return next();
      }
    });
  };

  module.exports = characterController;