// const mongoose = require('mongoose');
//
// require('../models/user.model');
//
// const User = mongoose.model('user');
//
// const UsersService = {
//   getAllUsers() {
//     User.find({})
//       .then(users => {return users;})
//       .catch(err => {console.log(err);});
//   },
//   getUserById(id) {
//     User.findOne({_id: id})
//       .then(user => {return user;})
//       .catch(err => {console.log(err);});
//   },
// };

// User.find({}).then(user => {console.log(user);}).catch(err => {console.log(err);});

// const user = new User({
//   name: 'Another User',
//   login: 'user',
//   email: 'user@mail.com',
//   password : 'query'
// });

// user.save().then(user => {console.log(user);}).catch(err => {console.log(err);});

// module.exports = UsersService;
