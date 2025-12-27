/**
 * Mini-games for GTM Learning
 * Interactive games to reinforce learning
 */

// Tower Builder Drag & Drop Game
function initTowerBuilderGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const correctOrder = ['trigger', 'variable', 'tag'];
    let currentOrder = [];
    
    const items = [
        { id: 'tag', label: '🏷️ Tag', description: 'Envía datos' },
        { id: 'trigger', label: '🎯 Trigger', description: 'Define cuándo' },
        { id: 'variable', label: '📦 Variable', description: 'Información' }
    ];
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🗼 Construye tu Torre de Control</h3>
            <p class="minigame-instructions">
                Arrastra las piezas en el orden correcto para construir el flujo de GTM.<br>
                Piensa: ¿Qué necesitas primero para que un evento funcione?
            </p>
            
            <div class="drag-drop-game">
                <div class="draggable-items" id="draggable-items-${containerId}">
                    ${items.map(item => `
                        <div class="draggable-item" draggable="true" data-id="${item.id}">
                            ${item.label}
                        </div>
                    `).join('')}
                </div>
                
                <div class="drop-zones">
                    <div class="drop-zone" data-position="0">
                        <span class="drop-zone-label">1️⃣ Primero</span>
                        <span style="color: var(--text-light);">Arrastra aquí</span>
                    </div>
                    <div class="drop-zone" data-position="1">
                        <span class="drop-zone-label">2️⃣ Segundo</span>
                        <span style="color: var(--text-light);">Arrastra aquí</span>
                    </div>
                    <div class="drop-zone" data-position="2">
                        <span class="drop-zone-label">3️⃣ Tercero</span>
                        <span style="color: var(--text-light);">Arrastra aquí</span>
                    </div>
                </div>
                
                <div id="tower-result-${containerId}" style="display: none;"></div>
            </div>
        </div>
    `;
    
    // Setup drag and drop
    const draggableItems = container.querySelectorAll('.draggable-item');
    const dropZones = container.querySelectorAll('.drop-zone');
    const resultDiv = document.getElementById(`tower-result-${containerId}`);
    
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.id);
            e.target.classList.add('dragging');
        });
        
        item.addEventListener('dragend', (e) => {
            e.target.classList.remove('dragging');
        });
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.classList.add('drag-over');
        });
        
        zone.addEventListener('dragleave', () => {
            zone.classList.remove('drag-over');
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.classList.remove('drag-over');
            
            const itemId = e.dataTransfer.getData('text/plain');
            const draggedItem = container.querySelector(`.draggable-item[data-id="${itemId}"]`);
            
            if (!draggedItem) return;
            
            // Clear zone
            const existingItem = zone.querySelector('.draggable-item');
            if (existingItem) {
                document.getElementById(`draggable-items-${containerId}`).appendChild(existingItem);
            }
            
            // Add item to zone
            zone.innerHTML = '';
            zone.appendChild(draggedItem.cloneNode(true));
            zone.classList.add('filled');
            
            // Remove from original location
            draggedItem.remove();
            
            // Update current order
            currentOrder = [];
            dropZones.forEach(z => {
                const item = z.querySelector('.draggable-item');
                if (item) {
                    currentOrder.push(item.dataset.id);
                }
            });
            
            // Check if complete
            if (currentOrder.length === 3) {
                checkTowerOrder();
            }
        });
    });
    
    function checkTowerOrder() {
        const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
        
        if (isCorrect) {
            resultDiv.className = 'minigame-result success';
            resultDiv.innerHTML = `
                ✅ ¡Perfecto! Trigger → Variable → Tag<br>
                <small>Primero detectas el evento, luego recoges la información, y finalmente envías los datos.</small>
            `;
            resultDiv.style.display = 'block';
            
            // Unlock achievement
            setTimeout(() => {
                unlockAchievement('tower_builder');
                unlockAchievement('three_pillars');
                // Continue to next scene
                if (window.onTowerComplete) {
                    window.onTowerComplete();
                }
            }, 500);
        } else {
            resultDiv.className = 'minigame-result error';
            resultDiv.innerHTML = `
                ❌ No del todo... Piensa en el flujo:<br>
                <small>¿Qué necesitas detectar primero? ¿Luego qué información recoges? ¿Y finalmente qué haces?</small><br>
                <button class="btn-continue" onclick="resetTowerGame()" style="margin-top: 1rem;">🔄 Intentar de nuevo</button>
            `;
            resultDiv.style.display = 'block';
        }
    }
    
    // Reset function for tower game
    window.resetTowerGame = function() {
        // Clear current order
        currentOrder = [];
        
        // Move all items back to draggable area
        const itemsContainer = document.getElementById(`draggable-items-${containerId}`);
        items.forEach(item => {
            const newItem = document.createElement('div');
            newItem.className = 'draggable-item';
            newItem.draggable = true;
            newItem.dataset.id = item.id;
            newItem.textContent = item.label;
            
            // Re-add event listeners
            newItem.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                e.target.classList.add('dragging');
            });
            
            newItem.addEventListener('dragend', (e) => {
                e.target.classList.remove('dragging');
            });
            
            itemsContainer.appendChild(newItem);
        });
        
        // Clear drop zones
        dropZones.forEach(zone => {
            zone.innerHTML = `<span style="color: var(--text-light);">Arrastra aquí</span>`;
            zone.classList.remove('filled');
            
            // Re-add label
            const position = zone.dataset.position;
            const labels = ['1️⃣ Primero', '2️⃣ Segundo', '3️⃣ Tercero'];
            const label = document.createElement('span');
            label.className = 'drop-zone-label';
            label.textContent = labels[position];
            zone.appendChild(label);
        });
        
        // Hide result
        resultDiv.style.display = 'none';
    };
}

// Marketer Quiz Game
function initMarketerQuizGame(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const scenarios = [
        {
            question: "📊 Situación: Tu funnel de conversión está roto. Los eventos de 'add_to_cart' no llegan a GA4. ¿Qué haces?",
            options: [
                { text: "Esperar a que desarrollo lo arregle", correct: false },
                { text: "Abrir GTM Preview y debuggear el evento", correct: true },
                { text: "Ignorarlo y mirar métricas alternativas", correct: false }
            ],
            explanation: "¡Exacto! Con GTM Preview puedes ver en tiempo real si el evento se dispara y qué datos lleva.",
            errorExplanation: "Como marketer con GTM, tú puedes debuggear eventos. Abre GTM Preview para ver en tiempo real si el evento se dispara y qué datos lleva. No necesitas esperar a desarrollo."
        },
        {
            question: "🎯 Situación: Marketing quiere trackear un nuevo botón pero desarrollo está ocupado 2 semanas. ¿Qué haces?",
            options: [
                { text: "Esperar 2 semanas", correct: false },
                { text: "Configurar el trigger y tag en GTM tú mismo", correct: true },
                { text: "Olvidar el tracking", correct: false }
            ],
            explanation: "¡Correcto! GTM te da autonomía. Puedes configurar triggers de clicks sin tocar código.",
            errorExplanation: "Precisamente para eso existe GTM: para que NO tengas que esperar a desarrollo. Puedes configurar el trigger y tag tú mismo sin tocar código."
        },
        {
            question: "🚀 Situación: Quieres testear un nuevo píxel de Facebook antes de lanzarlo a producción. ¿Cómo?",
            options: [
                { text: "Publicarlo directamente y esperar que funcione", correct: false },
                { text: "Usar GTM Preview Mode para testearlo antes", correct: true },
                { text: "Pedirle a desarrollo que lo testee", correct: false }
            ],
            explanation: "¡Perfecto! Preview Mode te permite testear cambios sin afectar a usuarios reales.",
            errorExplanation: "Nunca publiques directamente sin testear. GTM Preview Mode te permite probar cambios de forma segura sin afectar a usuarios reales. Puedes verificar que el píxel se dispara correctamente antes de hacer publish."
        }
    ];
    
    let currentScenario = 0;
    let correctAnswers = 0;
    
    function handleQuizSelection(optionIndex, isCorrect) {
        const options = document.querySelectorAll(`#quiz-options-${containerId} .quiz-option`);
        const resultDiv = document.getElementById(`quiz-result-${containerId}`);
        const scenario = scenarios[currentScenario];
        
        // Disable all options
        options.forEach(opt => opt.disabled = true);
        
        // Mark selected
        options[optionIndex].classList.add('selected');
        
        if (isCorrect) {
            options[optionIndex].classList.add('correct');
            correctAnswers++;
            
            resultDiv.className = 'minigame-result success';
            resultDiv.innerHTML = `✅ ${scenario.explanation}`;
        } else {
            options[optionIndex].classList.add('incorrect');
            // Show correct answer
            options.forEach((opt, idx) => {
                if (scenario.options[idx].correct) {
                    opt.classList.add('correct');
                }
            });
            
            resultDiv.className = 'minigame-result error';
            resultDiv.innerHTML = `❌ ${scenario.errorExplanation || 'Incorrecto. La respuesta correcta está resaltada en verde.'}`;
        }
        
        resultDiv.style.display = 'block';
        
        // Next scenario or finish
        setTimeout(() => {
            currentScenario++;
            if (currentScenario < scenarios.length) {
                renderScenario();
            } else {
                finishQuiz();
            }
        }, 3000);
    }
    
    function renderScenario() {
        const scenario = scenarios[currentScenario];
        
        // Randomize options (Fisher-Yates shuffle)
        const shuffledOptions = scenario.options.map((opt, idx) => ({ ...opt, originalIndex: idx }));
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">🧙 La Prueba del Marketer</h3>
                <p class="minigame-instructions">
                    Escenario ${currentScenario + 1} de ${scenarios.length}
                </p>
                
                <div class="quiz-game">
                    <div class="quiz-question">${scenario.question}</div>
                    
                    <div class="quiz-options" id="quiz-options-${containerId}">
                        ${shuffledOptions.map((option, index) => `
                            <button class="quiz-option" data-index="${index}" data-correct="${option.correct}">
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div id="quiz-result-${containerId}" style="display: none;"></div>
                </div>
            </div>
        `;
        
        // Add event listeners to buttons
        const buttons = container.querySelectorAll('.quiz-option');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const optionIndex = parseInt(this.dataset.index);
                const isCorrect = this.dataset.correct === 'true';
                handleQuizSelection(optionIndex, isCorrect);
            });
        });
    }
    
    function finishQuiz() {
        const percentage = (correctAnswers / scenarios.length) * 100;
        const passed = percentage >= 66;
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">🧙 Resultado Final</h3>
                
                <div class="minigame-result ${passed ? 'success' : 'error'}">
                    ${passed ? '🎉' : '💪'} Acertaste ${correctAnswers} de ${scenarios.length} escenarios<br>
                    <br>
                    ${passed 
                        ? '<strong>¡Eres un Junior Data Wizard!</strong><br>Entiendes cómo GTM te da autonomía y control.' 
                        : '<strong>¡Sigue aprendiendo!</strong><br>Revisa los conceptos y vuelve a intentarlo.'}
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem; flex-wrap: wrap;">
                    ${passed 
                        ? '<button class="btn-primary" onclick="completeQuizMission()">Continuar →</button>' 
                        : '<button class="btn-continue" onclick="retryQuiz()">🔄 Volver a Intentar</button>'}
                    ${!passed 
                        ? '<button class="btn-primary" onclick="skipQuizAndContinue()">Continuar de Todas Formas →</button>' 
                        : ''}
                </div>
            </div>
        `;
        
        if (passed) {
            setTimeout(() => {
                unlockAchievement('junior_wizard');
            }, 500);
        }
    }
    
    // Retry quiz function
    window.retryQuiz = function() {
        currentScenario = 0;
        correctAnswers = 0;
        renderScenario();
    };
    
    // Skip quiz and continue
    window.skipQuizAndContinue = function() {
        completeQuizMission();
    };
    
    renderScenario();
}

// Complete quiz mission
window.completeQuizMission = function() {
    // Hide quiz game
    document.getElementById('intro-quiz-game').style.display = 'none';
    
    // Award achievement and XP
    unlockAchievement('junior_wizard');
    addXP(50);
    
    // Show next section (secretos)
    document.getElementById('intro-secretos').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// RPG Dialog System
function showRPGDialog(character, text, choices = null) {
    const dialogContainer = document.createElement('div');
    dialogContainer.className = 'rpg-dialog fade-in';
    
    const avatars = {
        'dev': '👨‍💻',
        'pm': '👔',
        'you': '🎓',
        'mentor': '📖',
        'narrator': '📜',
        'cmo': '💼',
        'analytics': '📊',
        'guide': '📖'
    };
    
    const names = {
        'dev': 'La Guía',
        'pm': 'Product Manager',
        'you': 'Tú',
        'mentor': 'La Guía',
        'narrator': 'Narrador',
        'cmo': 'CMO',
        'analytics': 'Analista',
        'guide': 'La Guía'
    };
    
    dialogContainer.innerHTML = `
        <div class="rpg-character">
            <div class="rpg-avatar">${avatars[character] || '💬'}</div>
            <div class="rpg-speech">
                <div class="rpg-name">${names[character] || character}</div>
                <div class="rpg-text">${text}</div>
            </div>
        </div>
        ${choices ? `
            <div class="rpg-choices">
                ${choices.map((choice, index) => `
                    <button class="rpg-choice-btn" onclick="handleRPGChoice(${index}, '${choice.action}')">
                        ${choice.text}
                    </button>
                `).join('')}
            </div>
        ` : ''}
    `;
    
    return dialogContainer;
}

// Handle RPG choice
window.handleRPGChoice = function(choiceIndex, action) {
    const buttons = document.querySelectorAll('.rpg-choice-btn');
    const container = document.getElementById('rpg-dialog-container');
    
    // Get the selected button text to provide specific feedback
    const selectedText = buttons[choiceIndex].textContent.trim();
    
    // Disable all choice buttons
    buttons.forEach(btn => {
        btn.disabled = true;
    });
    
    // Execute action
    if (action === 'learn_gtm') {
        // Correct answer
        buttons[choiceIndex].style.background = '#4caf50';
        buttons[choiceIndex].style.borderColor = '#4caf50';
        buttons[choiceIndex].style.color = 'white';
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'rpg-feedback success';
        successMsg.innerHTML = `
            <strong>✅ ¡Exacto!</strong><br>
            GTM (Google Tag Manager) es una herramienta que te da autonomía para gestionar etiquetas de seguimiento sin tocar código.<br>
            <br>
            <strong>¿Por qué es importante?</strong><br>
            • Marketing puede lanzar campañas sin esperar a desarrollo<br>
            • Los cambios son inmediatos y reversibles<br>
            • Todo está centralizado en un solo lugar
        `;
        container.appendChild(successMsg);
        
        unlockAchievement('gtm_discovered');
        setTimeout(() => {
            showScene('introSections', 'intro-theory-1', { instant: true });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 3000);
    } else if (action === 'wrong') {
        // Wrong answer
        buttons[choiceIndex].style.background = '#f44336';
        buttons[choiceIndex].style.borderColor = '#f44336';
        buttons[choiceIndex].style.color = 'white';
        
        // Provide specific feedback based on the wrong answer
        let feedbackText = '';
        if (selectedText.includes('código JavaScript')) {
            feedbackText = `
                <strong>❌ No es solo código JavaScript</strong><br>
                <br>
                Aunque GTM usa JavaScript por debajo, <strong>no es simplemente código</strong>. Es una <strong>interfaz visual</strong> que te permite gestionar etiquetas sin programar.<br>
                <br>
                💡 <strong>Pista:</strong> Busca la opción que menciona "gestionar etiquetas" de forma más sencilla.
            `;
        } else if (selectedText.includes('ni idea') || selectedText.includes('No tengo')) {
            feedbackText = `
                <strong>❌ ¡Vamos, sí tienes una idea!</strong><br>
                <br>
                La Guía y el Analista te acaban de dar una gran pista: "Si quieres medir... abre GTM" y "puedes tener autonomía sin depender de desarrollo".<br>
                <br>
                💡 <strong>Pista:</strong> GTM es algo que te da <strong>autonomía</strong> para no depender de desarrollo.
            `;
        } else if (selectedText.includes('Esperar') || selectedText.includes('desarrollo')) {
            feedbackText = `
                <strong>❌ ¡Justo lo contrario!</strong><br>
                <br>
                La idea de GTM es precisamente <strong>NO tener que esperar</strong> a desarrollo. Te da autonomía para hacer cambios por ti mismo.<br>
                <br>
                💡 <strong>Pista:</strong> Busca la opción que te dé más independencia.
            `;
        } else if (selectedText.includes('métricas alternativas')) {
            feedbackText = `
                <strong>❌ No se trata de ignorar el problema</strong><br>
                <br>
                Ignorar los datos o buscar métricas alternativas no resuelve nada. Necesitas una <strong>herramienta que te permita implementar tracking correctamente</strong>.<br>
                <br>
                💡 <strong>Pista:</strong> GTM es una <strong>herramienta</strong>, no una estrategia de evasión.
            `;
        } else if (selectedText.includes('Preview')) {
            feedbackText = `
                <strong>❌ Preview es solo una parte</strong><br>
                <br>
                GTM Preview es una <strong>funcionalidad dentro de GTM</strong>, no la definición de GTM en sí. Preview te permite ver eventos en tiempo real mientras testeas.<br>
                <br>
                💡 <strong>Pista:</strong> ¿Qué es GTM <strong>en su conjunto</strong>? Piensa en su función principal.
            `;
        } else {
            feedbackText = `
                <strong>❌ No exactamente</strong><br>
                <br>
                Piensa: ¿Qué herramienta permitiría a <strong>marketing gestionar etiquetas</strong> sin esperar a desarrollo?<br>
                <br>
                💡 <strong>Pista:</strong> Busca la opción que mencione "gestionar etiquetas" de forma autónoma.
            `;
        }
        
        // Show feedback message
        const feedbackMsg = document.createElement('div');
        feedbackMsg.className = 'rpg-feedback error';
        feedbackMsg.innerHTML = feedbackText;
        container.appendChild(feedbackMsg);
        
        // Re-enable buttons after 3 seconds
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            });
            feedbackMsg.remove();
        }, 3500);
    }
};

