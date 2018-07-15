const express = require('express');
const chatRouter = express.Router();

const mongoose = require('mongoose');

require('../models/message.model');

const MessageListDB = mongoose.model('message');

const ChatService = {

  wsConnection: undefined,

  wsClients: undefined,

  getAllMessages(req, res) {
    MessageListDB.find({})
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getMessagesByChatID(req, res) {
    MessageListDB.find({chat_id: req.params.id}), sort({'date': -1}).limit(20).exec((error, messages) => {

    })
      .then(messages => {
        res.send(messages);
      })
      .catch(err => {
        console.log(err);
      });
  },

  getUserToEmail(req, res) {
    MessageListDB.findOne({email: {$eq: req.body.email}})
      .then((user) => {
        if (user) {
          if (user.password === req.body.password) {
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

  saveMessage(req, clients) {

    let message = new MessageListDB(JSON.parse(req));

    message.save()
      .then(messageSaved => {
        console.log('messageSaved:', messageSaved);

        clients.forEach(client => {
          client.send(JSON.stringify(messageSaved));
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  updateUser(req, res) {

    const userToUpdate = Object.assign({}, req.body);
    delete userToUpdate._id;

    MessageListDB.findOneAndUpdate({_id: req.body._id}, userToUpdate, {
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

  deleteMessageById(req, res) {

    MessageListDB.find({_id: req.params.id})
      .remove()
      .then(message => {
        console.log(message);


        this.wsClients.forEach(client => {
          client.send(JSON.stringify({
            type: 'MESSAGE_ID_TO_DELETE',
            id: req.params.id
          }));
        });

        res.end();
      })
      .catch(err => {
        console.log(err);
      });
  },

  getWsConnection() {
    if (typeof this.wsConnection !== 'undefined') {
      return this.wsConnection;
    }
    return null;
  },

  setWsConnection(ws) {
    this.wsConnection = ws;
  }
};

chatRouter.get('/', (req, res) => {

  ChatService.getAllMessages(req, res);

});

chatRouter.get('/:id', (req, res) => {

  ChatService.getMessagesByChatID(req, res);

});

// chatRouter.post('/', (req, res) => {
//
//     let requestMessage = {
//         sender: req.body.sender,
//         content: req.body.content,
//         date: req.body.date,
//         read: req.body.read,
//         chat_id: req.body.chat_id
//     };
//
//     let message = new MessageListDB(requestMessage);
//
//     ChatService.saveMessage(req, res, message);
//
// });

chatRouter.put('/', (req, res) => {

  ChatService.updateUser(req, res);

});

chatRouter.delete('/:id', (req, res) => {

  ChatService.deleteMessageById(req, res);

});

module.exports = {chatRouter, ChatService};
