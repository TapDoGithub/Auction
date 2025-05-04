// Shared WebSocket connection
let socket = null;

function connectWebSocket(role) {
    const serverIP = window.location.hostname;
    socket = new WebSocket(`ws://${serverIP}:8080`);

    socket.onopen = function() {
        console.log(`${role} connected`);
        socket.send(JSON.stringify({
            type: 'register',
            role: role
        }));
    };

    socket.onclose = function() {
        console.log(`${role} disconnected`);
    };

    return socket;
}

function formatCurrency(amount) {
    return Math.round(amount || 0).toLocaleString() + ' VND';
}