const express = require('express');
const apiRouter = express.Router();

// const usersService = require('../db/dbService');

const mongoose = require('mongoose');

require('../models/user.model');
const crypto = require('crypto');
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

  getUserByEmail(req, res) {
    UserListDB.findOne({email: {$eq: this.getHash(req.body.email)}})
      .then((user) => {
        if (user) {
          if (user.password === this.getHash(req.body.password)) {
            user.online = true;
            res.send(user);
            res.end();
          } else {
            res.send('PASS');
            res.end();
          }
        } else {
          res.send('MAIL');
          res.end();
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
        // console.log(newUser);
        res.send(newUser);
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
      .then(() => {
        // console.log(newUser);
        res.end();
      })
      .catch(err => {
        console.log(err);
      });
  },

  isEmailAvailable(req, res) {
    UserListDB.findOne({email: {$eq: this.getHash(req.params.email)}})
      .then((user) => {
        if (!user) {
          res.send({});
            res.end();
        } else {
          res.send(user);
          res.end();
        }
      })
      .catch(err => {
        console.log(err);
      });
  },

  getHash(inputString) {
    const outputString = crypto.createHash('md5').update(inputString).digest('hex');
    return outputString;
  }
};

// get all users
apiRouter.get('/', (req, res) => {

  UsersService.getAllUsers(req, res);

});

// get user by id
apiRouter.get('/:id', (req, res) => {

  UsersService.getUserById(req, res);

});

// get user by email
apiRouter.post('/auth/', (req, res) => {

  UsersService.getUserByEmail(req, res);

});

// add new user to db
apiRouter.post('/', (req, res) => {

  let config = {
    name: req.body.name,
    login: req.body.name,
    email: UsersService.getHash(req.body.email),
    password: UsersService.getHash(req.body.password),
    online: true
  };

  // console.log(crypto.createHash('md5').update(req.body.email).digest('hex'));

  let user = new UserListDB(config);

  UsersService.addNewUser(req, res, user);

});

// update user by id
apiRouter.put('/', (req, res) => {

  UsersService.updateUser(req, res);

});

// delete user by id
apiRouter.delete('/:id', (req, res) => {

  UsersService.deleteUserById(req, res);

});

// get user by id
apiRouter.get('/email/:email', (req, res) => {

  UsersService.isEmailAvailable(req, res);

});

module.exports = apiRouter;
