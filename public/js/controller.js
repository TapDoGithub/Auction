document.addEventListener('DOMContentLoaded', function() {
    const socket = connectWebSocket('controller');
    
    const itemNameInput = document.getElementById('item-name');
    const currentPriceInput = document.getElementById('current-price');
    const floorPriceInput = document.getElementById('floor-price');
    const minRaiseInput = document.getElementById('min-raise');
    const totalRaisedInput = document.getElementById('total-raised');
    const updateDisplayBtn = document.getElementById('update-display');
    
    updateDisplayBtn.addEventListener('click', function() {
        const data = {
            type: 'update',
            item: itemNameInput.value,
            currentPrice: parseFloat(currentPriceInput.value) || 0,
            floorPrice: parseFloat(floorPriceInput.value) || 0,
            minRaise: parseFloat(minRaiseInput.value) || 0,
            totalRaised: parseFloat(totalRaisedInput.value) || 0
        };
        
        socket.send(JSON.stringify(data));
    });
});