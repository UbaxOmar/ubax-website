let currentBalance = 0.00;
let totalEarnings = 0.00;
let adsWatched = 0;
let isWatchingAd = false;

const balanceDisplay = document.querySelector('.balance');
const watchAdBtn = document.getElementById('watchAdBtn');
const totalEarningsDisplay = document.getElementById('totalEarnings');
const adsWatchedDisplay = document.getElementById('adsWatched');
const navLinks = document.querySelectorAll('.nav-link');
const videoContainer = document.getElementById('videoContainer');
const cartoonVideo = document.getElementById('cartoonVideo');

// Create progress bar
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar';
progressBar.style.display = 'none';
watchAdBtn.parentNode.insertBefore(progressBar, watchAdBtn.nextSibling);

// Handle navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Show reward animation
function showReward() {
    const rewardPopup = document.createElement('div');
    rewardPopup.className = 'reward-popup';
    rewardPopup.textContent = '+$0.05';
    document.querySelector('.ad-section').appendChild(rewardPopup);
    
    setTimeout(() => rewardPopup.remove(), 1500);
}

// Handle video watching
watchAdBtn.addEventListener('click', () => {
    if (isWatchingAd) return;
    
    isWatchingAd = true;
    watchAdBtn.disabled = true;
    watchAdBtn.textContent = 'Watching Cartoon...';
    videoContainer.style.display = 'block';
    cartoonVideo.style.display = 'block';
    cartoonVideo.play();
    
    let videoStartTime = 0;
    const minWatchTime = 15; // Minimum watch time in seconds
    
    cartoonVideo.addEventListener('timeupdate', function videoTimeUpdate() {
        const timeWatched = Math.floor(cartoonVideo.currentTime - videoStartTime);
        const progress = Math.min((timeWatched / minWatchTime) * 100, 100);
        progressBar.style.display = 'block';
        progressBar.style.width = `${progress}%`;
        
        if (timeWatched < minWatchTime) {
            watchAdBtn.textContent = `Watching Cartoon... ${minWatchTime - timeWatched}s`;
        } else {
            const earnings = 0.05;
            totalEarnings += earnings;
            currentBalance += earnings;
            adsWatched++;
            
            // Update displays
            totalEarningsDisplay.textContent = formatCurrency(totalEarnings);
            adsWatchedDisplay.textContent = adsWatched;
            updateBalance(currentBalance);
            
            // Show reward and reset UI
            showReward();
            watchAdBtn.disabled = false;
            watchAdBtn.textContent = 'Watch Cartoon';
            progressBar.style.display = 'none';
            videoContainer.style.display = 'none';
            cartoonVideo.style.display = 'none';
            cartoonVideo.pause();
            cartoonVideo.currentTime = 0;
            isWatchingAd = false;
            
            // Remove the timeupdate listener
            cartoonVideo.removeEventListener('timeupdate', videoTimeUpdate);
        }
    });
});

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

function updateBalance(newBalance) {
    currentBalance = newBalance;
    balanceDisplay.textContent = formatCurrency(newBalance);
}