function createEcard() {
    const recipientName = document.getElementById('recipientName').value.trim();
    const personalMessage = document.getElementById('personalMessage').value.trim();

    if (recipientName === "" || personalMessage === "") {
        alert("Please enter both the recipient's name and a personalized message.");
        return;
    }

    const ecardData = {
        name: recipientName,
        message: personalMessage
    };

    localStorage.setItem('ecardData', JSON.stringify(ecardData));
    window.location.href = 'share.html';
}

const bgMusic = document.getElementById('bg-music');

// Play music after a user interaction to bypass browser autoplay restrictions
document.body.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
    }
}, { once: true });

document.addEventListener('DOMContentLoaded', () => {
            const ecardData = JSON.parse(localStorage.getItem('ecardData'));

            if (!ecardData) {
                alert('No e-card data found. Please create an e-card first.');
                window.location.href = 'index.html';
                return;
            }

            document.getElementById('ecardTitle').textContent = `Happy Birthday, ${ecardData.name}!`;
            document.getElementById('personalMessage').textContent = ecardData.message;

            const encodedMessage = encodeURIComponent(`Happy Birthday, ${ecardData.name}! ${ecardData.message}`);

            document.getElementById('shareWhatsApp').href = `https://api.whatsapp.com/send?text=${encodedMessage}`;
        });