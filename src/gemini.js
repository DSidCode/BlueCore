const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-latest:generateContent';

export const runGemini = async (prompt, apiKey) => {
  if (!apiKey) {
    return 'Error: La clave de la API de Google AI no está configurada.';
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
        // Optional: Add generationConfig and safetySettings if needed
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error en la API de Gemini:', errorData);
      return `Error de la API: ${errorData.error.message}`;
    }

    const data = await response.json();
    // Extract the text from the response
    const text = data.candidates[0].content.parts[0].text;
    return text.trim();

  } catch (error) {
    console.error('Error al llamar a la API de Gemini:', error);
    return 'Error: No se pudo conectar con la API de Gemini.';
  }
};