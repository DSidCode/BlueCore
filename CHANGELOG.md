# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.1.0] - 2025-11-05

### Changed
- **Identidad del Proyecto:** El proyecto ha sido renombrado de "Agenda Cyberpunk" a **"BlueCore"** para reflejar mejor su propósito como un asistente estratégico y su conexión personal con los objetivos del usuario.
- **Actualización de Componentes:** Actualizado el título principal en `App.jsx` y la documentación (`README.md`) para alinearse con la nueva identidad "BlueCore".
- **Personalidad de la IA:** Refinado el `systemPrompt` del asistente para adoptar la nueva personalidad y nombre "BlueCore".

## [1.0.0] - 2025-10-28

### Added
- **Inicialización del Proyecto:** Configuración inicial del proyecto con React y Vite.
- **Gestión de Tareas Básica:** Funcionalidad para añadir y mostrar tareas en la lista.
- **Estilo Cyberpunk:** Implementación de una hoja de estilos base (`index.css`) con una estética cyberpunk.
- **Funcionalidad de Tareas Completa:** Añadida la lógica para marcar tareas como completadas y para eliminarlas de la lista.
- **Persistencia de Tareas:** Integración con `localStorage` para guardar las tareas y evitar que se pierdan al recargar la página.
- **Consola de Asistente IA:** Creación de una interfaz de consola para interactuar con el asistente.
- **Integración con Gemini:** Conexión con la API de Google Gemini para procesar comandos de lenguaje natural.
- **Acciones de IA:** Implementada la capacidad para que el asistente pueda añadir, completar y eliminar tareas.
- **Panel de Configuración:** Añadida una sección para que el usuario pueda introducir y guardar su clave de la API de Gemini.

### Changed
- **Experiencia de Usuario (UX):** Mejorado el panel de configuración de la API añadiendo un botón "Guardar" explícito y feedback visual para el usuario.

### Fixed
- **Error de Modelo de API:** Solucionado un error crítico que impedía la comunicación con la API de Gemini al seleccionar un modelo compatible (`gemini-pro-latest`) basado en los modelos disponibles para la clave del usuario.
- **Dependencias del Proyecto:** Resuelto el error `vite: command not found` al guiar la instalación de las dependencias con `npm install`.
