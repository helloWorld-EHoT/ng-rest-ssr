const express = require('express');
const apiRouter = express.Router();

// const usersService = require('../db/dbService');

const mongoose = require('mongoose');

require('../models/user.model');

const UserListDB = mongoose.model('user');

const UsersService = {

  getAllUsers(req, res) {
    UserListDB.find({})
      .then(users => {
        res.send(users);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getUserById(req, res) {
    UserListDB.findOne({_id: req.params.id})
      .then(user => {
        res.send(user);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getUserToEmail(req, res) {
    UserListDB.findOne({email: {$eq: req.body.email}})
      .then((user) => {
        if (user) {
          if (user.password === req.body.password) {
            user.online = true;
            res.send(user);
            res.end();
          }
        } else {
          res.send('Password is incorrect');
        }
      })
      .catch(err => {
        res.send('Password is incorrect');
        console.log(err);
      });
  },

  addNewUser(req, res, user) {

    user.save()
      .then(newUser => {
        console.log(newUser);
        res.end();
      })
      .catch(err => {
        console.log(err);
      });
  },

  updateUser(req, res) {

    const userToUpdate = Object.assign({}, req.body);
    delete userToUpdate._id;

    UserListDB.findOneAndUpdate({_id: req.body._id}, userToUpdate, {
      upsert: true, new: true, runValidators: true
    }, (error, item) => {
      if (error) {
        console.log(error);
      } else {
        console.log(item);
        res.end();
      }
    })
  },

  deleteUserById(req, res) {
    // UserListDB.find({_id: req.params.id})
    UserListDB.find({_id: req.params.id})
      .remove()
      .then(newUser => {
        console.log(newUser);
        res.end();
      })
      .catch(err => {
        console.log(err);
      });
  }
};

apiRouter.get('/', (req, res) => {

  UsersService.getAllUsers(req, res);

});

apiRouter.get('/:id', (req, res) => {

  UsersService.getUserById(req, res);

});

apiRouter.post('/auth/', (req, res) => {

  UsersService.getUserToEmail(req, res);

});

apiRouter.post('/', (req, res) => {

  let config = {
    name: req.body.name,
    login: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  let user = new UserListDB(config);

  UsersService.addNewUser(req, res, user);

});

apiRouter.put('/', (req, res) => {

  UsersService.updateUser(req, res);

});

apiRouter.delete('/:id', (req, res) => {

  UsersService.deleteUserById(req, res);

});

module.exports = apiRouter;
