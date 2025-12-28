
/**
 * The Pantry Game - DataLayer Logic
 * 
 * Mechanics:
 * - "Recipe" mode (Crafting)
 * - Player has a goal: "Configurar Purchase Tag"
 * - Available ingredients in Pantry (dataLayer)
 * - Must drag correct ingredients to the pot
 */

const PANTRY_GAME = {
    state: {
        currentLevel: 0,
        potIngredients: [],
        gameActive: false
    },

    levels: [
        {
            title: "Receta 1: PageView Simple",
            description: "El Chef necesita saber qué página se está viendo.",
            recipe: ["page_path", "page_title"],
            pantry: [
                { id: "page_path", name: "Page Path (/home)", type: "good" },
                { id: "page_title", name: "Page Title (Home)", type: "good" },
                { id: "user_password", name: "User Password", type: "bad", reason: "¡Jamás guardes PII sensible!" },
                { id: "undefined_var", name: "undefined", type: "bad", reason: "Variable rota" }
            ]
        },
        {
            title: "Receta 2: Compra (Purchase)",
            description: "Un plato fuerte. Necesitamos el valor y la moneda.",
            recipe: ["value", "currency", "transaction_id"],
            pantry: [
                { id: "value", name: "Value (49.99)", type: "good" },
                { id: "currency", name: "Currency (EUR)", type: "good" },
                { id: "transaction_id", name: "Tx ID (#8839)", type: "good" },
                { id: "click_id", name: "Click ID", type: "bad", reason: "No relevante para compra" },
                { id: "rotten_egg", name: "null", type: "bad", reason: "Dato vacío" }
            ]
        }
    ],

    init: function (containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.containerId = containerId;
        this.state.currentLevel = 0;
        this.loadLevel(0);
    },

    loadLevel: function (levelIndex) {
        if (levelIndex >= this.levels.length) {
            this.endGame();
            return;
        }

        const level = this.levels[levelIndex];
        this.state.potIngredients = [];
        this.state.gameActive = true;

        const container = document.getElementById(this.containerId);

        container.innerHTML = `
            <div class="pantry-board">
                <div class="header" style="text-align: center; margin-bottom: 2rem;">
                    <h3 style="color: #4ecdc4;">${level.title}</h3>
                    <p>${level.description}</p>
                    <div style="background: rgba(0,0,0,0.3); padding: 0.5rem; display: inline-block; border-radius: 4px; margin-top: 0.5rem;">
                        Necesitas: ${level.recipe.join(", ")}
                    </div>
                </div>

                <div class="game-area" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <!-- Pantry Shelf -->
                    <div class="shelf-area" style="background: rgba(255,255,255,0.05); padding: 1rem; border-radius: 8px;">
                        <h4 style="margin-top: 0;">🗄️ La Despensa (dataLayer)</h4>
                        <div id="pantry-items" style="display: flex; flex-wrap: wrap; gap: 0.5rem; min-height: 150px;">
                            ${level.pantry.map(item => `
                                <div class="pantry-item" 
                                     draggable="true" 
                                     data-id="${item.id}"
                                     ondragstart="PANTRY_GAME.drag(event)"
                                     style="
                                        background: #333; 
                                        padding: 0.5rem 1rem; 
                                        border: 1px solid #555; 
                                        border-radius: 4px; 
                                        cursor: grab;
                                     ">
                                    ${item.name}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- The Pot -->
                    <div class="pot-area" style="text-align: center;">
                        <div id="cooking-pot" 
                             ondrop="PANTRY_GAME.drop(event)" 
                             ondragover="PANTRY_GAME.allowDrop(event)"
                             style="
                                width: 100%; 
                                height: 200px; 
                                background: radial-gradient(circle, #444 20%, #222 80%); 
                                border-radius: 0 0 50px 50px; 
                                border: 4px solid #666;
                                border-top: none;
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                justify-content: center;
                             ">
                             <span style="font-size: 2rem;">🍲</span>
                             <div id="pot-contents" style="font-size: 0.9rem; margin-top: 0.5rem; color: #aaa;">
                                Arrastra ingredientes aquí
                             </div>
                        </div>
                        <button onclick="PANTRY_GAME.checkRecipe()" class="btn-primary" style="margin-top: 1rem;">🍳 ¡Cocinar Tag!</button>
                        <div id="pantry-feedback" style="margin-top: 1rem; font-weight: bold; min-height: 1.5rem;"></div>
                    </div>
                </div>
            </div>
        `;
    },

    allowDrop: function (ev) {
        ev.preventDefault();
    },

    drag: function (ev) {
        ev.dataTransfer.setData("text", ev.target.dataset.id);
    },

    drop: function (ev) {
        ev.preventDefault();
        const info = ev.dataTransfer.getData("text");
        if (!info) return;

        // Visual feedback
        this.addIngredientToPot(info);
    },

    addIngredientToPot: function (itemId) {
        if (this.state.potIngredients.includes(itemId)) return; // No duplicates for simplicity

        const currentLevel = this.levels[this.state.currentLevel];
        const item = currentLevel.pantry.find(i => i.id === itemId);

        this.state.potIngredients.push(itemId);

        // Update UI
        const contents = document.getElementById('pot-contents');
        if (this.state.potIngredients.length === 1) contents.innerHTML = ""; // clear placeholder

        contents.innerHTML += `<div style="background: rgba(0,0,0,0.5); padding: 2px 8px; margin: 2px; border-radius: 10px; display: inline-block;">${item.name}</div>`;
    },

    checkRecipe: function () {
        const currentLevel = this.levels[this.state.currentLevel];
        const feedback = document.getElementById('pantry-feedback');

        // Check for BAD ingredients first (Poison)
        const badItems = this.state.potIngredients.filter(id => {
            const item = currentLevel.pantry.find(p => p.id === id);
            return item.type === "bad";
        });

        if (badItems.length > 0) {
            const item = currentLevel.pantry.find(p => p.id === badItems[0]);
            feedback.innerText = `🤢 ¡Puaj! Has usado ${item.name}. ${item.reason}`;
            feedback.style.color = "#ef5350";
            this.shakePot();
            return;
        }

        // Check if ALL recipes are present
        const missing = currentLevel.recipe.filter(req => !this.state.potIngredients.includes(req));

        if (missing.length === 0) {
            feedback.innerText = "👨‍🍳 ¡Delicioso! Tag cocinado perfectamente.";
            feedback.style.color = "#66bb6a";
            // Next level delay
            setTimeout(() => {
                this.state.currentLevel++;
                this.loadLevel(this.state.currentLevel);
            }, 1500);
        } else {
            feedback.innerText = `⚠️ Faltan ingredientes: ${missing.join(", ")}`;
            feedback.style.color = "#ffa726";
            this.shakePot();
        }
    },

    shakePot: function () {
        const pot = document.getElementById('cooking-pot');
        pot.style.transform = "translateX(5px)";
        setTimeout(() => pot.style.transform = "translateX(-5px)", 50);
        setTimeout(() => pot.style.transform = "translateX(5px)", 100);
        setTimeout(() => pot.style.transform = "translateX(0)", 150);
    },

    endGame: function () {
        const container = document.getElementById(this.containerId);
        container.innerHTML = `
            <div style="padding: 2rem; background: rgba(0,0,0,0.2); border-radius: 8px; text-align: center;">
                <h3>👨‍🍳 ¡Chef de Datos!</h3>
                <p>Has aprendido que GTM solo puede cocinar lo que hay en la despensa (dataLayer).</p>
                <div style="font-size: 3rem; margin: 1rem;">🥘</div>
                <button onclick="PANTRY_GAME.init('${this.containerId}')" class="btn-secondary">Volver a cocinar</button>
            </div>
        `;
        // Award XP
        if (window.GameSystem) {
            window.GameSystem.addXP(250);
            window.GameSystem.unlockAchievement('data_chef');
        }
    }
};

window.PANTRY_GAME = PANTRY_GAME;
