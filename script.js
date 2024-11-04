// JavaScript for Nut Collection, Cooldown, and Power-Ups

let nutCount = 0;  // Initialize nut count
let cooldown = 20; // Set initial cooldown
let isCooldownActive = false; // Cooldown state
let nutsPerClick = 1; // Nuts collected per click
let nutsPerSecond = 0; // Automated nut collection rate
let acornHarvesterCost = 10; // Initial cost for Acorn Harvester
let quantumProcessorCost = 50; // Initial cost for Quantum Processor

function increaseNutCount() {
    if (!isCooldownActive) {
        nutCount += nutsPerClick;
        document.getElementById('nut-count').textContent = nutCount;
        startCooldown();
    }
}

// Power-Up Purchase Logic
function buyPowerUp(type) {
    if (type === 'acornHarvester' && nutCount >= acornHarvesterCost) {
        nutCount -= acornHarvesterCost;
        nutsPerClick += 1;
        acornHarvesterCost = Math.floor(acornHarvesterCost * 1.5); // Increase cost
        document.getElementById('nut-count').textContent = nutCount;
        document.getElementById('harvester-cost').textContent = acornHarvesterCost;
    } else if (type === 'quantumProcessor' && nutCount >= quantumProcessorCost) {
        nutCount -= quantumProcessorCost;
        nutsPerSecond += 1;
        quantumProcessorCost = Math.floor(quantumProcessorCost * 1.8); // Increase cost
        document.getElementById('nut-count').textContent = nutCount;
        document.getElementById('processor-cost').textContent = quantumProcessorCost;
    }
}

// Start automated nut collection
function startAutomation() {
    setInterval(() => {
        nutCount += nutsPerSecond;
        document.getElementById('nut-count').textContent = nutCount;
        document.getElementById('nuts-per-second').textContent = nutsPerSecond;
    }, 1000);
}

function startCooldown() {
    isCooldownActive = true;
    cooldown = 20;
    updateCooldownDisplay();

    // Disable button during cooldown
    const button = document.querySelector('.button');
    button.disabled = true;
    button.classList.add('cooldown-pulse');

    const cooldownInterval = setInterval(() => {
        cooldown--;
        updateCooldownDisplay();

        if (cooldown <= 0) {
            clearInterval(cooldownInterval);
            isCooldownActive = false;
            document.getElementById('cooldown').textContent = "Ready!";
            document.getElementById('cooldown').classList.add('cooldown-text-ready');

            // Re-enable button and remove pulse effect
            button.disabled = false;
            button.classList.remove('cooldown-pulse');
        }
    }, 1000);
}

function updateCooldownDisplay() {
    document.getElementById('cooldown').textContent = cooldown + 's';
    document.getElementById('cooldown').classList.remove('cooldown-text-ready');
}

// Start automation and initial cooldown on load
document.addEventListener('DOMContentLoaded', () => {
    startCooldown();
    startAutomation();
});

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
        glitchText(nutCountElement, `${nutCount}`);
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
