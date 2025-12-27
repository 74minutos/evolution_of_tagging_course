/**
 * Canvas animations - Enhanced Nicky Case style
 * Much more expressive and educational
 */

let canvas, ctx;
let animationFrame;
let characters = [];
let chaosState = 'initial'; // 'initial', 'chaos', 'order'
let particles = [];
let time = 0;

// Character colors
const COLORS = {
    marketing: '#ff6b9d',
    product: '#4ecdc4',
    legal: '#95a3b3',
    analyst: '#feca57',
    gtm: '#48dbfb',
    apprentice: '#a29bfe',
    senior: '#fd79a8'
};

// Speech bubbles content
const speeches = {
    chaos: {
        marketing: "¡Necesito\nMeta Pixel\nYA!",
        product: "Hotjar\nen checkout",
        legal: "¡RGPD!",
        analyst: "¿Qué está\npasando?"
    },
    order: {
        gtm: "Yo me\nencargo",
        marketing: "Perfecto",
        product: "Genial",
        legal: "✓",
        analyst: "Claro!"
    }
};

// Initialize canvas for introduction
function initIntroCanvas() {
    canvas = document.getElementById('canvas-intro');
    if (!canvas) return;
    
    // Set canvas size to be wider
    canvas.width = 1400;
    canvas.height = 600;
    
    ctx = canvas.getContext('2d');
    
    // Set up scene: office with new apprentice
    characters = [
        { role: 'apprentice', x: 350, y: 400, emoji: '🎒', label: 'TÚ', wobble: 0, stress: 0, excited: true },
        { role: 'mentor', x: 1050, y: 400, emoji: '🧑‍🏫', label: 'MENTOR', wobble: 0, stress: 0, calm: true },
    ];
    
    chaosState = 'intro';
    particles = [];
    
    // Start animation loop
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animateIntro();
}

function animateIntro() {
    time += 0.016;

    // Background gradient ala Evolution of Trust
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#fefdf4');
    gradient.addColorStop(1, '#f6edda');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Soft blobs
    ctx.fillStyle = 'rgba(255, 215, 128, 0.18)';
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.28, canvas.height * 0.15, 220, 120, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(139, 209, 199, 0.15)';
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.72, canvas.height * 0.18, 260, 150, 0, 0, Math.PI * 2);
    ctx.fill();

    drawIntroStage();

    const apprenticeBounce = Math.sin(time * 2) * 5;
    drawTotCharacter(420, 360 + apprenticeBounce, {
        bodyColor: '#ffd45d',
        accentColor: '#2a261f',
        label: 'Aprendiz',
        mood: 'excited',
        bubble: '¡Mi primer día!',
        bubbleOffsetY: -150
    });

    const mentorSway = Math.sin(time * 1.5 + Math.PI / 3) * 3;
    drawTotCharacter(980, 360 + mentorSway, {
        bodyColor: '#8bd1c7',
        accentColor: '#2a261f',
        label: 'Mentor',
        mood: 'calm',
        bubble: 'Respira.\nYo te guío.',
        bubbleOffsetY: -140,
        bubbleAlign: 'right'
    });

    drawGtmTotMachine(720, 260, time);
    drawTotBadge(320, 200, 'No tocar GTM', '#f97f82', time);
    drawTotBadge(1040, 190, 'GA4 listo', '#8bd1c7', time + 1.3);
    drawFloatingArrow(720, 430, time);

    animationFrame = requestAnimationFrame(animateIntro);
}

function drawIntroStage() {
    const stageWidth = 980;
    const stageHeight = 340;
    const stageX = (canvas.width - stageWidth) / 2;
    const stageY = 120;

    ctx.save();
    ctx.translate(stageX, stageY);

    // Drop shadow
    ctx.fillStyle = 'rgba(42, 38, 31, 0.08)';
    ctx.fillRect(16, 20, stageWidth, stageHeight);

    // Stage board
    ctx.fillStyle = '#fffef9';
    drawRoundedRect(ctx, 0, 0, stageWidth, stageHeight, 28);
    ctx.fill();

    ctx.lineWidth = 8;
    ctx.strokeStyle = '#2a261f';
    ctx.stroke();

    // Hand-drawn grid
    ctx.strokeStyle = 'rgba(42, 38, 31, 0.08)';
    ctx.lineWidth = 2;
    for (let i = 1; i < 6; i++) {
        const y = 60 + i * 50 + Math.sin(time + i) * 2;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(stageWidth - 40, y);
        ctx.stroke();
    }

    // Header banner
    ctx.fillStyle = '#ffce54';
    drawRoundedRect(ctx, stageWidth / 2 - 140, -36, 280, 70, 22);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#2a261f';
    ctx.font = '32px FuturaHandwritten';
    ctx.textAlign = 'center';
    ctx.fillText('Tu primer día en la agencia', stageWidth / 2, 10);

    // Sticky notes
    ctx.font = '20px FuturaHandwritten';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#2a261f';
    ctx.fillText('Checklist:', 60, 90);
    ctx.fillText('• Equipo alineado', 60, 120);
    ctx.fillText('• DataLayer vivo', 60, 150);

    ctx.textAlign = 'right';
    ctx.fillText('Brief', stageWidth - 60, 90);
    ctx.fillText('⚙️ Triggers listos', stageWidth - 60, 120);

    ctx.restore();
}

function drawTotCharacter(x, y, options = {}) {
    const {
        bodyColor = '#ffd45d',
        accentColor = '#2a261f',
        label = '',
        mood = 'happy',
        bubble,
        bubbleOffsetY = -140,
        bubbleAlign = 'left'
    } = options;

    ctx.save();
    ctx.translate(x, y);

    // Shadow
    ctx.fillStyle = 'rgba(42, 38, 31, 0.15)';
    ctx.beginPath();
    ctx.ellipse(0, 48, 42, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 6;
    ctx.strokeStyle = accentColor;

    // Body
    ctx.fillStyle = bodyColor;
    drawRoundedRect(ctx, -40, -10, 80, 70, 18);
    ctx.fill();
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(-40, 10);
    ctx.lineTo(-68, 0 + Math.sin(time * 2 + y) * 6);
    ctx.moveTo(40, 10);
    ctx.lineTo(68, 4 + Math.cos(time * 2 + x) * 6);
    ctx.stroke();

    // Head
    ctx.fillStyle = '#ffe6c7';
    ctx.beginPath();
    ctx.arc(0, -48, 32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Eyes & mouth
    ctx.fillStyle = accentColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (mood === 'excited') {
        ctx.arc(-10, -52, 5, 0, Math.PI * 2);
        ctx.arc(10, -52, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, -38, 12, 0, Math.PI, false);
    } else if (mood === 'calm') {
        ctx.arc(-10, -52, 3, 0, Math.PI * 2);
        ctx.arc(10, -52, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-8, -38);
        ctx.lineTo(8, -38);
    } else {
        ctx.arc(-10, -52, 4, 0, Math.PI * 2);
        ctx.arc(10, -52, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, -40, 8, 0.1 * Math.PI, 0.9 * Math.PI, false);
    }
    ctx.stroke();

    // Label badge
    if (label) {
        ctx.fillStyle = '#2a261f';
        drawRoundedRect(ctx, -60, 62, 120, 36, 16);
        ctx.fill();
        ctx.fillStyle = '#ffd45d';
        ctx.font = '20px FuturaHandwritten';
        ctx.textAlign = 'center';
        ctx.fillText(label, 0, 86);
    }

    ctx.restore();

    if (bubble) {
        drawTotSpeechBubble(x, y + bubbleOffsetY, bubble, bubbleAlign);
    }
}

function drawTotSpeechBubble(x, y, text, align = 'left') {
    const lines = text.split('\n');
    const padding = 18;
    const lineHeight = 28;
    const width = Math.max(...lines.map(line => line.length)) * 14 + padding * 2;
    const height = lineHeight * lines.length + padding * 1.5;
    const offsetX = align === 'right' ? -width + 20 : -20;

    ctx.save();
    ctx.translate(x + offsetX, y);
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#2a261f';
    ctx.fillStyle = '#fffef9';
    drawRoundedRect(ctx, 0, 0, width, height, 18);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#2a261f';
    ctx.font = '22px FuturaHandwritten';
    ctx.textAlign = 'left';
    lines.forEach((line, idx) => {
        ctx.fillText(line, padding, padding + idx * lineHeight + 6);
    });
    ctx.restore();
}

function drawTotBadge(x, y, text, color, t) {
    ctx.save();
    ctx.translate(x, y + Math.sin(t * 1.8) * 4);
    ctx.rotate(Math.sin(t + x) * 0.04);
    ctx.fillStyle = color;
    drawRoundedRect(ctx, -90, -40, 180, 80, 18);
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#2a261f';
    ctx.stroke();
    ctx.fillStyle = '#2a261f';
    ctx.font = '24px FuturaHandwritten';
    ctx.textAlign = 'center';
    ctx.fillText(text, 0, 7);
    ctx.restore();
}

function drawGtmTotMachine(x, y, t) {
    ctx.save();
    ctx.translate(x, y);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#2a261f';

    ctx.fillStyle = '#8bd1c7';
    drawRoundedRect(ctx, -110, -70, 220, 140, 26);
    ctx.fill();
    ctx.stroke();

    // Screen
    ctx.fillStyle = '#fffef9';
    drawRoundedRect(ctx, -70, -38, 140, 80, 16);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#2a261f';
    ctx.font = '26px FuturaHandwritten';
    ctx.textAlign = 'center';
    ctx.fillText('GTM', 0, -4);

    ctx.font = '18px FuturaHandwritten';
    ctx.fillText('Data Flow →', 0, 28 + Math.sin(t * 2) * 2);

    // Side levers
    ctx.beginPath();
    ctx.moveTo(-120, 0);
    ctx.lineTo(-150, -20 + Math.sin(t * 3) * 8);
    ctx.moveTo(120, -10);
    ctx.lineTo(150, 20 + Math.cos(t * 2.4) * 8);
    ctx.stroke();
    ctx.restore();
}

function drawFloatingArrow(x, y, t) {
    ctx.save();
    ctx.translate(x, y + Math.sin(t * 2) * 6);
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#2a261f';
    ctx.fillStyle = '#ffd45d';
    ctx.beginPath();
    ctx.moveTo(-60, 0);
    ctx.lineTo(0, -40);
    ctx.lineTo(60, 0);
    ctx.lineTo(20, 0);
    ctx.lineTo(20, 40);
    ctx.lineTo(-20, 40);
    ctx.lineTo(-20, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
}

function drawRoundedRect(context, x, y, width, height, radius) {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.lineTo(x + width - r, y);
    context.quadraticCurveTo(x + width, y, x + width, y + r);
    context.lineTo(x + width, y + height - r);
    context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    context.lineTo(x + r, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - r);
    context.lineTo(x, y + r);
    context.quadraticCurveTo(x, y, x + r, y);
    context.closePath();
}

function drawDetailedOffice() {
    // Wall decorations
    // Poster on wall: "NO TOCAR GTM" crossed out
    ctx.fillStyle = '#fff';
    ctx.fillRect(50, 50, 120, 80);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, 120, 80);
    
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('NO TOCAR', 110, 75);
    ctx.fillText('GTM', 110, 90);
    
    // Red X over it
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(55, 55);
    ctx.lineTo(165, 125);
    ctx.moveTo(165, 55);
    ctx.lineTo(55, 125);
    ctx.stroke();
    
    // New text below
    ctx.fillStyle = '#4ecdc4';
    ctx.font = 'bold 10px Arial';
    ctx.fillText('Toca GTM', 110, 110);
    ctx.fillText('con cariño', 110, 122);
    
    // Dashboard screen on wall
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(630, 50, 120, 80);
    
    // GA4 logo simulation
    ctx.fillStyle = '#e37400';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GA4', 690, 100);
    
    // Random data lines
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(640, 110);
    ctx.lineTo(660, 105);
    ctx.lineTo(680, 115);
    ctx.lineTo(700, 108);
    ctx.lineTo(720, 120);
    ctx.lineTo(740, 110);
    ctx.stroke();
    
    // Desks with more detail
    // Left desk (apprentice's new desk)
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(90, 300, 120, 10);
    ctx.fillRect(100, 310, 10, 60);
    ctx.fillRect(190, 310, 10, 60);
    
    // Laptop on left desk (closed)
    ctx.fillStyle = '#34495e';
    ctx.fillRect(110, 285, 80, 5);
    ctx.fillRect(120, 290, 60, 10);
    
    // Welcome note
    ctx.fillStyle = '#ffd54f';
    ctx.fillRect(145, 295, 40, 40);
    ctx.fillStyle = '#333';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('¡Hola!', 165, 310);
    ctx.fillText('Bienvenido', 165, 322);
    
    // Right desk (mentor's desk)
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(540, 300, 120, 10);
    ctx.fillRect(550, 310, 10, 60);
    ctx.fillRect(640, 310, 10, 60);
    
    // Open laptop on right desk with GTM open
    ctx.fillStyle = '#34495e';
    ctx.fillRect(555, 270, 90, 5);
    ctx.fillRect(565, 275, 70, 50);
    
    // GTM interface on screen
    ctx.fillStyle = '#fff';
    ctx.fillRect(570, 280, 60, 40);
    ctx.fillStyle = '#4ecdc4';
    ctx.fillRect(572, 282, 56, 8);
    ctx.fillStyle = '#333';
    ctx.font = '6px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('GTM Container', 574, 288);
    
    // Tags/Triggers/Variables tabs
    ctx.fillStyle = '#e8e8e8';
    ctx.fillRect(572, 292, 18, 6);
    ctx.fillRect(591, 292, 18, 6);
    ctx.fillRect(610, 292, 18, 6);
    
    // Coffee mug (half full, realistic)
    ctx.fillStyle = '#8b4513';
    ctx.beginPath();
    ctx.arc(620, 305, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3e2723';
    ctx.beginPath();
    ctx.arc(620, 302, 10, 0, Math.PI * 2);
    ctx.fill();
    
    // Coffee steam
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) {
        const steamOffset = Math.sin(time * 2 + i) * 3;
        ctx.beginPath();
        ctx.moveTo(620 + (i - 1) * 5, 295);
        ctx.quadraticCurveTo(620 + (i - 1) * 5 + steamOffset, 285, 620 + (i - 1) * 5, 275);
        ctx.stroke();
    }
}

// Initialize canvas for chapter 1
function initChaosCanvas() {
    canvas = document.getElementById('canvas-chaos');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // Set up characters for chaos demo
    characters = [
        { role: 'marketing', x: 150, y: 200, emoji: '📣', label: 'MARKETING', wobble: 0, stress: 0 },
        { role: 'product', x: 400, y: 200, emoji: '📜', label: 'PRODUCT', wobble: 0.5, stress: 0 },
        { role: 'legal', x: 650, y: 200, emoji: '⚖️', label: 'LEGAL', wobble: 1, stress: 0 },
        { role: 'analyst', x: 400, y: 320, emoji: '💻', label: 'ANALYST', wobble: 1.5, stress: 0 }
    ];
    
    // Start animation
    animate();
}

// Update canvas based on choice
function updateChaosCanvas(choice) {
    if (choice === 'manual') {
        chaosState = 'chaos';
        // Make characters stressed
        characters.forEach(char => {
            char.stress = 1;
        });
        // Create explosion particles
        createParticles(400, 200, 20, '#e57373');
    } else if (choice === 'gtm') {
        chaosState = 'order';
        // Add GTM character with entrance animation
        if (!characters.find(c => c.role === 'gtm')) {
            characters.push({
                role: 'gtm',
                x: 400,
                y: -50,
                targetY: 80,
                emoji: '🤖',
                label: 'GTM',
                entering: true,
                wobble: 0,
                stress: 0,
                scale: 0
            });
        }
        // Create success particles
        createParticles(400, 80, 30, '#7bc96f');
    }
}

// Create particle effects
function createParticles(x, y, count, color) {
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 1,
            color: color,
            size: Math.random() * 4 + 2
        });
    }
}

// Main animation loop
function animate() {
    time++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life -= 0.02;
        
        if (p.life > 0) {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            return true;
        }
        return false;
    });
    
    // Draw floor line
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(50, 380);
    ctx.lineTo(750, 380);
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Draw connections based on state
    if (chaosState === 'chaos') {
        drawChaosConnections();
    } else if (chaosState === 'order') {
        drawOrderConnections();
    }
    
    // Update and draw characters
    characters.forEach((char) => {
        // Handle entering animation
        if (char.entering) {
            char.y += (char.targetY - char.y) * 0.1;
            char.scale += (1 - char.scale) * 0.1;
            
            if (Math.abs(char.y - char.targetY) < 1) {
                char.y = char.targetY;
                char.entering = false;
                char.scale = 1;
                
                // Calm down other characters
                characters.forEach(c => {
                    if (c.role !== 'gtm') c.stress = 0;
                });
            }
        }
        
        // Calculate wobble for stressed characters
        const wobbleAmount = char.stress * Math.sin(time * 0.3 + char.wobble * Math.PI) * 3;
        const drawX = char.x + wobbleAmount;
        
        // Draw character
        drawCharacter(drawX, char.y, char.role, char.emoji, char.label, char.stress, char.scale || 1);
        
        // Draw speech bubbles
        if (chaosState === 'chaos' && speeches.chaos[char.role]) {
            drawSpeechBubble(drawX, char.y - 80, speeches.chaos[char.role], char.stress > 0);
        } else if (chaosState === 'order' && speeches.order[char.role]) {
            drawSpeechBubble(drawX, char.y - 80, speeches.order[char.role], false);
        }
    });
    
    // Draw icons in center
    if (chaosState === 'chaos') {
        drawChaosIcon();
    } else if (chaosState === 'order') {
        drawSuccessIcon();
    }
    
    animationFrame = requestAnimationFrame(animate);
}

// Draw enhanced character
function drawCharacter(x, y, role, emoji, label, stress, scale) {
    const color = COLORS[role];
    
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.beginPath();
    ctx.ellipse(0, 45, 15, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Legs
    ctx.beginPath();
    ctx.moveTo(-10, 10);
    ctx.lineTo(-10, 35);
    ctx.moveTo(10, 10);
    ctx.lineTo(10, 35);
    ctx.stroke();
    
    // Body/Shirt (trapezoid) - with gradient
    const gradient = ctx.createLinearGradient(0, -10, 0, 10);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, shadeColor(color, -20));
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(-15, -10);
    ctx.lineTo(15, -10);
    ctx.lineTo(12, 10);
    ctx.lineTo(-12, 10);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Arms - animated when stressed
    const armWave = stress * Math.sin(time * 0.5) * 5;
    ctx.beginPath();
    ctx.moveTo(-15, -5);
    ctx.lineTo(-25, 5 + armWave);
    ctx.moveTo(15, -5);
    ctx.lineTo(25, 5 - armWave);
    ctx.stroke();
    
    // Head with shine
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(0, -30, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    // Shine on head
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath();
    ctx.arc(-7, -35, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyes - expression changes with stress
    ctx.fillStyle = '#000';
    const eyeSize = stress > 0 ? 3.5 : 2.5;
    const eyeY = stress > 0 ? -32 : -32;
    ctx.beginPath();
    ctx.arc(-8, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.arc(8, eyeY, eyeSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Eyebrows for stress
    if (stress > 0) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-12, -36);
        ctx.lineTo(-5, -38);
        ctx.moveTo(12, -36);
        ctx.lineTo(5, -38);
        ctx.stroke();
    }
    
    // Mouth - changes with stress
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    if (stress > 0) {
        // Worried mouth
        ctx.arc(0, -18, 8, 0.2 * Math.PI, 0.8 * Math.PI);
    } else {
        // Neutral or happy
        ctx.moveTo(-8, -22);
        ctx.lineTo(8, -22);
    }
    ctx.stroke();
    
    // Emoji icon above head
    ctx.font = '18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 0, -55);
    
    // Label below - with background
    ctx.font = 'bold 11px Arial';
    ctx.fillStyle = color;
    const textWidth = ctx.measureText(label).width;
    ctx.fillRect(-textWidth/2 - 4, 48, textWidth + 8, 16);
    ctx.fillStyle = '#fff';
    ctx.fillText(label, 0, 56);
    
    ctx.restore();
}

// Draw speech bubble
function drawSpeechBubble(x, y, text, stressed) {
    ctx.save();
    
    const lines = text.split('\n');
    const lineHeight = 16;
    const padding = 10;
    const width = 80;
    const height = lines.length * lineHeight + padding * 2;
    
    // Wobble if stressed
    const wobble = stressed ? Math.sin(time * 0.3) * 2 : 0;
    x += wobble;
    
    // Bubble background
    ctx.fillStyle = stressed ? 'rgba(229, 115, 115, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    
    // Rounded rectangle
    const radius = 8;
    ctx.beginPath();
    ctx.moveTo(x - width/2 + radius, y);
    ctx.lineTo(x + width/2 - radius, y);
    ctx.quadraticCurveTo(x + width/2, y, x + width/2, y + radius);
    ctx.lineTo(x + width/2, y + height - radius);
    ctx.quadraticCurveTo(x + width/2, y + height, x + width/2 - radius, y + height);
    ctx.lineTo(x - width/2 + radius, y + height);
    ctx.quadraticCurveTo(x - width/2, y + height, x - width/2, y + height - radius);
    ctx.lineTo(x - width/2, y + radius);
    ctx.quadraticCurveTo(x - width/2, y, x - width/2 + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Tail
    ctx.beginPath();
    ctx.moveTo(x - 5, y + height);
    ctx.lineTo(x, y + height + 10);
    ctx.lineTo(x + 5, y + height);
    ctx.fill();
    ctx.stroke();
    
    // Text
    ctx.fillStyle = stressed ? '#fff' : '#000';
    ctx.font = stressed ? 'bold 12px Arial' : '11px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    lines.forEach((line, i) => {
        ctx.fillText(line, x, y + padding + i * lineHeight);
    });
    
    ctx.restore();
}

// Draw chaos connections
function drawChaosConnections() {
    ctx.save();
    ctx.strokeStyle = '#e57373';
    ctx.lineWidth = 3;
    
    const connections = [
        [0, 1], [1, 2], [2, 0], // Triangle of chaos
        [0, 3], [1, 3], [2, 3]  // Everyone to analyst
    ];
    
    connections.forEach(([from, to], index) => {
        if (from >= characters.length || to >= characters.length) return;
        
        const fromChar = characters[from];
        const toChar = characters[to];
        
        // Animated chaos
        const wave = Math.sin(time * 0.1 + index) * 10;
        const midX = (fromChar.x + toChar.x) / 2;
        const midY = (fromChar.y + toChar.y) / 2 + wave;
        
        // Dashed line
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        ctx.moveTo(fromChar.x, fromChar.y);
        ctx.quadraticCurveTo(midX, midY, toChar.x, toChar.y);
        ctx.stroke();
        
        // Draw small error icons along the line
        if (time % 30 < 15) {
            ctx.font = '16px Arial';
            ctx.fillText('⚠️', midX, midY);
        }
    });
    
    ctx.setLineDash([]);
    ctx.restore();
}

// Draw order connections
function drawOrderConnections() {
    ctx.save();
    
    const gtmChar = characters.find(c => c.role === 'gtm');
    if (!gtmChar || gtmChar.entering) {
        ctx.restore();
        return;
    }
    
    ctx.strokeStyle = '#7bc96f';
    ctx.lineWidth = 3;
    
    characters.forEach((char, index) => {
        if (char.role === 'gtm') return;
        
        // Smooth curves
        const progress = (time % 100) / 100;
        const offset = (index * 0.25 + progress) % 1;
        
        ctx.save();
        ctx.globalAlpha = 0.7 + Math.sin(offset * Math.PI * 2) * 0.3;
        
        ctx.beginPath();
        ctx.moveTo(gtmChar.x, gtmChar.y + 20);
        
        const midX = (gtmChar.x + char.x) / 2;
        const midY = (gtmChar.y + char.y) / 2;
        
        ctx.quadraticCurveTo(midX, midY, char.x, char.y - 20);
        ctx.stroke();
        
        // Arrow head
        const angle = Math.atan2(char.y - midY, char.x - midX);
        ctx.fillStyle = '#7bc96f';
        ctx.beginPath();
        ctx.moveTo(char.x, char.y - 20);
        ctx.lineTo(char.x - 10 * Math.cos(angle - 0.5), char.y - 20 - 10 * Math.sin(angle - 0.5));
        ctx.lineTo(char.x - 10 * Math.cos(angle + 0.5), char.y - 20 - 10 * Math.sin(angle + 0.5));
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    });
    
    ctx.restore();
}

// Draw chaos icon
function drawChaosIcon() {
    const centerX = 400;
    const centerY = 40;
    const scale = 1 + Math.sin(time * 0.15) * 0.15;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    
    // Warning background
    ctx.fillStyle = 'rgba(229, 115, 115, 0.2)';
    ctx.beginPath();
    ctx.arc(0, 0, 35, 0, Math.PI * 2);
    ctx.fill();
    
    // Warning symbol
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚠️', 0, 0);
    
    ctx.restore();
}

// Draw success icon
function drawSuccessIcon() {
    const centerX = 400;
    const centerY = 40;
    const scale = 1 + Math.sin(time * 0.1) * 0.08;
    
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.scale(scale, scale);
    
    // Success background
    ctx.fillStyle = 'rgba(123, 201, 111, 0.2)';
    ctx.beginPath();
    ctx.arc(0, 0, 35, 0, Math.PI * 2);
    ctx.fill();
    
    // Checkmark
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✅', 0, 0);
    
    ctx.restore();
}

// Helper to darken colors
function shadeColor(color, percent) {
    const num = parseInt(color.replace("#",""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 +
        (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255))
        .toString(16).slice(1);
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (animationFrame) {
        cancelAnimationFrame(animationFrame);
    }
});

// ========== BLOQUE 2 CANVAS ==========

function initBloque2Canvas() {
    canvas = document.getElementById('canvas-bloque2');
    if (!canvas) return;
    
    canvas.width = 1100;
    canvas.height = 500;
    
    ctx = canvas.getContext('2d');
    
    // Characters for Bloque 2: Dev Senior + eventos flotando
    characters = [
        { role: 'dev', x: 300, y: 320, emoji: '📖', label: 'LA GUÍA', wobble: 0, stress: 0, wise: true },
        { role: 'apprentice', x: 800, y: 320, emoji: '🎒', label: 'TÚ', wobble: 0, stress: 0, curious: true },
    ];
    
    chaosState = 'events';
    particles = [];
    
    // Start animation loop
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animateBloque2();
}

function animateBloque2() {
    if (!ctx || !canvas) return;
    
    time += 0.02;
    
    // Office background
    ctx.fillStyle = '#e8e4d9';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Floor
    ctx.fillStyle = '#d4cfc4';
    ctx.fillRect(0, 450, canvas.width, 150);
    
    // Draw large "dataLayer" container in center (like a database/storage)
    const centerX = canvas.width / 2;
    const centerY = 250;
    const pulse = Math.sin(time * 2) * 8;
    
    // DataLayer container (looks like a server/database)
    ctx.save();
    
    // Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(centerX - 153, centerY - 93, 306, 186);
    
    // Main container
    const containerGradient = ctx.createLinearGradient(centerX - 150, centerY - 90, centerX - 150, centerY + 90);
    containerGradient.addColorStop(0, '#2c3e50');
    containerGradient.addColorStop(1, '#34495e');
    ctx.fillStyle = containerGradient;
    ctx.fillRect(centerX - 150, centerY - 90, 300, 180);
    
    // Border with pulse effect
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 4 + pulse * 0.3;
    ctx.strokeRect(centerX - 150, centerY - 90, 300, 180);
    
    // DataLayer label at top
    ctx.fillStyle = '#4ecdc4';
    ctx.fillRect(centerX - 150, centerY - 90, 300, 40);
    
    ctx.font = 'bold 24px monospace';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('dataLayer', centerX, centerY - 70);
    
    // Array brackets
    ctx.font = 'bold 60px monospace';
    ctx.fillStyle = '#4ecdc4';
    ctx.fillText('[  ]', centerX, centerY + 10);
    
    // Dots inside (representing data)
    ctx.font = 'bold 40px monospace';
    ctx.fillStyle = '#95a5a6';
    const dotOffset = Math.sin(time * 3) * 3;
    ctx.fillText('...', centerX, centerY + 10 + dotOffset);
    
    ctx.restore();
    
    // Draw floating events around dataLayer
    drawFloatingEvents();
    
    // Characters
    const apprentice = { x: 300, y: 500 };
    const devSenior = { x: 1100, y: 500 };
    
    drawCharacter(
        apprentice.x,
        apprentice.y,
        'apprentice',
        '🎒',
        'TÚ',
        { curious: true }
    );
    
    drawCharacter(
        devSenior.x,
        devSenior.y,
        'dev',
        '👨‍💻',
        'LA GUÍA',
        { calm: true, glasses: true }
    );
    
    // Speech bubbles (alternating)
    if (Math.floor(time * 0.5) % 2 === 0) {
        drawSpeechBubble('¿Qué es el dataLayer?', apprentice.x, apprentice.y - 80, '#e8e4d9', false);
    } else {
        drawSpeechBubble('Es el corazón del tracking. Todos los eventos van aquí.', devSenior.x, devSenior.y - 80, '#e8e4d9', false);
    }
    
    // Title
    ctx.save();
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.textAlign = 'center';
    ctx.fillText('🗣️ El lenguaje secreto de los eventos', centerX, 50);
    ctx.restore();
    
    animationFrame = requestAnimationFrame(animateBloque2);
}

function drawFloatingEvents() {
    const centerX = canvas.width / 2;
    const centerY = 250;
    const radius = 220;
    
    const events = [
        { text: 'page_view', color: '#3498db' },
        { text: 'add_to_cart', color: '#e74c3c' },
        { text: 'purchase', color: '#2ecc71' },
        { text: 'form_submit', color: '#f39c12' }
    ];
    
    ctx.save();
    
    events.forEach((event, i) => {
        const angle = (time * 0.5 + i * (Math.PI * 2 / events.length)) % (Math.PI * 2);
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const floatOffset = Math.sin(time * 3 + i) * 5;
        
        // Draw arrow from event to dataLayer
        ctx.strokeStyle = event.color + '40';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(x, y + floatOffset);
        ctx.lineTo(centerX, centerY);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Event bubble
        const bubbleSize = 35;
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.beginPath();
        ctx.arc(x + 2, y + floatOffset + 2, bubbleSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Main bubble
        const bubbleGradient = ctx.createRadialGradient(x - 10, y + floatOffset - 10, 0, x, y + floatOffset, bubbleSize);
        bubbleGradient.addColorStop(0, event.color);
        bubbleGradient.addColorStop(1, event.color + '80');
        ctx.fillStyle = bubbleGradient;
        ctx.beginPath();
        ctx.arc(x, y + floatOffset, bubbleSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Border
        ctx.strokeStyle = event.color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y + floatOffset, bubbleSize, 0, Math.PI * 2);
        ctx.stroke();
        
        // Text
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(event.text, x, y + floatOffset);
    });
    
    ctx.restore();
}

// ============================================
// BLOQUE 3 CANVAS — Sala oscura con eventos flotantes
// ============================================

function initBloque3Canvas() {
    canvas = document.getElementById('canvas-bloque3');
    if (!canvas) return;
    
    canvas.width = 1400;
    canvas.height = 600;
    
    ctx = canvas.getContext('2d');
    
    // Characters for Bloque 3: Apprentice + Dev Senior + eventos "invisibles"
    characters = [
        { role: 'apprentice', x: 400, y: 450, emoji: '🎒', label: 'TÚ', wobble: 0, stress: 0, confused: true },
        { role: 'dev', x: 1000, y: 450, emoji: '👨‍💻', label: 'DEV SENIOR', wobble: 0, stress: 0, wise: true },
    ];
    
    chaosState = 'darkness';
    particles = [];
    
    // Start animation loop
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animateBloque3();
}

function animateBloque3() {
    if (!ctx || !canvas) return;
    
    time += 0.02;
    
    // Factory background
    ctx.fillStyle = '#34495e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw floor
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(0, 480, canvas.width, 120);
    
    // Grid pattern on walls (factory feel)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 480);
        ctx.stroke();
    }
    for (let j = 0; j < 480; j += 50) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(canvas.width, j);
        ctx.stroke();
    }
    
    // Draw conveyor belt (main assembly line)
    const beltY = 300;
    const beltHeight = 40;
    
    // Belt base
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, beltY, canvas.width, beltHeight);
    
    // Belt movement lines (animated)
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 3;
    const beltOffset = (time * 50) % 30;
    for (let i = -30; i < canvas.width + 30; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i + beltOffset, beltY + 10);
        ctx.lineTo(i + beltOffset + 15, beltY + beltHeight - 10);
        ctx.stroke();
    }
    
    // Belt edges
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, beltY);
    ctx.lineTo(canvas.width, beltY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, beltY + beltHeight);
    ctx.lineTo(canvas.width, beltY + beltHeight);
    ctx.stroke();
    
    // QA Checkpoints (stations along the belt)
    const checkpoints = [
        { x: 250, label: 'GTM Preview', icon: '🔍', color: '#f39c12' },
        { x: 550, label: 'DevTools', icon: '🌐', color: '#3498db' },
        { x: 850, label: 'GA4 DebugView', icon: '📊', color: '#2ecc71' },
        { x: 1150, label: 'Tag Assistant', icon: '🔧', color: '#e74c3c' }
    ];
    
    checkpoints.forEach((cp, i) => {
        const pulse = Math.sin(time * 2 + i * 0.5) * 5;
        
        // Checkpoint stand
        ctx.fillStyle = '#555';
        ctx.fillRect(cp.x - 30, beltY - 120, 60, 120);
        
        // Checkpoint screen/display
        const gradient = ctx.createLinearGradient(cp.x - 35, beltY - 150, cp.x - 35, beltY - 80);
        gradient.addColorStop(0, cp.color);
        gradient.addColorStop(1, cp.color + '80');
        ctx.fillStyle = gradient;
        ctx.fillRect(cp.x - 35, beltY - 150, 70, 70);
        
        // Screen border
        ctx.strokeStyle = cp.color;
        ctx.lineWidth = 3;
        ctx.strokeRect(cp.x - 35, beltY - 150, 70, 70);
        
        // Icon inside
        ctx.font = '32px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(cp.icon, cp.x, beltY - 115 + pulse);
        
        // Label
        ctx.font = 'bold 11px Arial';
        ctx.fillStyle = '#4ecdc4';
        ctx.fillText(cp.label, cp.x, beltY - 160);
        
        // Checkmark indicator (blinking)
        if (Math.floor(time * 2) % 2 === 0) {
            ctx.fillStyle = '#2ecc71';
            ctx.beginPath();
            ctx.arc(cp.x + 25, beltY - 140, 8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.font = 'bold 10px Arial';
            ctx.fillStyle = 'white';
            ctx.fillText('✓', cp.x + 25, beltY - 138);
        }
    });
    
    // Events moving on the belt
    const events = [
        { name: 'page_view', color: '#3498db', offset: 0 },
        { name: 'add_to_cart', color: '#e74c3c', offset: 200 },
        { name: 'purchase', color: '#2ecc71', offset: 400 }
    ];
    
    events.forEach((event, i) => {
        const eventX = ((time * 80 + event.offset) % (canvas.width + 150)) - 75;
        const eventY = beltY + beltHeight / 2;
        
        // Only draw if on screen
        if (eventX > -50 && eventX < canvas.width + 50) {
            // Event package/box
            ctx.save();
            
            // Shadow
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(eventX - 27, eventY - 17, 54, 34);
            
            // Box
            ctx.fillStyle = event.color;
            ctx.fillRect(eventX - 30, eventY - 20, 60, 40);
            
            // Box border
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(eventX - 30, eventY - 20, 60, 40);
            
            // Event label
            ctx.font = 'bold 8px monospace';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(event.name, eventX, eventY);
            
            // Status indicator (being checked)
            const nearCheckpoint = checkpoints.some(cp => Math.abs(eventX - cp.x) < 40);
            if (nearCheckpoint) {
                // Scanning effect
                ctx.strokeStyle = '#4ecdc4';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(eventX, eventY, 35 + Math.sin(time * 5) * 3, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            ctx.restore();
        }
    });
    
    // Characters at start and end of line
    const apprentice = { x: 150, y: 500 };
    const devSenior = { x: 1250, y: 500 };
    
    // Draw apprentice (watching events enter)
    drawCharacter(
        apprentice.x,
        apprentice.y,
        'apprentice',
        '🎒',
        'TÚ',
        { confused: false }
    );
    
    // Draw dev senior (checking results)
    drawCharacter(
        devSenior.x,
        devSenior.y,
        'dev',
        '👨‍💻',
        'LA GUÍA',
        { calm: true, glasses: true }
    );
    
    // Speech bubbles
    if (Math.floor(time * 0.5) % 2 === 0) {
        drawSpeechBubble('Cada evento pasa por verificación', apprentice.x, apprentice.y - 80, '#e8e4d9', false);
    } else {
        drawSpeechBubble('Si pasa todos los checks, está OK ✓', devSenior.x, devSenior.y - 80, '#e8e4d9', false);
    }
    
    // Title at top
    ctx.save();
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#4ecdc4';
    ctx.textAlign = 'center';
    ctx.fillText('🏭 Línea de Verificación QA', canvas.width / 2, 40);
    
    ctx.font = '14px Arial';
    ctx.fillStyle = '#95a5a6';
    ctx.fillText('Cada evento debe pasar por múltiples herramientas de validación', canvas.width / 2, 65);
    ctx.restore();
    
    animationFrame = requestAnimationFrame(animateBloque3);
}

function drawGhostEvents() {
    const ghostEvents = [
        { text: 'page_view', x: 300, y: 150 },
        { text: 'add_to_cart', x: 700, y: 200 },
        { text: 'purchase', x: 1100, y: 150 },
        { text: 'form_submit', x: 500, y: 250 },
        { text: 'click', x: 900, y: 250 }
    ];
    
    ctx.save();
    ctx.font = '16px monospace';
    
    ghostEvents.forEach((event, i) => {
        const offset = Math.sin(time * 1.5 + i * 0.7) * 10;
        const pulse = 0.5 + Math.sin(time * 3 + i) * 0.3;
        
        // Assign colors to events
        const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
        const color = colors[i % colors.length];
        
        // Draw event bubble
        const bubbleX = event.x;
        const bubbleY = event.y + offset;
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(bubbleX + 3, bubbleY + 3, 35, 0, Math.PI * 2);
        ctx.fill();
        
        // Event bubble background
        const bubbleGradient = ctx.createRadialGradient(bubbleX - 10, bubbleY - 10, 0, bubbleX, bubbleY, 35);
        bubbleGradient.addColorStop(0, color);
        bubbleGradient.addColorStop(1, color + '80'); // Add transparency
        ctx.fillStyle = bubbleGradient;
        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, 35, 0, Math.PI * 2);
        ctx.fill();
        
        // Event bubble border (pulsing)
        ctx.strokeStyle = color;
        ctx.lineWidth = 2 * pulse;
        ctx.beginPath();
        ctx.arc(bubbleX, bubbleY, 35, 0, Math.PI * 2);
        ctx.stroke();
        
        // Event name
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(event.text, bubbleX, bubbleY);
        
        // Question mark above (indicating invisibility without tools)
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.fillText('?', bubbleX, bubbleY - 50);
    });
    
    ctx.restore();
}

// ============================================
// BLOQUE 4 — Arquitectos del Funnel
// ============================================

function initBloque4Canvas() {
    canvas = document.getElementById('canvas-bloque4');
    if (!canvas) return;
    
    ctx = canvas.getContext('2d');
    
    // Reset animation state
    time = 0;
    
    // Start animation loop
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animateBloque4();
}

function animateBloque4() {
    if (!ctx || !canvas) return;
    
    time += 0.02;
    
    // Background: Clean office with planning board
    const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGradient.addColorStop(0, '#f8f9fa');
    bgGradient.addColorStop(1, '#e8e4d9');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Floor
    ctx.fillStyle = '#d4cfc4';
    ctx.fillRect(0, 520, canvas.width, 80);
    
    // Planning board on wall (left side)
    drawPlanningBoard();
    
    // Funnel visualization (center)
    drawFunnelVisualization();
    
    // Characters (Apprentice on left, Analyst/Architect on right)
    const apprenticeX = 250;
    const apprenticeY = 470;
    const architectX = 1150;
    const architectY = 470;
    
    // Apprentice (you) - analyzing
    drawCharacter(ctx, apprenticeX, apprenticeY, 'apprentice', 'thinking', false, time * 10);
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('TÚ', apprenticeX, apprenticeY + 90);
    
    // Architect - explaining
    drawCharacter(ctx, architectX, architectY, 'senior', 'explaining', false, time * 8);
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('ARQUITECTO', architectX, architectY + 90);
    
    // Floating path/arrows showing funnel flow
    drawFunnelPath();
    
    animationFrame = requestAnimationFrame(animateBloque4);
}

function drawPlanningBoard() {
    // Board background
    ctx.fillStyle = '#2c3e50';
    ctx.fillRect(50, 100, 300, 200);
    
    // Board frame
    ctx.strokeStyle = '#34495e';
    ctx.lineWidth = 8;
    ctx.strokeRect(50, 100, 300, 200);
    
    // Title on board
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = '#4ecdc4';
    ctx.textAlign = 'center';
    ctx.fillText('Plan de Funnel', 200, 130);
    
    // Post-it notes with event names
    const postIts = [
        { text: 'view_item', color: '#ffd54f', x: 70, y: 160 },
        { text: 'add_to_cart', color: '#4ecdc4', x: 180, y: 160 },
        { text: 'checkout', color: '#ff6b6b', x: 290, y: 160 },
        { text: 'purchase', color: '#2ecc71', x: 180, y: 230 }
    ];
    
    postIts.forEach((note, i) => {
        const wobble = Math.sin(time * 2 + i) * 2;
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(note.x - 43, note.y - 23 + wobble, 86, 46);
        
        // Post-it
        ctx.fillStyle = note.color;
        ctx.fillRect(note.x - 40, note.y - 25 + wobble, 80, 40);
        
        // Text
        ctx.font = 'bold 10px monospace';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(note.text, note.x, note.y + wobble);
    });
    
    // Arrows connecting notes
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    
    ctx.beginPath();
    ctx.moveTo(110, 180);
    ctx.lineTo(140, 180);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(220, 180);
    ctx.lineTo(250, 180);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(220, 200);
    ctx.lineTo(220, 210);
    ctx.stroke();
    
    ctx.setLineDash([]);
}

function drawFunnelVisualization() {
    const centerX = 700;
    const startY = 150;
    
    // Title
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText('Funnel Estructurado', centerX, startY - 20);
    
    // Funnel shape (trapezoids getting narrower)
    const steps = [
        { label: '1000', event: 'view_item', width: 300, color: '#4ecdc4' },
        { label: '800', event: 'add_to_cart', width: 240, color: '#4ecdc4' },
        { label: '640', event: 'checkout', width: 180, color: '#4ecdc4' },
        { label: '480', event: 'purchase', width: 120, color: '#2ecc71' }
    ];
    
    let currentY = startY;
    const stepHeight = 80;
    
    steps.forEach((step, i) => {
        const pulse = Math.sin(time * 2 - i * 0.5) * 0.05 + 1;
        const nextWidth = i < steps.length - 1 ? steps[i + 1].width : step.width;
        
        // Trapezoid
        ctx.fillStyle = step.color + '40';
        ctx.strokeStyle = step.color;
        ctx.lineWidth = 3 * pulse;
        
        ctx.beginPath();
        ctx.moveTo(centerX - step.width / 2, currentY);
        ctx.lineTo(centerX + step.width / 2, currentY);
        ctx.lineTo(centerX + nextWidth / 2, currentY + stepHeight);
        ctx.lineTo(centerX - nextWidth / 2, currentY + stepHeight);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Event name
        ctx.font = 'bold 14px monospace';
        ctx.fillStyle = '#333';
        ctx.textAlign = 'center';
        ctx.fillText(step.event, centerX, currentY + 25);
        
        // User count
        ctx.font = 'bold 18px Arial';
        ctx.fillStyle = step.color;
        ctx.fillText(step.label + ' usuarios', centerX, currentY + 50);
        
        currentY += stepHeight;
    });
}

function drawFunnelPath() {
    // Animated dotted line showing the journey
    const startX = 900;
    const startY = 200;
    const endX = 1050;
    const endY = 500;
    
    ctx.save();
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.lineDashOffset = -time * 20;
    
    // Wavy path
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    
    for (let i = 0; i <= 10; i++) {
        const t = i / 10;
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t + Math.sin(t * Math.PI * 2 + time) * 20;
        ctx.lineTo(x, y);
    }
    
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
    
    // Arrow at end
    ctx.fillStyle = '#4ecdc4';
    ctx.beginPath();
    ctx.moveTo(endX, endY);
    ctx.lineTo(endX - 10, endY - 15);
    ctx.lineTo(endX + 10, endY - 15);
    ctx.closePath();
    ctx.fill();
    
    // Floating icons along the path
    const icons = ['👁️', '🛒', '💳', '✅'];
    icons.forEach((icon, i) => {
        const t = (i / icons.length) + (time * 0.1) % 1;
        const x = startX + (endX - startX) * t;
        const y = startY + (endY - startY) * t + Math.sin(t * Math.PI * 2 + time) * 20;
        const float = Math.sin(time * 3 + i) * 5;
        
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillText(icon, x + 2, y + float + 2);
        
        // Icon
        ctx.fillStyle = 'white';
        ctx.fillText(icon, x, y + float);
    });
}
