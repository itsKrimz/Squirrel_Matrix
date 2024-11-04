// JavaScript for Nut Collection, Cooldown, and Glitch Effect

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

// Glitch Effect for Elements

// Select elements for glitching
const nutCountElement = document.getElementById('nut-count');
const realityIndex = document.querySelector('.status-box p:nth-child(3)');
const quantumEnergy = document.querySelector('.status-box p:nth-child(4)');
const warning = document.querySelector('.warning');

// Function to generate a temporary glitch effect
function glitchText(element, originalText) {
    const textLength = originalText.length;
    const randomIndex = Math.floor(Math.random() * textLength);
    const randomChar = String.fromCharCode(33 + Math.floor(Math.random() * 94));
    const glitchedText = originalText.slice(0, randomIndex) + randomChar + originalText.slice(randomIndex + 1);
    element.textContent = glitchedText;

    // Revert to original text after a brief delay
    setTimeout(() => {
        element.textContent = originalText;
    }, 100);
}

// Function to apply glitch effects periodically
function applyGlitchEffects() {
    setInterval(() => {
        glitchText(nutCountElement, nutCountElement.textContent);
        glitchText(realityIndex, "Reality Index: 87.3%");
        glitchText(quantumEnergy, "Quantum-Nut Energy: OPTIMAL");
        glitchText(warning, "【❗️WARNING❗️】 This Terminut operates on experimental cyber-rodent protocols.");
    }, 500);

    // Apply the glitch class to make text flicker
    setInterval(() => {
        nutCountElement.classList.toggle('glitch');
        realityIndex.classList.toggle('glitch');
        quantumEnergy.classList.toggle('glitch');
        warning.classList.toggle('glitch-color');
    }, 1000); // Slower flicker for subtler effect
}

// Start the glitch effect when the page loads
document.addEventListener('DOMContentLoaded', applyGlitchEffects);
