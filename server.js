const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware para parsear cuerpos JSON
app.use(express.json());

// Endpoint de la API
app.get('/preguntar', async (req, res) => {
    try {
        // Obtener la pregunta del parámetro de consulta
        const pregunta = req.query.pregunta || "¿Cuál es el significado de la vida?";

        // Configurar la solicitud a la API
        const respuesta = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "deepseek/deepseek-r1:free",
                messages: [
                    {
                        role: "user",
                        content: pregunta
                    }
                ]
            },
            {
                headers: {
                    'Authorization': 'Bearer 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',
                    'HTTP-Referer': 'http://localhost:3000', // Reemplaza con tu URL del sitio
                    'X-Title': 'api gratis', // Reemplaza con el nombre de tu sitio
                    'Content-Type': 'application/json'
                }
            }
        );

        // Extraer y enviar la respuesta
        const respuestaTexto = respuesta.data.choices[0].message.content;
        res.json({
            exito: true,
            respuesta: respuestaTexto
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            exito: false,
            error: error.message
        });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
