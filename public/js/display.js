document.addEventListener('DOMContentLoaded', function() {
    const socket = connectWebSocket('display');
    
    const displayItem = document.getElementById('display-item');
    const displayCurrentPrice = document.getElementById('display-current-price');
    const displayFloorPrice = document.getElementById('display-floor-price');
    const displayMinRaise = document.getElementById('display-min-raise');
    const displayTotalRaised = document.getElementById('display-total-raised');
    
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        
        if (data.type === 'update') {
            if (data.item) {
                displayItem.querySelector('span').textContent = data.item;
            }
            
            displayCurrentPrice.textContent = formatCurrency(data.currentPrice);
            displayFloorPrice.textContent = formatCurrency(data.floorPrice);
            displayMinRaise.textContent = formatCurrency(data.minRaise);
            displayTotalRaised.textContent = formatCurrency(data.totalRaised);
        }
    };
});