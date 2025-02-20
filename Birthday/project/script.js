// Gallery variables and setup
let currentImageIndex = 0;
const images = document.querySelectorAll('.gallery-grid img');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const closeBtn = document.querySelector('.close');

// Random movement animation for gallery images
function initializeGalleryAnimations() {
    images.forEach(img => {
        setInterval(() => {
            const randomX = Math.random() * 10 - 5; // Random value between -5 and 5
            const randomY = Math.random() * 10 - 5;
            img.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.02)`;
            setTimeout(() => {
                img.style.transform = 'translate(0, 0) scale(1)';
            }, 500);
        }, Math.random() * 3000 + 2000); // Random interval between 2-5 seconds
    });
}

// Enhanced modal functionality
function enlargeImage(src) {
    modal.style.display = "block";
    modal.classList.add('show');
    modalImg.src = src;
    
    // Find the index of current image
    currentImageIndex = Array.from(images).findIndex(img => img.src === src);
    
    // Add keyboard navigation
    document.addEventListener('keydown', handleKeyPress);
    
    // Add zoom effect
    modalImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
        modalImg.style.transform = 'scale(1)';
    }, 50);
}

// Enhanced close modal function
function closeModal() {
    modal.classList.remove('show');
    modalImg.style.transform = 'scale(0.9)';
    setTimeout(() => {
        modal.style.display = "none";
        document.removeEventListener('keydown', handleKeyPress);
    }, 300);
}

// Enhanced image navigation
function changeImage(direction) {
    modalImg.style.transform = 'scale(0.9)';
    
    setTimeout(() => {
        currentImageIndex += direction;
        
        // Loop back to start/end if needed
        if (currentImageIndex >= images.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = images.length - 1;
        }
        
        modalImg.src = images[currentImageIndex].src;
        modalImg.style.transform = 'scale(1)';
    }, 200);
}

// Enhanced keyboard navigation
function handleKeyPress(e) {
    switch(e.key) {
        case "ArrowLeft":
            changeImage(-1);
            break;
        case "ArrowRight":
            changeImage(1);
            break;
        case "Escape":
            closeModal();
            break;
    }
}

// Enhanced host authentication
const HOST_CREDENTIALS = {
    username: 'Shafi12345',
    password: 'Shafi12345'
};

let isHostAuthenticated = false;
const hostPanel = document.getElementById('host-panel');

async function authenticateHost(username, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(username === HOST_CREDENTIALS.username && 
                   password === HOST_CREDENTIALS.password);
        }, 1000);
    });
}

async function toggleHostView() {
    if (!isHostAuthenticated) {
        const username = prompt('Enter host username:');
        if (!username) return;
        
        const password = prompt('Enter host password:');
        if (!password) return;
        
        const loadingMessage = showMessage('Authenticating...', 'info');
        
        try {
            const isAuthenticated = await authenticateHost(username, password);
            if (isAuthenticated) {
                isHostAuthenticated = true;
                showHostPanel();
                updateHostButton();
                showMessage('Successfully logged in as host!', 'success');
                fetchAndDisplayWishes();
            } else {
                showMessage('Invalid credentials!', 'error');
            }
        } catch (error) {
            showMessage('Authentication failed!', 'error');
        }
        
        loadingMessage.remove();
    } else {
        isHostAuthenticated = false;
        hideHostPanel();
        updateHostButton();
        showMessage('Logged out successfully!', 'success');
    }
}

// Enhanced wishes handling
async function submitWish(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('.send-wish-btn');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending Wishes... 🎈';
    submitButton.disabled = true;
    
    const formData = new FormData(event.target);
    const wish = {
        name: formData.get('entry.1018459429'),
        message: formData.get('entry.839337160'),
        timestamp: new Date().toISOString()
    };
    
    try {
        // Store wish in localStorage
        const wishes = JSON.parse(localStorage.getItem('birthday-wishes') || '[]');
        wishes.push(wish);
        localStorage.setItem('birthday-wishes', JSON.stringify(wishes));
        
        // Show thank you popup
        showThankYouPopup(wish.name);
        event.target.reset();
        
        // Update wishes list if host panel is open
        if (hostPanel.style.display === 'block') {
            displayWishes();
        }
        
    } catch (error) {
        showMessage('Failed to send wishes. Please try again!', 'error');
    } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
}

// Thank you popup function
function showThankYouPopup(name) {
    const popup = document.createElement('div');
    popup.className = 'thank-you-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Thank You ${name}! 🎉</h3>
            <p>Your birthday wishes have been sent successfully!</p>
            <div class="popup-emoji">🎂 ✨ 🎈</div>
            <button onclick="this.parentElement.parentElement.remove()">Close</button>
        </div>
    `;
    document.body.appendChild(popup);
    
    // Auto close after 5 seconds
    setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => popup.remove(), 500);
    }, 5000);
}

// Enhanced host view functions
function showHostPanel() {
    const hostPanel = document.getElementById('host-panel');
    hostPanel.style.display = 'block';
    hostPanel.innerHTML = `
        <div class="host-panel-header">
            <h3>Welcome Host! 👑</h3>
            <div class="host-controls">
                <button onclick="refreshWishes()" class="refresh-btn">
                    🔄 Refresh
                </button>
                <button onclick="downloadWishes()" class="download-btn">
                    📥 Export to Excel
                </button>
            </div>
        </div>
        <div class="wishes-dashboard">
            <div class="wishes-stats">
                <div class="stat-card total-wishes">
                    <span class="stat-icon">📝</span>
                    <span class="stat-number" id="totalWishes">0</span>
                    <span class="stat-label">Total Wishes</span>
                </div>
                <div class="stat-card today-wishes">
                    <span class="stat-icon">✨</span>
                    <span class="stat-number" id="todayWishes">0</span>
                    <span class="stat-label">Today's Wishes</span>
                </div>
                <div class="stat-card unique-wishers">
                    <span class="stat-icon">👥</span>
                    <span class="stat-number" id="uniqueWishers">0</span>
                    <span class="stat-label">Unique Wishers</span>
                </div>
            </div>
            <div class="wishes-filter">
                <input type="text" id="searchWishes" placeholder="Search wishes..." onkeyup="filterWishes()">
                <select id="sortWishes" onchange="sortWishes()">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name">Sort by Name</option>
                </select>
            </div>
            <div id="wishes-list" class="wishes-list">
                <!-- Wishes will be displayed here -->
            </div>
        </div>
    `;
    refreshWishes();
}

// Function to refresh wishes display
function refreshWishes() {
    const wishes = JSON.parse(localStorage.getItem('birthday-wishes') || '[]');
    updateWishesStats(wishes);
    displayWishes(wishes);
}

// Function to update wishes statistics
function updateWishesStats(wishes) {
    const todayWishes = wishes.filter(wish => {
        const wishDate = new Date(wish.timestamp);
        const today = new Date();
        return wishDate.toDateString() === today.toDateString();
    });
    
    const uniqueWishers = new Set(wishes.map(wish => wish.name)).size;
    
    document.getElementById('totalWishes').textContent = wishes.length;
    document.getElementById('todayWishes').textContent = todayWishes.length;
    document.getElementById('uniqueWishers').textContent = uniqueWishers;
}

// Enhanced wishes display function
function displayWishes(wishes = null) {
    if (!wishes) {
        wishes = JSON.parse(localStorage.getItem('birthday-wishes') || '[]');
    }
    
    const wishesList = document.getElementById('wishes-list');
    
    if (wishes.length === 0) {
        wishesList.innerHTML = `
            <div class="no-wishes">
                <span class="no-wishes-icon">🎈</span>
                <p>No birthday wishes yet!</p>
                <small>Wishes will appear here as they come in.</small>
            </div>
        `;
        return;
    }
    
    wishesList.innerHTML = wishes.map((wish, index) => `
        <div class="wish-card" style="animation-delay: ${index * 0.1}s">
            <div class="wish-header">
                <div class="wisher-info">
                    <span class="wisher-avatar">${wish.name.charAt(0).toUpperCase()}</span>
                    <div class="wisher-details">
                        <h4>${wish.name}</h4>
                        <small>
                            <span class="wish-time">🕒 ${formatTimestamp(wish.timestamp)}</span>
                        </small>
                    </div>
                </div>
                <div class="wish-actions">
                    <button onclick="copyWish('${encodeURIComponent(wish.message)}')" class="action-btn" title="Copy wish">
                        📋
                    </button>
                </div>
            </div>
            <div class="wish-content">
                <p>${wish.message}</p>
            </div>
        </div>
    `).join('');
}

// Helper function to format timestamp
function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `Today at ${hours}:${minutes}`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else {
        return date.toLocaleDateString();
    }
}

// Function to copy wish text
function copyWish(message) {
    const decodedMessage = decodeURIComponent(message);
    navigator.clipboard.writeText(decodedMessage).then(() => {
        showMessage('Wish copied to clipboard! 📋', 'success');
    }).catch(() => {
        showMessage('Failed to copy wish', 'error');
    });
}

// Function to filter wishes
function filterWishes() {
    const searchTerm = document.getElementById('searchWishes').value.toLowerCase();
    const wishes = JSON.parse(localStorage.getItem('birthday-wishes') || '[]');
    
    const filteredWishes = wishes.filter(wish => 
        wish.name.toLowerCase().includes(searchTerm) || 
        wish.message.toLowerCase().includes(searchTerm)
    );
    
    displayWishes(filteredWishes);
}

// Function to sort wishes
function sortWishes() {
    const sortType = document.getElementById('sortWishes').value;
    const wishes = JSON.parse(localStorage.getItem('birthday-wishes') || '[]');
    
    switch(sortType) {
        case 'newest':
            wishes.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            break;
        case 'oldest':
            wishes.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            break;
        case 'name':
            wishes.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    displayWishes(wishes);
}

// Enhanced Excel download function
function downloadWishes() {
    const wishes = JSON.parse(localStorage.getItem('birthday-wishes') || '[]');
    
    if (wishes.length === 0) {
        showMessage('No wishes to download yet!', 'info');
        return;
    }
    
    try {
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += "Name,Message,Date\n";
        
        wishes.forEach(wish => {
            const formattedDate = new Date(wish.timestamp).toLocaleString();
            // Escape commas and quotes in the message
            const escapedMessage = wish.message.replace(/"/g, '""');
            csvContent += `"${wish.name}","${escapedMessage}","${formattedDate}"\n`;
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `birthday_wishes_${new Date().toLocaleDateString()}.csv`);
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showMessage('Wishes downloaded successfully! 📥', 'success');
    } catch (error) {
        console.error('Error downloading wishes:', error);
        showMessage('Failed to download wishes. Please try again.', 'error');
    }
}

// Add these CSS styles to your styles.css file
const styles = document.createElement('style');
styles.textContent = `
    .thank-you-popup {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 20px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: popIn 0.5s ease-out;
    }
    
    .popup-content {
        text-align: center;
    }
    
    .popup-emoji {
        font-size: 2rem;
        margin: 15px 0;
    }
    
    @keyframes popIn {
        from {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0;
        }
        to {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
    
    .fade-out {
        opacity: 0;
        transition: opacity 0.5s ease-out;
    }
`;
document.head.appendChild(styles);

// Add these additional styles
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .host-panel {
        background: white;
        border-radius: 15px;
        padding: 20px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    
    .host-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
    
    .wishes-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-bottom: 20px;
    }
    
    .stat-card {
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        color: white;
        padding: 15px;
        border-radius: 10px;
        text-align: center;
    }
    
    .stat-icon {
        font-size: 24px;
        margin-bottom: 10px;
    }
    
    .stat-number {
        font-size: 28px;
        font-weight: bold;
        display: block;
    }
    
    .wishes-filter {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .wishes-filter input,
    .wishes-filter select {
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    
    .wish-card {
        background: white;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 15px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        transition: transform 0.2s;
    }
    
    .wish-card:hover {
        transform: translateY(-2px);
    }
    
    .wisher-avatar {
        width: 40px;
        height: 40px;
        background: linear-gradient(45deg, #ff69b4, #ff1493);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }
    
    .action-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 18px;
        padding: 5px;
        transition: transform 0.2s;
    }
    
    .action-btn:hover {
        transform: scale(1.2);
    }
`;
document.head.appendChild(additionalStyles);

// Initialize gallery animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeGalleryAnimations();
});

// Event listeners
modal.onclick = (e) => {
    if (e.target === modal) closeModal();
};

document.getElementById('wishes-form').addEventListener('submit', submitWish);

// Initialize music control
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
let isMusicPlaying = false;

musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play();
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
});

// Helper function for showing messages
function showMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    messageDiv.innerHTML = text;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.classList.add('fade-out');
        setTimeout(() => messageDiv.remove(), 500);
    }, 3000);
    
    return messageDiv;
}