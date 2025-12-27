// ============================================
// BLOQUE 3 — Mini-juegos de QA y Validación
// ============================================

// Global state for Bloque 3 Game 1
let bloque3Game1State = {
    currentEventIndex: 0,
    events: [
        { name: 'page_view', icon: '📄', correct: ['preview', 'debugview', 'omnibug'] },
        { name: 'add_to_cart', icon: '🛒', correct: ['preview', 'debugview', 'omnibug'] },
        { name: 'purchase', icon: '💳', correct: ['preview', 'debugview', 'omnibug'] }
    ]
};

// Misión 1: Encender la luz
function initBloque3Game1() {
    const container = document.getElementById('bloque3-game-1-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    let selectedTools = [];
    
    function renderEvent() {
        const event = bloque3Game1State.events[bloque3Game1State.currentEventIndex];
        selectedTools = []; // Reset selections
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">🎯 Evento ${bloque3Game1State.currentEventIndex + 1}/${bloque3Game1State.events.length}: ${event.icon} ${event.name}</h3>
                <p class="minigame-instructions">
                    <strong>Selecciona TODAS las herramientas</strong> que te permiten verificar si este evento existe.<br>
                    <small>(Puedes seleccionar múltiples opciones)</small>
                </p>
                
                <div class="quiz-options" style="margin-top: 2rem;">
                    <button class="quiz-option multi-select" data-tool="preview">
                        🟡 Preview Mode GTM
                    </button>
                    <button class="quiz-option multi-select" data-tool="debugview">
                        🔵 GA4 DebugView
                    </button>
                    <button class="quiz-option multi-select" data-tool="omnibug">
                        🟢 Omnibug / Tag Assistant
                    </button>
                    <button class="quiz-option multi-select" data-tool="nothing">
                        🔴 Nada (fe ciega 😅)
                    </button>
                </div>
                
                <button id="submit-tools" class="btn-primary" style="margin-top: 1.5rem; opacity: 0.5;" disabled>
                    Verificar selección →
                </button>
                
                <div id="game1-result" style="margin-top: 2rem; display: none;"></div>
            </div>
        `;
        
        // Add event listeners for multi-select
        const options = container.querySelectorAll('.quiz-option');
        const submitBtn = document.getElementById('submit-tools');
        
        options.forEach(option => {
            option.addEventListener('click', () => {
                const tool = option.getAttribute('data-tool');
                
                // Toggle selection
                if (selectedTools.includes(tool)) {
                    selectedTools = selectedTools.filter(t => t !== tool);
                    option.classList.remove('selected');
                } else {
                    selectedTools.push(tool);
                    option.classList.add('selected');
                }
                
                // Enable submit button if at least one tool is selected
                if (selectedTools.length > 0) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                } else {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.5';
                }
            });
        });
        
        // Submit button
        submitBtn.addEventListener('click', () => {
            handleToolChoice(selectedTools, event);
        });
    }
    
    function handleToolChoice(tools, event) {
        const resultDiv = document.getElementById('game1-result');
        const options = container.querySelectorAll('.quiz-option');
        const submitBtn = document.getElementById('submit-tools');
        
        // Disable all options and submit button
        options.forEach(btn => btn.disabled = true);
        submitBtn.disabled = true;
        
        // Check if "nothing" was selected
        if (tools.includes('nothing')) {
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ Pantalla en negro</strong></p>
                    <p>No hay dato que salvar. La fe ciega no es una estrategia de QA.</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="retryBloque3Game1()">
                        🔄 Intentar de nuevo
                    </button>
                </div>
            `;
            resultDiv.style.display = 'block';
            return;
        }
        
        // Check if all correct tools were selected
        const allCorrect = event.correct.every(tool => tools.includes(tool));
        const noExtras = tools.every(tool => event.correct.includes(tool));
        
        if (allCorrect && noExtras) {
            // Mark correct options
            options.forEach(opt => {
                const tool = opt.getAttribute('data-tool');
                if (tools.includes(tool)) {
                    opt.classList.add('correct');
                }
            });
            
            bloque3Game1State.currentEventIndex++;
            
            if (bloque3Game1State.currentEventIndex < bloque3Game1State.events.length) {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>✅ ¡Evento iluminado!</strong></p>
                        <p>Has verificado que el evento existe con todas las herramientas correctas.</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="nextBloque3Event()">
                            Siguiente evento →
                        </button>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>🏆 ¡Radar desbloqueado!</strong></p>
                        <p>Has aprendido a verificar eventos con las herramientas correctas.</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque3Game1()">
                            Continuar →
                        </button>
                    </div>
                `;
                
                // Award XP and unlock achievement
                gainXP(50);
                unlockAchievement('qa_tools');
            }
        } else {
            // Mark correct and incorrect
            options.forEach(opt => {
                const tool = opt.getAttribute('data-tool');
                if (tools.includes(tool) && !event.correct.includes(tool)) {
                    opt.classList.add('incorrect');
                } else if (tools.includes(tool) && event.correct.includes(tool)) {
                    opt.classList.add('correct');
                } else if (!tools.includes(tool) && event.correct.includes(tool)) {
                    // Show what was missing
                    opt.style.border = '3px dashed #f39c12';
                }
            });
            
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ No del todo</strong></p>
                    <p>Te faltan herramientas o has seleccionado alguna incorrecta.<br>
                    <small>Las 3 opciones correctas están resaltadas.</small></p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="retryBloque3Game1()">
                        🔄 Intentar de nuevo
                    </button>
                </div>
            `;
        }
        
        resultDiv.style.display = 'block';
    }
    
    renderEvent();
}

// Helper function to retry current event without resetting progress
window.retryBloque3Game1 = function() {
    // Don't reset currentEventIndex, just re-render the same event
    initBloque3Game1();
};

// Helper function to advance to next event
window.nextBloque3Event = function() {
    // The currentEventIndex is already incremented, just re-render
    initBloque3Game1();
};

// Misión 2: Caza el evento fantasma
function initBloque3Game2() {
    const container = document.getElementById('bloque3-game-2-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const steps = [
        { tool: 'GTM Preview', question: '¿Dónde verificas primero?', correct: true },
        { tool: 'GA4 DebugView', question: '¿Llega a GA4?', correct: false },
        { tool: 'Network Tab', question: '¿Qué dice el Network Tab?', correct: false }
    ];
    
    let currentStep = 0;
    
    function renderStep() {
        const step = steps[currentStep];
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">🕵️ Paso ${currentStep + 1}/3</h3>
                <p class="minigame-instructions">${step.question}</p>
                
                <div class="mission-steps" style="margin: 2rem 0;">
                    <div class="step">
                        <span class="step-number">${currentStep + 1}</span>
                        <div class="step-content">
                            <strong>${step.tool}</strong>
                            <p>Verificando...</p>
                        </div>
                    </div>
                </div>
                
                <div class="quiz-options" style="margin-top: 2rem;">
                    <button class="quiz-option" data-found="yes">
                        ✅ Evento encontrado
                    </button>
                    <button class="quiz-option" data-found="no">
                        ❌ Evento NO encontrado
                    </button>
                </div>
                
                <div id="game2-result" style="margin-top: 2rem; display: none;"></div>
            </div>
        `;
        
        // Add event listeners
        const options = container.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const found = option.getAttribute('data-found') === 'yes';
                handleStepChoice(found, step);
            });
        });
    }
    
    function handleStepChoice(found, step) {
        const resultDiv = document.getElementById('game2-result');
        const options = container.querySelectorAll('.quiz-option');
        
        // Disable all options
        options.forEach(btn => btn.disabled = true);
        
        const isCorrect = (found === step.correct);
        
        if (isCorrect) {
            currentStep++;
            
            if (currentStep < steps.length) {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>✅ Correcto!</strong></p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="initBloque3Game2()">
                            Siguiente paso →
                        </button>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>🏆 ¡Ojo de QA desbloqueado!</strong></p>
                        <p>El evento se pierde entre GTM Preview y GA4. Probablemente un error en el nombre del evento o en la configuración del tag.</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque3Game2()">
                            Continuar →
                        </button>
                    </div>
                `;
                
                // Award XP
                addXP(50);
            }
        } else {
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ Rastro perdido</strong></p>
                    <p>Has perdido el rastro del evento. Intenta de nuevo.</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="initBloque3Game2()">
                        🔄 Reintentar
                    </button>
                </div>
            `;
            currentStep = 0;
        }
        
        resultDiv.style.display = 'block';
    }
    
    renderStep();
}

// Misión 3: Sigue el rastro
function initBloque3Game3() {
    const container = document.getElementById('bloque3-game-3-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const funnel = [
        { step: 'page_view', status: '✅', tool: 'GTM Preview' },
        { step: 'add_to_cart', status: '❌', tool: 'DebugView' },
        { step: 'purchase', status: '✅', tool: 'Omnibug' }
    ];
    
    let selectedStep = null;
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🔎 Embudo de conversión</h3>
            <p class="minigame-instructions">Uno de estos pasos está roto. Usa las herramientas para identificarlo.</p>
            
            <div class="drag-drop-game" style="margin: 2rem 0;">
                ${funnel.map((step, idx) => `
                    <div class="drop-zone ${step.status === '❌' ? 'broken' : ''}" data-step="${idx}" style="cursor: pointer; transition: all 0.2s; padding: 1.5rem; border: 2px solid ${step.status === '❌' ? '#e74c3c' : '#4ecdc4'}; border-radius: 8px; margin: 1rem 0;">
                        <strong>${step.step}</strong>
                        <p style="margin: 0.5rem 0 0 0;">Status: ${step.status}</p>
                    </div>
                `).join('')}
            </div>
            
            <div class="quiz-options" style="margin-top: 2rem;">
                <button class="quiz-option" data-tool="preview">🟡 Usar GTM Preview</button>
                <button class="quiz-option" data-tool="debugview">🔵 Usar DebugView</button>
                <button class="quiz-option" data-tool="omnibug">🟢 Usar Omnibug</button>
            </div>
            
            <div id="game3-result" style="margin-top: 2rem; display: none;"></div>
        </div>
    `;
    
    // Add click listeners to funnel steps
    const steps = container.querySelectorAll('.drop-zone');
    steps.forEach((stepEl, idx) => {
        stepEl.addEventListener('click', () => {
            steps.forEach(s => s.style.transform = 'scale(1)');
            stepEl.style.transform = 'scale(1.05)';
            selectedStep = idx;
        });
    });
    
    // Add event listeners to tools
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            if (selectedStep === null) {
                alert('Primero selecciona un paso del embudo');
                return;
            }
            
            const tool = option.getAttribute('data-tool');
            handleToolSelection(tool, selectedStep);
        });
    });
    
    function handleToolSelection(tool, stepIdx) {
        const resultDiv = document.getElementById('game3-result');
        const options = container.querySelectorAll('.quiz-option');
        
        // Check if correct step (add_to_cart = index 1)
        if (stepIdx === 1 && tool === 'debugview') {
            // Disable all options
            options.forEach(btn => btn.disabled = true);
            
            resultDiv.innerHTML = `
                <div class="minigame-result success">
                    <p><strong>🏆 ¡Cazador de errores nivel 1!</strong></p>
                    <p>Has identificado correctamente que el evento <code>add_to_cart</code> no llega a GA4.</p>
                    <p>El problema: parámetro <code>item_id</code> faltante.</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque3Game3()">
                        Continuar →
                    </button>
                </div>
            `;
            
            // Award XP and unlock achievement
            addXP(75);
            unlockAchievement('bug_hunter');
        } else {
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ No es el paso correcto o la herramienta adecuada</strong></p>
                    <p>Pista: busca el paso que está ❌ y usa la herramienta que permite ver si llega a GA4.</p>
                </div>
            `;
        }
        
        resultDiv.style.display = 'block';
    }
}

// Misión 4: El bug de staging
function initBloque3Game4() {
    const container = document.getElementById('bloque3-game-4-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🐛 Diagnóstico</h3>
            <p class="minigame-instructions">El evento funciona en staging pero no en producción. ¿Cuál es la causa más probable?</p>
            
            <div class="quiz-options" style="margin-top: 2rem;">
                <button class="quiz-option" data-cause="dom">
                    Cambio en el DOM
                </button>
                <button class="quiz-option" data-cause="container">
                    Container ID diferente
                </button>
                <button class="quiz-option" data-cause="blocking">
                    Adblocker activo
                </button>
                <button class="quiz-option" data-cause="version">
                    Versión antigua publicada
                </button>
            </div>
            
            <div id="game4-result" style="margin-top: 2rem; display: none;"></div>
        </div>
    `;
    
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.addEventListener('click', () => {
            const cause = option.getAttribute('data-cause');
            handleCauseChoice(cause);
        });
    });
    
    function handleCauseChoice(cause) {
        const resultDiv = document.getElementById('game4-result');
        const options = container.querySelectorAll('.quiz-option');
        
        // Disable all options
        options.forEach(btn => btn.disabled = true);
        
        if (cause === 'container' || cause === 'version') {
            resultDiv.innerHTML = `
                <div class="minigame-result success">
                    <p><strong>✅ ¡Has salvado una campaña millonaria!</strong></p>
                    <p>Causa detectada: ${cause === 'container' ? 'El container ID en producción es diferente al de staging' : 'Se publicó una versión antigua del container'}.</p>
                    <p>Solución: verificar el snippet y/o publicar la versión correcta.</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque3Game4()">
                        Continuar →
                    </button>
                </div>
            `;
            
            // Award XP
            addXP(50);
        } else {
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ No es la causa principal</strong></p>
                    <p>Pista: el problema está en la configuración del container, no en el entorno del usuario.</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="initBloque3Game4()">
                        🔄 Reintentar
                    </button>
                </div>
            `;
        }
        
        resultDiv.style.display = 'block';
    }
}

// Boss Fight: La historia rota
function initBloque3BossFight() {
    const container = document.getElementById('bloque3-boss-fight-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const errors = [
        // Errores reales (3)
        { id: 1, type: 'naming', description: '✓ Naming inconsistente: "AddToCart" debe ser "add_to_cart" (snake_case)', correct: true },
        { id: 2, type: 'payload', description: '✓ Payload roto: "itemId" debe ser "item_id" (GA4 estándar)', correct: true },
        { id: 3, type: 'double', description: '✓ Doble evento: El trigger está configurado en múltiples condiciones', correct: true },
        
        // Distractores (opciones incorrectas)
        { id: 4, type: 'fake1', description: 'Falta el parámetro "currency" en el evento', correct: false },
        { id: 5, type: 'fake2', description: 'El valor 29.99 debería ser un string, no un número', correct: false },
        { id: 6, type: 'fake3', description: 'No se está usando el método dataLayer.set()', correct: false },
        { id: 7, type: 'fake4', description: 'Falta declarar window.dataLayer = window.dataLayer || []', correct: false }
    ];
    
    // Shuffle options
    const shuffledErrors = [...errors];
    for (let i = shuffledErrors.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledErrors[i], shuffledErrors[j]] = [shuffledErrors[j], shuffledErrors[i]];
    }
    
    let identifiedErrors = [];
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🎯 Boss Fight: Auditoría de implementación</h3>
            <p class="minigame-instructions">
                <strong>Identifica los 3 errores reales</strong> en esta implementación.<br>
                <small>Hay 7 opciones, pero solo 3 son errores reales. ¡Piensa bien!</small>
            </p>
            
            <div style="background: #2c3e50; color: #ecf0f1; padding: 2rem; border-radius: 8px; margin: 2rem 0; font-family: 'Courier New', monospace; font-size: 0.9rem; overflow-x: auto;">
                <pre style="margin: 0; white-space: pre-wrap;">
// Implementación GTM
dataLayer.push({
  'event': 'AddToCart',
  'itemId': '12345',
  'value': 29.99
});

// Trigger configurado:
// Event Name: add_to_cart
// Fires on: Custom Event - AddToCart
// También se activa en: All Clicks
                </pre>
            </div>
            
            <p style="margin: 1rem 0; color: #555;">
                <strong>Selecciona 3 errores:</strong> <span id="selected-count">0/3</span>
            </p>
            
            <div class="quiz-options" style="margin-top: 2rem;">
                ${shuffledErrors.map((error, index) => `
                    <button class="quiz-option multi-select" data-correct="${error.correct}" data-index="${index}" style="margin: 0.5rem 0; text-align: left;">
                        ${error.description}
                    </button>
                `).join('')}
            </div>
            
            <div id="boss-result" style="margin-top: 2rem; display: none;"></div>
            
            <button class="btn-primary" id="verify-boss" style="margin-top: 2rem; opacity: 0.5;" disabled>
                Verificar auditoría
            </button>
        </div>
    `;
    
    const options = container.querySelectorAll('.quiz-option');
    const verifyBtn = document.getElementById('verify-boss');
    const countSpan = document.getElementById('selected-count');
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            const index = parseInt(option.getAttribute('data-index'));
            
            // Toggle selection
            if (identifiedErrors.includes(index)) {
                // Deselect
                identifiedErrors = identifiedErrors.filter(i => i !== index);
                option.classList.remove('selected');
            } else {
                // Select (only if less than 3)
                if (identifiedErrors.length < 3) {
                    identifiedErrors.push(index);
                    option.classList.add('selected');
                }
            }
            
            // Update count
            countSpan.textContent = `${identifiedErrors.length}/3`;
            
            // Enable verify button if 3 are selected
            if (identifiedErrors.length === 3) {
                verifyBtn.disabled = false;
                verifyBtn.style.opacity = '1';
            } else {
                verifyBtn.disabled = true;
                verifyBtn.style.opacity = '0.5';
            }
        });
    });
    
    verifyBtn.addEventListener('click', () => {
        const resultDiv = document.getElementById('boss-result');
        
        // Check which errors were selected
        let correctCount = 0;
        let incorrectSelections = [];
        
        identifiedErrors.forEach(index => {
            const isCorrect = shuffledErrors[index].correct;
            if (isCorrect) {
                correctCount++;
                options[index].classList.add('correct');
            } else {
                incorrectSelections.push(shuffledErrors[index].description);
                options[index].classList.add('incorrect');
            }
        });
        
        // Highlight missed correct answers
        shuffledErrors.forEach((error, index) => {
            if (error.correct && !identifiedErrors.includes(index)) {
                options[index].style.border = '3px dashed #f39c12';
            }
        });
        
        // Disable all options
        options.forEach(opt => opt.disabled = true);
        verifyBtn.disabled = true;
        
        if (correctCount === 3) {
            resultDiv.innerHTML = `
                <div class="minigame-result success">
                    <p><strong>🏅 ¡Auditor de tracking desbloqueado!</strong></p>
                    <h4 style="margin-top: 1rem;">✅ Has identificado todos los errores correctamente:</h4>
                    <ul style="list-style: none; padding-left: 0;">
                        <li style="margin: 0.5rem 0;">✅ <strong>Naming inconsistente:</strong> "AddToCart" debe ser "add_to_cart" (snake_case)</li>
                        <li style="margin: 0.5rem 0;">✅ <strong>Payload roto:</strong> "itemId" debe ser "item_id" (GA4 estándar)</li>
                        <li style="margin: 0.5rem 0;">✅ <strong>Doble evento:</strong> El trigger está configurado en múltiples condiciones</li>
                    </ul>
                    <p style="margin-top: 1rem; color: #2ecc71;">
                        <strong>+100 XP</strong> - ¡Eres un QA Master!
                    </p>
                    <button class="btn-primary" style="margin-top: 2rem;" onclick="completeBloque3BossFight()">
                        Completar Bloque 3 →
                    </button>
                </div>
            `;
            
            // Award XP and unlock achievement
            gainXP(100);
            unlockAchievement('qa_master');
        } else {
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ No exactamente</strong></p>
                    <p>Has acertado ${correctCount} de 3 errores.</p>
                    ${incorrectSelections.length > 0 ? `
                        <p style="margin-top: 1rem;">
                            <strong>Opciones incorrectas que seleccionaste:</strong><br>
                            ${incorrectSelections.map(desc => `<small>• ${desc}</small>`).join('<br>')}
                        </p>
                    ` : ''}
                    <p style="margin-top: 1rem; color: #f39c12;">
                        💡 Las opciones correctas que te faltaron están marcadas con borde naranja.
                    </p>
                    <button class="btn-primary" style="margin-top: 2rem;" onclick="initBloque3BossFight()">
                        🔄 Intentar de nuevo
                    </button>
                    <button class="btn-continue" style="margin-top: 1rem;" onclick="completeBloque3BossFight()">
                        Continuar de todas formas →
                    </button>
                </div>
            `;
        }
        
        resultDiv.style.display = 'block';
    });
}

