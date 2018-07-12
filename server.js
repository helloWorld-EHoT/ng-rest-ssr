require('zone.js/dist/zone-node');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');


const bootstrap = require('./dist-server/main.bundle');
const cors = require('cors');

const app = express();


const http = require('http');
const server = http.createServer(app);
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({server});

wsServer.on('connection', (ws) => {
    // Сокдинение обнаружено, клиент успешно подключился
    console.log('connection detected');
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);

        wsServer.clients
            .forEach(client => {
                // if (client != ws) {
                client.send(message);
                // }
            });
    });

    ws.on('close', function () {
        console.log('connection closed');
        wsServer.clients
            .forEach(client => {
                client.send(JSON.stringify({
                    sender: 'server',
                    content: 'Client disconnected',
                    date: Date.now().toString()
                }));
            });
    });

    //send immediatly a feedback to the incoming connection
    ws.send(
    JSON.stringify({
            sender:"server",
            content:"Hi there,\n I am a WebSocket server.\n How are you?",
            date:"1531343675751"
        })
    );
});

// wsServer.on('disconnect');

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});


const bodyParser = require('body-parser');
const dbConnection = require('./db/dbConnection').db;

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


const apiRouter = require('./router/Router');
app.use('/api', apiRouter);

app.get('*', (req, res) => res.render('index', {req, res}));

app.listen(3000, () => console.log(`Listening on http://localhost:3000`));
