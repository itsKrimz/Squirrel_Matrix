// JavaScript for Nut Collection, Power-Ups, Cooldown, and Social Actions

let nutCount = 0;  // Initialize nut count
let cooldown = 5;  // Set initial cooldown to 5 seconds
let isCooldownActive = false;  // Cooldown state
let nutsPerClick = 1;  // Nuts collected per click
let nutsPerSecond = 0;  // Automated nut collection rate

// Power-up costs and effects
const powerUps = {
    acornHarvester: { name: "Acorn Harvester", cost: 10, clickBoost: 1, passiveBoost: 0, level: 0 },
    quantumProcessor: { name: "Quantum Processor", cost: 50, clickBoost: 0, passiveBoost: 1, level: 0 },
    squirrelScout: { name: "Squirrel Scout", cost: 200, clickBoost: 0, passiveBoost: 5, level: 0 },
    treePlanter: { name: "Tree Planter", cost: 1000, clickBoost: 0, passiveBoost: 20, level: 0 },
    nutVault: { name: "Nut Vault", cost: 5000, clickBoost: 0, passiveBoost: 50, level: 0 },
    forestGuardian: { name: "Forest Guardian", cost: 15000, clickBoost: 0, passiveBoost: 100, level: 0 }
};

// Function to increase nut count by click
function increaseNutCount() {
    if (!isCooldownActive) {
        nutCount += nutsPerClick;
        updateNutDisplay();
        startCooldown();
    }
}

// Function to update displayed nut count
function updateNutDisplay() {
    document.getElementById('nut-count').textContent = nutCount;
    document.getElementById('nuts-per-second').textContent = nutsPerSecond;
    updatePowerUpButtons();
    displayOwnedPowerUps();
}

// Power-Up Purchase Logic
function buyPowerUp(type) {
    if (nutCount >= powerUps[type].cost) {
        nutCount -= powerUps[type].cost;
        
        // Increase click or passive boost based on power-up type
        if (powerUps[type].clickBoost) {
            nutsPerClick += powerUps[type].clickBoost;
        }
        
        if (powerUps[type].passiveBoost) {
            nutsPerSecond += powerUps[type].passiveBoost;
        }

        // Increase level and cost for next upgrade
        powerUps[type].level += 1;
        powerUps[type].cost = Math.floor(powerUps[type].cost * 1.5); // Cost increases with each level
        updateNutDisplay();
    }
}

// Display owned power-ups with upgrade options
function displayOwnedPowerUps() {
    const ownedList = document.getElementById('owned-list');
    ownedList.innerHTML = ''; // Clear existing entries

    Object.keys(powerUps).forEach(type => {
        if (powerUps[type].level > 0) {
            const upgradeButton = document.createElement('button');
            upgradeButton.className = 'button power-up';
            upgradeButton.textContent = `${powerUps[type].name} - Level ${powerUps[type].level} (Upgrade +${powerUps[type].passiveBoost}/s) - Cost: ${powerUps[type].cost} Nuts`;
            upgradeButton.onclick = () => buyPowerUp(type);
            upgradeButton.disabled = nutCount < powerUps[type].cost;
            upgradeButton.classList.toggle('disabled', nutCount < powerUps[type].cost);

            ownedList.appendChild(upgradeButton);
        }
    });
}

// Update only power-up buttons based on nut count
function updatePowerUpButtons() {
    Object.keys(powerUps).forEach(type => {
        const button = document.getElementById(type);
        if (button) {
            button.querySelector('span').textContent = powerUps[type].cost;
            button.disabled = nutCount < powerUps[type].cost;
            button.classList.toggle('disabled', nutCount < powerUps[type].cost);
        }
    });
}

// Start automated nut collection
function startAutomation() {
    setInterval(() => {
        nutCount += nutsPerSecond;
        updateNutDisplay();
    }, 1000);
}

// Start cooldown for nut collection
function startCooldown() {
    isCooldownActive = true;
    cooldown = 5; // Set cooldown to 5 seconds
    updateCooldownDisplay();

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
            button.disabled = false;
            button.classList.remove('cooldown-pulse');
        }
    }, 1000);
}

// Update cooldown display
function updateCooldownDisplay() {
    document.getElementById('cooldown').textContent = cooldown + 's';
}

// Social Actions for Earning Nuts
function earnNutsForAction(action) {
    let reward = 0;
    let button;
    let url;

    switch(action) {
        case 'twitterFollow':
            reward = 50;
            url = "https://x.com/TTVitsKrimz";
            button = document.querySelector(".social-action[onclick*='twitterFollow']");
            break;
        case 'telegram':
            reward = 75;
            url = "https://telegram.org/";
            button = document.querySelector(".social-action[onclick*='telegram']");
            break;
        case 'twitterPost':
            reward = 100;
            url = "http://twitter.com/share?url=I+played+the+Squirrel+Matrix+and+am+earning+%24NUTS.+Join+me%3A+https%3A%2F%2Fitskrimz.github.io%2FSquirrel_Matrix%2F";
            button = document.querySelector(".social-action[onclick*='twitterPost']");
            break;
    }

    if (button && url) {
        nutCount += reward;
        window.open(url, '_blank'); // Open the social link in a new tab
        button.disabled = true;
        button.textContent = "Reward Claimed!";
        updateNutDisplay();
    }
}

// Initialize game elements on load
document.addEventListener('DOMContentLoaded', () => {
    startCooldown();
    startAutomation();
    updatePowerUpButtons();

    // Ensure all social buttons are enabled and not greyed out initially
    document.querySelectorAll('.social-action').forEach(button => {
        button.disabled = false;
        button.classList.remove('disabled');
    });
});
