// ============================================
// BLOQUE 4 — Mini-juegos de Funnels
// ============================================

// Misión 1: Identificar evento faltante en un funnel
function initBloque4Game1() {
    const container = document.getElementById('bloque4-game-1-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const funnel = {
        title: "Funnel de E-commerce",
        goal: "Completar un flujo de compra",
        steps: [
            { event: "page_view", label: "Ver página de producto", icon: "👁️" },
            { event: "???", label: "???", icon: "❓" },
            { event: "begin_checkout", label: "Iniciar checkout", icon: "💳" },
            { event: "purchase", label: "Completar compra", icon: "✅" }
        ],
        options: [
            { event: "add_to_cart", label: "Añadir al carrito", correct: true },
            { event: "scroll_page", label: "Hacer scroll", correct: false },
            { event: "click_button", label: "Clic en botón genérico", correct: false },
            { event: "view_cart", label: "Ver carrito", correct: false }
        ]
    };
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🧩 ${funnel.title}</h3>
            <p class="minigame-instructions">
                <strong>Objetivo:</strong> ${funnel.goal}<br>
                El siguiente funnel está incompleto. <strong>Identifica qué evento falta</strong> para cerrar el flujo correctamente.
            </p>
            
            <div style="margin: 2rem 0;">
                <h4>Flujo actual:</h4>
                <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; flex-wrap: wrap; margin-top: 1rem;">
                    ${funnel.steps.map((step, i) => `
                        <div style="text-align: center; ${step.event === '???' ? 'opacity: 0.5;' : ''}">
                            <div style="font-size: 2rem;">${step.icon}</div>
                            <div style="font-family: monospace; margin-top: 0.5rem;">${step.event}</div>
                            <div style="font-size: 0.8rem; color: #666;">${step.label}</div>
                        </div>
                        ${i < funnel.steps.length - 1 ? '<div style="font-size: 2rem; color: var(--primary);">→</div>' : ''}
                    `).join('')}
                </div>
            </div>
            
            <h4 style="margin-top: 2rem;">Selecciona el evento que falta:</h4>
            <div class="quiz-options">
                ${funnel.options.map((opt, i) => `
                    <button class="quiz-option" data-event="${opt.event}" data-correct="${opt.correct}">
                        ${opt.label} <code style="font-size: 0.9em;">(${opt.event})</code>
                    </button>
                `).join('')}
            </div>
            
            <div id="game1-result" style="margin-top: 2rem; display: none;"></div>
        </div>
    `;
    
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(btn => {
        btn.addEventListener('click', () => {
            const correct = btn.getAttribute('data-correct') === 'true';
            const event = btn.getAttribute('data-event');
            handleGame1Choice(correct, event, options);
        });
    });
}

function handleGame1Choice(correct, event, allOptions) {
    const resultDiv = document.getElementById('game1-result');
    
    allOptions.forEach(btn => btn.disabled = true);
    
    if (correct) {
        allOptions.forEach(btn => {
            if (btn.getAttribute('data-correct') === 'true') {
                btn.classList.add('correct');
            }
        });
        
        resultDiv.innerHTML = `
            <div class="minigame-result success">
                <p><strong>✅ ¡Correcto!</strong></p>
                <p>
                    <code>${event}</code> es el evento clave que conecta la visualización con el checkout.<br>
                    Sin este paso, no puedes medir cuántos usuarios deciden comprar.
                </p>
                <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque4Game1()">
                    Continuar →
                </button>
            </div>
        `;
        
        gainXP(30);
        unlockAchievement('funnel_cartographer');
    } else {
        allOptions.forEach(btn => {
            if (btn.getAttribute('data-event') === event) {
                btn.classList.add('incorrect');
            } else if (btn.getAttribute('data-correct') === 'true') {
                btn.style.border = '3px dashed #f39c12';
            }
        });
        
        resultDiv.innerHTML = `
            <div class="minigame-result error">
                <p><strong>❌ No exactamente</strong></p>
                <p>
                    Este evento no representa un paso crítico en el funnel de compra.<br>
                    Piensa: <em>¿qué acción indica que el usuario ha decidido comprar?</em>
                </p>
                <button class="btn-primary" style="margin-top: 1rem;" onclick="initBloque4Game1()">
                    🔄 Intentar de nuevo
                </button>
            </div>
        `;
    }
    
    resultDiv.style.display = 'block';
}

window.completeBloque4Game1 = function() {
    hideAllSections();
    document.getElementById('bloque4-theory-2').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Misión 2: Mapear eventos a objetivos de negocio
function initBloque4Game2() {
    const container = document.getElementById('bloque4-game-2-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const scenarios = [
        {
            goal: "Captar leads",
            correctEvents: ["form_view", "form_start", "form_submit"],
            incorrectEvents: ["purchase", "scroll", "click_cta"]
        },
        {
            goal: "Vender entradas online",
            correctEvents: ["view_event", "add_to_cart", "purchase"],
            incorrectEvents: ["login", "search", "page_view"]
        }
    ];
    
    let currentScenario = 0;
    let selectedEvents = [];
    
    function renderScenario() {
        const scenario = scenarios[currentScenario];
        const allEvents = [...scenario.correctEvents, ...scenario.incorrectEvents].sort(() => Math.random() - 0.5);
        selectedEvents = [];
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">🎯 Escenario ${currentScenario + 1}/${scenarios.length}</h3>
                <p class="minigame-instructions">
                    <strong>Objetivo de negocio:</strong> ${scenario.goal}<br><br>
                    Selecciona los <strong>3 eventos clave</strong> que corresponden a este objetivo.
                </p>
                
                <div class="quiz-options" style="margin-top: 2rem;">
                    ${allEvents.map(event => `
                        <button class="quiz-option multi-select" data-event="${event}">
                            <code>${event}</code>
                        </button>
                    `).join('')}
                </div>
                
                <div style="margin-top: 1.5rem; text-align: center; color: #666;">
                    <small>Eventos seleccionados: <span id="selected-count">0</span>/3</small>
                </div>
                
                <button id="submit-mapping" class="btn-primary" style="margin-top: 1.5rem; opacity: 0.5;" disabled>
                    Verificar selección →
                </button>
                
                <div id="game2-result" style="margin-top: 2rem; display: none;"></div>
            </div>
        `;
        
        const options = container.querySelectorAll('.quiz-option');
        const submitBtn = document.getElementById('submit-mapping');
        const countSpan = document.getElementById('selected-count');
        
        options.forEach(btn => {
            btn.addEventListener('click', () => {
                const event = btn.getAttribute('data-event');
                
                if (selectedEvents.includes(event)) {
                    selectedEvents = selectedEvents.filter(e => e !== event);
                    btn.classList.remove('selected');
                } else if (selectedEvents.length < 3) {
                    selectedEvents.push(event);
                    btn.classList.add('selected');
                }
                
                countSpan.textContent = selectedEvents.length;
                
                if (selectedEvents.length === 3) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                } else {
                    submitBtn.disabled = true;
                    submitBtn.style.opacity = '0.5';
                }
            });
        });
        
        submitBtn.addEventListener('click', () => {
            handleMappingChoice(scenario, options, submitBtn);
        });
    }
    
    function handleMappingChoice(scenario, options, submitBtn) {
        const resultDiv = document.getElementById('game2-result');
        options.forEach(btn => btn.disabled = true);
        submitBtn.disabled = true;
        
        const correct = selectedEvents.every(e => scenario.correctEvents.includes(e)) && 
                        selectedEvents.length === scenario.correctEvents.length;
        
        if (correct) {
            options.forEach(btn => {
                const event = btn.getAttribute('data-event');
                if (selectedEvents.includes(event)) {
                    btn.classList.add('correct');
                }
            });
            
            currentScenario++;
            
            if (currentScenario < scenarios.length) {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>✅ ¡Correcto!</strong></p>
                        <p>Has mapeado correctamente el objetivo a eventos medibles.</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="nextBloque4Scenario()">
                            Siguiente escenario →
                        </button>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>🏆 ¡Mapeo completo!</strong></p>
                        <p>Has aprendido a traducir objetivos de negocio en eventos estructurados.</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque4Game2()">
                            Continuar →
                        </button>
                    </div>
                `;
                
                gainXP(40);
            }
        } else {
            options.forEach(btn => {
                const event = btn.getAttribute('data-event');
                if (selectedEvents.includes(event) && !scenario.correctEvents.includes(event)) {
                    btn.classList.add('incorrect');
                } else if (selectedEvents.includes(event)) {
                    btn.classList.add('correct');
                } else if (scenario.correctEvents.includes(event)) {
                    btn.style.border = '3px dashed #f39c12';
                }
            });
            
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ No del todo</strong></p>
                    <p>
                        Revisa qué eventos realmente representan los pasos críticos para este objetivo.<br>
                        <small>Los 3 correctos están resaltados.</small>
                    </p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="retryBloque4Game2()">
                        🔄 Intentar de nuevo
                    </button>
                </div>
            `;
        }
        
        resultDiv.style.display = 'block';
    }
    
    renderScenario();
}

window.nextBloque4Scenario = function() {
    initBloque4Game2();
};

window.retryBloque4Game2 = function() {
    initBloque4Game2();
};

window.completeBloque4Game2 = function() {
    hideAllSections();
    document.getElementById('bloque4-theory-3').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Misión 3: Detectar error en funnel
function initBloque4Game3() {
    const container = document.getElementById('bloque4-game-3-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const brokenFunnels = [
        {
            title: "Funnel con evento duplicado",
            steps: ["view_item", "add_to_cart", "add_to_cart", "purchase"],
            error: "add_to_cart aparece duplicado",
            errorIndex: 2,
            explanation: "Los eventos duplicados inflan métricas y rompen el análisis de comportamiento."
        },
        {
            title: "Funnel con evento mal nombrado",
            steps: ["view_item", "addCart", "begin_checkout", "purchase"],
            error: "addCart no sigue el estándar GA4",
            errorIndex: 1,
            explanation: "Debe ser add_to_cart (snake_case) para alinearse con las convenciones de GA4."
        },
        {
            title: "Funnel con paso fuera de secuencia",
            steps: ["view_item", "purchase", "add_to_cart", "begin_checkout"],
            error: "purchase está antes de add_to_cart",
            errorIndex: 1,
            explanation: "Un usuario no puede comprar antes de añadir al carrito. El orden importa."
        }
    ];
    
    let currentFunnel = 0;
    
    function renderFunnel() {
        const funnel = brokenFunnels[currentFunnel];
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">🐛 ${funnel.title}</h3>
                <p class="minigame-instructions">
                    <strong>Este funnel tiene un error.</strong><br>
                    Identifica qué paso falla.
                </p>
                
                <div style="margin: 2rem 0;">
                    <div style="display: flex; gap: 1rem; align-items: center; justify-content: center; flex-wrap: wrap;">
                        ${funnel.steps.map((step, i) => `
                            <button class="quiz-option" data-index="${i}" style="padding: 1rem; min-width: 150px;">
                                <div style="font-family: monospace; font-weight: bold;">${i + 1}. ${step}</div>
                            </button>
                            ${i < funnel.steps.length - 1 ? '<div style="font-size: 2rem; color: var(--primary);">→</div>' : ''}
                        `).join('')}
                    </div>
                </div>
                
                <div id="game3-result" style="margin-top: 2rem; display: none;"></div>
            </div>
        `;
        
        const options = container.querySelectorAll('.quiz-option');
        options.forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'));
                handleFunnelErrorChoice(index, funnel, options);
            });
        });
    }
    
    function handleFunnelErrorChoice(selectedIndex, funnel, allOptions) {
        const resultDiv = document.getElementById('game3-result');
        allOptions.forEach(btn => btn.disabled = true);
        
        if (selectedIndex === funnel.errorIndex) {
            allOptions[selectedIndex].classList.add('incorrect');
            
            currentFunnel++;
            
            if (currentFunnel < brokenFunnels.length) {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>✅ ¡Correcto!</strong></p>
                        <p><strong>Error:</strong> ${funnel.error}</p>
                        <p>${funnel.explanation}</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="nextBloque4Funnel()">
                            Siguiente funnel →
                        </button>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>🏆 ¡Arquitecto en prácticas!</strong></p>
                        <p>Has aprendido a detectar errores técnicos en funnels.</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque4Game3()">
                            Continuar →
                        </button>
                    </div>
                `;
                
                gainXP(40);
                unlockAchievement('funnel_architect');
            }
        } else {
            allOptions[selectedIndex].classList.add('incorrect');
            allOptions[funnel.errorIndex].style.border = '3px dashed #f39c12';
            
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ No es ese paso</strong></p>
                    <p>El error está en otro lugar. <small>(resaltado con borde naranja)</small></p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="retryBloque4Game3()">
                        🔄 Intentar de nuevo
                    </button>
                </div>
            `;
        }
        
        resultDiv.style.display = 'block';
    }
    
    renderFunnel();
}

window.nextBloque4Funnel = function() {
    initBloque4Game3();
};

window.retryBloque4Game3 = function() {
    initBloque4Game3();
};

window.completeBloque4Game3 = function() {
    hideAllSections();
    document.getElementById('bloque4-theory-4').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Misión 4: Normalizar nombres de eventos
function initBloque4Game4() {
    const container = document.getElementById('bloque4-game-4-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const badEvents = [
        { bad: "AddToCart", good: "add_to_cart", explanation: "GA4 usa snake_case para todos los eventos" },
        { bad: "btn-click-header", good: "click_header_button", explanation: "Naming descriptivo y consistente" },
        { bad: "PURCHASE_COMPLETE", good: "purchase", explanation: "Evita mayúsculas innecesarias, usa estándar GA4" }
    ];
    
    let currentEvent = 0;
    
    function renderEvent() {
        const event = badEvents[currentEvent];
        
        const options = [
            event.good,
            event.bad.toLowerCase(),
            event.bad.replace(/([A-Z])/g, '_$1').toLowerCase().replace(/^_/, ''),
            "custom_" + event.bad.toLowerCase()
        ].sort(() => Math.random() - 0.5);
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">📚 Normalizar Evento ${currentEvent + 1}/${badEvents.length}</h3>
                <p class="minigame-instructions">
                    <strong>Evento mal nombrado:</strong><br>
                    <code style="font-size: 1.2rem; color: var(--danger);">${event.bad}</code>
                </p>
                
                <p style="margin-top: 1.5rem;">Selecciona la forma correcta según estándares GA4:</p>
                
                <div class="quiz-options">
                    ${options.map(opt => `
                        <button class="quiz-option" data-event="${opt}">
                            <code>${opt}</code>
                        </button>
                    `).join('')}
                </div>
                
                <div id="game4-result" style="margin-top: 2rem; display: none;"></div>
            </div>
        `;
        
        const optionButtons = container.querySelectorAll('.quiz-option');
        optionButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const selected = btn.getAttribute('data-event');
                handleNamingChoice(selected, event, optionButtons);
            });
        });
    }
    
    function handleNamingChoice(selected, event, allOptions) {
        const resultDiv = document.getElementById('game4-result');
        allOptions.forEach(btn => btn.disabled = true);
        
        if (selected === event.good) {
            allOptions.forEach(btn => {
                if (btn.getAttribute('data-event') === event.good) {
                    btn.classList.add('correct');
                }
            });
            
            currentEvent++;
            
            if (currentEvent < badEvents.length) {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>✅ ¡Correcto!</strong></p>
                        <p>${event.explanation}</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="nextBloque4Naming()">
                            Siguiente evento →
                        </button>
                    </div>
                `;
            } else {
                resultDiv.innerHTML = `
                    <div class="minigame-result success">
                        <p><strong>🏆 ¡Librero de eventos!</strong></p>
                        <p>Has aprendido a normalizar naming de eventos según estándares.</p>
                        <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque4Game4()">
                            Continuar →
                        </button>
                    </div>
                `;
                
                gainXP(30);
                unlockAchievement('event_librarian');
            }
        } else {
            allOptions.forEach(btn => {
                if (btn.getAttribute('data-event') === selected) {
                    btn.classList.add('incorrect');
                } else if (btn.getAttribute('data-event') === event.good) {
                    btn.style.border = '3px dashed #f39c12';
                }
            });
            
            resultDiv.innerHTML = `
                <div class="minigame-result error">
                    <p><strong>❌ No exactamente</strong></p>
                    <p>Revisa las convenciones de naming de GA4 (snake_case, minúsculas).</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="retryBloque4Game4()">
                        🔄 Intentar de nuevo
                    </button>
                </div>
            `;
        }
        
        resultDiv.style.display = 'block';
    }
    
    renderEvent();
}

window.nextBloque4Naming = function() {
    initBloque4Game4();
};

window.retryBloque4Game4 = function() {
    initBloque4Game4();
};

window.completeBloque4Game4 = function() {
    hideAllSections();
    document.getElementById('bloque4-theory-5').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Misión 5: Detective de embudos (analizar caída)
function initBloque4Game5() {
    const container = document.getElementById('bloque4-game-5-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const scenario = {
        title: "Funnel con caída del 80% en add_to_cart",
        steps: [
            { event: "view_item", users: 1000 },
            { event: "add_to_cart", users: 200 },
            { event: "begin_checkout", users: 180 },
            { event: "purchase", users: 150 }
        ],
        causes: [
            { text: "El botón 'Añadir al carrito' no tiene trigger configurado", correct: true },
            { text: "Los usuarios no quieren comprar", correct: false },
            { text: "El evento purchase está mal configurado", correct: false },
            { text: "GA4 está caído", correct: false }
        ]
    };
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🕵️ ${scenario.title}</h3>
            <p class="minigame-instructions">
                Revisa el funnel simulado en DebugView y diagnostica <strong>por qué cae tan bruscamente</strong> entre view_item y add_to_cart.
            </p>
            
            <div style="margin: 2rem 0; padding: 1.5rem; background: #f8f8f8; border-radius: 8px;">
                <h4 style="margin-bottom: 1rem;">📊 Datos del Funnel</h4>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: var(--primary); color: white;">
                            <th style="padding: 0.5rem; text-align: left;">Paso</th>
                            <th style="padding: 0.5rem; text-align: right;">Usuarios</th>
                            <th style="padding: 0.5rem; text-align: right;">% Caída</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${scenario.steps.map((step, i) => {
                            const dropRate = i > 0 ? ((scenario.steps[i-1].users - step.users) / scenario.steps[i-1].users * 100).toFixed(0) : 0;
                            return `
                                <tr style="border-bottom: 1px solid #ddd;">
                                    <td style="padding: 0.5rem;"><code>${step.event}</code></td>
                                    <td style="padding: 0.5rem; text-align: right;">${step.users}</td>
                                    <td style="padding: 0.5rem; text-align: right; color: ${dropRate > 50 ? 'var(--danger)' : '#666'};">
                                        ${i > 0 ? `-${dropRate}%` : '-'}
                                    </td>
                                </tr>
                            `;
                        }).join('')}
                    </tbody>
                </table>
            </div>
            
            <h4>¿Cuál es la causa más probable?</h4>
            <div class="quiz-options">
                ${scenario.causes.map(cause => `
                    <button class="quiz-option" data-correct="${cause.correct}">
                        ${cause.text}
                    </button>
                `).join('')}
            </div>
            
            <div id="game5-result" style="margin-top: 2rem; display: none;"></div>
        </div>
    `;
    
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(btn => {
        btn.addEventListener('click', () => {
            const correct = btn.getAttribute('data-correct') === 'true';
            handleDetectiveChoice(correct, options);
        });
    });
}

function handleDetectiveChoice(correct, allOptions) {
    const resultDiv = document.getElementById('game5-result');
    allOptions.forEach(btn => btn.disabled = true);
    
    if (correct) {
        allOptions.forEach(btn => {
            if (btn.getAttribute('data-correct') === 'true') {
                btn.classList.add('correct');
            }
        });
        
        resultDiv.innerHTML = `
            <div class="minigame-result success">
                <p><strong>✅ ¡Diagnóstico correcto!</strong></p>
                <p>
                    Una caída tan drástica entre view_item y add_to_cart suele indicar que el trigger 
                    no se está disparando. Los usuarios sí hacen clic, pero GTM no lo escucha.
                </p>
                <p style="margin-top: 1rem;"><strong>Solución:</strong> Revisar configuración del trigger en GTM Preview.</p>
                <button class="btn-primary" style="margin-top: 1rem;" onclick="completeBloque4Game5()">
                    Continuar →
                </button>
            </div>
        `;
        
        gainXP(50);
        unlockAchievement('funnel_detective');
    } else {
        allOptions.forEach(btn => {
            if (btn.getAttribute('data-correct') === 'false' && btn.disabled) {
                btn.classList.add('incorrect');
            } else if (btn.getAttribute('data-correct') === 'true') {
                btn.style.border = '3px dashed #f39c12';
            }
        });
        
        resultDiv.innerHTML = `
            <div class="minigame-result error">
                <p><strong>❌ No es esa la causa</strong></p>
                <p>
                    Piensa técnicamente: si el 80% de usuarios que ven el producto NO generan el evento add_to_cart, 
                    pero sí llegan al checkout... ¿qué está fallando en la medición?
                </p>
                <button class="btn-primary" style="margin-top: 1rem;" onclick="initBloque4Game5()">
                    🔄 Intentar de nuevo
                </button>
            </div>
        `;
    }
    
    resultDiv.style.display = 'block';
}

window.completeBloque4Game5 = function() {
    hideAllSections();
    document.getElementById('bloque4-boss-fight').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Boss Fight: El embudo que no embuda
function initBloque4BossFight() {
    const container = document.getElementById('bloque4-boss-fight-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const errors = [
        {
            code: "add_to_cart",
            issue: "Evento duplicado (se dispara 2 veces)",
            correct: true,
            explanation: "El trigger se dispara en DOM Ready y en clic. Sobra uno."
        },
        {
            code: "ViewProduct",
            issue: "Naming incorrecto (CamelCase)",
            correct: true,
            explanation: "Debe ser view_item (snake_case, estándar GA4)"
        },
        {
            code: "begin_checkout",
            issue: "Falta parámetro 'currency' en el evento",
            correct: true,
            explanation: "Los eventos de e-commerce requieren currency para análisis de valor."
        },
        {
            code: "page_view",
            issue: "Evento estándar, no hay error",
            correct: false,
            explanation: "Este evento está correctamente implementado."
        },
        {
            code: "purchase",
            issue: "Envía 'value' como string en vez de number",
            correct: true,
            explanation: "GA4 necesita 'value' como número para calcular revenue correctamente."
        },
        {
            code: "scroll",
            issue: "Este evento no es parte del funnel crítico",
            correct: false,
            explanation: "Aunque no es parte del funnel de compra, no es un error técnico."
        },
        {
            code: "click",
            issue: "Trigger demasiado genérico",
            correct: true,
            explanation: "Debe tener selector específico, no escuchar todos los clics."
        }
    ];
    
    const shuffledErrors = errors.sort(() => Math.random() - 0.5);
    let selectedErrors = [];
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">⚔️ El embudo que no embuda</h3>
            <p class="minigame-instructions">
                Este funnel de e-commerce tiene <strong>5 errores mezclados</strong>.<br>
                Selecciona <strong>todos los problemas técnicos</strong> que encuentres.
            </p>
            
            <div style="margin: 2rem 0; padding: 1.5rem; background: #fef3f3; border: 2px solid var(--danger); border-radius: 8px;">
                <h4 style="color: var(--danger);">🔍 Código GTM Auditado</h4>
                <p style="margin-top: 1rem;">
                    ${shuffledErrors.map(err => `
                        <div style="margin-bottom: 0.5rem;">
                            <code>${err.code}</code> - ${err.issue}
                        </div>
                    `).join('')}
                </p>
            </div>
            
            <h4>Selecciona los 5 errores reales:</h4>
            <div class="quiz-options">
                ${shuffledErrors.map((err, i) => `
                    <button class="quiz-option multi-select" data-index="${i}">
                        <code>${err.code}</code> - ${err.issue}
                    </button>
                `).join('')}
            </div>
            
            <div style="margin-top: 1.5rem; text-align: center; color: #666;">
                <small>Errores seleccionados: <span id="boss-selected-count">0</span>/5</small>
            </div>
            
            <button id="submit-boss" class="btn-primary" style="margin-top: 1.5rem; opacity: 0.5;" disabled>
                Verificar diagnóstico →
            </button>
            
            <div id="boss-result" style="margin-top: 2rem; display: none;"></div>
        </div>
    `;
    
    const options = container.querySelectorAll('.quiz-option');
    const submitBtn = document.getElementById('submit-boss');
    const countSpan = document.getElementById('boss-selected-count');
    
    options.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            
            if (selectedErrors.includes(index)) {
                selectedErrors = selectedErrors.filter(i => i !== index);
                btn.classList.remove('selected');
            } else {
                selectedErrors.push(index);
                btn.classList.add('selected');
            }
            
            countSpan.textContent = selectedErrors.length;
            
            if (selectedErrors.length === 5) {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            } else {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.5';
            }
        });
    });
    
    submitBtn.addEventListener('click', () => {
        handleBossFightChoice(shuffledErrors, selectedErrors, options, submitBtn);
    });
}

function handleBossFightChoice(allErrors, selectedIndices, allOptions, submitBtn) {
    const resultDiv = document.getElementById('boss-result');
    allOptions.forEach(btn => btn.disabled = true);
    submitBtn.disabled = true;
    
    const selectedErrors = selectedIndices.map(i => allErrors[i]);
    const correctCount = selectedErrors.filter(err => err.correct).length;
    const incorrectCount = selectedErrors.filter(err => !err.correct).length;
    const missedCorrect = allErrors.filter((err, i) => err.correct && !selectedIndices.includes(i)).length;
    
    if (correctCount === 5 && incorrectCount === 0) {
        allOptions.forEach((btn, i) => {
            if (selectedIndices.includes(i)) {
                btn.classList.add('correct');
            }
        });
        
        resultDiv.innerHTML = `
            <div class="minigame-result success">
                <p><strong>🏆 ¡Boss derrotado!</strong></p>
                <p>Has identificado todos los errores del funnel correctamente.</p>
                <p style="margin-top: 1rem;"><strong>Diagnóstico completo:</strong></p>
                <ul style="text-align: left; margin-top: 0.5rem;">
                    ${allErrors.filter(e => e.correct).map(e => `<li><code>${e.code}</code> - ${e.explanation}</li>`).join('')}
                </ul>
                <button class="btn-primary" style="margin-top: 1.5rem;" onclick="completeBloque4BossFight()">
                    Completar Bloque 4 →
                </button>
            </div>
        `;
        
        gainXP(100);
        unlockAchievement('funnel_master');
    } else {
        allOptions.forEach((btn, i) => {
            const err = allErrors[i];
            if (selectedIndices.includes(i) && !err.correct) {
                btn.classList.add('incorrect');
            } else if (selectedIndices.includes(i) && err.correct) {
                btn.classList.add('correct');
            } else if (!selectedIndices.includes(i) && err.correct) {
                btn.style.border = '3px dashed #f39c12';
            }
        });
        
        resultDiv.innerHTML = `
            <div class="minigame-result error">
                <p><strong>❌ Diagnóstico incompleto</strong></p>
                <p>
                    ✅ Correctos identificados: ${correctCount}/5<br>
                    ❌ Falsos positivos: ${incorrectCount}<br>
                    🔍 Errores perdidos: ${missedCorrect}
                </p>
                <p style="margin-top: 1rem;"><small>Los 5 errores reales están resaltados.</small></p>
                <button class="btn-primary" style="margin-top: 1rem;" onclick="retryBloque4BossFight()">
                    🔄 Intentar de nuevo
                </button>
            </div>
        `;
    }
    
    resultDiv.style.display = 'block';
}

window.retryBloque4BossFight = function() {
    initBloque4BossFight();
};

window.completeBloque4BossFight = function() {
    hideAllSections();
    document.getElementById('bloque4-final').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Initialize on load
if (document.getElementById('bloque4-game-1-container')) {
    initBloque4Game1();
}


