const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// WebSocket server
const wss = new WebSocket.Server({ server });

let controller = null;
const displays = new Set();

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        
        if (data.type === 'register') {
            if (data.role === 'controller') {
                controller = ws;
                console.log('Controller connected');
            } else if (data.role === 'display') {
                displays.add(ws);
                console.log('Display connected');
            }
        } else if (data.type === 'update') {
            // Broadcast to all displays
            displays.forEach(display => {
                if (display.readyState === WebSocket.OPEN) {
                    display.send(JSON.stringify(data));
                }
            });
        }
    });

    ws.on('close', () => {
        if (ws === controller) {
            controller = null;
            console.log('Controller disconnected');
        } else {
            displays.delete(ws);
            console.log('Display disconnected');
        }
    });
});

server.listen(8080, '0.0.0.0', () => {
    console.log(`Server running on:
    - http://localhost:8080
    - http://${require('ip').address()}:8080`);
});