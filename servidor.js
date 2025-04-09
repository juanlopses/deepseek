const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Configuración de la clave API (mejor práctica: usar variables de entorno)
const API_KEY = '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';

app.get('/preguntar', async (req, res) => {
    try {
        const pregunta = req.query.pregunta || "¿Cuál es el significado de la vida?";

        const response = await axios({
            method: 'post',
            url: 'https://openrouter.ai/api/v1/chat/completions',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'Mi API',
                'Content-Type': 'application/json'
            },
            data: {
                model: "deepseek/deepseek-r1:free",
                messages: [
                    {
                        role: "user",
                        content: pregunta
                    }
                ]
            }
        });

        const respuestaTexto = response.data.choices[0].message.content;
        res.json({
            exito: true,
            respuesta: respuestaTexto
        });

    } catch (error) {
        console.error('Error completo:', error.response?.data || error.message);
        res.status(500).json({
            exito: false,
            error: error.response?.data?.message || error.message,
            status: error.response?.status
        });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
