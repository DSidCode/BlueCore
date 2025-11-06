import { useState, useEffect } from 'react';
import './index.css';
import { runGemini } from './gemini.js';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('apiKey') || '');
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [showSettings, setShowSettings] = useState(false);
  const [jarvisCommand, setJarvisCommand] = useState('');
  const [jarvisOutput, setJarvisOutput] = useState([]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveApiKey = () => {
    setApiKey(tempApiKey);
    localStorage.setItem('apiKey', tempApiKey);
    setShowSettings(false);
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleJarvisCommand = async () => {
    if (jarvisCommand.trim() === '') return;

    const command = jarvisCommand;
    setJarvisCommand('');
    setJarvisOutput(prev => [...prev, `> ${command}`]);

    const systemPrompt = `
      Eres BlueCore, un asistente de IA estratégico. 
      Tu objetivo es ayudar al usuario a gestionar sus tareas de forma eficiente para alcanzar sus metas.
      Puedes añadir, eliminar o completar tareas.
      Responde SIEMPRE con uno de los siguientes formatos de acción:
      - Para añadir una tarea: ACTION_ADD_TASK: texto de la tarea
      - Para eliminar una tarea por su ID: ACTION_DELETE_TASK: id de la tarea
      - Para completar una tarea: ACTION_COMPLETE_TASK: id de la tarea
      - Para cualquier otra cosa, responde como un asistente normal, sin prefijos.

      Aquí está la lista de tareas actual (con sus IDs):
      ${tasks.map(t => `- ${t.text} (id: ${t.id})`).join('\n')}

      Comando del usuario: ${command}
    `;

    const response = await runGemini(systemPrompt, apiKey);

    if (response.startsWith('ACTION_ADD_TASK:')) {
      const taskText = response.replace('ACTION_ADD_TASK:', '').trim();
      setTasks(prev => [...prev, { id: Date.now(), text: taskText, completed: false }]);
      setJarvisOutput(prev => [...prev, `BlueCore: Tarea añadida: "${taskText}"`]);
    } else if (response.startsWith('ACTION_DELETE_TASK:')) {
      const taskId = parseInt(response.replace('ACTION_DELETE_TASK:', '').trim());
      setTasks(prev => prev.filter(t => t.id !== taskId));
      setJarvisOutput(prev => [...prev, `BlueCore: Tarea eliminada.`]);
    } else if (response.startsWith('ACTION_COMPLETE_TASK:')) {
      const taskId = parseInt(response.replace('ACTION_COMPLETE_TASK:', '').trim());
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: true } : t));
      setJarvisOutput(prev => [...prev, `BlueCore: Tarea completada.`]);
    } else {
      setJarvisOutput(prev => [...prev, `BlueCore: ${response}`]);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>// BlueCore //</h1>
        <button className="settings-btn" onClick={() => setShowSettings(!showSettings)}>CONFIG</button>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <h2>Configuración</h2>
          <input
            type="password"
            placeholder="Introduce tu API Key de Google AI"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
          />
          <button className="save-btn" onClick={handleSaveApiKey}>Guardar</button>
          <p>Tu clave se guarda localmente. No se comparte con nadie.</p>
        </div>
      )}

      <div className="task-input-container">
        <input
          type="text"
          id="task-input"
          placeholder="> Nueva tarea..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <button id="add-task-btn" onClick={handleAddTask}>++ADD</button>
      </div>
      <ul id="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span>_ {task.text}</span>
            <div className="task-buttons">
              <button className="complete-btn" onClick={() => handleToggleComplete(task.id)}>COMPLETE</button>
              <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>DELETE</button>
            </div>
          </li>
        ))}
      </ul>

      {/* JARVIS CONSOLE */}
      <div className="jarvis-console">
        <div className="jarvis-output">
          {jarvisOutput.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <input 
          type="text" 
          placeholder="> BlueCore..." 
          value={jarvisCommand}
          onChange={(e) => setJarvisCommand(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleJarvisCommand()}
        />
      </div>
    </div>
  );
}

export default App;
