require('zone.js/dist/zone-node');

const express = require('express');
const mongoose = require('mongoose');
const ngUniversal = require('@nguniversal/express-engine');

const bootstrap = require('./dist-server/main.bundle');

const app = express();


const dbName = 'rest';
mongoose.connect(`mongodb://localhost:27017/${dbName}`, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log(`MongoDB connected to "${dbName}" database`);
});

  // .then(() => {console.log(`MongoDB connected to "${dbName}" database`);})
  // .catch(err => {console.log(err);});

require('./models/user.model');

const User = mongoose.model('user');

User.find({}).then(user => {console.log(user);}).catch(err => {console.log(err);});
// const user = new User({
//   name: 'Second User',
//   login: 'user2',
//   email: 'user2@mail.com',
//   password : 'qwerty'
// });

// user.save().then(user => {console.log(user);}).catch(err => {console.log(err);});

app.get('/', (req, res) => res.render('index', {req, res}));

app.use(express.static(`${__dirname}/dist`));

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: bootstrap.AppServerModuleNgFactory
}));
app.set('view engine', 'html');
app.set('views', 'dist');

app.get('*', (req, res) => res.render('index', {req, res}));

app.listen(3000, () => console.log(`Listening on http://localhost:3000`));
