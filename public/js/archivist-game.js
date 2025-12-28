
/**
 * The Archivist Game - Governance & Naming Convention
 * 
 * Mechanics:
 * - Speed sorting game
 * - Items appear with names
 * - Player must APPROVE (Keep) or REJECT (Trash) based on conventions
 * - Convention: Project - Tool - Action (e.g., "b2b - ga4 - lead")
 */

const ARCHIVIST_GAME = {
    state: {
        score: 0,
        mistakes: 0,
        currentCard: 0,
        isGameActive: false
    },

    cards: [
        { name: "Untitled Tag 1", type: "bad", reason: "Nombre genérico y sin significado." },
        { name: "Click Listener", type: "bad", reason: "Demasiado vago. ¿Click en qué?" },
        { name: "GA4 - Purchase", type: "good", reason: "Sigue convención: Herramienta - Acción." },
        { name: "visiondefunnel - ga4 - lead", type: "good", reason: "Perfecto: Proyecto - Herramienta - Acción." },
        { name: "Form Submit", type: "bad", reason: "¿Qué formulario? ¿A dónde va?" },
        { name: "Fb Pixel - PageView", type: "good", reason: "Claro y conciso." },
        { name: "test_final_v2_DEFINITIVO", type: "bad", reason: "Nunca uses 'final' o 'test' en producción." },
        { name: "Culleredo - Meta - Search", type: "good", reason: "Buena estructura de proyecto." }
    ],

    init: function (containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        this.state.score = 0;
        this.state.mistakes = 0;
        this.state.currentCard = 0;
        this.state.isGameActive = true;

        container.innerHTML = `
            <div class="archivist-board" style="text-align: center; position: relative;">
                <div class="stats-bar" style="display: flex; justify-content: space-between; margin-bottom: 2rem; padding: 1rem; background: rgba(0,0,0,0.2); border-radius: 8px;">
                    <span>📜 Documentos: <span id="archivist-progress">0/${this.cards.length}</span></span>
                    <span>⭐ Puntos: <span id="archivist-score">0</span></span>
                </div>

                <div id="card-area" style="height: 200px; display: flex; align-items: center; justify-content: center; margin-bottom: 2rem;">
                    <!-- Cards will appear here -->
                </div>

                <div class="controls" style="display: flex; gap: 2rem; justify-content: center;">
                    <button class="btn-reject" onclick="ARCHIVIST_GAME.handleDecision('bad')" style="background: #ef5350; color: white; padding: 1rem 2rem; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1.1rem; transition: transform 0.1s;">
                        🗑️ RECHAZAR
                    </button>
                    <button class="btn-approve" onclick="ARCHIVIST_GAME.handleDecision('good')" style="background: #66bb6a; color: white; padding: 1rem 2rem; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 1.1rem; transition: transform 0.1s;">
                        ✅ APROBAR
                    </button>
                </div>
                
                <div id="feedback-area" style="min-height: 3rem; margin-top: 1rem; font-weight: bold;"></div>
            </div>

            <style>
                .archivist-card {
                    background: white;
                    color: #333;
                    padding: 2rem;
                    border-radius: 4px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    width: 300px;
                    font-family: 'Courier New', monospace;
                    font-size: 1.2rem;
                    font-weight: bold;
                    transform: rotate(-1deg);
                    transition: all 0.3s ease;
                }
                .archivist-card.good-stamp {
                    border: 4px solid #66bb6a;
                    background: #e8f5e9;
                }
                .archivist-card.bad-stamp {
                    border: 4px solid #ef5350;
                    background: #ffebee;
                }
                .btn-reject:hover { background: #d32f2f !important; transform: scale(1.05); }
                .btn-approve:hover { background: #388e3c !important; transform: scale(1.05); }
            </style>
        `;

        this.showNextCard();
    },

    showNextCard: function () {
        if (this.state.currentCard >= this.cards.length) {
            this.endGame();
            return;
        }

        const card = this.cards[this.state.currentCard];
        const cardArea = document.getElementById('card-area');

        cardArea.innerHTML = `
            <div class="archivist-card" id="current-card">
                <div style="font-size: 0.8rem; color: #666; margin-bottom: 0.5rem;">TAG NAME:</div>
                ${card.name}
            </div>
        `;

        document.getElementById('archivist-progress').innerText = `${this.state.currentCard}/${this.cards.length}`;
    },

    handleDecision: function (decision) {
        if (!this.state.isGameActive) return;

        const currentCardData = this.cards[this.state.currentCard];
        const feedbackEl = document.getElementById('feedback-area');
        const cardEl = document.getElementById('current-card');

        // Logic
        const isCorrect = (decision === currentCardData.type);

        if (isCorrect) {
            this.state.score += 100;
            document.getElementById('archivist-score').innerText = this.state.score;
            feedbackEl.innerText = "¡Correcto! " + currentCardData.reason;
            feedbackEl.style.color = "#66bb6a";
            cardEl.classList.add(decision === 'good' ? 'good-stamp' : 'bad-stamp');

            // Sound effect placeholder
            // playSound('stamp');
        } else {
            this.state.mistakes++;
            feedbackEl.innerText = "❌ Error. " + currentCardData.reason;
            feedbackEl.style.color = "#ef5350";
            cardEl.style.transform = "rotate(5deg) scale(0.95)";
        }

        // Delay for next card
        this.state.isGameActive = false; // block input
        setTimeout(() => {
            this.state.currentCard++;
            this.state.isGameActive = true;
            this.showNextCard();
            feedbackEl.innerText = "";
        }, 1500);
    },

    endGame: function () {
        const container = document.querySelector('.archivist-board');
        const perfectScore = this.cards.length * 100;
        const finalScore = this.state.score;
        let message = "";

        if (finalScore === perfectScore) {
            message = "🏆 ¡PERFECTO! Eres un guardián del orden supremo.";
            // Add XP Reward
            if (window.GameSystem) window.GameSystem.addXP(300);
            if (window.GameSystem) window.GameSystem.unlockAchievement('archivist_master');
        } else if (finalScore > perfectScore / 2) {
            message = "✅ Aprobado. Tu contenedor sobrevivirá, pero vigila los detalles.";
            if (window.GameSystem) window.GameSystem.addXP(150);
        } else {
            message = "⚠️ Necesitas mejorar. Un contenedor desordenado es una bomba de tiempo.";
        }

        container.innerHTML = `
            <div style="padding: 2rem; background: rgba(0,0,0,0.2); border-radius: 8px;">
                <h3>📑 Auditoría finalizada</h3>
                <p style="font-size: 2rem; margin: 1rem 0;">Puntuación: ${finalScore}</p>
                <p style="font-size: 1.2rem; color: var(--primary);">${message}</p>
                <button onclick="ARCHIVIST_GAME.init('archivist-game-container')" class="btn-primary" style="margin-top: 1rem;">🔄 Reintentar</button>
            </div>
        `;
    }
};

// Expose to window
window.ARCHIVIST_GAME = ARCHIVIST_GAME;
