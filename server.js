require('zone.js/dist/zone-node');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');

const bootstrap = require('./dist-server/main.bundle');

const app = express();

app.get('/', (req, res) => res.render('index', {req, res}));

app.use(express.static(`${__dirname}/dist`));

app.engine('html', ngUniversal.ngExpressEngine({
  bootstrap: bootstrap.AppServerModuleNgFactory
}));
app.set('view engine', 'html');
app.set('views', 'dist');

app.get('*', (req, res) => res.render('index', {req, res}));

app.listen(3000, () => console.log(`Listening on http://localhost:3000`));
