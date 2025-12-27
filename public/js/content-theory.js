/**
 * Contenido teórico extraído de las presentaciones GTM I y GTM II
 * Para integrar entre los capítulos del juego
 */

const theoryContent = {
    // Antes del Capítulo 1
    intro: {
        title: "¿Qué es un Tag Manager?",
        slides: [
            {
                title: "Definición",
                content: `
                    <blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; font-style: italic; margin: 1.5rem 0;">
                        "Un tag manager (o gestor de etiquetas) es una herramienta que nos permite simplificar 
                        la inserción de scripts, código HTML y JS, y de otras herramientas en un sitio web, 
                        generalmente con propósitos de marketing"
                    </blockquote>
                `,
                image: null
            },
            {
                title: "¿Por qué es importante un TMS?",
                content: `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                        <div style="padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <h4>🚀 Autonomía</h4>
                            <p>Mayor control del equipo de marketing/analítica sobre sus herramientas</p>
                        </div>
                        <div style="padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <h4>⚡ Rapidez</h4>
                            <p>En lugar de implementar X scripts en cada página, solo implementamos 1</p>
                        </div>
                        <div style="padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <h4>🔒 Seguridad</h4>
                            <p>Evita dependencias con el equipo técnico</p>
                        </div>
                        <div style="padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <h4>🧪 Testing</h4>
                            <p>Previsualizamos cambios en entorno de pruebas simulado antes de publicar</p>
                        </div>
                        <div style="padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <h4>📊 Robustez</h4>
                            <p>Mayor calidad y consistencia en los datos</p>
                        </div>
                        <div style="padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <h4>⏰ Ahorro</h4>
                            <p>Simplifica y ahorra tiempo en el mantenimiento de las herramientas</p>
                        </div>
                    </div>
                `,
                image: null
            },
            {
                title: "Instalación de GTM",
                content: `
                    <h3>Dos bloques de código</h3>
                    <div style="background: #f5f5f5; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
                        <p><strong>1. HEAD</strong> - La instalación "real" de GTM</p>
                        <p><strong>2. BODY</strong> - Backup si JavaScript no está activado</p>
                    </div>
                    <p style="margin-top: 1rem;">
                        ⚠️ <strong>Importante:</strong> Ambos códigos son necesarios para garantizar 
                        que GTM funcione en todos los escenarios posibles.
                    </p>
                `,
                image: null
            }
        ],
        notes: "Introducción fundamental antes de empezar el viaje"
    },

    // Después del Capítulo 1
    afterChapter1: {
        title: "Los 3 Pilares de GTM",
        slides: [
            {
                title: "1. Etiquetas (Tags)",
                content: `
                    <div style="text-align: center; padding: 2rem 0;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🏷️</div>
                        <h3>Tags</h3>
                    </div>
                    <blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; font-style: italic;">
                        "Una etiqueta es un fragmento de código que se ejecuta en una página o aplicación móvil. 
                        Las etiquetas pueden servir para muchas cosas, pero la mayoría están diseñadas para 
                        enviar información de medición de su sitio a un tercero."
                    </blockquote>
                    <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                        <strong>Ejemplos comunes:</strong>
                        <ul style="margin-top: 0.5rem;">
                            <li>Etiqueta de Google Analytics 4</li>
                            <li>Etiqueta de conversión de Google Ads</li>
                            <li>Meta Pixel (Facebook)</li>
                            <li>Hotjar, Clarity, etc.</li>
                        </ul>
                    </div>
                `,
                image: null
            },
            {
                title: "2. Activadores (Triggers)",
                content: `
                    <div style="text-align: center; padding: 2rem 0;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">⚡</div>
                        <h3>Triggers</h3>
                    </div>
                    <blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; font-style: italic;">
                        "Las etiquetas se activan en función de eventos, como el envío de un formulario 
                        o la reproducción de un vídeo. Los activadores escuchan estos eventos y determinan 
                        cuándo se activa o se bloquea una etiqueta."
                    </blockquote>
                    <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                        <strong>Tipos más comunes:</strong>
                        <ul style="margin-top: 0.5rem;">
                            <li><strong>PageView</strong> - Al cargar una página</li>
                            <li><strong>Custom Event</strong> - Eventos personalizados del dataLayer</li>
                            <li><strong>Form Submission</strong> - Al enviar un formulario</li>
                            <li><strong>Click</strong> - Al hacer clic en elementos</li>
                        </ul>
                    </div>
                `,
                image: null
            },
            {
                title: "3. Variables",
                content: `
                    <div style="text-align: center; padding: 2rem 0;">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📦</div>
                        <h3>Variables</h3>
                    </div>
                    <blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; font-style: italic;">
                        "Las variables se utilizan como una función de ayuda donde se almacena cierta información 
                        que tus etiquetas, disparadores y otras variables pueden invocar para recuperar ese valor 
                        en concreto. La idea es muy similar al concepto de variables dentro de lenguajes de programación."
                    </blockquote>
                    <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                        <strong>Tipos más utilizados:</strong>
                        <ul style="margin-top: 0.5rem;">
                            <li><strong>DataLayer Variable</strong> - Lee valores del dataLayer</li>
                            <li><strong>Custom Javascript</strong> - Ejecuta código JS personalizado</li>
                            <li><strong>1st Party Cookie</strong> - Lee cookies del navegador</li>
                            <li><strong>Constant</strong> - Valores fijos (IDs, URLs, etc.)</li>
                        </ul>
                    </div>
                `,
                image: null
            }
        ],
        notes: "Los 3 componentes fundamentales que necesitas dominar"
    },

    // Después del Capítulo 2
    afterChapter2: {
        title: "El DataLayer: Tu Despensa de Datos",
        slides: [
            {
                title: "¿Qué es el DataLayer?",
                content: `
                    <blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; font-style: italic;">
                        "El data layer es un objeto que contiene toda la información que quieres transferir 
                        a Google Tag Manager, y puedes utilizarla para transferir información como eventos o variables"
                    </blockquote>
                    <p style="margin-top: 1.5rem; font-size: 1.1rem;">
                        Piensa en el Data Layer como <strong>una despensa de información que está totalmente 
                        alineada con los objetivos del negocio</strong>.
                    </p>
                `,
                image: null
            },
            {
                title: "¿Por qué es importante?",
                content: `
                    <div style="padding: 1.5rem; background: rgba(78, 205, 196, 0.15); border-radius: 8px; margin: 1rem 0;">
                        <p style="font-size: 1.1rem;">
                            El Data Layer nos permite extraer la información útil para nuestro negocio 
                            de manera programática a través de GTM.
                        </p>
                    </div>
                    <p style="margin-top: 1.5rem;">
                        Esto hace que sea <strong>extremadamente sencillo enviar esa información relevante</strong> 
                        a las plataformas que más nos interesen:
                    </p>
                    <ul style="margin-top: 1rem; font-size: 1.05rem;">
                        <li>📊 Google Analytics 4</li>
                        <li>📢 Google Ads</li>
                        <li>📱 Meta (Facebook / Instagram)</li>
                        <li>🎯 Cualquier otra plataforma de marketing</li>
                    </ul>
                `,
                image: null
            },
            {
                title: "Ejemplo Práctico",
                content: `
                    <h3>Enviando un evento de compra</h3>
                    <div style="background: #282c34; color: #abb2bf; padding: 1.5rem; border-radius: 8px; font-family: 'Courier New', monospace; margin: 1rem 0;">
                        <pre style="margin: 0; color: #abb2bf;">dataLayer.push({
  'event': 'purchase',
  'ecommerce': {
    'transaction_id': 'T12345',
    'value': 99.90,
    'currency': 'EUR',
    'items': [{
      'item_name': 'Curso GTM',
      'price': 99.90,
      'quantity': 1
    }]
  }
});</pre>
                    </div>
                    <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                        <p><strong>✅ Con esto conseguimos:</strong></p>
                        <ul>
                            <li>Datos consistentes en todas las plataformas</li>
                            <li>Fácil de debuggear y testear</li>
                            <li>Desacoplado de la implementación técnica</li>
                        </ul>
                    </div>
                `,
                image: null
            }
        ],
        notes: "El DataLayer es el corazón de una implementación profesional"
    },

    // Después del Capítulo 3
    afterChapter3: {
        title: "Mejores Prácticas y Gobernanza",
        slides: [
            {
                title: "Contenedores y Áreas de Trabajo",
                content: `
                    <div style="margin: 1.5rem 0;">
                        <h4 style="color: var(--primary);">🗃️ Contenedor</h4>
                        <p>
                            Un contenedor es el espacio que creamos dentro de GTM para lanzar distintas etiquetas. 
                            Cada contenedor tiene un <strong>ID único</strong> (GTM-XXXXXX) que asocia todas las 
                            órdenes configuradas.
                        </p>
                    </div>
                    <div style="margin: 1.5rem 0;">
                        <h4 style="color: var(--primary);">📂 Áreas de Trabajo</h4>
                        <p>
                            Te permiten crear versiones de tu contenedor. El contenedor final es el "barco" donde 
                            transportamos la información, y las áreas de trabajo son las diferentes cargas que las 
                            navieras (equipos) quieren introducir.
                        </p>
                    </div>
                    <div style="padding: 1rem; background: rgba(255, 193, 7, 0.15); border-left: 4px solid #ffc107; margin-top: 1.5rem;">
                        <strong>⚠️ Importante:</strong> Puede haber múltiples equipos trabajando simultáneamente 
                        en diferentes workspaces.
                    </div>
                `,
                image: null
            },
            {
                title: "Workflow Profesional",
                content: `
                    <h3>Flujo de Trabajo Recomendado</h3>
                    <div style="display: grid; gap: 1rem; margin-top: 1.5rem;">
                        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <div style="font-size: 2rem;">1️⃣</div>
                            <div>
                                <strong>Entiende el código</strong>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">No implementes lo que no entiendes</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <div style="font-size: 2rem;">2️⃣</div>
                            <div>
                                <strong>Evita las Custom HTMLs</strong>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">Usa Custom Templates siempre que sea posible</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <div style="font-size: 2rem;">3️⃣</div>
                            <div>
                                <strong>Aprovecha el DataLayer al máximo</strong>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">Es la base de una implementación escalable</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <div style="font-size: 2rem;">4️⃣</div>
                            <div>
                                <strong>Testea siempre antes de publicar</strong>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">Usa el Preview Mode y verifica todo</p>
                            </div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                            <div style="font-size: 2rem;">5️⃣</div>
                            <div>
                                <strong>Limpia regularmente el contenedor</strong>
                                <p style="margin: 0.25rem 0 0 0; font-size: 0.95rem;">Elimina tags, triggers y variables obsoletas</p>
                            </div>
                        </div>
                    </div>
                `,
                image: null
            },
            {
                title: "Nomenclatura: La Clave del Orden",
                content: `
                    <blockquote style="border-left: 4px solid var(--primary); padding-left: 1rem; font-style: italic;">
                        "Utiliza siempre la misma nomenclatura para todos los elementos que creemos"
                    </blockquote>
                    <div style="margin-top: 1.5rem; padding: 1.5rem; background: #282c34; color: #abb2bf; border-radius: 8px;">
                        <p style="margin: 0 0 1rem 0;"><strong style="color: #61dafb;">Estructura recomendada:</strong></p>
                        <code style="font-size: 1.1rem; color: #98c379;">empresa - herramienta - acción</code>
                        
                        <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
                            <p style="margin: 0 0 0.5rem 0;"><strong style="color: #61dafb;">Ejemplos:</strong></p>
                            <p style="margin: 0.25rem 0; font-family: 'Courier New', monospace;">
                                ✅ <span style="color: #98c379;">visiondefunnel - ga4_events</span>
                            </p>
                            <p style="margin: 0.25rem 0; font-family: 'Courier New', monospace;">
                                ✅ <span style="color: #98c379;">ecommerce - meta_purchase</span>
                            </p>
                            <p style="margin: 0.25rem 0; font-family: 'Courier New', monospace;">
                                ❌ <span style="color: #e06c75;">Tag_de_analytics</span>
                            </p>
                        </div>
                    </div>
                    <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                        <strong>💡 Beneficio:</strong> En un contenedor compartido, todos entienden tu trabajo de un vistazo.
                    </div>
                `,
                image: null
            },
            {
                title: "Preview y Debugging",
                content: `
                    <h3>Tu mejor amigo: El modo Preview</h3>
                    <div style="margin: 1.5rem 0;">
                        <p style="font-size: 1.05rem;">
                            Antes de publicar cualquier cambio en producción, <strong>siempre</strong> 
                            debes previsualizarlo en un entorno de pruebas simulado.
                        </p>
                    </div>
                    <div style="padding: 1.5rem; background: rgba(78, 205, 196, 0.15); border-radius: 8px; margin: 1rem 0;">
                        <strong>🔍 Con Preview puedes:</strong>
                        <ul style="margin-top: 0.5rem;">
                            <li>Ver qué tags se disparan en cada evento</li>
                            <li>Verificar los valores de las variables en tiempo real</li>
                            <li>Comprobar el dataLayer y sus eventos</li>
                            <li>Detectar errores antes de que lleguen a producción</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; background: rgba(244, 67, 54, 0.1); border-left: 4px solid #f44336; margin-top: 1.5rem;">
                        <strong>🚨 Regla de oro:</strong> Si no lo has testeado en Preview, no lo publiques.
                    </div>
                `,
                image: null
            }
        ],
        notes: "Prácticas profesionales para trabajar en equipo"
    },

    // Conceptos avanzados (para capítulos futuros)
    advanced: {
        title: "Conceptos Avanzados",
        slides: [
            {
                title: "Variables Personalizadas Avanzadas",
                content: `
                    <h3>Custom JavaScript Variables</h3>
                    <p style="margin-top: 1rem;">
                        Las variables Custom JavaScript te permiten ejecutar código personalizado 
                        para capturar información que no está disponible de forma nativa en GTM.
                    </p>
                    <div style="background: #282c34; color: #abb2bf; padding: 1.5rem; border-radius: 8px; font-family: 'Courier New', monospace; margin: 1.5rem 0;">
                        <pre style="margin: 0; color: #abb2bf;">function() {
  // Ejemplo: Obtener email hasheado
  var email = document.getElementById('userEmail').value;
  if (email) {
    return sha256(email); // Función de hashing
  }
  return undefined;
}</pre>
                    </div>
                    <div style="padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                        <strong>💡 Caso de uso:</strong> User-Provided Data para Enhanced Conversions
                    </div>
                `,
                image: null
            },
            {
                title: "User-Provided Data",
                content: `
                    <h3>Enhanced Conversions & Advanced Matching</h3>
                    <p style="margin-top: 1rem;">
                        Capturar información del usuario de forma hasheada para mejorar el matching 
                        en plataformas como Google Ads y Meta.
                    </p>
                    <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(78, 205, 196, 0.1); border-radius: 8px;">
                        <strong>📧 Datos que puedes capturar:</strong>
                        <ul style="margin-top: 0.5rem;">
                            <li>Email (hasheado con SHA-256)</li>
                            <li>Teléfono (hasheado)</li>
                            <li>Nombre y apellidos (hasheados)</li>
                            <li>Dirección (hasheada)</li>
                        </ul>
                    </div>
                    <div style="padding: 1rem; background: rgba(255, 193, 7, 0.15); border-left: 4px solid #ffc107; margin-top: 1.5rem;">
                        <strong>⚠️ Privacidad:</strong> Siempre hashea los datos PII antes de enviarlos. 
                        Respeta el RGPD y obtén el consentimiento adecuado.
                    </div>
                `,
                image: null
            }
        ],
        notes: "Para cuando domines los fundamentos"
    },

    // Recursos adicionales
    resources: {
        title: "Recursos y Referencias",
        links: [
            {
                title: "📊 Presentación GTM I",
                url: "slides/EDEM - GTM I-2.pdf",
                description: "Fundamentos: Instalación, conceptos básicos, mejores prácticas"
            },
            {
                title: "📊 Presentación GTM II",
                url: "slides/EDEM - GTM II-2.pdf",
                description: "Avanzado: Variables, DataLayer, Custom JavaScript, UPD"
            },
            {
                title: "📘 Documentación Oficial de GTM",
                url: "https://support.google.com/tagmanager",
                description: "Google Tag Manager Help Center"
            },
            {
                title: "🎓 Tag Manager Academy",
                url: "https://tagmanager.google.com/academy/",
                description: "Curso oficial gratuito de Google"
            },
            {
                title: "🔧 GTM Checklist",
                url: "https://www.simoahava.com/analytics/google-tag-manager-checklist/",
                description: "Checklist de Simo Ahava para auditorías"
            },
            {
                title: "📚 GTM Recipes",
                url: "https://www.simoahava.com/",
                description: "Blog de Simo Ahava - El mejor recurso sobre GTM"
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
                
                <h4>Ejemplos de Tags:</h4>
                <ul>
                    <li><strong>Google Analytics 4:</strong> Envía eventos de seguimiento</li>
                    <li><strong>Google Ads:</strong> Conversiones y remarketing</li>
                    <li><strong>Meta Pixel:</strong> Tracking de Facebook/Instagram</li>
                    <li><strong>Custom HTML:</strong> Código JavaScript personalizado</li>
                </ul>
                
                <div class="highlight-box">
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
                
                <h4>Tipos principales:</h4>
                <ul>
                    <li><strong>Pageview:</strong> Cuando se carga una página</li>
                    <li><strong>Click:</strong> Cuando se hace clic en un elemento</li>
                    <li><strong>Custom Event:</strong> Cuando se lanza un evento personalizado</li>
                    <li><strong>Form Submission:</strong> Cuando se envía un formulario</li>
                    <li><strong>Timer:</strong> Cada X segundos</li>
                </ul>
                
                <div class="highlight-box">
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
                
                <h4>Tipos de Variables:</h4>
                <ul>
                    <li><strong>Built-in:</strong> Page URL, Click URL, Referrer...</li>
                    <li><strong>Data Layer:</strong> Valores del dataLayer</li>
                    <li><strong>JavaScript:</strong> Resultado de código JS</li>
                    <li><strong>Constant:</strong> Valores fijos (IDs, configuraciones)</li>
                    <li><strong>Lookup Table:</strong> Mapeo de valores</li>
                </ul>
                
                <div class="highlight-box">
                    <p><strong>💡 Analogía:</strong> Las variables son la <em>memoria</em> de GTM.</p>
                    <p>Guardan información temporal para usar en tags.</p>
                </div>
            `
        },
        {
            title: "Cómo Trabajan Juntos",
            content: `
                <h3>🔄 El Flujo Completo</h3>
                <div style="background: rgba(78, 205, 196, 0.1); padding: 2rem; border-radius: 10px; margin: 2rem 0;">
                    <ol style="font-size: 1.1rem; line-height: 2;">
                        <li><strong>Evento:</strong> Usuario hace clic en "Comprar" 🖱️</li>
                        <li><strong>Variable:</strong> GTM captura el precio del producto 📦</li>
                        <li><strong>Trigger:</strong> Se cumple la condición "purchase" 🎯</li>
                        <li><strong>Tag:</strong> Se envía el evento a GA4 🚀</li>
                    </ol>
                </div>
                
                <h4>Ejemplo práctico:</h4>
                <pre style="background: #000; color: #0f0; padding: 1rem; border-radius: 5px;">dataLayer.push({
  event: 'purchase',
  transaction_id: 'TXN-123',
  value: 99.99
})

// Variable: {{transaction_id}}
// Trigger: Custom Event = "purchase"
// Tag: GA4 Event con parámetro transaction_id</pre>
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
                
                <h4>¿Por qué es importante?</h4>
                <ul>
                    <li>✅ <strong>Desacopla</strong> la lógica de negocio del tracking</li>
                    <li>✅ <strong>Centraliza</strong> toda la información en un solo lugar</li>
                    <li>✅ <strong>Estandariza</strong> el formato de los datos</li>
                    <li>✅ <strong>Facilita</strong> la escalabilidad y mantenimiento</li>
                </ul>
                
                <div class="highlight-box">
                    <p><strong>💡 Sin dataLayer:</strong> Los equipos de desarrollo implementan tags directamente.</p>
                    <p><strong>✅ Con dataLayer:</strong> Los desarrolladores solo pushean eventos, GTM los escucha.</p>
                </div>
            `
        },
        {
            title: "Estructura del Data Layer",
            content: `
                <h3>📐 Anatomía de un Push</h3>
                <pre style="background: #000; color: #0f0; padding: 1.5rem; border-radius: 8px; margin: 2rem 0;">dataLayer.push({
  event: 'nombre_del_evento',      // Obligatorio
  parametro1: 'valor1',            // Contexto
  parametro2: 123,                 // Puede ser string, number, object...
  objeto_anidado: {
    key: 'value'
  }
})</pre>
                
                <h4>Reglas de oro:</h4>
                <ul>
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
                <h4>E-commerce:</h4>
                <ul>
                    <li><code>view_item</code> - Ver producto</li>
                    <li><code>add_to_cart</code> - Añadir al carrito</li>
                    <li><code>begin_checkout</code> - Iniciar checkout</li>
                    <li><code>purchase</code> - Compra completada</li>
                </ul>
                
                <h4>Lead Generation:</h4>
                <ul>
                    <li><code>form_start</code> - Usuario empieza formulario</li>
                    <li><code>form_submit</code> - Usuario envía formulario</li>
                    <li><code>lead_generated</code> - Lead confirmado</li>
                </ul>
                
                <h4>Engagement:</h4>
                <ul>
                    <li><code>video_play</code> - Reproducir video</li>
                    <li><code>scroll_depth</code> - Profundidad de scroll</li>
                    <li><code>file_download</code> - Descarga de archivo</li>
                </ul>
            `
        }
    ]
};

theoryContent.variables = {
    title: "�� Guía Completa de Variables",
    slides: [
        {
            title: "Variables: La Memoria de GTM",
            content: `
                <h3>�� ¿Qué son las Variables?</h3>
                <p>Las variables en GTM son <strong>contenedores de información</strong> que se pueden reutilizar en múltiples tags y triggers.</p>
                
                <h4>Beneficios:</h4>
                <ul>
                    <li>✅ <strong>Reutilización:</strong> Define una vez, usa en muchos tags</li>
                    <li>✅ <strong>Centralización:</strong> Cambios en un solo lugar</li>
                    <li>✅ <strong>Legibilidad:</strong> Código más claro y mantenible</li>
                    <li>✅ <strong>Flexibilidad:</strong> Condiciones dinámicas en triggers</li>
                </ul>
                
                <div class="highlight-box">
                    <p><strong>Ejemplo:</strong> En lugar de escribir <code>document.location.pathname</code> en cada tag,</p>
                    <p>Creas una variable <code>{{Page Path}}</code> y la usas donde necesites.</p>
                </div>
            `
        },
        {
            title: "Tipos de Variables",
            content: `
                <h3>📚 Categorías de Variables</h3>
                
                <h4>1. Variables Built-in (Integradas):</h4>
                <ul>
                    <li><code>Page URL</code> - URL completa</li>
                    <li><code>Page Path</code> - Ruta de la página</li>
                    <li><code>Referrer</code> - De dónde viene el usuario</li>
                    <li><code>Click Element</code> - Elemento clickeado</li>
                    <li><code>Click URL</code> - URL del elemento clickeado</li>
                </ul>
                
                <h4>2. Variables Data Layer:</h4>
                <p>Extraen valores del <code>dataLayer</code>:</p>
                <pre style="background: #000; color: #0f0; padding: 1rem; border-radius: 5px;">// dataLayer
{
  event: 'purchase',
  transaction_id: 'TXN-123'
}

// Variable GTM
Nombre: transaction_id
Valor: {{transaction_id}} = "TXN-123"</pre>
                
                <h4>3. Variables JavaScript:</h4>
                <p>Ejecutan código JS y devuelven el resultado.</p>
            `
        },
        {
            title: "Cómo Crear Variables",
            content: `
                <h3>🛠️ Crear una Variable Data Layer</h3>
                <ol style="line-height: 2;">
                    <li>Ve a <strong>Variables → Nueva</strong></li>
                    <li>Elige <strong>Tipo: Data Layer Variable</strong></li>
                    <li>Nombre de la variable del Data Layer: <code>transaction_id</code></li>
                    <li>Guarda y dale un nombre: <code>DL - Transaction ID</code></li>
                </ol>
                
                <h4>💡 Convención de nombres:</h4>
                <ul>
                    <li><code>DL -</code> para Data Layer variables</li>
                    <li><code>JS -</code> para JavaScript variables</li>
                    <li><code>CONST -</code> para constantes</li>
                    <li><code>1P -</code> para cookies de 1st party</li>
                </ul>
                
                <div class="highlight-box">
                    <p><strong>Tip:</strong> Usa nombres descriptivos. Otros colegas (y tu yo futuro) te lo agradecerán.</p>
                </div>
            `
        },
        {
            title: "Variables en Triggers",
            content: `
                <h3>🎯 Usando Variables en Condiciones</h3>
                <p>Las variables son especialmente útiles en <strong>condiciones de triggers</strong>.</p>
                
                <h4>Ejemplo: Disparar solo si el precio > 100€</h4>
                <div style="background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <p><strong>Trigger:</strong> Custom Event = "add_to_cart"</p>
                    <p><strong>Condición:</strong> {{DL - Price}} mayor que 100</p>
                </div>
                
                <h4>Otro ejemplo: Solo en URLs específicas</h4>
                <div style="background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
                    <p><strong>Trigger:</strong> All Pages</p>
                    <p><strong>Condición:</strong> {{Page Path}} contiene "/checkout/"</p>
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
                <p>Imagina que tienes 5 amigos que hablan idiomas diferentes (Google Analytics, Facebook Pixel, TikTok Pixel, LinkedIn Insight Tag...).</p>
                
                <p>Sin GTM, necesitas aprender a hablar con cada uno en su idioma.</p>
                
                <p><strong>Con GTM:</strong> Hablas UN solo idioma (eventos del dataLayer), y GTM se encarga de traducir y enviar el mensaje a todos.</p>
                
                <div class="highlight-box">
                    <p><strong>💡 En resumen:</strong></p>
                    <p>GTM = El gestor de etiquetas que centraliza, organiza y distribuye tus eventos de tracking a múltiples plataformas.</p>
                </div>
            `
        },
        {
            title: "¿Por qué existe GTM?",
            content: `
                <h3>🔥 El problema que resuelve</h3>
                <h4>Antes de GTM:</h4>
                <ul>
                    <li>❌ Marketing dependía 100% de desarrollo para cualquier cambio</li>
                    <li>❌ Cada pixel/script directamente en el código fuente</li>
                    <li>❌ Imposible iterar rápido</li>
                    <li>❌ Alto riesgo de romper cosas</li>
                </ul>
                
                <h4>Con GTM:</h4>
                <ul>
                    <li>✅ Autonomía para marketing</li>
                    <li>✅ Un solo script en el código</li>
                    <li>✅ Cambios en minutos (sin deployar)</li>
                    <li>✅ Preview mode para probar sin riesgos</li>
                </ul>
            `
        },
        {
            title: "Casos de uso reales",
            content: `
                <h3>🎯 ¿Cuándo usar GTM?</h3>
                
                <h4>✅ Perfecto para:</h4>
                <ul>
                    <li><strong>E-commerce:</strong> Tracking de compras, carritos, productos vistos</li>
                    <li><strong>Lead generation:</strong> Formularios, descargas, registros</li>
                    <li><strong>Content:</strong> Scroll depth, clicks, reproducciones de video</li>
                    <li><strong>SaaS:</strong> Eventos de activación, features usados, conversiones</li>
                </ul>
                
                <h4>❌ No usar para:</h4>
                <ul>
                    <li>Modificar el contenido de la web (no es su propósito)</li>
                    <li>Lógica de negocio crítica (GTM es para tracking, no para features)</li>
                    <li>Tracking server-side pesado (existe GTM server-side para eso)</li>
                </ul>
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
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin: 2rem 0;">
                    <div style="background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 10px; border: 2px solid var(--primary);">
                        <h4>🌐 GTM Web</h4>
                        <p>El más común. Para sitios web.</p>
                        <p><strong>Uso:</strong> E-commerce, blogs, landing pages</p>
                    </div>
                    
                    <div style="background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 10px; border: 2px solid var(--primary);">
                        <h4>📱 GTM Mobile</h4>
                        <p>Para apps iOS y Android.</p>
                        <p><strong>Uso:</strong> Apps nativas</p>
                    </div>
                    
                    <div style="background: rgba(78, 205, 196, 0.1); padding: 1.5rem; border-radius: 10px; border: 2px solid var(--primary);">
                        <h4>🖥️ GTM Server-side</h4>
                        <p>El futuro. Tracking desde el servidor.</p>
                        <p><strong>Uso:</strong> Mayor control, privacidad, bypass adblockers</p>
                    </div>
                </div>
            `
        },
        {
            title: "Cómo se implementa",
            content: `
                <h3>🛠️ Los 3 pasos de implementación</h3>
                
                <div style="background: rgba(78, 205, 196, 0.1); padding: 2rem; border-radius: 10px; margin: 2rem 0;">
                    <h4>1️⃣ Crear el contenedor</h4>
                    <p>Ve a tagmanager.google.com → Crear cuenta → Crear contenedor</p>
                    <p><code>GTM-XXXXXXX</code> es tu ID único</p>
                    
                    <h4 style="margin-top: 1.5rem;">2️⃣ Instalar el código</h4>
                    <p>Dos snippets:</p>
                    <ul>
                        <li><strong>&lt;head&gt;:</strong> El script principal (cuanto antes, mejor)</li>
                        <li><strong>&lt;body&gt;:</strong> El noscript (fallback sin JS)</li>
                    </ul>
                    
                    <h4 style="margin-top: 1.5rem;">3️⃣ Configurar y publicar</h4>
                    <p>Workspace → Tags/Triggers/Variables → Preview → Publish</p>
                </div>
                
                <div class="highlight-box">
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
                <p>Antes, para añadir un pixel de Facebook, necesitabas:</p>
                <ol>
                    <li>Abrir ticket a desarrollo</li>
                    <li>Esperar 2 semanas (sprint actual ocupado)</li>
                    <li>Deploy a producción</li>
                    <li>Cruzar dedos 🤞</li>
                </ol>
                
                <p><strong>Con GTM:</strong></p>
                <ol>
                    <li>Vas a GTM</li>
                    <li>Añades el tag</li>
                    <li>Preview para probar</li>
                    <li>Publish → listo en 5 minutos ✅</li>
                </ol>
                
                <div class="highlight-box">
                    <p><strong>💡 Resultado:</strong> Marketing puede iterar rápido sin bloqueos.</p>
                </div>
            `
        },
        {
            title: "Control y gobernanza",
            content: `
                <h3>👑 El poder de la centralización</h3>
                
                <h4>Sin GTM:</h4>
                <ul>
                    <li>Scripts desparramados por todo el código</li>
                    <li>Nadie sabe qué pixels están activos</li>
                    <li>Imposible auditar</li>
                </ul>
                
                <h4>Con GTM:</h4>
                <ul>
                    <li>✅ Todo en un solo lugar</li>
                    <li>✅ Historial de versiones</li>
                    <li>✅ Permisos y roles</li>
                    <li>✅ Workspaces para colaborar</li>
                    <li>✅ Preview mode = sandbox sin riesgos</li>
                </ul>
                
                <p style="margin-top: 2rem;"><strong>Ejemplo real:</strong> "¿Qué pixels tenemos en la web?" Con GTM, respuesta en 2 minutos. Sin GTM, buscar en todo el repo.</p>
            `
        },
        {
            title: "Estrategia y performance",
            content: `
                <h3>⚡ Velocidad y optimización</h3>
                
                <h4>Carga asíncrona</h4>
                <p>GTM carga los scripts de forma asíncrona, sin bloquear el render de la página.</p>
                
                <h4>Un solo request inicial</h4>
                <p>En lugar de 10 scripts, solo cargas GTM. Él decide qué y cuándo cargar.</p>
                
                <h4>Testing rápido</h4>
                <p>Quieres probar un nuevo pixel? Crea una versión, prueba en Preview, y revierte si no funciona. Sin deployar.</p>
                
                <div class="highlight-box">
                    <p><strong>🎯 Estrategia:</strong></p>
                    <p>GTM te permite ser ágil en tracking sin comprometer la performance ni la estabilidad de la web.</p>
                </div>
            `
        }
    ]
};
