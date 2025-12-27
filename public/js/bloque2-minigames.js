/**
 * Mini-games for Bloque 2 - El lenguaje secreto de los eventos
 */

// Helper function to shuffle array (Fisher-Yates)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Game 1: Traduce el mensaje secreto (Drag & Drop dataLayer)
function initBloque2Game1(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const correctOrder = ['event', 'product_id', 'price', 'currency'];
    let currentOrder = [];
    
    // Randomize draggable items
    const items = [
        { id: 'event', label: 'event: \'add_to_cart\'' },
        { id: 'product_id', label: 'product_id: \'XYZ789\'' },
        { id: 'price', label: 'price: 99.99' },
        { id: 'currency', label: 'currency: \'EUR\'' }
    ];
    shuffleArray(items);
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🧩 Construye el dataLayer.push</h3>
            <p class="minigame-instructions">Arrastra los componentes en el orden correcto para formar un evento válido.</p>
            
            <div class="draggable-items" id="draggable-items-${containerId}">
                ${items.map(item => `<div class="draggable-item" draggable="true" data-id="${item.id}">${item.label}</div>`).join('')}
            </div>

            <div style="background: #000; color: #0f0; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-family: 'Courier New', monospace;">
                <pre style="margin: 0; color: #0f0;">dataLayer.push({
  <div class="drop-zones" id="drop-zones-${containerId}">
    <div class="drop-zone" data-position="0" style="min-height: 30px; margin: 5px 0; border: 2px dashed #0f0; border-radius: 5px; padding: 8px;">
        <span style="color: #888;">// 1. Arrastra aquí</span>
    </div>
    <div class="drop-zone" data-position="1" style="min-height: 30px; margin: 5px 0; border: 2px dashed #0f0; border-radius: 5px; padding: 8px;">
        <span style="color: #888;">// 2. Arrastra aquí</span>
    </div>
    <div class="drop-zone" data-position="2" style="min-height: 30px; margin: 5px 0; border: 2px dashed #0f0; border-radius: 5px; padding: 8px;">
        <span style="color: #888;">// 3. Arrastra aquí</span>
    </div>
    <div class="drop-zone" data-position="3" style="min-height: 30px; margin: 5px 0; border: 2px dashed #0f0; border-radius: 5px; padding: 8px;">
        <span style="color: #888;">// 4. Arrastra aquí</span>
    </div>
  </div>
})</pre>
            </div>
            
            <div id="minigame-result-${containerId}" class="minigame-result" style="display: none;"></div>
        </div>
    `;
    
    const draggableItems = container.querySelectorAll('.draggable-item');
    const dropZones = container.querySelectorAll('.drop-zone');
    const resultDiv = document.getElementById(`minigame-result-${containerId}`);
    
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.dataset.id);
            e.target.style.opacity = '0.5';
        });
        
        item.addEventListener('dragend', (e) => {
            e.target.style.opacity = '1';
        });
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', (e) => {
            e.preventDefault();
            zone.style.background = 'rgba(78, 205, 196, 0.2)';
        });
        
        zone.addEventListener('dragleave', () => {
            zone.style.background = 'transparent';
        });
        
        zone.addEventListener('drop', (e) => {
            e.preventDefault();
            zone.style.background = 'transparent';
            
            const data = e.dataTransfer.getData('text/plain');
            const draggedItem = document.querySelector(`.draggable-item[data-id="${data}"]`);
            
            if (draggedItem && !zone.querySelector('.draggable-item')) {
                // Clear placeholder text
                const placeholder = zone.querySelector('span');
                if (placeholder) placeholder.remove();
                
                zone.appendChild(draggedItem);
                draggedItem.style.margin = '0';
                draggedItem.style.fontSize = '0.9rem';
                
                currentOrder[parseInt(zone.dataset.position)] = data;
                checkOrder();
            }
        });
    });
    
    function checkOrder() {
        if (currentOrder.filter(Boolean).length === items.length) {
            const isCorrect = JSON.stringify(currentOrder) === JSON.stringify(correctOrder);
            
            if (isCorrect) {
                resultDiv.className = 'minigame-result success';
                resultDiv.innerHTML = `
                    ✅ ¡Mensaje traducido correctamente! El evento está listo para ser escuchado por GTM.
                    <br><br>
                    <button class="btn-continue" style="margin-top: 1.5rem;" onclick="document.getElementById('bloque2-game-1').style.display='none'; document.getElementById('bloque2-theory-2').style.display='block'; window.scrollTo({top:0,behavior:'smooth'});">Continuar →</button>
                `;
                resultDiv.style.display = 'block';
            } else {
                resultDiv.className = 'minigame-result error';
                resultDiv.innerHTML = `❌ El orden no es correcto. Recuerda: primero 'event', luego los parámetros.`;
                resultDiv.style.display = 'block';
                
                setTimeout(() => {
                    resetGame1();
                }, 2000);
            }
        }
    }
    
    function resetGame1() {
        currentOrder = [];
        
        // Move items back to draggable area
        const itemsContainer = document.getElementById(`draggable-items-${containerId}`);
        itemsContainer.innerHTML = '';
        
        shuffleArray(items);
        items.forEach(item => {
            const newItem = document.createElement('div');
            newItem.className = 'draggable-item';
            newItem.draggable = true;
            newItem.dataset.id = item.id;
            newItem.textContent = item.label;
            
            newItem.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.dataset.id);
                e.target.style.opacity = '0.5';
            });
            
            newItem.addEventListener('dragend', (e) => {
                e.target.style.opacity = '1';
            });
            
            itemsContainer.appendChild(newItem);
        });
        
        // Reset drop zones
        dropZones.forEach((zone, idx) => {
            zone.innerHTML = `<span style="color: #888;">// ${idx + 1}. Arrastra aquí</span>`;
        });
        
        resultDiv.style.display = 'none';
    }
}

// Game 2: Construye un trigger (Multi-step quiz)
function initBloque2Game2(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    // Randomize options
    const triggerOptions = shuffleArray([
        { icon: '🟢', text: 'Custom Event', value: 'custom', correct: true },
        { icon: '🟡', text: 'All Elements Click', value: 'click', correct: false },
        { icon: '🔵', text: 'Page View', value: 'pageview', correct: false }
    ]);
    
    const eventOptions = shuffleArray([
        { text: 'add_to_cart', value: 'correct', correct: true },
        { text: 'click_button', value: 'wrong1', correct: false },
        { text: 'purchase', value: 'wrong2', correct: false }
    ]);
    
    const conditionOptions = shuffleArray([
        { text: 'price > 50', value: 'correct', correct: true },
        { text: 'price == 50', value: 'wrong1', correct: false },
        { text: 'product_id != null', value: 'wrong2', correct: false }
    ]);
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🎯 Configurador de Triggers</h3>
            <p class="minigame-instructions">
                Situación: Quieres disparar una etiqueta cuando alguien añade un producto al carrito <strong>y el precio es mayor a 50€</strong>
            </p>
            
            <div class="quiz-game" style="margin-top: 2rem;">
                <div style="background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h4>Paso 1: Tipo de trigger</h4>
                    <div id="trigger-type-options" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                        ${triggerOptions.map(opt => `<button class="quiz-option" data-correct="${opt.correct}">${opt.icon} ${opt.text}</button>`).join('')}
                    </div>
                </div>
                
                <div id="step2" style="display: none; background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 8px; margin-bottom: 2rem;">
                    <h4>Paso 2: Nombre del evento</h4>
                    <div id="event-name-options" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                        ${eventOptions.map(opt => `<button class="quiz-option" data-correct="${opt.correct}">${opt.text}</button>`).join('')}
                    </div>
                </div>
                
                <div id="step3" style="display: none; background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 8px;">
                    <h4>Paso 3: Condición adicional</h4>
                    <div id="condition-options" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                        ${conditionOptions.map(opt => `<button class="quiz-option" data-correct="${opt.correct}">${opt.text}</button>`).join('')}
                    </div>
                </div>
                
                <div id="game2-result" style="display: none; margin-top: 2rem;"></div>
            </div>
        </div>
    `;
    
    // Step 1
    document.querySelectorAll('#trigger-type-options .quiz-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            
            if (isCorrect) {
                document.querySelectorAll('#trigger-type-options .quiz-option').forEach(b => b.disabled = true);
                this.classList.add('correct');
                setTimeout(() => document.getElementById('step2').style.display = 'block', 500);
            } else {
                this.classList.add('incorrect');
                setTimeout(() => this.classList.remove('incorrect'), 1000);
            }
        });
    });
    
    // Step 2
    document.querySelectorAll('#event-name-options .quiz-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            
            if (isCorrect) {
                document.querySelectorAll('#event-name-options .quiz-option').forEach(b => b.disabled = true);
                this.classList.add('correct');
                setTimeout(() => document.getElementById('step3').style.display = 'block', 500);
            } else {
                this.classList.add('incorrect');
                setTimeout(() => this.classList.remove('incorrect'), 1000);
            }
        });
    });
    
    // Step 3
    document.querySelectorAll('#condition-options .quiz-option').forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            const resultDiv = document.getElementById('game2-result');
            document.querySelectorAll('#condition-options .quiz-option').forEach(b => b.disabled = true);
            
            if (isCorrect) {
                this.classList.add('correct');
                resultDiv.className = 'minigame-result success';
                resultDiv.innerHTML = `✅ ¡Trigger configurado perfectamente! 🎯<br><small>Ahora GTM solo disparará cuando sea "add_to_cart" con precio > 50€</small>`;
                resultDiv.style.display = 'block';
                
                resultDiv.innerHTML += `<br><br><button class="btn-continue" style="margin-top: 1.5rem;" onclick="showScene('bloque2', 'bloque2-theory-3')">Continuar →</button>`;
            } else {
                this.classList.add('incorrect');
                resultDiv.className = 'minigame-result error';
                resultDiv.innerHTML = `❌ No exactamente... La condición debe asegurar que el precio sea MAYOR a 50€.`;
                resultDiv.style.display = 'block';
                setTimeout(() => {
                    this.classList.remove('incorrect');
                    resultDiv.style.display = 'none';
                }, 2000);
            }
        });
    });
}

// Game 3: Atrapa el valor correcto (Variable selection)
function initBloque2Game3(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const options = shuffleArray([
        { text: 'transaction_id', value: 'correct', correct: true },
        { text: 'user_email', value: 'wrong1', correct: false },
        { text: 'page_url', value: 'wrong2', correct: false },
        { text: 'click_text', value: 'wrong3', correct: false }
    ]);
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🎯 Selector de Variables</h3>
            <p class="minigame-instructions">
                Tienes este dataLayer. ¿Qué variable necesitas extraer para enviar el ID de transacción a GA4?
            </p>
            
            <div style="background: #000; color: #0f0; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-family: 'Courier New', monospace;">
                <pre style="margin: 0; color: #0f0;">dataLayer.push({
  event: 'purchase',
  transaction_id: 'TXN-12345',
  revenue: 299.99,
  currency: 'EUR'
})</pre>
            </div>
            
            <div class="quiz-game">
                <h4 style="margin-bottom: 1rem;">Selecciona la variable correcta:</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${options.map(opt => `<button class="quiz-option" data-correct="${opt.correct}">${opt.text}</button>`).join('')}
                </div>
                
                <div id="game3-result" style="display: none; margin-top: 2rem;"></div>
            </div>
        </div>
    `;
    
    document.querySelectorAll(`#${containerId} .quiz-option`).forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            const resultDiv = document.getElementById('game3-result');
            document.querySelectorAll(`#${containerId} .quiz-option`).forEach(b => b.disabled = true);
            
            if (isCorrect) {
                this.classList.add('correct');
                resultDiv.className = 'minigame-result success';
                resultDiv.innerHTML = `✅ ¡Correcto! Ahora puedes crear una variable Data Layer con el nombre "transaction_id"`;
                resultDiv.style.display = 'block';
                
                resultDiv.innerHTML += `<br><br><button class="btn-continue" style="margin-top: 1.5rem;" onclick="showScene('bloque2', 'bloque2-theory-expandible-2')">Continuar →</button>`;
            } else {
                this.classList.add('incorrect');
                resultDiv.className = 'minigame-result error';
                resultDiv.innerHTML = `❌ No es esa. Busca el parámetro que contiene el ID de la transacción.`;
                resultDiv.style.display = 'block';
                setTimeout(() => {
                    this.classList.remove('incorrect');
                    resultDiv.style.display = 'none';
                }, 2000);
            }
        });
    });
}

// Game 4: Lanza tu primer hechizo (Complete tag setup)
function initBloque2Game4(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const options = shuffleArray([
        {
            text: 'Tag Type: GA4 Event<br>Event Name: purchase<br>Event Parameters: transaction_id = {{transaction_id}}',
            value: 'correct',
            correct: true
        },
        {
            text: 'Tag Type: Universal Analytics<br>Event Category: purchase',
            value: 'wrong1',
            correct: false
        },
        {
            text: 'Tag Type: GA4 Event<br>Event Name: transaction<br>(sin parámetros)',
            value: 'wrong2',
            correct: false
        }
    ]);
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🚀 Configuración Completa de Tag</h3>
            <p class="minigame-instructions">
                Situación: Quieres enviar un evento "purchase" a GA4 con el transaction_id
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 2rem; margin-top: 2rem;">
                <div style="background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 8px;">
                    <h4>✅ Paso 1: Trigger configurado</h4>
                    <p style="color: var(--text-light); margin: 0;">Custom Event: "purchase"</p>
                </div>
                
                <div style="background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 8px;">
                    <h4>✅ Paso 2: Variable configurada</h4>
                    <p style="color: var(--text-light); margin: 0;">Data Layer Variable: "transaction_id"</p>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.5); padding: 1.5rem; border-radius: 8px; border: 2px dashed var(--text-light);">
                    <h4>📌 Paso 3: Configura el Tag</h4>
                    <p>Selecciona la configuración correcta para GA4:</p>
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                        ${options.map(opt => `<button class="quiz-option" data-correct="${opt.correct}">${opt.text}</button>`).join('')}
                    </div>
                </div>
                
                <div id="game4-result" style="display: none;"></div>
            </div>
        </div>
    `;
    
    document.querySelectorAll(`#${containerId} .quiz-option`).forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            const resultDiv = document.getElementById('game4-result');
            document.querySelectorAll(`#${containerId} .quiz-option`).forEach(b => b.disabled = true);
            
            if (isCorrect) {
                this.classList.add('correct');
                resultDiv.className = 'minigame-result success';
                resultDiv.innerHTML = `✅ ¡Evento enviado correctamente! 🚀<br><small>La nave despegó con éxito. GA4 recibió el evento "purchase" con el transaction_id.</small>`;
                resultDiv.style.display = 'block';
                
                resultDiv.innerHTML += `<br><br><button class="btn-continue" style="margin-top: 1.5rem;" onclick="showScene('bloque2', 'bloque2-theory-expandible-3')">Continuar →</button>`;
            } else {
                this.classList.add('incorrect');
                resultDiv.className = 'minigame-result error';
                resultDiv.innerHTML = `❌ No exactamente...<br><small>Necesitas GA4 Event con nombre "purchase" y el parámetro transaction_id mapeado a la variable {{transaction_id}}</small>`;
                resultDiv.style.display = 'block';
                setTimeout(() => {
                    this.classList.remove('incorrect');
                    resultDiv.style.display = 'none';
                }, 3000);
            }
        });
    });
}

// Game 5: El radar no miente (Debugging challenge)
function initBloque2Game5(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const options = shuffleArray([
        { text: 'El evento se llama "addToCart" pero el trigger escucha "add_to_cart" (naming inconsistente)', value: 'correct', correct: true },
        { text: 'Falta la variable "currency"', value: 'wrong1', correct: false },
        { text: 'El precio está mal formateado', value: 'wrong2', correct: false },
        { text: 'El trigger está pausado', value: 'wrong3', correct: false }
    ]);
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🔍 Detective de Bugs</h3>
            <p class="minigame-instructions">
                Observa este código y el resultado en GTM Debugger. ¿Cuál es el problema?
            </p>
            
            <div style="background: #000; color: #0f0; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-family: 'Courier New', monospace;">
                <p style="color: #888; margin-bottom: 0.5rem;">// Código implementado:</p>
                <pre style="margin: 0; color: #0f0;">dataLayer.push({
  event: 'addToCart',  // ← Nota este nombre
  product_id: 'XYZ789',
  price: 99.99
})</pre>
            </div>
            
            <div style="background: rgba(244, 67, 54, 0.1); border: 2px solid #f44336; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h4 style="color: #f44336; margin-top: 0;">🚨 GTM Debugger dice:</h4>
                <p style="margin: 0;">Trigger "Add to Cart" configurado para escuchar: <code>add_to_cart</code></p>
                <p style="margin: 0.5rem 0 0 0;"><strong>Estado:</strong> No se disparó ❌</p>
            </div>
            
            <div class="quiz-game">
                <h4 style="margin-bottom: 1rem;">¿Cuál es el problema?</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    ${options.map(opt => `<button class="quiz-option" data-correct="${opt.correct}">${opt.text}</button>`).join('')}
                </div>
                
                <div id="game5-result" style="display: none; margin-top: 2rem;"></div>
            </div>
        </div>
    `;
    
    document.querySelectorAll(`#${containerId} .quiz-option`).forEach(btn => {
        btn.addEventListener('click', function() {
            const isCorrect = this.dataset.correct === 'true';
            const resultDiv = document.getElementById('game5-result');
            document.querySelectorAll(`#${containerId} .quiz-option`).forEach(b => b.disabled = true);
            
            if (isCorrect) {
                this.classList.add('correct');
                resultDiv.className = 'minigame-result success';
                resultDiv.innerHTML = `✅ ¡Correcto! El radar no miente 📡<br><small>El naming debe ser consistente: "addToCart" vs "add_to_cart". Siempre usa la misma convención (snake_case recomendado).</small>`;
                resultDiv.style.display = 'block';
                
                resultDiv.innerHTML += `<br><br><button class="btn-continue" style="margin-top: 1.5rem;" onclick="showScene('bloque2', 'bloque2-theory-6')">Continuar →</button>`;
            } else {
                this.classList.add('incorrect');
                resultDiv.className = 'minigame-result error';
                resultDiv.innerHTML = `❌ No es eso...<br><small>Pista: Fíjate en el NOMBRE del evento en el código vs el nombre que escucha el trigger</small>`;
                resultDiv.style.display = 'block';
                setTimeout(() => {
                    this.classList.remove('incorrect');
                    resultDiv.style.display = 'none';
                }, 3000);
            }
        });
    });
}

// Boss Fight: El evento fantasma
function initBloque2BossFight(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let errorsFound = [];
    const totalErrors = 3;
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">👻 Boss Fight: El Evento Fantasma</h3>
            <p class="minigame-instructions">
                Encuentra los 3 errores en esta implementación
            </p>
            
            <div style="background: #000; color: #0f0; padding: 1.5rem; border-radius: 8px; margin: 2rem 0; font-family: 'Courier New', monospace; position: relative; overflow-x: auto;">
                <div style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,215,0,0.2); padding: 0.5rem 1rem; border-radius: 5px; border: 2px solid #ffd700;">
                    <strong style="color: #ffd700;">Errores: <span id="errors-found">0</span>/${totalErrors}</strong>
                </div>
                <pre style="margin: 0; color: #0f0; line-height: 1.8; white-space: pre; overflow-x: visible;"><span class="code-line">dataLayer.push({</span>
<span id="error1" class="code-line" style="cursor: pointer;">  event: 'purchse',  // ← Click si ves algo raro</span>
<span class="code-line">  transaction_id: 'TXN-001',</span>
<span id="error2" class="code-line" style="cursor: pointer;">  transaction_id: 'TXN-002',  // ← Click si ves algo raro</span>
<span class="code-line">  revenue: 299.99</span>
<span class="code-line">})</span>

<span class="code-line" style="margin-top: 1rem;">// Trigger configurado:</span>
<span class="code-line">// Event: purchase</span>
<span id="error3" class="code-line" style="cursor: pointer;">// Condition: revenue > 100  // ← Click si ves algo raro</span></pre>
            </div>
            
            <div id="boss-result" style="display: none;"></div>
        </div>
    `;
    
    // Error 1: Typo in "purchse"
    document.getElementById('error1').addEventListener('click', function() {
        if (!errorsFound.includes(1)) {
            errorsFound.push(1);
            this.style.background = 'rgba(76, 175, 80, 0.3)';
            this.innerHTML = `  event: '<span style="background: #4caf50; color: #000; padding: 2px 4px;">purchse</span>',  // ❌ Typo! Debería ser "purchase"`;
            updateBossProgress();
        }
    });
    
    // Error 2: Duplicate transaction_id
    document.getElementById('error2').addEventListener('click', function() {
        if (!errorsFound.includes(2)) {
            errorsFound.push(2);
            this.style.background = 'rgba(76, 175, 80, 0.3)';
            this.innerHTML = `  <span style="background: #4caf50; color: #000; padding: 2px 4px;">transaction_id: 'TXN-002'</span>,  // ❌ Duplicado! Borra esta línea`;
            updateBossProgress();
        }
    });
    
    // Error 3: Condition should use >= not >
    document.getElementById('error3').addEventListener('click', function() {
        if (!errorsFound.includes(3)) {
            errorsFound.push(3);
            this.style.background = 'rgba(255, 193, 7, 0.3)';
            this.innerHTML = `// Condition: revenue <span style="background: #ffc107; color: #000; padding: 2px 4px;">&gt;</span> 100  // ⚠️ Debería ser ">=" para incluir 100`;
            updateBossProgress();
        }
    });
    
    function updateBossProgress() {
        document.getElementById('errors-found').textContent = errorsFound.length;
        
        if (errorsFound.length === totalErrors) {
            setTimeout(() => {
                const resultDiv = document.getElementById('boss-result');
                resultDiv.className = 'minigame-result success';
                resultDiv.innerHTML = `
                    🏅 <strong>¡Has domado el lenguaje secreto de los eventos!</strong><br>
                    <br>
                    <p>Errores encontrados:</p>
                    <ul style="text-align: left; padding-left: 2rem;">
                        <li>✅ Typo en "purchse" (debería ser "purchase")</li>
                        <li>✅ transaction_id duplicado</li>
                        <li>✅ Condición incorrecta (> debería ser >=)</li>
                    </ul>
                    <p style="margin-top: 1.5rem;"><strong>🎓 Has completado el Boss Fight</strong></p>
                `;
                resultDiv.style.display = 'block';
                
                setTimeout(() => {
                    document.getElementById('bloque2-boss-fight').style.display = 'none';
                    document.getElementById('bloque2-final').style.display = 'block';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 3000);
            }, 500);
        }
    }
}
