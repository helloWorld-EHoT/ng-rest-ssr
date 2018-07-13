const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const WebSocket = require('ws');
const wsServer = new WebSocket.Server({server});

const ChatService = require('../router/chatRoutes').ChatService;

wsServer.on('connection', (ws) => {

    console.log('connection detected');
    ChatService.setWsConnection(ws);
    ChatService.wsClients = wsServer.clients;

    ws.on('message', (message) => {

        console.log('received: %s', message);

        const status = JSON.parse(message);

        if (typeof status.content !== "undefined") {
            if (status.content === 'USER_DISCONNECTED') {
                console.log(status.content);
                wsServer.clients.forEach(client => {
                        client.send(JSON.stringify({
                            sender: 'server',
                            sender_id: '666',
                            content: `${status.sender} disconnected`,
                            date: Date.now().toString(),
                            chat_id: 'our',
                            read: true,
                            online: true
                        }));
                    });

            } else {
                ChatService.saveMessage(message, wsServer.clients);
            }
        }

    });

    ws.on('close', function (status) {
        console.log('connection closed', status);
        // wsServer.clients
        //     .forEach(client => {
        //         client.send(JSON.stringify({
        //             sender: 'server',
        //             sender_id: '666',
        //             content: `Client disconnected`,
        //             date: Date.now().toString(),
        //             chat_id: 'our',
        //             read: true,
        //             online: true
        //         }));
        //     });

    });
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

module.exports = wsServer;