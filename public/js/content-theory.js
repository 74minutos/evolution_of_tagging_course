/**
 * Contenido teórico extraído de las presentaciones GTM I y GTM II
 * Para integrar entre los capítulos del juego
 */

const theoryContent = {
    // Antes del Capítulo 1
    intro: {
        title: "Arquitectura de Datos & GTM",
        slides: [
            {
                title: "El Problema: Caos en la Recolección",
                content: `
                    <blockquote class="theory-quote">
                        "Sin una capa de gestión, el marketing digital se convierte en una deuda técnica insostenible."
                    </blockquote>
                    <div class="theory-grid">
                        <div class="theory-card-item">
                            <h4>❌ Dependencia Técnica</h4>
                            <p>Cada pixel de Facebook requiere un ticket a IT. Semanas de espera para validar una campaña.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>❌ Datos Silados</h4>
                            <p>Analytics mide una cosa, Ads otra, y el CRM otra. Nadie confía en los números.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>❌ Fragilidad</h4>
                            <p>Un cambio en el diseño de la web rompe el tracking de conversiones. Pérdida de dinero real.</p>
                        </div>
                    </div>
                `,
                image: null
            },
            {
                title: "La Solución: Tag Management System (TMS)",
                content: `
                    <p>Un TMS actúa como un <strong>sistema operativo</strong> para tus herramientas de marketing.</p>
                    
                    <div class="theory-grid">
                        <div class="theory-card-item">
                            <h4>🚀 Autonomía Operativa</h4>
                            <p>Marketing gobierna sus propias herramientas. IT gobierna la estabilidad de la web.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>🛡️ Gobernanza de Datos</h4>
                            <p>Decidimos <em>qué</em> enviar y <em>a quién</em> desde un único punto de control.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>⚡ Performance</h4>
                            <p>Carga asíncrona inteligente. Tu web no se bloquea por scripts de terceros.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>🔒 Privacidad (RGPD)</h4>
                            <p>Bloqueo centralizado de cookies antes de que se disparen. Compliance real.</p>
                        </div>
                    </div>
                `,
                image: null
            },
            {
                title: "Arquitectura de Implementación",
                content: `
                    <h3>Head & Body: La Puerta de Entrada</h3>
                    <div class="highlight-box" style="padding: 1.5rem; margin-top: 1rem;">
                        <ul class="theory-list">
                            <li><strong>Script HEAD:</strong> El motor principal. Carga la librería <code>gtm.js</code>. Debe ir lo más alto posible para capturar eventos tempranos.</li>
                            <li><strong>Noscript BODY:</strong> (Legacy) Un iframe de fallback para navegadores sin JS. Hoy día es marginal, pero clave para verificar propiedad en Search Console.</li>
                        </ul>
                    </div>
                    <p style="margin-top: 1.5rem; font-size: 0.9em; opacity: 0.8;">
                        ⚠️ <strong>Nota Arquitectónica:</strong> GTM no es "poner código". Es inyectar una aplicación JS completa dentro de tu web. Debe tratarse con el respeto de una aplicación de software.
                    </p>
                `,
                image: null
            }
        ],
        notes: "Fundamentos arquitectónicos para Producto y Marketing"
    },

    // Después del Capítulo 1
    afterChapter1: {
        title: "Los 3 Pilares de la Arquitectura",
        slides: [
            {
                title: "1. Tags (La Acción)",
                content: `
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <span style="font-size: 3rem;">🏷️</span>
                        <h3>Tags = "Vendors"</h3>
                    </div>
                    <blockquote class="theory-quote">
                        "Un Tag es simplemente el mensajero. Es la instrucción final que se envía a un proveedor externo."
                    </blockquote>
                    <div class="theory-grid">
                        <div class="theory-card-item">
                            <h4>Media Vendors</h4>
                            <p>Meta Pixel, TikTok, LinkedIn Insights, Google Ads Conversion.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>Analytics</h4>
                            <p>Google Analytics 4 (GA4), Mixpanel, Amplitude, Hotjar.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>Utility</h4>
                            <p>Chatbots, Popups de consentimiento (Cookiebot/OneTrust).</p>
                        </div>
                    </div>
                `,
                image: null
            },
            {
                title: "2. Triggers (La Regla)",
                content: `
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <span style="font-size: 3rem;">⚡</span>
                        <h3>Triggers = "Lógica de Negocio"</h3>
                    </div>
                    <p>Definen <strong>CUÁNDO</strong> debe ocurrir una acción. Es donde reside la lógica.</p>
                    
                    <div class="theory-code-block">
                        SI (Evento == 'purchase') Y (Valor > 0)<br>
                        ENTONCES -> Dispara 'Meta Purchase Tag'
                    </div>
                    
                    <ul class="theory-list" style="margin-top: 2rem;">
                        <li><strong>Pageview:</strong> Cargas de URL (básico).</li>
                        <li><strong>Interacción:</strong> Clicks, Scroll, Video, Envíos de Formulario.</li>
                        <li><strong>Custom Events:</strong> Eventos de negocio (ej: 'loan_approved', 'user_subscribed').</li>
                    </ul>
                `,
                image: null
            },
            {
                title: "3. Variables (El Contexto)",
                content: `
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <span style="font-size: 3rem;">📦</span>
                        <h3>Variables = "Datos"</h3>
                    </div>
                     <blockquote class="theory-quote">
                        "Un evento sin contexto es ruido. Las variables aportan el contexto."
                    </blockquote>
                    
                    <div class="theory-grid">
                        <div class="theory-card-item">
                            <h4>Contexto de Página</h4>
                            <p>URL, Título, Referrer, Hostname.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>Contexto de Usuario</h4>
                            <p>User ID, Tipo de cliente (VIP/Free), Estado de Login.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>Contexto de Evento</h4>
                            <p>Valor de compra, ID de transacción, Nombre del producto clickeado.</p>
                        </div>
                    </div>
                `,
                image: null
            }
        ],
        notes: "Dominar estos 3 conceptos es dominar el 90% de GTM"
    },

    // Después del Capítulo 2
    afterChapter2: {
        title: "DataLayer: La API de la Web",
        slides: [
            {
                title: "¿Qué es realmente el DataLayer?",
                content: `
                    <blockquote class="theory-quote">
                        "El DataLayer es un contrato. Es una capa de abstracción entre tu web y tus herramientas de marketing."
                    </blockquote>
                    <p>No es una herramienta de Google. Es un estándar de la industria (W3C standard basado en Arrays).</p>
                    
                    <div class="highlight-box" style="padding: 1.5rem; margin-top: 1.5rem;">
                        <strong>💎 El cambio de mentalidad:</strong>
                        <p style="margin-top: 0.5rem;">En lugar de que Marketing "rasque" datos del DOM (HTML) usando selectores CSS frágiles...</p>
                        <p>...Desarrollo "expone" datos limpios y estructurados en el DataLayer.</p>
                    </div>
                `,
                image: null
            },
            {
                title: "Arquitectura de Eventos",
                content: `
                    <h3>Anatomía de un .push() perfecto</h3>
                    <div class="theory-code-block">
dataLayer.push({
  'event': 'purchase_completed',  // 1. Qué pasó (Verbo)
  'ecommerce': {                  // 2. Contexto (Objeto)
    'currency': 'EUR',
    'value': 120.00,
    'items': [...]
  },
  'user_type': 'premium',        // 3. Dimensiones de Negocio
  'method': 'credit_card'
});
                    </div>
                    <ul class="theory-list">
                        <li><strong>Event Name:</strong> Agnóstico a la herramienta. No uses 'ga4_purchase'. Usa 'purchase'.</li>
                        <li><strong>Structure:</strong> Sigue estándares (GA4 Ecommerce schema es el estándar de facto).</li>
                        <li><strong>Timing:</strong> El push debe ocurrir en el momento exacto, ni antes ni después.</li>
                    </ul>
                `,
                image: null
            }
        ],
        notes: "El DataLayer es el activo más valioso de la analítica moderna"
    },

    // Después del Capítulo 3
    afterChapter3: {
        title: "Gobernanza y Escalar",
        slides: [
            {
                title: "De Sandbox a Enterprise",
                content: `
                    <p>Cuando tienes 10 tags, todo es fácil. Cuando tienes 500, necesitas leyes.</p>
                    
                    <div class="theory-grid">
                        <div class="theory-card-item">
                            <h4>Naming Conventions</h4>
                            <p><code>Plataforma - Tipo - Detalle</code></p>
                            <p style="font-size:0.8em; margin-top:0.5rem; color:var(--primary);">GA4 - Event - Purchase<br>Meta - Pixel - PageView</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>Workspaces</h4>
                            <p>Nunca trabajes en la versión Default. Crea ramas personales (como en Git) para cada feature.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>Clean Up</h4>
                            <p>Auditoría trimestral. Tag pausado por >3 meses = Tag eliminado.</p>
                        </div>
                    </div>
                `,
                image: null
            },
            {
                title: "El Ciclo de Vida del Dato",
                content: `
                    <h3>Workflow Profesional</h3>
                    <ol class="theory-list" style="line-height: 2;">
                        <li><strong>Diseño:</strong> Definir el DataLayer Schema (Confluence/Notion).</li>
                        <li><strong>Implementación (IT):</strong> Dev añade dataLayer.push() en código.</li>
                        <li><strong>Validación (QA):</strong> Usar GTM Preview para verificar datos entrantes.</li>
                        <li><strong>Configuración (MKT):</strong> Crear Tags/Triggers en GTM.</li>
                        <li><strong>Publicación:</strong> Versionado y Publish.</li>
                    </ol>
                `,
                image: null
            }
        ],
        notes: "La diferencia entre un amateur y un pro es el orden"
    },

    // Conceptos avanzados
    advanced: {
        title: "Next Level: Server-Side & Privacy",
        slides: [
            {
                title: "Server-Side Tagging (sGTM)",
                content: `
                    <blockquote class="theory-quote">
                        "Mover la lógica del navegador del usuario a tu propio servidor."
                    </blockquote>
                    <div class="theory-grid">
                        <div class="theory-card-item">
                            <h4>🍪 Cookies 1st Party</h4>
                            <p>Extiende la vida de las cookies en Safari (ITP) de 7 días a 2 años.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>🕵️‍♂️ Data Control</h4>
                            <p>Limpia datos PII (emails, IPs) antes de enviarlos a Google/Facebook.</p>
                        </div>
                        <div class="theory-card-item">
                            <h4>🚀 Site Speed</h4>
                            <p>Carga 1 script (GTM Web) en lugar de 50 pixels de terceros.</p>
                        </div>
                    </div>
                `,
                image: null
            }
        ],
        notes: "El futuro de la medición es Server-Side"
    },

    // Recursos
    resources: {
        title: "Recursos y Referencias",
        links: [
            {
                title: "📖 Analytics Mania",
                url: "https://www.analyticsmania.com/",
                description: "La biblia práctica de GTM."
            },
            {
                title: "🛠️ Simo Ahava",
                url: "https://www.simoahava.com/",
                description: "Conceptos técnicos avanzados y Templates."
            },
            {
                title: "⚡ GA4spy.com",
                url: "https://ga4spy.com",
                description: "Herramienta rápida para debuggear eventos GA4."
            }
        ]
    }
};

// Export for use in the main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = theoryContent;
}



// ========== BLOQUE 2 THEORY CONTENT ==========

theoryContent.afterBloque2Part1 = {
    title: "🏛️ Los 3 Pilares de GTM",
    slides: [
        {
            title: "Tags (Etiquetas)",
            content: `
                <h3>🏷️ ¿Qué es un Tag?</h3>
                <p>Un <strong>tag</strong> es un fragmento de código que se ejecuta cuando se cumplen ciertas condiciones.</p>
                
                <div class="theory-grid">
                    <div class="theory-card-item">
                        <h4>Google Analytics 4</h4>
                        <p>Envía eventos de seguimiento y medición</p>
                    </div>
                    <div class="theory-card-item">
                        <h4>Google Ads</h4>
                        <p>Conversiones y remarketing</p>
                    </div>
                     <div class="theory-card-item">
                        <h4>Meta Pixel</h4>
                        <p>Tracking de Facebook/Instagram</p>
                    </div>
                </div>
                
                <div class="highlight-box" style="margin-top: 1.5rem; padding: 1.5rem;">
                    <p><strong>💡 Analogía:</strong> Los tags son como <em>acciones</em> que ejecuta GTM.</p>
                    <p>Si GTM fuera una orquesta, los tags serían los instrumentos que suenan.</p>
                </div>
            `
        },
        {
            title: "Triggers (Activadores)",
            content: `
                <h3>🎯 ¿Qué es un Trigger?</h3>
                <p>Un <strong>trigger</strong> define <strong>cuándo</strong> debe dispararse un tag.</p>
                
                <ul class="theory-list">
                    <li><strong>Pageview:</strong> Cuando se carga una página</li>
                    <li><strong>Click:</strong> Cuando se hace clic en un elemento</li>
                    <li><strong>Custom Event:</strong> Cuando se lanza un evento personalizado</li>
                    <li><strong>Form Submission:</strong> Cuando se envía un formulario</li>
                </ul>
                
                <div class="highlight-box" style="margin-top: 1.5rem; padding: 1.5rem;">
                    <p><strong>💡 Analogía:</strong> Los triggers son las <em>condiciones</em>.</p>
                    <p>Son como decir: "Cuando pase X, entonces ejecuta Y".</p>
                </div>
            `
        },
        {
            title: "Variables",
            content: `
                <h3>📦 ¿Qué es una Variable?</h3>
                <p>Una <strong>variable</strong> almacena información que se usa en tags y triggers.</p>
                
                <div class="theory-grid">
                    <div class="theory-card-item">
                        <h4>Built-in</h4>
                        <p>Page URL, Click URL, Referrer...</p>
                    </div>
                    <div class="theory-card-item">
                        <h4>Data Layer</h4>
                        <p>Valores del dataLayer</p>
                    </div>
                     <div class="theory-card-item">
                        <h4>JavaScript</h4>
                        <p>Resultado de código JS custom</p>
                    </div>
                </div>
                
                <div class="highlight-box" style="margin-top: 1.5rem; padding: 1.5rem;">
                    <p><strong>💡 Analogía:</strong> Las variables son la <em>memoria</em> de GTM.</p>
                    <p>Guardan información temporal para usar en tags.</p>
                </div>
            `
        },
        {
            title: "Cómo Trabajan Juntos",
            content: `
                <h3>🔄 El Flujo Completo</h3>
                <div style="padding: 1.5rem; border: 1px solid var(--outline); border-radius: var(--radius-md); margin: 1.5rem 0;">
                    <ol class="theory-list" style="font-size: 1.1rem; line-height: 2;">
                        <li><strong>Evento:</strong> Usuario hace clic en "Comprar" 🖱️</li>
                        <li><strong>Variable:</strong> GTM captura el precio del producto 📦</li>
                        <li><strong>Trigger:</strong> Se cumple la condición "purchase" 🎯</li>
                        <li><strong>Tag:</strong> Se envía el evento a GA4 🚀</li>
                    </ol>
                </div>
                
                <h4>Ejemplo práctico:</h4>
                <div class="theory-code-block">
dataLayer.push({
  event: 'purchase',
  transaction_id: 'TXN-123',
  value: 99.99
})

// Variable: {{transaction_id}}
// Trigger: Custom Event = "purchase"
// Tag: GA4 Event con parámetro transaction_id
                </div>
            `
        }
    ]
};

theoryContent.dataLayer = {
    title: "📊 Data Layer Profundo",
    slides: [
        {
            title: "¿Qué es el Data Layer?",
            content: `
                <h3>🧠 Data Layer: La Memoria de GTM</h3>
                <p>El <strong>dataLayer</strong> es un objeto JavaScript que almacena información estructurada sobre la página y las interacciones del usuario.</p>
                
                <ul class="theory-list">
                    <li>✅ <strong>Desacopla</strong> la lógica de negocio del tracking</li>
                    <li>✅ <strong>Centraliza</strong> toda la información en un solo lugar</li>
                    <li>✅ <strong>Estandariza</strong> el formato de los datos</li>
                    <li>✅ <strong>Facilita</strong> la escalabilidad y mantenimiento</li>
                </ul>
                
                <div class="highlight-box" style="padding: 1.5rem; margin-top: 1rem;">
                    <p><strong>💡 Sin dataLayer:</strong> Los equipos de desarrollo implementan tags directamente.</p>
                    <p><strong>✅ Con dataLayer:</strong> Los desarrolladores solo pushean eventos, GTM los escucha.</p>
                </div>
            `
        },
        {
            title: "Estructura del Data Layer",
            content: `
                <h3>📐 Anatomía de un Push</h3>
                <div class="theory-code-block">
dataLayer.push({
  event: 'nombre_del_evento',      // Obligatorio
  parametro1: 'valor1',            // Contexto
  parametro2: 123,                 // Puede ser string...
  objeto_anidado: {
    key: 'value'
  }
})
                </div>
                
                <h4>Reglas de oro:</h4>
                <ul class="theory-list">
                    <li><strong>event:</strong> Siempre en minúsculas y snake_case</li>
                    <li><strong>Consistencia:</strong> Usa siempre los mismos nombres</li>
                    <li><strong>Claridad:</strong> Nombres descriptivos (<code>product_id</code> mejor que <code>pid</code>)</li>
                    <li><strong>Documentación:</strong> Mantén un schema actualizado</li>
                </ul>
            `
        },
        {
            title: "Eventos Comunes",
            content: `
                <h3>🎯 Eventos Más Usados</h3>
                <div class="theory-grid">
                    <div class="theory-card-item">
                        <h4>E-commerce</h4>
                        <ul class="theory-list" style="margin-top:0.5rem; font-size:0.9em;">
                            <li>view_item</li>
                            <li>add_to_cart</li>
                            <li>begin_checkout</li>
                            <li>purchase</li>
                        </ul>
                    </div>
                    <div class="theory-card-item">
                        <h4>Lead Gen</h4>
                        <ul class="theory-list" style="margin-top:0.5rem; font-size:0.9em;">
                             <li>form_start</li>
                            <li>form_submit</li>
                            <li>lead_generated</li>
                        </ul>
                    </div>
                    <div class="theory-card-item">
                        <h4>Engagement</h4>
                        <ul class="theory-list" style="margin-top:0.5rem; font-size:0.9em;">
                             <li>video_play</li>
                            <li>scroll_depth</li>
                            <li>file_download</li>
                        </ul>
                    </div>
                </div>
            `
        }
    ]
};

theoryContent.variables = {
    title: "🧩 Guía Completa de Variables",
    slides: [
        {
            title: "Variables: La Memoria de GTM",
            content: `
                <h3>🧩 ¿Qué son las Variables?</h3>
                <p>Las variables en GTM son <strong>contenedores de información</strong> que se pueden reutilizar en múltiples tags y triggers.</p>
                
                <div class="highlight-box" style="padding: 1.5rem; margin-top: 1rem;">
                    <p><strong>Ejemplo:</strong> En lugar de escribir <code>document.location.pathname</code> en cada tag,</p>
                    <p>Creas una variable <code>{{Page Path}}</code> y la usas donde necesites.</p>
                </div>
            `
        },
        {
            title: "Tipos de Variables",
            content: `
                <h3>📚 Categorías de Variables</h3>
                
                <div class="theory-grid">
                    <div class="theory-card-item">
                         <h4>Built-in (Integradas)</h4>
                         <p style="font-size:0.9em;">Page URL, Page Path, Click URL, Click Element. Vienen "de fábrica".</p>
                    </div>
                    
                    <div class="theory-card-item">
                         <h4>Data Layer</h4>
                         <p style="font-size:0.9em;">Extraen valores específicos pusheados al dataLayer.</p>
                    </div>
                    
                    <div class="theory-card-item">
                         <h4>JavaScript</h4>
                         <p style="font-size:0.9em;">Funciones custom para lógica compleja.</p>
                    </div>
                </div>
                
                <div class="theory-code-block" style="margin-top:1.5rem;">
// dataLayer
{ event: 'purchase', transaction_id: 'TXN-123' }

// Variable GTM 'DL - Transaction ID'
Valor: "TXN-123"
                </div>
            `
        },
        {
            title: "Cómo Crear Variables",
            content: `
                <h3>🛠️ Crear una Variable Data Layer</h3>
                <ol class="theory-list" style="line-height: 2;">
                    <li>Ve a <strong>Variables → Nueva</strong></li>
                    <li>Elige <strong>Tipo: Data Layer Variable</strong></li>
                    <li>Nombre de la variable del Data Layer: <code>transaction_id</code></li>
                    <li>Guarda y dale un nombre: <code>DL - Transaction ID</code></li>
                </ol>
                
                <div class="highlight-box" style="padding: 1.5rem; margin-top:1rem;">
                    <strong>💡 Convención de nombres:</strong>
                    <ul class="theory-list" style="margin-top:0.5rem">
                        <li><code>DL -</code> para Data Layer variables</li>
                        <li><code>JS -</code> para JavaScript variables</li>
                        <li><code>CONST -</code> para constantes</li>
                    </ul>
                </div>
            `
        },
        {
            title: "Variables en Triggers",
            content: `
                <h3>🎯 Usando Variables en Condiciones</h3>
                <p>Las variables son especialmente útiles en <strong>condiciones de triggers</strong>.</p>
                
                <div class="theory-grid">
                    <div class="theory-card-item">
                        <h4>Ejemplo 1: Precio Alto</h4>
                        <p style="font-size:0.9em"><strong>Trigger:</strong> add_to_cart<br><strong>Condición:</strong> {{DL - Price}} > 100</p>
                    </div>
                     <div class="theory-card-item">
                        <h4>Ejemplo 2: Checkout</h4>
                        <p style="font-size:0.9em"><strong>Trigger:</strong> Pageview<br><strong>Condición:</strong> {{Page Path}} contains "/checkout/"</p>
                    </div>
                </div>
                
                <p style="margin-top: 2rem;">Las variables hacen que tus triggers sean <strong>dinámicos y precisos</strong>.</p>
            `
        }
    ]
};

// ========== BLOQUE 1 THEORY CONTENT ==========

theoryContent.gtmDefinition = {
    title: "📚 ¿Qué es GTM?",
    slides: [
        {
            title: "La analogía del traductor",
            content: `
                <h3>🌐 GTM: El traductor universal del tracking</h3>
                <p>Imagina que tienes 5 amigos que hablan idiomas diferentes (Analytics, FB Pixel, TikTok, LinkedIn...).</p>
                
                <p>Sin GTM, necesitas aprender a hablar con cada uno en su idioma.</p>
                
                <p><strong>Con GTM:</strong> Hablas UN solo idioma (eventos del dataLayer), y GTM se encarga de traducir y enviar el mensaje a todos.</p>
            `
        },
        {
            title: "¿Por qué existe GTM?",
            content: `
                <h3>🔥 El problema que resuelve</h3>
                
                <div class="theory-grid">
                    <div class="theory-card-item">
                        <h4>Antes de GTM</h4>
                        <ul class="theory-list" style="font-size:0.9em">
                            <li>Marketing dependía 100% de IT</li>
                            <li>Pixels hardcodeados</li>
                            <li>Riesgo de romper la web</li>
                        </ul>
                    </div>
                    <div class="theory-card-item">
                        <h4>Con GTM</h4>
                         <ul class="theory-list" style="font-size:0.9em">
                            <li>Autonomía para Marketing</li>
                            <li>Un solo script</li>
                            <li>Preview mode seguro</li>
                        </ul>
                    </div>
                </div>
            `
        },
        {
            title: "Casos de uso reales",
            content: `
                 <h3>🎯 ¿Cuándo usar GTM?</h3>
                 
                 <div class="theory-grid">
                     <div class="theory-card-item">
                         <h4>✅ Perfecto para:</h4>
                         <ul class="theory-list" style="font-size:0.9em">
                             <li>E-commerce (ventas, carritos)</li>
                             <li>Lead gen (formularios)</li>
                             <li>Media (campañas de pago)</li>
                         </ul>
                     </div>
                      <div class="theory-card-item">
                         <h4>❌ No usar para:</h4>
                         <ul class="theory-list" style="font-size:0.9em">
                             <li>Modificar contenido visual</li>
                             <li>Lógica de negocio crítica</li>
                             <li>A/B Testing complejo</li>
                         </ul>
                     </div>
                 </div>
             `
        }
    ]
};

theoryContent.gtmEcosystem = {
    title: "🌍 GTM en el ecosistema digital",
    slides: [
        {
            title: "Los tipos de GTM",
            content: `
                <h3>📦 GTM tiene 3 sabores</h3>
                
                <div class="theory-grid">
                    <div class="theory-card-item">
                        <h4>🌐 GTM Web</h4>
                        <p>El estándar. Para webs, e-commerce, blogs.</p>
                    </div>
                    <div class="theory-card-item">
                        <h4>📱 GTM Mobile</h4>
                        <p>Para apps nativas iOS y Android.</p>
                    </div>
                    <div class="theory-card-item">
                        <h4>🖥️ GTM Server-side</h4>
                        <p>El futuro. Privacidad, clean data, y bypass de adblockers.</p>
                    </div>
                </div>
            `
        },
        {
            title: "Cómo se implementa",
            content: `
                <h3>🛠️ Los 3 pasos de implementación</h3>
                
                <div class="theory-grid">
                    <div class="theory-card-item">
                         <h4>1️⃣ Crear Contenedor</h4>
                         <p>Obtén tu ID único <code>GTM-XXXXXXX</code>.</p>
                    </div>
                    <div class="theory-card-item">
                         <h4>2️⃣ Instalar Código</h4>
                         <p>Snippet en HEAD y snippet en BODY.</p>
                    </div>
                    <div class="theory-card-item">
                         <h4>3️⃣ Publicar</h4>
                         <p>Configura tags y dale a Publish.</p>
                    </div>
                </div>
                
                <div class="highlight-box" style="margin-top:1.5rem; padding:1.5rem;">
                    <p><strong>⚠️ Regla de oro:</strong> El dataLayer SIEMPRE va antes del script de GTM.</p>
                </div>
            `
        }
    ]
};

theoryContent.gtmBenefits = {
    title: "🚀 Beneficios estratégicos",
    slides: [
        {
            title: "Autonomía",
            content: `
                <h3>🦸 Independencia de desarrollo</h3>
                <p>Antes: Ticket a IT -> Esperar 2 semanas -> Deploy.</p>
                <p><strong>Ahora:</strong> Entras a GTM -> Creas el Tag -> Preview -> Publish.</p>
                
                <div class="highlight-box" style="margin-top:1.5rem; padding:1.5rem;">
                    <p><strong>💡 Resultado:</strong> Marketing puede iterar rápido sin bloqueos.</p>
                </div>
            `
        },
        {
            title: "Control y Gobernanza",
            content: `
                <h3>👑 El poder de la centralización</h3>
                <div class="theory-grid">
                    <div class="theory-card-item">
                        <h4>Sin GTM</h4>
                        <p>Scripts perdidos, nadie sabe qué trackea qué.</p>
                    </div>
                    <div class="theory-card-item">
                        <h4>Con GTM</h4>
                        <p>Inventario centralizado, versiones, y control de acceso.</p>
                    </div>
                </div>
            `
        },
        {
            title: "Estrategia y Performance",
            content: `
                <h3>⚡ Velocidad y Optimización</h3>
                <ul class="theory-list">
                    <li><strong>Carga Asíncrona:</strong> No bloquea la web.</li>
                    <li><strong>Sandboxing:</strong> Los scripts de terceros están contenidos.</li>
                    <li><strong>Debug fácil:</strong> Preview mode para arreglar antes de romper.</li>
                </ul>
            `
        }
    ]
};

