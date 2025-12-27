/**
 * Secretos y Checklist - Bloque 1 y 2
 */

// ========== BLOQUE 1: SECRETOS ==========

function initSecretosGame() {
    const secrets = [
        {
            id: 1,
            icon: '❌',
            title: 'GTM ≠ Google Analytics',
            story: '❌ <strong>El error clásico:</strong><br><br>"Oye, ¿por qué no veo los datos en GTM?"<br><br>Porque GTM no almacena ni analiza. GTM <strong>distribuye</strong>.<br><br>Es como un cartero: reparte los mensajes, pero no los lee ni los guarda.'
        },
        {
            id: 2,
            icon: '🧠',
            title: 'GTM no es el único TMS',
            story: '🧠 <strong>La realidad:</strong><br><br>Existen Adobe Launch, Tealium, Segment...<br><br>Pero GTM es <strong>gratis, potente y omnipresente</strong>.<br><br>Es como aprender español: no es el único idioma, pero te abre muchas puertas.'
        },
        {
            id: 3,
            icon: '🧱',
            title: 'GTM no cambia tu web',
            story: '🧱 <strong>El momento "ay no...":</strong><br><br>"Voy a usar Custom HTML para cambiar este texto"<br><br>💥 Rompes el header de la web.<br><br><strong>Regla de oro:</strong> GTM mide, no modifica. Para cambios, habla con desarrollo.'
        },
        {
            id: 4,
            icon: '🧭',
            title: 'Variables bien organizadas',
            story: '🧭 <strong>La lección dolorosa:</strong><br><br>6 meses después:<br>"¿Qué hace la variable DLV_prod_123?"<br><br><strong>Naming claro = mitad de la batalla ganada.</strong><br><br>Usa prefijos: <code>DL -</code>, <code>JS -</code>, <code>CONST -</code>'
        },
        {
            id: 5,
            icon: '🪄',
            title: 'Valores dinámicos > estáticos',
            story: '🪄 <strong>El rookie mistake:</strong><br><br>Hardcodear valores en cada tag:<br><code>transaction_id: "TXN-12345"</code><br><br>vs usar variables:<br><code>transaction_id: {{DL - Transaction ID}}</code><br><br>Uno es escalable. El otro, un infierno de mantenimiento.'
        },
        {
            id: 6,
            icon: '🧠',
            title: 'Rompe algo y aprende',
            story: '🧠 <strong>La verdad incómoda:</strong><br><br>La mejor forma de aprender GTM es...<br><br>💥 Romper algo en Preview Mode<br>🔍 Debuggear con calma<br>✅ Entender el porqué<br><br><strong>Preview Mode es tu sandbox. Úsalo sin miedo.</strong>'
        }
    ];
    
    const container = document.getElementById('secretos-cards');
    let revealedCount = 0;
    
    // Render cards
    secrets.forEach(secret => {
        const card = document.createElement('div');
        card.className = 'secret-card';
        card.dataset.id = secret.id;
        card.innerHTML = `
            <div class="secret-card-front">
                <div class="secret-icon">${secret.icon}</div>
                <h3 class="secret-title">${secret.title}</h3>
                <p class="secret-hint">Haz clic para revelar</p>
            </div>
            <div class="secret-card-back" style="display: none;">
                <div class="secret-story">${secret.story}</div>
            </div>
        `;
        
        card.addEventListener('click', function() {
            if (!this.classList.contains('revealed')) {
                this.classList.add('revealed');
                this.querySelector('.secret-card-front').style.display = 'none';
                this.querySelector('.secret-card-back').style.display = 'flex';
                revealedCount++;
                
                if (revealedCount === secrets.length) {
                    completeSecretosGame();
                }
            }
        });
        
        container.appendChild(card);
    });
}

function completeSecretosGame() {
    setTimeout(() => {
        const resultDiv = document.getElementById('secretos-result');
        resultDiv.className = 'minigame-result success';
        resultDiv.innerHTML = `
            🏆 <strong>¡Logro desbloqueado: "Sobreviviente del caos inicial"!</strong><br>
            <br>
            <p>Ahora conoces los secretos que tardan meses en descubrir.</p>
            <p>Estás listo para el siguiente nivel.</p>
        `;
        resultDiv.style.display = 'block';
        
        // Unlock achievement
        setTimeout(() => {
            unlockAchievement('chaos_survivor');
            gainXP(50);
        }, 500);
        
        // Show continue button
        setTimeout(() => {
            resultDiv.innerHTML += '<button class="btn-primary" style="margin-top: 2rem;" onclick="completeSecretosSection()">Continuar →</button>';
        }, 2000);
    }, 500);
}

function completeSecretosSection() {
    showScene('introSections', 'intro-final');
}

// ========== BLOQUE 2: CHECKLIST ==========

function initChecklistGame() {
    const checklistItems = [
        {
            id: 1,
            text: 'Contenedor publicado',
            question: '¿Dónde se publica un contenedor de GTM?',
            options: [
                { text: 'En el workspace', correct: false, explanation: 'El workspace es donde trabajas, no donde se publica.' },
                { text: 'En la versión', correct: true, explanation: '✅ Correcto. Publicas una versión del contenedor.' },
                { text: 'En las variables', correct: false, explanation: 'Las variables son configuraciones, no el lugar de publicación.' }
            ]
        },
        {
            id: 2,
            text: 'Script en el <head>',
            question: 'Identifica el lugar CORRECTO para el script de GTM:',
            options: [
                { text: 'Antes del </body>', correct: false, explanation: 'Eso es para el noscript, no para el script principal.' },
                { text: 'Lo más arriba posible en el <head>', correct: true, explanation: '✅ Correcto. Cuanto antes se cargue, mejor.' },
                { text: 'Después del dataLayer', correct: false, explanation: 'El dataLayer va ANTES del script de GTM.' }
            ]
        },
        {
            id: 3,
            text: 'dataLayer antes del GTM script',
            question: '¿Cuál es el orden correcto?',
            options: [
                { text: 'GTM script → dataLayer', correct: false, explanation: 'Al revés. El dataLayer debe existir antes.' },
                { text: 'dataLayer → GTM script', correct: true, explanation: '✅ Correcto. Primero defines, luego escuchas.' },
                { text: 'Da igual el orden', correct: false, explanation: 'El orden SÍ importa. GTM necesita que el dataLayer ya exista.' }
            ]
        },
        {
            id: 4,
            text: 'Declarar exactamente "dataLayer"',
            question: 'Identifica el error:',
            options: [
                { text: 'window.Datalayer = []', correct: true, explanation: '❌ Error: "Datalayer" con mayúscula. Debe ser "dataLayer".' },
                { text: 'window.dataLayer = []', correct: false, explanation: '✅ Esto está correcto.' },
                { text: 'var dataLayer = []', correct: false, explanation: '✅ Esto también funciona.' }
            ]
        },
        {
            id: 5,
            text: 'noscript en <body>',
            question: '¿Para qué sirve el tag noscript?',
            options: [
                { text: 'Para que funcione sin JavaScript', correct: true, explanation: '✅ Correcto. Es el fallback cuando JS está deshabilitado.' },
                { text: 'Para mejorar el SEO', correct: false, explanation: 'No es su función principal.' },
                { text: 'Es opcional', correct: false, explanation: 'No es opcional. Google lo recomienda siempre.' }
            ]
        },
        {
            id: 6,
            text: 'Sin adblockers activos',
            question: 'Tienes un adblocker activo. ¿Qué pasa?',
            options: [
                { text: 'GTM funciona igual', correct: false, explanation: 'Los adblockers bloquean GTM.' },
                { text: 'GTM se bloquea', correct: true, explanation: '✅ Correcto. Brave, uBlock, etc. bloquean GTM por defecto.' },
                { text: 'Solo se bloquea Google Ads', correct: false, explanation: 'Se bloquea TODO GTM, no solo Ads.' }
            ]
        }
    ];
    
    const container = document.getElementById('checklist-items');
    let currentItem = 0;
    let correctAnswers = 0;
    
    function renderItem() {
        if (currentItem >= checklistItems.length) {
            finishChecklist();
            return;
        }
        
        const item = checklistItems[currentItem];
        
        // Shuffle options
        const shuffledOptions = [...item.options];
        for (let i = shuffledOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
        }
        
        container.innerHTML = `
            <div class="checklist-item-container">
                <div class="checklist-progress">
                    <span>Item ${currentItem + 1} de ${checklistItems.length}</span>
                    <div class="progress-bar" style="width: 100%; height: 8px; background: rgba(78, 205, 196, 0.2); border-radius: 4px; margin-top: 0.5rem;">
                        <div style="width: ${(currentItem / checklistItems.length) * 100}%; height: 100%; background: var(--primary); border-radius: 4px; transition: width 0.3s;"></div>
                    </div>
                </div>
                
                <div class="checklist-item" style="margin-top: 2rem;">
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">✓ ${item.text}</h3>
                    <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">${item.question}</p>
                    
                    <div class="quiz-options">
                        ${shuffledOptions.map((opt, idx) => `
                            <button class="quiz-option" data-correct="${opt.correct}" data-explanation="${opt.explanation}">
                                ${opt.text}
                            </button>
                        `).join('')}
                    </div>
                    
                    <div id="checklist-feedback" style="display: none; margin-top: 1.5rem;"></div>
                </div>
            </div>
        `;
        
        // Add event listeners
        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', function() {
                handleChecklistAnswer(this);
            });
        });
    }
    
    function handleChecklistAnswer(button) {
        const isCorrect = button.dataset.correct === 'true';
        const explanation = button.dataset.explanation;
        const feedback = document.getElementById('checklist-feedback');
        
        // Disable all buttons
        container.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
        
        if (isCorrect) {
            button.classList.add('correct');
            correctAnswers++;
            feedback.className = 'minigame-result success';
        } else {
            button.classList.add('incorrect');
            // Show correct answer
            container.querySelectorAll('.quiz-option').forEach(b => {
                if (b.dataset.correct === 'true') {
                    b.classList.add('correct');
                }
            });
            feedback.className = 'minigame-result error';
        }
        
        feedback.innerHTML = explanation;
        feedback.style.display = 'block';
        
        // Next item after delay
        setTimeout(() => {
            currentItem++;
            renderItem();
        }, 2500);
    }
    
    function finishChecklist() {
        const percentage = (correctAnswers / checklistItems.length) * 100;
        const passed = percentage >= 70;
        
        container.innerHTML = `
            <div class="minigame-result ${passed ? 'success' : 'error'}" style="padding: 3rem; text-align: center;">
                <h2>${passed ? '🏆' : '📝'} Resultado final</h2>
                <p style="font-size: 1.5rem; margin: 1.5rem 0;">
                    Acertaste ${correctAnswers} de ${checklistItems.length} (${Math.round(percentage)}%)
                </p>
                ${passed 
                    ? '<p><strong>✅ Logro desbloqueado: "Implementador responsable"</strong></p><p>Conoces los fundamentos de una implementación sólida.</p>' 
                    : '<p>💡 Repasa los conceptos y vuelve a intentarlo.</p>'}
                
                ${passed 
                    ? '<button class="btn-primary" style="margin-top: 2rem;" onclick="completeChecklistSection()">Continuar →</button>'
                    : '<button class="btn-continue" style="margin-top: 2rem;" onclick="retryChecklist()">🔄 Reintentar</button>'}
            </div>
        `;
        
        if (passed) {
            setTimeout(() => {
                unlockAchievement('implementador');
                gainXP(60);
            }, 500);
        }
    }
    
    window.retryChecklist = function() {
        currentItem = 0;
        correctAnswers = 0;
        renderItem();
    };
    
    renderItem();
}

function completeChecklistSection() {
    document.getElementById('bloque2-checklist').style.display = 'none';
    // Ir al boss fight
    document.getElementById('bloque2-boss-fight').style.display = 'block';
    
    // Init boss fight
    setTimeout(() => {
        initBloque2BossFight('bloque2-boss-fight-container');
    }, 100);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

