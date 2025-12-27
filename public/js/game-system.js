/**
 * Game System - Gamification for GTM Learning
 * Handles XP, levels, achievements, and game mechanics
 */

// Game State
const gameState = {
    xp: 0,
    level: 1,
    achievements: [],
    currentMission: 0
};

// XP thresholds for levels
const levelThresholds = [
    0,    // Level 1
    100,  // Level 2
    250,  // Level 3
    450,  // Level 4
    700,  // Level 5
    1000  // Level 6 (Master)
];

// Achievements definition
const achievements = [
    {
        id: 'first_day',
        name: 'Primer Día',
        description: 'Comenzaste tu aventura en la agencia',
        icon: '🎒',
        xp: 10,
        unlocked: false
    },
    {
        id: 'gtm_discovered',
        name: 'Descubriste GTM',
        description: 'Entendiste qué es Google Tag Manager',
        icon: '🧰',
        xp: 20,
        unlocked: false
    },
    {
        id: 'three_pillars',
        name: 'Los Tres Pilares',
        description: 'Dominaste Tags, Triggers y Variables',
        icon: '🏛️',
        xp: 30,
        unlocked: false
    },
    {
        id: 'first_event',
        name: 'Primer Evento Escuchado',
        description: 'Lanzaste tu primer dataLayer.push',
        icon: '🎧',
        xp: 50,
        unlocked: false
    },
    {
        id: 'tower_builder',
        name: 'Constructor de Torres',
        description: 'Completaste el puzzle de la torre de control',
        icon: '🗼',
        xp: 40,
        unlocked: false
    },
    {
        id: 'junior_wizard',
        name: 'Junior Data Wizard',
        description: 'Pasaste la prueba del marketer',
        icon: '🧙',
        xp: 50,
        unlocked: false
    },
    {
        id: 'chaos_survivor',
        name: 'Sobreviviste al Caos',
        description: 'Completaste el Capítulo 1',
        icon: '🌪️',
        xp: 60,
        unlocked: false
    },
    {
        id: 'bloque5_complete',
        name: 'Maestro del Dato',
        description: 'Completaste el Bloque 5: Escuchar al dato',
        icon: '🎧',
        xp: 100,
        unlocked: false
    },
    {
        id: 'data_strategist',
        name: 'Estratega de Datos',
        description: 'Creaste tu primer dashboard accionable',
        icon: '📊',
        xp: 80,
        unlocked: false
    },
    {
        id: 'data_architect',
        name: 'Arquitecto de Datos',
        description: 'Completaste el Capítulo 2',
        icon: '🏗️',
        xp: 60,
        unlocked: false
    },
    {
        id: 'governor',
        name: 'Gobernador',
        description: 'Completaste el Capítulo 3',
        icon: '👑',
        xp: 60,
        unlocked: false
    },
    {
        id: 'gtm_master',
        name: 'GTM Master',
        description: 'Completaste toda la aventura',
        icon: '🎓',
        xp: 100,
        unlocked: false
    },
    {
        id: 'chaos_survivor',
        name: 'Sobreviviente del caos inicial',
        description: 'Descubriste los secretos que nadie te cuenta',
        icon: '🤫',
        xp: 50,
        unlocked: false
    },
    {
        id: 'implementador',
        name: 'Implementador responsable',
        description: 'Dominaste la checklist de implementación',
        icon: '✅',
        xp: 60,
        unlocked: false
    },
    {
        id: 'qa_tools',
        name: 'Maestro de las herramientas',
        description: 'Aprendiste a usar Preview, DebugView y Omnibug',
        icon: '🛠️',
        xp: 50,
        unlocked: false
    },
    {
        id: 'bug_hunter',
        name: 'Cazador de bugs',
        description: 'Encontraste un evento roto en el embudo',
        icon: '🐛',
        xp: 75,
        unlocked: false
    },
    {
        id: 'qa_master',
        name: 'QA Master',
        description: 'Completaste la auditoría de implementación',
        icon: '👁️',
        xp: 100,
        unlocked: false
    },
    {
        id: 'funnel_cartographer',
        name: 'Cartógrafo de Embudos',
        description: 'Identificaste el evento faltante en un funnel',
        icon: '🧭',
        xp: 30,
        unlocked: false
    },
    {
        id: 'funnel_architect',
        name: 'Arquitecto en Prácticas',
        description: 'Detectaste errores técnicos en funnels',
        icon: '🏗️',
        xp: 40,
        unlocked: false
    },
    {
        id: 'event_librarian',
        name: 'Librero de Eventos',
        description: 'Normalizaste eventos según estándares',
        icon: '📚',
        xp: 30,
        unlocked: false
    },
    {
        id: 'funnel_detective',
        name: 'Detective de Embudos',
        description: 'Diagnosticaste caídas en funnels',
        icon: '🕵️',
        xp: 50,
        unlocked: false
    },
    {
        id: 'funnel_master',
        name: 'Arquitecto del Funnel',
        description: 'Completaste el Boss Fight del Bloque 4',
        icon: '🏛️',
        xp: 100,
        unlocked: false
    }
];

// Initialize game system
function initGameSystem() {
    // Load saved state from localStorage
    const saved = localStorage.getItem('gtm_game_state');
    if (saved) {
        const savedState = JSON.parse(saved);
        gameState.xp = savedState.xp || 0;
        gameState.level = savedState.level || 1;
        gameState.achievements = savedState.achievements || [];
        gameState.currentMission = savedState.currentMission || 0;
        
        // Update achievements
        achievements.forEach(achievement => {
            if (gameState.achievements.includes(achievement.id)) {
                achievement.unlocked = true;
            }
        });
    }
    
    updateHUD();
    populateAchievements();
}

// Save game state
function saveGameState() {
    localStorage.setItem('gtm_game_state', JSON.stringify(gameState));
}

// Add XP
function addXP(amount, source = '') {
    gameState.xp += amount;
    
    // Check for level up
    const newLevel = calculateLevel(gameState.xp);
    if (newLevel > gameState.level) {
        gameState.level = newLevel;
        showLevelUpNotification(newLevel);
    }
    
    updateHUD();
    saveGameState();
    
    // Animate XP gain
    animateXPGain(amount);
}

// Calculate level from XP
function calculateLevel(xp) {
    for (let i = levelThresholds.length - 1; i >= 0; i--) {
        if (xp >= levelThresholds[i]) {
            return i + 1;
        }
    }
    return 1;
}

// Unlock achievement
function unlockAchievement(achievementId) {
    // Check if already unlocked
    if (gameState.achievements.includes(achievementId)) {
        return;
    }
    
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return;
    
    // Unlock it
    achievement.unlocked = true;
    gameState.achievements.push(achievementId);
    
    // Add XP
    addXP(achievement.xp, 'achievement');
    
    // Show notification
    showAchievementNotification(achievement);
    
    // Update UI
    populateAchievements();
    saveGameState();
}

// Show achievement notification
function showAchievementNotification(achievement) {
    const notification = document.getElementById('achievement-notification');
    const nameEl = document.getElementById('achievement-name');
    const xpEl = document.getElementById('achievement-xp');
    
    if (!notification || !nameEl || !xpEl) return;
    
    nameEl.textContent = `${achievement.icon} ${achievement.name}`;
    xpEl.textContent = achievement.xp;
    
    notification.style.display = 'flex';
    notification.classList.add('achievement-show');
    
    // Play sound effect (if we had audio)
    // playSound('achievement');
    
    // Hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('achievement-show');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 4000);
}

// Show level up notification
function showLevelUpNotification(newLevel) {
    // Could create a separate level-up notification
    const titles = [
        '',
        'Aprendiz',
        'Marketer Junior',
        'Marketer',
        'Data Marketer',
        'GTM Specialist',
        'GTM Master'
    ];
    
    const title = titles[newLevel] || 'GTM Legend';
    
    // For now, use achievement notification
    const notification = document.getElementById('achievement-notification');
    const nameEl = document.getElementById('achievement-name');
    const xpEl = document.getElementById('achievement-xp');
    
    if (!notification || !nameEl || !xpEl) return;
    
    nameEl.textContent = `🎊 ¡Subiste a Nivel ${newLevel}!`;
    xpEl.textContent = title;
    
    notification.style.display = 'flex';
    notification.classList.add('achievement-show');
    
    setTimeout(() => {
        notification.classList.remove('achievement-show');
        setTimeout(() => {
            notification.style.display = 'none';
        }, 300);
    }, 4000);
}

// Update HUD
function updateHUD() {
    // Update level
    const levelEl = document.getElementById('player-level');
    if (levelEl) {
        levelEl.textContent = gameState.level;
    }
    
    // Update XP bar
    const currentLevel = gameState.level;
    const currentLevelXP = levelThresholds[currentLevel - 1] || 0;
    const nextLevelXP = levelThresholds[currentLevel] || levelThresholds[levelThresholds.length - 1];
    const xpInLevel = gameState.xp - currentLevelXP;
    const xpNeeded = nextLevelXP - currentLevelXP;
    const percentage = (xpInLevel / xpNeeded) * 100;
    
    const xpFill = document.getElementById('xp-fill');
    const xpCurrent = document.getElementById('xp-current');
    const xpMax = document.getElementById('xp-max');
    
    if (xpFill) {
        xpFill.style.width = `${Math.min(percentage, 100)}%`;
    }
    
    if (xpCurrent) {
        xpCurrent.textContent = xpInLevel;
    }
    
    if (xpMax) {
        xpMax.textContent = xpNeeded;
    }
    
    // Update achievement count
    const achievementCount = document.getElementById('achievement-count');
    if (achievementCount) {
        const unlocked = gameState.achievements.length;
        const total = achievements.length;
        achievementCount.textContent = `${unlocked}/${total}`;
    }
}

// Animate XP gain
function animateXPGain(amount) {
    // Create floating text
    const hudLeft = document.querySelector('.hud-left');
    if (!hudLeft) return;
    
    const floatingXP = document.createElement('div');
    floatingXP.className = 'floating-xp';
    floatingXP.textContent = `+${amount} XP`;
    
    hudLeft.appendChild(floatingXP);
    
    setTimeout(() => {
        floatingXP.remove();
    }, 2000);
}

// Toggle achievements panel
function toggleAchievements() {
    const panel = document.getElementById('achievements-panel');
    if (!panel) return;
    
    if (!panel.classList.contains('active')) {
        panel.classList.add('active');
        populateAchievements();
    } else {
        panel.classList.remove('active');
    }
}

// Populate achievements list
function populateAchievements() {
    const list = document.getElementById('achievements-list');
    if (!list) return;
    
    list.innerHTML = '';
    
    achievements.forEach(achievement => {
        const item = document.createElement('div');
        item.className = `achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        
        item.innerHTML = `
            <div class="achievement-item-icon">${achievement.unlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-item-details">
                <div class="achievement-item-name">${achievement.name}</div>
                <div class="achievement-item-description">${achievement.description}</div>
                <div class="achievement-item-xp">${achievement.xp} XP</div>
            </div>
        `;
        
        list.appendChild(item);
    });
}

// Show game HUD
function showGameHUD() {
    const hud = document.getElementById('game-hud');
    if (hud) {
        hud.style.display = 'flex';
    }
}

// Hide game HUD
function hideGameHUD() {
    const hud = document.getElementById('game-hud');
    if (hud) {
        hud.style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initGameSystem();
});

