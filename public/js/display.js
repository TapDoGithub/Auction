document.addEventListener('DOMContentLoaded', function() {
    const socket = connectWebSocket('display');
    
    const displayItem = document.getElementById('display-item');
    const displayCurrentPrice = document.getElementById('display-current-price');
    const displayFloorPrice = document.getElementById('display-floor-price');
    const displayMinRaise = document.getElementById('display-min-raise');
    const displayTotalRaised = document.getElementById('display-total-raised');
    const progressBar = document.querySelector('.progress-bar');
    var progressLabel = document.querySelector('.progress-label');
    const goal = 1500;
    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        
        if (data.type === 'update') {
            if (data.item) {
                displayItem.querySelector('span').textContent = data.item;
            }
            var progress = data.totalRaised / goal * 100
            displayCurrentPrice.textContent = formatCurrency(data.currentPrice);
            displayFloorPrice.textContent = formatCurrency(data.floorPrice);
            displayMinRaise.textContent = formatCurrency(data.minRaise);
            progressBar.style.height = `${progress*0.8}%`;
            progressLabel.textContent = `${Math.round(progress)}% \n (${Math.round(data.totalRaised)} / ${goal})k VND`;
            if (progress >= 100) {
                progressBar.style.backgroundColor = '#28a745'; // Green
            } else if (progress >= 70) {
                progressBar.style.backgroundColor = '#17a2b8'; // Teal
            } else if (progress >= 40) {
                progressBar.style.backgroundColor = '#ffc107'; // Yellow
            } else if (progress > 0) {
                progressBar.style.backgroundColor = '#fd7e14'; // Orange
            } else {
                progressBar.style.backgroundColor = '#dc3545'; // Red
            }
        }
    };
});