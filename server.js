require('zone.js/dist/zone-node');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');


const bootstrap = require('./dist-server/main.bundle');
const cors = require('cors');

const app = express();

const bodyParser = require('body-parser');
require('./db/dbConnection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());

app.get('/', (req, res) => res.render('index', {req, res}));

app.use(express.static(`${__dirname}/dist`));

app.engine('html', ngUniversal.ngExpressEngine({
    bootstrap: bootstrap.AppServerModuleNgFactory
}));
app.set('view engine', 'html');
app.set('views', 'dist');


const apiRouter = require('./router/userRouter').apiRouter;
const chatRouter = require('./router/chatRoutes').chatRouter;
app.use('/api', apiRouter);
app.use('/chat', chatRouter);

require('./sockets/chat.socket');

app.get('*', (req, res) => res.render('index', {req, res}));

app.listen(3000, () => console.log(`Listening on http://localhost:3000`));
