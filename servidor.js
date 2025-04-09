const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Configura tu API key
const API_KEY = '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';
const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Middleware para parsear JSON
app.use(express.json());

// Endpoint GET
app.get('/chat', async (req, res) => {
  try {
    // Obtener el mensaje desde los query parameters
    const message = req.query.message;
    
    if (!message) {
      return res.status(400).json({ error: 'El parámetro "message" es requerido' });
    }

    // Configurar la solicitud a la API de OpenRouter
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    };

    const data = {
      model: 'deepseek/deepseek-r1:free',
      messages: [
        {
          role: 'user',
          content: message
        }
      ]
    };

    // Hacer la solicitud a la API externa
    const response = await axios.post(API_URL, data, config);
    
    // Enviar la respuesta al cliente
    res.json({
      success: true,
      response: response.data
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
