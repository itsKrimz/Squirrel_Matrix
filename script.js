// JavaScript for Nut Collection and Cooldown

let nutCount = 0;  // Initialize nut count
let cooldown = 20; // Set initial cooldown
let isCooldownActive = false; // Cooldown state

function increaseNutCount() {
    if (!isCooldownActive) {
        nutCount++;
        document.getElementById('nut-count').textContent = nutCount;
        startCooldown();
    }
}

function startCooldown() {
    isCooldownActive = true;
    cooldown = 20;
    updateCooldownDisplay();

    const cooldownInterval = setInterval(() => {
        cooldown--;
        updateCooldownDisplay();

        if (cooldown <= 0) {
            clearInterval(cooldownInterval);
            isCooldownActive = false;
            document.getElementById('cooldown').textContent = "Ready!";
            document.getElementById('cooldown').classList.add('cooldown-text-ready');
        }
    }, 1000);
}

function updateCooldownDisplay() {
    document.getElementById('cooldown').textContent = cooldown + 's';
    document.getElementById('cooldown').classList.remove('cooldown-text-ready');
}

// Start initial cooldown on load
document.addEventListener('DOMContentLoaded', startCooldown);
