// ============================================
// BLOQUE 5 — Escuchar al dato
// ============================================

// Misión 1: Atribución - ¿De dónde vienen las conversiones?
function initBloque5Game1() {
    const container = document.getElementById('bloque5-game-1-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const conversions = [
        { id: 1, utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'black_friday', revenue: 450, conversions: 5 },
        { id: 2, utm_source: 'facebook', utm_medium: 'social', utm_campaign: 'brand_awareness', revenue: 120, conversions: 2 },
        { id: 3, utm_source: 'email', utm_medium: 'email', utm_campaign: 'newsletter_oct', revenue: 890, conversions: 12 },
        { id: 4, utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'influencer_collab', revenue: 230, conversions: 3 },
        { id: 5, utm_source: 'google', utm_medium: 'organic', utm_campaign: '(not set)', revenue: 1200, conversions: 18 }
    ];
    
    let currentQuestion = 0;
    const questions = [
        {
            question: '¿Qué fuente genera más conversiones?',
            options: ['Google CPC', 'Email', 'Google Organic', 'Facebook'],
            correct: 2,
            explanation: 'Google Organic tiene 18 conversiones, más que cualquier otra fuente'
        },
        {
            question: '¿Qué canal tiene el mayor revenue total?',
            options: ['Google Organic', 'Email', 'Google CPC', 'Instagram'],
            correct: 0,
            explanation: 'Google Organic genera €1,200, el mayor revenue de todas las fuentes'
        },
        {
            question: '¿Qué campaña tiene tráfico pero bajo revenue por conversión?',
            options: ['brand_awareness (Facebook)', 'newsletter_oct (Email)', 'black_friday (Google)', 'influencer_collab (Instagram)'],
            correct: 0,
            explanation: 'Facebook tiene 2 conversiones con solo €120 (€60/conversión), muy bajo comparado con otras'
        }
    ];
    
    function renderQuestion() {
        const q = questions[currentQuestion];
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">📊 Análisis de Atribución</h3>
                <p class="minigame-instructions">Analiza los datos de conversión y responde correctamente</p>
                
                <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                    <h4 style="margin-bottom: 1rem;">📈 Datos de conversión del último mes:</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--primary-color); color: white;">
                                <th style="padding: 0.75rem; text-align: left;">Source</th>
                                <th style="padding: 0.75rem; text-align: left;">Medium</th>
                                <th style="padding: 0.75rem; text-align: left;">Campaign</th>
                                <th style="padding: 0.75rem; text-align: right;">Revenue</th>
                                <th style="padding: 0.75rem; text-align: right;">Conv.</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${conversions.map(c => `
                                <tr style="border-bottom: 1px solid var(--border-color);">
                                    <td style="padding: 0.75rem;">${c.utm_source}</td>
                                    <td style="padding: 0.75rem;">${c.utm_medium}</td>
                                    <td style="padding: 0.75rem;">${c.utm_campaign}</td>
                                    <td style="padding: 0.75rem; text-align: right;">€${c.revenue}</td>
                                    <td style="padding: 0.75rem; text-align: right;">${c.conversions}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                
                <div style="margin: 2rem 0;">
                    <h4 style="margin-bottom: 1rem;">Pregunta ${currentQuestion + 1}/3:</h4>
                    <p style="font-size: 1.2rem; font-weight: bold; margin-bottom: 1.5rem;">${q.question}</p>
                    
                    <div class="quiz-options">
                        ${q.options.map((opt, idx) => `
                            <button class="quiz-option" data-index="${idx}">
                                ${opt}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div id="bloque5-game-1-result" class="minigame-result" style="display: none;"></div>
            </div>
        `;
        
        const buttons = container.querySelectorAll('.quiz-option');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => checkAnswer(parseInt(btn.dataset.index)));
        });
    }
    
    function checkAnswer(selected) {
        const q = questions[currentQuestion];
        const resultDiv = document.getElementById('bloque5-game-1-result');
        
        if (selected === q.correct) {
            resultDiv.className = 'minigame-result success';
            resultDiv.innerHTML = `✅ ¡Correcto! ${q.explanation}`;
            resultDiv.style.display = 'block';
            
            setTimeout(() => {
                currentQuestion++;
                if (currentQuestion < questions.length) {
                    renderQuestion();
                } else {
                    showFinalResult();
                }
            }, 2000);
        } else {
            resultDiv.className = 'minigame-result error';
            resultDiv.innerHTML = `❌ No exactamente. Revisa los datos con más cuidado.`;
            resultDiv.style.display = 'block';
            
            setTimeout(() => {
                resultDiv.style.display = 'none';
            }, 2000);
        }
    }
    
    function showFinalResult() {
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">📊 Análisis completado</h3>
                <div class="minigame-result success">
                    ✅ ¡Excelente análisis! Ahora sabes identificar de dónde vienen tus conversiones.
                    <br><br>
                    <strong>💡 Insight clave:</strong> La atribución correcta te permite optimizar presupuesto. En este caso, Google Organic y Email están funcionando muy bien, mientras que Facebook necesita ajustes.
                    <br><br>
                    <button class="btn-continue" onclick="showScene('bloque5', 'bloque5-theory-2')">Continuar →</button>
                </div>
            </div>
        `;
    }
    
    renderQuestion();
}

// Misión 2: Detectar errores en funnel
function initBloque5Game2() {
    const container = document.getElementById('bloque5-game-2-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const funnelData = {
        view_item: { count: 1000, timestamp_avg: '10:00:00', page: '/product/123' },
        add_to_cart: { count: 600, timestamp_avg: '10:02:30', page: '/product/123' },
        begin_checkout: { count: 400, timestamp_avg: '10:05:00', page: '/checkout' },
        add_to_cart_duplicate: { count: 450, timestamp_avg: '10:03:15', page: '/product/123' },
        purchase: { count: 180, timestamp_avg: '10:08:00', page: '/thank-you' }
    };
    
    const errors = [
        { 
            id: 1, 
            description: 'El evento "add_to_cart" se dispara dos veces (600 + 450)', 
            correct: true,
            explanation: 'Hay un duplicado de add_to_cart que infla los números. Hay que revisar los triggers.'
        },
        { 
            id: 2, 
            description: 'El funnel tiene una caída del 55% entre begin_checkout y purchase', 
            correct: false,
            explanation: 'La caída del 55% es normal en e-commerce. No es un error técnico, es comportamiento de usuario.'
        },
        { 
            id: 3, 
            description: 'El evento "purchase" debería disparar antes de "begin_checkout"', 
            correct: false,
            explanation: 'No, el orden correcto es: view → add_to_cart → checkout → purchase'
        },
        { 
            id: 4, 
            description: 'Faltan eventos intermedios como "add_payment_info" o "add_shipping_info"', 
            correct: true,
            explanation: 'Estos eventos son opcionales pero recomendados por GA4 para entender mejor el funnel'
        }
    ];
    
    let selectedErrors = [];
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">🔍 Detective de Funnels</h3>
            <p class="minigame-instructions">Analiza este funnel de e-commerce e identifica los errores</p>
            
            <div style="background: var(--bg-secondary); padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">
                <h4>📊 Datos del funnel (último mes):</h4>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem;">
                    ${Object.entries(funnelData).map(([event, data]) => `
                        <div style="text-align: center; flex: 1;">
                            <div style="background: var(--primary-color); color: white; padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem;">
                                <strong>${data.count}</strong>
                            </div>
                            <small>${event.replace(/_/g, ' ')}</small>
                        </div>
                    `).join('<div style="font-size: 2rem; margin: 0 0.5rem;">→</div>')}
                </div>
            </div>
            
            <h4 style="margin: 2rem 0 1rem;">Selecciona TODOS los problemas que detectes:</h4>
            <div style="display: grid; gap: 1rem;">
                ${errors.map(err => `
                    <label style="display: flex; align-items: start; padding: 1rem; background: var(--bg-card); border-radius: 8px; cursor: pointer; border: 2px solid transparent;" class="error-option" data-id="${err.id}">
                        <input type="checkbox" value="${err.id}" style="margin-right: 1rem; transform: scale(1.5);">
                        <span>${err.description}</span>
                    </label>
                `).join('')}
            </div>
            
            <button class="btn-primary" style="margin-top: 2rem; width: 100%;" onclick="checkBloque5Game2()">
                Verificar análisis
            </button>
            
            <div id="bloque5-game-2-result" class="minigame-result" style="display: none;"></div>
        </div>
    `;
    
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const option = e.target.closest('.error-option');
            if (e.target.checked) {
                option.style.borderColor = 'var(--primary-color)';
                option.style.background = 'var(--bg-hover)';
            } else {
                option.style.borderColor = 'transparent';
                option.style.background = 'var(--bg-card)';
            }
        });
    });
    
    window.checkBloque5Game2 = function() {
        const selected = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => parseInt(cb.value));
        const correct = errors.filter(e => e.correct).map(e => e.id);
        const resultDiv = document.getElementById('bloque5-game-2-result');
        
        const isCorrect = JSON.stringify(selected.sort()) === JSON.stringify(correct.sort());
        
        if (isCorrect) {
            resultDiv.className = 'minigame-result success';
            resultDiv.innerHTML = `
                ✅ ¡Análisis perfecto! Has identificado correctamente los problemas:
                <ul style="text-align: left; margin-top: 1rem;">
                    ${errors.filter(e => e.correct).map(e => `<li><strong>${e.description}</strong><br><small>${e.explanation}</small></li>`).join('')}
                </ul>
                <br><br>
                <button class="btn-continue" onclick="showScene('bloque5', 'bloque5-theory-3')">Continuar →</button>
            `;
        } else {
            resultDiv.className = 'minigame-result error';
            resultDiv.innerHTML = `❌ Revisa tu análisis. Hay ${correct.length} problemas reales en este funnel.`;
            
            setTimeout(() => {
                resultDiv.style.display = 'none';
            }, 3000);
        }
        
        resultDiv.style.display = 'block';
    };
}

// Misión 3: Generar insight accionable
function initBloque5Game3() {
    const container = document.getElementById('bloque5-game-3-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const scenarios = [
        {
            id: 1,
            title: 'Campaña "Summer Sale"',
            metrics: {
                sessions: 5000,
                conversions: 50,
                bounce_rate: 75,
                avg_time: '00:00:45'
            },
            insight: 'Mucho tráfico pero baja conversión y alto rebote',
            action: 'Revisar la landing page: puede que el mensaje no coincida con el anuncio o la página cargue lento',
            correct: true
        },
        {
            id: 2,
            title: 'Tráfico Mobile',
            metrics: {
                sessions: 8000,
                conversions: 120,
                bounce_rate: 45,
                avg_time: '00:03:20'
            },
            insight: 'Buena conversión en mobile',
            action: 'Todo funciona bien, no hay que hacer nada',
            correct: false
        },
        {
            id: 3,
            title: 'Checkout abandonment',
            metrics: {
                begin_checkout: 600,
                purchase: 180,
                drop_rate: 70
            },
            insight: '70% de usuarios abandonan en checkout',
            action: 'Optimizar checkout: reducir campos, añadir más opciones de pago, mostrar costes de envío antes',
            correct: true
        }
    ];
    
    let currentScenario = 0;
    
    function renderScenario() {
        const scenario = scenarios[currentScenario];
        
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">💡 Del dato a la acción</h3>
                <p class="minigame-instructions">Lee el escenario y decide si el insight es accionable</p>
                
                <div style="background: var(--bg-secondary); padding: 2rem; border-radius: 8px; margin: 2rem 0;">
                    <h4 style="margin-bottom: 1.5rem;">📊 ${scenario.title}</h4>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
                        ${Object.entries(scenario.metrics).map(([key, value]) => `
                            <div style="background: var(--bg-card); padding: 1rem; border-radius: 8px; text-align: center;">
                                <div style="font-size: 1.5rem; font-weight: bold; color: var(--primary-color);">${value}</div>
                                <div style="font-size: 0.85rem; color: var(--text-light);">${key.replace(/_/g, ' ')}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div style="background: var(--bg-card); padding: 1.5rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid var(--primary-color);">
                    <p style="margin-bottom: 1rem;"><strong>📌 Insight propuesto:</strong></p>
                    <p style="font-size: 1.1rem;">${scenario.insight}</p>
                    <br>
                    <p style="margin-bottom: 1rem;"><strong>🎯 Acción sugerida:</strong></p>
                    <p style="font-size: 1.1rem;">${scenario.action}</p>
                </div>
                
                <h4 style="margin-bottom: 1rem;">¿Es este un insight accionable y correcto?</h4>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <button class="btn-primary" onclick="checkInsight(true)">✅ Sí, es válido y accionable</button>
                    <button class="btn-secondary" onclick="checkInsight(false)">❌ No, no es útil o está mal</button>
                </div>
                
                <div id="bloque5-game-3-result" class="minigame-result" style="display: none;"></div>
            </div>
        `;
        
        window.checkInsight = function(answer) {
            const resultDiv = document.getElementById('bloque5-game-3-result');
            
            if (answer === scenario.correct) {
                resultDiv.className = 'minigame-result success';
                resultDiv.innerHTML = `✅ ¡Correcto! ${scenario.correct ? 'Este insight lleva a acciones concretas que pueden mejorar métricas.' : 'Este insight no aporta valor real o la acción no es la correcta.'}`;
                resultDiv.style.display = 'block';
                
                setTimeout(() => {
                    currentScenario++;
                    if (currentScenario < scenarios.length) {
                        renderScenario();
                    } else {
                        showFinalInsight();
                    }
                }, 2000);
            } else {
                resultDiv.className = 'minigame-result error';
                resultDiv.innerHTML = `❌ Piénsalo de nuevo. Un insight accionable debe llevar a cambios concretos y medibles.`;
                resultDiv.style.display = 'block';
                
                setTimeout(() => {
                    resultDiv.style.display = 'none';
                }, 2000);
            }
        };
    }
    
    function showFinalInsight() {
        container.innerHTML = `
            <div class="minigame-container">
                <h3 class="minigame-title">💡 Análisis completado</h3>
                <div class="minigame-result success">
                    ✅ ¡Excelente! Ahora sabes distinguir entre datos y decisiones.
                    <br><br>
                    <strong>📌 Recuerda:</strong> Un buen insight tiene 3 características:
                    <ul style="text-align: left; margin: 1rem 0;">
                        <li><strong>Específico:</strong> Identifica un problema concreto</li>
                        <li><strong>Accionable:</strong> Sugiere una acción clara</li>
                        <li><strong>Medible:</strong> Puedes verificar si funcionó</li>
                    </ul>
                    <br>
                    <button class="btn-continue" onclick="showScene('bloque5', 'bloque5-theory-4')">Continuar →</button>
                </div>
            </div>
        `;
    }
    
    renderScenario();
}

// Boss Fight: Crear tu primer dashboard
function initBloque5BossFight() {
    const container = document.getElementById('bloque5-boss-fight-container');
    if (!container) return;
    
    // Ensure container is visible
    container.style.display = 'block';
    
    const dashboardElements = [
        { id: 1, name: 'Conversiones por canal', essential: true, category: 'kpi' },
        { id: 2, name: 'Usuarios activos en tiempo real', essential: false, category: 'vanity' },
        { id: 3, name: 'Revenue por campaña', essential: true, category: 'kpi' },
        { id: 4, name: 'Páginas vistas totales', essential: false, category: 'vanity' },
        { id: 5, name: 'Tasa de conversión del funnel', essential: true, category: 'kpi' },
        { id: 6, name: 'Número de sesiones', essential: false, category: 'vanity' },
        { id: 7, name: 'Coste por adquisición (CPA)', essential: true, category: 'kpi' },
        { id: 8, name: 'Tiempo medio en sitio', essential: false, category: 'context' }
    ];
    
    let selectedElements = [];
    
    container.innerHTML = `
        <div class="minigame-container">
            <h3 class="minigame-title">📊 Boss Fight: Tu primer dashboard</h3>
            <p class="minigame-instructions">
                El CEO te pide: <strong>"Quiero saber qué campañas están funcionando y cuáles no"</strong><br>
                Selecciona las métricas esenciales para tu dashboard (máximo 4)
            </p>
            
            <div style="margin: 2rem 0;">
                <div style="display: grid; gap: 1rem;">
                    ${dashboardElements.map(elem => `
                        <label style="display: flex; align-items: center; padding: 1rem; background: var(--bg-card); border-radius: 8px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s;" class="dashboard-element" data-id="${elem.id}">
                            <input type="checkbox" value="${elem.id}" style="margin-right: 1rem; transform: scale(1.5);" ${selectedElements.includes(elem.id) ? 'checked' : ''}>
                            <span style="flex: 1;">${elem.name}</span>
                            <span style="font-size: 0.85rem; padding: 0.25rem 0.75rem; background: var(--bg-secondary); border-radius: 4px;">${elem.category}</span>
                        </label>
                    `).join('')}
                </div>
            </div>
            
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; background: var(--bg-secondary); border-radius: 8px; margin-top: 2rem;">
                <span>Métricas seleccionadas: <strong id="selected-count">0</strong>/4</span>
                <button class="btn-primary" onclick="checkDashboard()" id="check-dashboard-btn" disabled>
                    Validar dashboard
                </button>
            </div>
            
            <div id="bloque5-boss-result" class="minigame-result" style="display: none;"></div>
        </div>
    `;
    
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    const countSpan = document.getElementById('selected-count');
    const checkBtn = document.getElementById('check-dashboard-btn');
    
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const option = e.target.closest('.dashboard-element');
            selectedElements = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(c => parseInt(c.value));
            
            countSpan.textContent = selectedElements.length;
            checkBtn.disabled = selectedElements.length === 0;
            
            if (e.target.checked) {
                option.style.borderColor = 'var(--primary-color)';
                option.style.background = 'var(--bg-hover)';
            } else {
                option.style.borderColor = 'transparent';
                option.style.background = 'var(--bg-card)';
            }
            
            // Disable other checkboxes if 4 are selected
            if (selectedElements.length >= 4) {
                checkboxes.forEach(c => {
                    if (!c.checked) c.disabled = true;
                });
            } else {
                checkboxes.forEach(c => c.disabled = false);
            }
        });
    });
    
    window.checkDashboard = function() {
        const selected = Array.from(container.querySelectorAll('input[type="checkbox"]:checked')).map(cb => parseInt(cb.value));
        const essential = dashboardElements.filter(e => e.essential).map(e => e.id);
        const selectedEssential = selected.filter(s => essential.includes(s));
        const resultDiv = document.getElementById('bloque5-boss-result');
        
        if (selectedEssential.length >= 3) {
            resultDiv.className = 'minigame-result success';
            resultDiv.innerHTML = `
                ✅ ¡Dashboard aprobado! Has priorizado las métricas correctas.
                <br><br>
                <strong>💡 Lo que hiciste bien:</strong>
                <ul style="text-align: left; margin-top: 1rem;">
                    <li>Seleccionaste KPIs accionables (conversiones, revenue, CPA)</li>
                    <li>Evitaste métricas de vanidad que no responden la pregunta</li>
                    <li>Tu dashboard cuenta una historia clara: rendimiento por campaña</li>
                </ul>
                <br>
                <p><strong>🎓 Has completado el Bloque 5: Escuchar al dato</strong></p>
                <br>
                <button class="btn-continue" onclick="completeBloque5()">Finalizar bloque →</button>
            `;
        } else {
            resultDiv.className = 'minigame-result error';
            resultDiv.innerHTML = `
                ❌ Este dashboard no responde bien a la pregunta del CEO.
                <br><br>
                <strong>Pista:</strong> Necesitas al menos 3 KPIs esenciales que respondan:
                <ul style="text-align: left; margin-top: 1rem;">
                    <li>¿Cuántas conversiones genera cada campaña?</li>
                    <li>¿Cuánto revenue aporta cada una?</li>
                    <li>¿Cuál es el coste de cada conversión?</li>
                </ul>
            `;
            
            setTimeout(() => {
                resultDiv.style.display = 'none';
            }, 5000);
        }
        
        resultDiv.style.display = 'block';
    };
}

window.completeBloque5 = function() {
    unlockAchievement('bloque5_complete');
    showScene('bloque5', 'bloque5-final');
    window.scrollTo({ top: 0, behavior: 'smooth' });
};



