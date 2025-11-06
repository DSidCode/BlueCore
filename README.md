# // BlueCore //

**BlueCore** es más que un asistente de IA estratégico; es el corazón azul de un alquimista digital en busca de la felicidad junto a su hijo. Representa un núcleo operativo con un propósito poético: procesar y optimizar el camino hacia objetivos vitales, transformando grandes sueños en tareas alcanzables y eficientes. Inspirado en la creatividad y el futuro, su misión es inyectar sentido y filosofía en cada acción.

## Características

- **Gestión de Tareas:** Añade, completa y elimina tareas de forma sencilla.
- **Asistente BlueCore:** Interactúa con una IA para gestionar tus tareas usando lenguaje natural.
- **Comandos de Lenguaje Natural:** Dale órdenes como "añade una tarea para comprar pan" y observa cómo se ejecuta en tiempo real.
- **Estética Cyberpunk:** Una interfaz inmersiva con una temática de neón y terminal.
- **Persistencia Local:** Tus tareas y tu clave de API de Gemini se guardan de forma segura en el almacenamiento local de tu navegador.

## Puesta en Marcha y Uso

Sigue estos pasos para ejecutar la aplicación en tu entorno local.

### 1. Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando en la raíz del directorio:

```bash
npm install
```

### 2. Ejecutar la Aplicación

Una vez instaladas las dependencias, inicia el servidor de desarrollo con:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

### 3. Configuración de la API de Gemini

Para que el asistente funcione, necesitas una clave de la API de Google AI.

1.  Obtén tu clave de forma gratuita en [Google AI Studio](https://aistudio.google.com/app/apikey).
2.  En la aplicación, haz clic en el botón **CONFIG**.
3.  Pega tu clave de API en el campo de texto y haz clic en **Guardar**.

## Tecnologías Utilizadas

- **React:** Para la construcción de la interfaz de usuario.
- **Vite:** Como herramienta de desarrollo y empaquetado.
- **Google Gemini API:** Para la inteligencia artificial del asistente J.A.R.V.I.S.
