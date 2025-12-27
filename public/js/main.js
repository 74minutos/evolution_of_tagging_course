/**
 * LA EVOLUCIÓN DEL TAGGING
 * Main JavaScript with Teacher Mode
 */

// State
let currentChapter = 1;
const totalChapters = 5; // Total number of chapters
const choices = {};
let teacherMode = false;
let navOpen = false;
let isPaused = false;
let projectorMode = false;
let currentIntroSection = null;

// Simple show/hide functions
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.style.display = 'block';
    // Scroll to the section with offset for fixed header
    setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const offset = 120; // Height of fixed HUD
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - offset;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }, 100);
}

function hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    section.style.display = 'none';
}

function hideAllSections() {
    document.querySelectorAll('.chapter, .intro-scene-section, .theory-section').forEach(section => {
        section.style.display = 'none';
    });
}

// Compatibility functions for old scene system
function showScene(group, sectionId, options = {}) {
    // Hide all sections in the same group first
    if (group === 'introSections') {
        document.querySelectorAll('.intro-scene-section, .theory-section').forEach(s => s.style.display = 'none');
        currentIntroSection = sectionId;
    } else if (group === 'bloque2') {
        document.querySelectorAll('[id^="bloque2-"]').forEach(s => s.style.display = 'none');
    } else if (group === 'bloque5') {
        document.querySelectorAll('[id^="bloque5-"]').forEach(s => s.style.display = 'none');
    }
    
    // Show the target section
    showSection(sectionId);
}

function hideScene(group, sectionId, options = {}) {
    hideSection(sectionId);
}

function hideGroupScenes(group, options = {}) {
    if (group === 'introSections') {
        document.querySelectorAll('.intro-scene-section, .theory-section').forEach(s => s.style.display = 'none');
    } else if (group === 'bloque2') {
        document.querySelectorAll('[id^="bloque2-"]').forEach(s => s.style.display = 'none');
    } else if (group === 'bloque3') {
        document.querySelectorAll('[id^="bloque3-"]').forEach(s => s.style.display = 'none');
    } else if (group === 'bloque4') {
        document.querySelectorAll('[id^="bloque4-"]').forEach(s => s.style.display = 'none');
    } else if (group === 'bloque5') {
        document.querySelectorAll('[id^="bloque5-"]').forEach(s => s.style.display = 'none');
    } else if (group === 'bloque6') {
        document.querySelectorAll('[id^="bloque6-"]').forEach(s => s.style.display = 'none');
    }
}

// Teacher notes database
const teacherNotes = {
    1: {
        manual: [
            "Sin centralización, cada equipo implementa tags de forma independiente.",
            "Esto genera race conditions: tags que se disparan antes que el dataLayer esté listo.",
            "La falta de una capa de abstracción dificulta el cumplimiento RGPD/TCF.",
            "Preguntas comunes: ¿Por qué no usar un script global? Respuesta: Gobernanza y versionado."
        ],
        gtm: [
            "GTM actúa como una capa de orquestación: dataLayer → reglas → tags.",
            "Permite versioning, testing en preview, y rollback sin deployar código.",
            "Integración con CMPs (OneTrust, Cookiebot) para bloquear tags sin consentimiento.",
            "Tip: Enfatizar que no es 'magia', es arquitectura bien pensada."
        ]
    },
    2: {
        monolith: [
            "Las etiquetas monolíticas son el anti-patrón más común.",
            "Debugging se vuelve imposible cuando todo está en un solo bloque.",
            "Preguntar: ¿Alguien ha heredado código así? (Usualmente genera risas)"
        ],
        modular: [
            "Naming convention sugerida: tool_action_scope (ej: ga4_pageview_global).",
            "Variables nativas primero, personalizadas solo cuando sea necesario.",
            "Mostrar ejemplo real si hay tiempo."
        ]
    },
    3: {
        free: [
            "Sin estándares, el caos vuelve en 3 meses.",
            "El coste de refactor es 10x más alto que hacerlo bien desde el inicio.",
            "Pregunta clave: ¿Quién mantiene esto cuando el creador se va?"
        ],
        standards: [
            "Plantillas reutilizables aceleran el onboarding de nuevos miembros.",
            "Documentar anti-patrones es tan importante como documentar patrones.",
            "Ejemplo real: Mostrar un naming doc si tienes uno."
        ]
    }
};

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    // Hide all sections initially
    hideAllSections();
    
    // Hide loading screen with fade-in
    setTimeout(() => {
        document.getElementById('loading').classList.add('loading-hidden');
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
            document.getElementById('content').style.opacity = '1';
            document.getElementById('content').style.transform = 'translate3d(0, 0, 0)';
        }, 400);
    }, 600);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Prevent shortcuts if typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        // Choice shortcuts
        if (e.key === '1') {
            const btn = document.querySelector('.choices button:nth-child(1):not(:disabled)');
            if (btn && !isPaused) btn.click();
        } else if (e.key === '2') {
            const btn = document.querySelector('.choices button:nth-child(2):not(:disabled)');
            if (btn && !isPaused) btn.click();
        }
        
        // Teacher Mode shortcuts
        else if (e.key.toLowerCase() === 't') {
            toggleTeacherMode();
        } else if (e.key.toLowerCase() === 'p') {
            toggleProjectorMode();
        } else if (e.key.toLowerCase() === 'm') {
            toggleNav();
        } else if (e.key.toLowerCase() === 'd') {
            toggleDevTools();
        } else if (e.key === 'ArrowLeft' && teacherMode) {
            previousSection();
        } else if (e.key === 'ArrowRight' && teacherMode) {
            nextSection();
        } else if (e.key === ' ' && teacherMode) {
            e.preventDefault();
            togglePause();
        }
    });

    // Initialize canvas for chapter 1
    initChaosCanvas();
});

// ========== HELPER FUNCTIONS ==========

// Start the journey
function startJourney() {
    const titleScreen = document.getElementById('title-screen');
    if (titleScreen) {
        titleScreen.style.display = 'none';
    }
    document.getElementById('main-story').style.display = 'block';

    showGameHUD();

    setTimeout(() => {
        unlockAchievement('first_day');
    }, 1000);

    // COMIENZA EN SECCIÓN 0: ¿Qué es GTM?
    showScene('introSections', 'intro-section-0-welcome', { instant: true });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    currentChapter = 0; // intro is chapter 0
}

function nextIntroScene(sceneNumber) {
    const nextSceneId = `intro-scene-${sceneNumber}`;
    showScene('introSections', nextSceneId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Gamified intro flow functions
function startIntroMission() {
    showScene('introSections', 'intro-rpg-dialog');

    // Show RPG dialog
    const container = document.getElementById('rpg-dialog-container');
    if (!container) return;
    container.innerHTML = '';
    
    // CMO dialog
    const cmoDialog = showRPGDialog('cmo', 'Necesito lanzar una campaña y ver resultados en tiempo real. ¿Cuánto tardas?');
    container.appendChild(cmoDialog);
    
    setTimeout(() => {
        // Analytics dialog
        const analyticsDialog = showRPGDialog('analytics', 'Yo te puedo dar reports... pero tardas semanas en implementar con desarrollo.');
        container.appendChild(analyticsDialog);
        
        setTimeout(() => {
            console.log('⏱️ Second setTimeout executed');
            // Your turn with choices
            const yourDialog = showRPGDialog('you', '¿Y si puedo hacerlo yo mismo sin esperar a desarrollo?', [
                { text: 'Imposible, necesito código en el sitio', action: 'wrong' },
                { text: 'Puedo usar GTM para gestionar todo sin tocar código', action: 'learn_gtm' },
                { text: 'Mejor pido ayuda a desarrollo', action: 'wrong' }
            ]);
            container.appendChild(yourDialog);
        }, 2000);
    }, 2000);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeTheory1() {
    showScene('introSections', 'intro-theory-expandible-1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showIntroTheory2() {
    showScene('introSections', 'intro-theory-2');
}

function showIntroTheory4() {
    showScene('introSections', 'intro-theory-4');
}

function showIntroQuiz() {
    showScene('introSections', 'intro-quiz-game');
}

function startTowerBuilderGame() {
    showScene('introSections', 'intro-tower-game');
    
    // Initialize the drag-drop game
    setTimeout(() => {
        initTowerBuilderGame('tower-game-container');
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Called when tower game is completed
window.onTowerComplete = function() {
    setTimeout(() => {
        showScene('introSections', 'intro-theory-3');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
};

function startFirstEventMission() {
    showScene('introSections', 'intro-mission-2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeFirstEvent() {
    unlockAchievement('first_event');
    
    setTimeout(() => {
        showScene('introSections', 'intro-theory-expandible-2');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
}

function startMarketerQuiz() {
    showScene('introSections', 'intro-theory-expandible-3');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeIntro() {
    // Hide all intro scenes
    const introScenes = [
        'intro-welcome', 'intro-rpg-dialog', 'intro-theory-1', 'intro-theory-2',
        'intro-tower-game', 'intro-theory-3', 'intro-mission-2', 'intro-theory-4',
        'intro-quiz-game', 'intro-final'
    ];
    
    introScenes.forEach(id => {
        const scene = document.getElementById(id);
        if (scene) scene.style.display = 'none';
    });
    
    // Also hide old intro scenes if they exist
    for (let i = 1; i <= 14; i++) {
        const scene = document.getElementById(`intro-scene-${i}`);
        if (scene) scene.style.display = 'none';
    }
    
    document.getElementById('chapter-1').style.display = 'block';
    currentChapter = 1;
    initChaosCanvas();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Make a choice
function makeChoice(chapter, choice) {
    choices[chapter] = choice;
    
    // Disable all choice buttons for this chapter and mark selected
    const chapterEl = document.getElementById(`chapter-${chapter}`);
    const buttons = chapterEl.querySelectorAll('.choice-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        // Mark the selected button
        if (btn.getAttribute('onclick').includes(`'${choice}'`)) {
            btn.classList.add('selected');
        }
    });
    
    // Show outcome
    const outcomeEl = document.getElementById(`outcome-${chapter}-${choice}`);
    if (outcomeEl) {
        outcomeEl.style.display = 'block';
        
        // Scroll to outcome
        setTimeout(() => {
            outcomeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Show conclusion after a delay
        setTimeout(() => {
            const conclusionEl = document.getElementById(`conclusion-${chapter}`);
            if (conclusionEl) {
                conclusionEl.style.display = 'block';
                setTimeout(() => {
                    conclusionEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            }
        }, 1500);
    }
    
    // Update canvas animation based on choice
    if (chapter === 1) {
        updateChaosCanvas(choice);
    }
}

// Navigate to next chapter
function nextChapter(chapter) {
    currentChapter = chapter;
    
    // Hide current chapter
    const prevChapter = document.getElementById(`chapter-${chapter - 1}`);
    if (prevChapter) {
        prevChapter.style.display = 'none';
    }
    
    // Show next chapter
    const nextChapterEl = document.getElementById(`chapter-${chapter}`);
    if (nextChapterEl) {
        nextChapterEl.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Show final screen
        document.getElementById('chapter-final').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Restart
function restart() {
    currentChapter = 1;
    Object.keys(choices).forEach(key => delete choices[key]);
    
    // Hide everything
    document.querySelectorAll('.chapter').forEach(ch => ch.style.display = 'none');
    document.getElementById('main-story').style.display = 'none';
    
    // Reset chapter 1
    const chapter1 = document.getElementById('chapter-1');
    chapter1.querySelectorAll('.choice-btn').forEach(btn => btn.disabled = false);
    chapter1.querySelectorAll('.outcome').forEach(out => out.style.display = 'none');
    chapter1.querySelector('.conclusion').style.display = 'none';
    
    // Show title screen
    document.getElementById('title-screen').classList.add('active');
    window.scrollTo({ top: 0 });
    updateProgress();
}

// ========== TEACHER MODE FUNCTIONS ==========

function toggleTeacherMode() {
    teacherMode = !teacherMode;
    const bar = document.getElementById('teacher-bar');
    const floatingBtn = document.getElementById('teacher-mode-toggle');
    const devTools = document.getElementById('dev-tools');
    
    if (teacherMode) {
        bar.style.display = 'flex';
        floatingBtn.style.display = 'none';
        updateProgress();
    } else {
        bar.style.display = 'none';
        floatingBtn.style.display = 'block';
        hideTeacherNotes();
        // Close Dev Tools when exiting teacher mode
        if (devTools) {
            devTools.style.display = 'none';
        }
    }
}

function togglePause() {
    isPaused = !isPaused;
    document.body.classList.toggle('paused', isPaused);
    
    const btn = document.getElementById('pause-btn');
    if (isPaused) {
        btn.innerHTML = '▶ Reanudar';
    } else {
        btn.innerHTML = '⏸ Pausar';
    }
}

function toggleNav() {
    navOpen = !navOpen;
    const nav = document.getElementById('side-nav');
    nav.style.display = navOpen ? 'block' : 'none';
    updateNavActiveItem();
}

function toggleProjectorMode() {
    projectorMode = !projectorMode;
    document.body.classList.toggle('projector-mode', projectorMode);
}

function toggleDevTools() {
    // Only available in teacher mode
    if (!teacherMode) {
        console.log('Dev Tools solo disponibles en Modo Profesor (presiona T)');
        return;
    }
    
    const devTools = document.getElementById('dev-tools');
    if (devTools.style.display === 'none' || !devTools.style.display) {
        devTools.style.display = 'block';
    } else {
        devTools.style.display = 'none';
    }
}

function jumpToSection(sectionId) {
    // Hide all sections
    hideAllSections();
    
    // Show game HUD if not visible
    const hud = document.getElementById('game-hud');
    if (hud && hud.style.display === 'none') {
        hud.style.display = 'flex';
    }
    
    // Hide title screen
    const titleScreen = document.getElementById('title-screen');
    if (titleScreen) {
        titleScreen.classList.remove('active');
    }
    
    // Show main story
    const mainStory = document.getElementById('main-story');
    if (mainStory) {
        mainStory.style.display = 'block';
    }
    
    // Show the requested section
    const section = document.getElementById(sectionId);
    if (section) {
        section.style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Initialize mini-games if needed
        if (sectionId === 'intro-tower-game') {
            initTowerBuilderGame('intro-tower-game');
        } else if (sectionId === 'intro-quiz-game') {
            initMarketerQuizGame('marketer-quiz-container');
        } else if (sectionId === 'intro-secretos') {
            initSecretosSection();
        } else if (sectionId === 'bloque2-checklist') {
            initChecklistSection();
        } else if (sectionId.startsWith('bloque2-game-')) {
            const gameNum = sectionId.split('-')[2];
            const initFunc = window[`initBloque2Game${gameNum}`];
            if (initFunc) initFunc();
        } else if (sectionId === 'bloque2-boss-fight') {
            initBloque2BossFight();
        } else if (sectionId.startsWith('bloque3-mission-')) {
            const missionNum = sectionId.split('-')[2];
            const initFunc = window[`initBloque3Game${missionNum}`];
            if (initFunc) initFunc();
        } else if (sectionId === 'bloque3-boss-fight') {
            initBloque3BossFight();
        }
        
        // Initialize canvas if needed
        if (sectionId === 'intro-welcome') {
            initIntroCanvas();
        } else if (sectionId === 'bloque2-welcome') {
            initBloque2Canvas();
        } else if (sectionId === 'bloque3-welcome') {
            initBloque3Canvas();
        }
        
        console.log(`🔧 Dev Tools: Jumped to ${sectionId}`);
    } else {
        console.error(`Section ${sectionId} not found`);
    }
}

function previousSection() {
    if (currentChapter > 1) {
        jumpToChapter(currentChapter - 1);
    }
}

function nextSection() {
    if (currentChapter < totalChapters) {
        jumpToChapter(currentChapter + 1);
    }
}

function jumpToChapter(chapter) {
    if (chapter === 0) {
        restart();
        return;
    }
    
    // Hide all chapters
    document.querySelectorAll('.chapter').forEach(ch => ch.style.display = 'none');
    
    // Show selected chapter
    const targetChapter = document.getElementById(`chapter-${chapter}`);
    if (targetChapter) {
        targetChapter.style.display = 'block';
        currentChapter = chapter;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        updateProgress();
        updateNavActiveItem();
        
        // Close nav on mobile
        if (window.innerWidth <= 768) {
            toggleNav();
        }
    }
}

function updateProgress() {
    const progressEl = document.getElementById('teacher-progress');
    if (progressEl) {
        progressEl.textContent = `Cap. ${currentChapter}/${totalChapters}`;
    }
}

function updateNavActiveItem() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const currentItem = document.querySelector(`.nav-item[onclick="jumpToChapter(${currentChapter})"]`);
    if (currentItem) {
        currentItem.classList.add('active');
    }
}

function showTeacherNotes(chapter, choice) {
    const notesPanel = document.getElementById('teacher-notes');
    const notesContent = document.getElementById('teacher-notes-content');
    
    if (teacherNotes[chapter] && teacherNotes[chapter][choice]) {
        const notes = teacherNotes[chapter][choice];
        notesContent.innerHTML = '<ul>' + notes.map(note => `<li>${note}</li>`).join('') + '</ul>';
        notesPanel.style.display = 'block';
    }
}

function hideTeacherNotes() {
    document.getElementById('teacher-notes').style.display = 'none';
}

// Update makeChoice to show teacher notes
const originalMakeChoice = makeChoice;
makeChoice = function(chapter, choice) {
    originalMakeChoice(chapter, choice);
    
    // Show teacher notes if in teacher mode
    if (teacherMode) {
        setTimeout(() => {
            showTeacherNotes(chapter, choice);
        }, 1000);
    }
};

// ===== Theory Modal Functions =====
let currentTheorySection = 'intro';
let currentTheorySlide = 0;

function showTheoryModal(section, event) {
    // Prevent any default behavior or propagation
    if (event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
    }
    
    currentTheorySection = section || 'intro';
    currentTheorySlide = 0;
    
    const modal = document.getElementById('theory-modal');
    modal.style.display = 'flex';
    
    renderTheorySlide();
    
    // Prevent any scroll
    return false;
}

function closeTheoryModal() {
    const modal = document.getElementById('theory-modal');
    modal.style.display = 'none';
}

function prevTheorySlide() {
    const slides = theoryContent[currentTheorySection].slides;
    if (currentTheorySlide > 0) {
        currentTheorySlide--;
        renderTheorySlide();
    }
}

function nextTheorySlide() {
    const slides = theoryContent[currentTheorySection].slides;
    if (currentTheorySlide < slides.length - 1) {
        currentTheorySlide++;
        renderTheorySlide();
    }
    // Si estamos en el último slide, no hacer nada (el botón "Cerrar" se encargará)
}

function renderTheorySlide() {
    const section = theoryContent[currentTheorySection];
    if (!section || !section.slides) return;
    
    const slides = section.slides;
    const slide = slides[currentTheorySlide];
    
    const content = document.getElementById('theory-content');
    const progress = document.getElementById('theory-progress');
    
    // Build HTML
    let html = `
        <div class="theory-header">
            <h2>${section.title}</h2>
        </div>
        <div class="theory-slide">
            <h3>${slide.title}</h3>
            ${slide.content}
        </div>
    `;
    
    content.innerHTML = html;
    progress.textContent = `${currentTheorySlide + 1}/${slides.length}`;
}

function showFinalScreen() {
    // Hide all chapters
    document.querySelectorAll('.chapter').forEach(ch => ch.style.display = 'none');
    
    // Show final screen
    document.getElementById('chapter-final').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ========== BLOQUE 2 NAVIGATION ==========

function startBloque2() {
    // Hide all intro sections
    document.querySelectorAll('.intro-scene-section, .theory-section').forEach(s => {
        s.style.display = 'none';
    });
    
    showScene('bloque2', 'bloque2-welcome');
    showGameHUD();
    
    // Wait for the scene to be visible before initializing canvas and scrolling
    setTimeout(() => {
        initBloque2Canvas();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
}

function startBloque2Intro() {
    hideAllSections();
    document.getElementById('bloque2-intro-datalayer').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque2Mission1() {
    hideAllSections();
    document.getElementById('bloque2-theory-1').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque2Game1() {
    hideScene('bloque2', 'bloque2-theory-1');
    showScene('bloque2', 'bloque2-game-1');
    setTimeout(() => initBloque2Game1('bloque2-game-1-container'), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque2Game2() {
    hideScene('bloque2', 'bloque2-theory-2');
    showScene('bloque2', 'bloque2-game-2');
    setTimeout(() => initBloque2Game2('bloque2-game-2-container'), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque2Game3() {
    hideScene('bloque2', 'bloque2-theory-3');
    showScene('bloque2', 'bloque2-game-3');
    setTimeout(() => initBloque2Game3('bloque2-game-3-container'), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque2Game4() {
    hideScene('bloque2', 'bloque2-theory-4');
    showScene('bloque2', 'bloque2-game-4');
    setTimeout(() => initBloque2Game4('bloque2-game-4-container'), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque2Game5() {
    hideScene('bloque2', 'bloque2-theory-5');
    showScene('bloque2', 'bloque2-game-5');
    setTimeout(() => initBloque2Game5('bloque2-game-5-container'), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque2BossFight() {
    hideScene('bloque2', 'bloque2-theory-6');
    showScene('bloque2', 'bloque2-boss-fight');
    setTimeout(() => initBloque2BossFight('bloque2-boss-fight-container'), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeBloque2() {
    hideGroupScenes('bloque2');
    showScene('bloque2', 'bloque2-final');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addXP(200);
}

// ========== BLOQUE 3 NAVIGATION ==========

function startBloque3() {
    hideGroupScenes('introSections');
    showScene('bloque3', 'bloque3-welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initBloque3Canvas();
}

function startBloque3Theory1() {
    hideScene('bloque3', 'bloque3-welcome');
    showScene('bloque3', 'bloque3-theory-1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque3Mission1() {
    hideScene('bloque3', 'bloque3-theory-1');
    showScene('bloque3', 'bloque3-mission-1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeBloque3Game1() {
    hideScene('bloque3', 'bloque3-mission-1');
    showScene('bloque3', 'bloque3-theory-2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque3Mission2() {
    hideScene('bloque3', 'bloque3-theory-2');
    showScene('bloque3', 'bloque3-mission-2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeBloque3Game2() {
    hideScene('bloque3', 'bloque3-mission-2');
    showScene('bloque3', 'bloque3-theory-3');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque3Mission3() {
    hideScene('bloque3', 'bloque3-theory-3');
    showScene('bloque3', 'bloque3-mission-3');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeBloque3Game3() {
    hideScene('bloque3', 'bloque3-mission-3');
    showScene('bloque3', 'bloque3-theory-4');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque3Mission4() {
    hideScene('bloque3', 'bloque3-theory-4');
    showScene('bloque3', 'bloque3-mission-4');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeBloque3Game4() {
    hideScene('bloque3', 'bloque3-mission-4');
    showScene('bloque3', 'bloque3-theory-5');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque3BossFight() {
    hideScene('bloque3', 'bloque3-theory-5');
    showScene('bloque3', 'bloque3-boss-fight');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeBloque3() {
    hideGroupScenes('bloque3');
    showScene('bloque3', 'bloque3-final');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== DEMO LIVE NAVIGATION ==========

function startDemoLive() {
    hideAllSections();
    document.getElementById('demo-welcome').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startDemoFacebook() {
    hideAllSections();
    document.getElementById('demo-facebook').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startDemoGA4() {
    hideAllSections();
    document.getElementById('demo-ga4').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startDemoCAPI() {
    hideAllSections();
    document.getElementById('demo-capi').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeDemoLive() {
    hideAllSections();
    startBloque4();
}

// ========== BLOQUE 4 NAVIGATION ==========

function startBloque4() {
    hideAllSections();
    document.getElementById('bloque4-welcome').style.display = 'block';
    initBloque4Canvas();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque4Theory1() {
    hideAllSections();
    document.getElementById('bloque4-theory-1').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque4Mission1() {
    hideAllSections();
    document.getElementById('bloque4-mission-1').style.display = 'block';
    initBloque4Game1();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque4Mission2() {
    hideAllSections();
    document.getElementById('bloque4-mission-2').style.display = 'block';
    initBloque4Game2();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque4Mission3() {
    hideAllSections();
    document.getElementById('bloque4-mission-3').style.display = 'block';
    initBloque4Game3();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque4Mission4() {
    hideAllSections();
    document.getElementById('bloque4-mission-4').style.display = 'block';
    initBloque4Game4();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque4Mission5() {
    hideAllSections();
    document.getElementById('bloque4-mission-5').style.display = 'block';
    initBloque4Game5();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeBloque4() {
    alert('¡Bloque 4 completado! 🎉\n\nEl Bloque 5 estará disponible próximamente.');
    // TODO: navegar al Bloque 5 cuando esté disponible
}

// Navigation from expandible theory blocks
function continueFromTheoryBlock1() {
    hideScene('bloque2', 'bloque2-theory-expandible-1', true);
    showScene('bloque2', 'bloque2-theory-1', true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function continueFromTheoryBlock2() {
    hideScene('bloque2', 'bloque2-theory-expandible-2', true);
    showScene('bloque2', 'bloque2-theory-3', true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function continueFromTheoryBlock3() {
    hideScene('bloque2', 'bloque2-theory-expandible-3', true);
    showScene('bloque2', 'bloque2-theory-5', true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== QUIZ COMPLETION FUNCTIONS ==========

function completeQuizMission() {
    hideGroupScenes('introSections');
    showScene('introSections', 'intro-secretos');
    
    // Init secretos game
    setTimeout(() => {
        initSecretosGame();
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function skipQuizAndContinue() {
    hideGroupScenes('introSections');
    showScene('introSections', 'intro-secretos');
    
    // Init secretos game
    setTimeout(() => {
        initSecretosGame();
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== SECRETOS Y CHECKLIST NAVIGATION ==========

function initSecretosSection() {
    // Init secretos game
    setTimeout(() => {
        initSecretosGame();
    }, 100);
}

function startSecretosSection() {
    hideScene('introSections', 'intro-final');
    showScene('introSections', 'intro-secretos');
    
    // Init secretos game
    setTimeout(() => {
        initSecretosGame();
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startChecklistSection() {
    hideScene('bloque2', 'bloque2-theory-6');
    showScene('bloque2', 'bloque2-checklist');
    
    // Init checklist game
    setTimeout(() => {
        initChecklistGame();
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== FUNDAMENTOS INTEGRADOS ==========

function initFundamentosSlides() {
    const slides = theoryContent.afterBloque2Part1.slides;
    const container = document.getElementById('fundamentos-slides');
    let currentSlide = 0;
    
    function renderSlide() {
        const slide = slides[currentSlide];
        
        container.innerHTML = `
            <div class="fundamentos-slide" style="animation: fadeInScale 0.5s ease;">
                <div style="background: rgba(78, 205, 196, 0.1); padding: 3rem; border-radius: 15px; border: 2px solid var(--primary); margin-bottom: 2rem;">
                    <h2 style="color: var(--primary); text-align: center; margin-bottom: 2rem;">${slide.title}</h2>
                    <div style="font-size: 1.1rem; line-height: 1.8;">
                        ${slide.content}
                    </div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 2rem;">
                    <div style="color: var(--text-light); font-weight: 600;">
                        Slide ${currentSlide + 1} de ${slides.length}
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        ${currentSlide > 0 ? '<button class="btn-continue" onclick="prevFundamentosSlide()">← Anterior</button>' : ''}
                        ${currentSlide < slides.length - 1 
                            ? '<button class="btn-primary" onclick="nextFundamentosSlide()">Siguiente →</button>'
                            : '<button class="btn-primary" onclick="completeFundamentos()">Continuar al juego →</button>'}
                    </div>
                </div>
            </div>
        `;
    }
    
    window.nextFundamentosSlide = function() {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            renderSlide();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    window.prevFundamentosSlide = function() {
        if (currentSlide > 0) {
            currentSlide--;
            renderSlide();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    window.completeFundamentos = function() {
        continueFromTheoryBlock1();
    };
    
    renderSlide();
}

// ========== BLOQUE 1 THEORY BLOCKS NAVIGATION ==========

function continueFromIntroWelcome() {
    showScene('introSections', 'intro-rpg-dialog');
}

function continueFromIntroTheory1() {
    showScene('introSections', 'intro-theory-2');
}

function continueFromIntroTheory2() {
    showScene('introSections', 'intro-theory-4');
}

function continueFromIntroTheory3() {
    showScene('introSections', 'intro-quiz-game');
    
    setTimeout(() => {
        initMarketerQuizGame('marketer-quiz-container');
    }, 100);
}

function showIntroSecretos() {
    showScene('introSections', 'intro-secretos');
}

function showIntroChecklist() {
    showScene('introSections', 'intro-final');
}

// ============================================
// BLOQUE 5 Functions
// ============================================

function startBloque5() {
    hideAllSections();
    showScene('bloque5', 'bloque5-welcome');
    showGameHUD();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque5Game1() {
    showScene('bloque5', 'bloque5-game-1');
    setTimeout(() => initBloque5Game1(), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque5Game2() {
    showScene('bloque5', 'bloque5-game-2');
    setTimeout(() => initBloque5Game2(), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque5Game3() {
    showScene('bloque5', 'bloque5-game-3');
    setTimeout(() => initBloque5Game3(), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque5BossFight() {
    showScene('bloque5', 'bloque5-boss-fight');
    setTimeout(() => initBloque5BossFight(), 100);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== BLOQUE 6 NAVIGATION ==========

function startBloque6() {
    hideAllSections();
    document.getElementById('bloque6-welcome').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque6Theory1() {
    hideAllSections();
    document.getElementById('bloque6-theory-1').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque6Theory2() {
    hideAllSections();
    document.getElementById('bloque6-theory-2').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque6Theory3() {
    hideAllSections();
    document.getElementById('bloque6-theory-3').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function startBloque6Theory4() {
    hideAllSections();
    document.getElementById('bloque6-theory-4').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function completeBloque6() {
    hideAllSections();
    document.getElementById('bloque6-final').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Unlock final achievement
    if (typeof unlockAchievement === 'function') {
        unlockAchievement('gtm_master');
    }
}
