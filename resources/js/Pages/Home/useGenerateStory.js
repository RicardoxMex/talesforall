import { useState } from 'react';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';

const perplexity = createOpenAI({
    apiKey: import.meta.env.VITE_PER_API_PUBLIC_KEY,
    baseURL: 'https://api.perplexity.ai'
});

export default function useGenerateStory() {
    const [cuento, setCuento] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        temaPrincipal: '',
        escenario: '',
        personajes: '',
        tono: ''
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.temaPrincipal) errors.temaPrincipal = 'El tema principal es obligatorio.';
        if (!formData.escenario) errors.escenario = 'El escenario es obligatorio.';
        if (!formData.personajes) errors.personajes = 'Los personajes son obligatorios.';
        if (!formData.tono) errors.tono = 'El tono es obligatorio.';
        return errors;
    };

    const generateStory = async () => {
        setIsLoading(true);

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        const prompt = `Genera un cuento en español con estos parámetros:
        - Tema: ${formData.temaPrincipal}
        - Escenario: ${formData.escenario}
        - Personajes: ${formData.personajes}
        - Tono: ${formData.tono}

        el cuento generado en story debe tener como minimo 300 palabras

        La respuesta debe tener un título que refleje el cuento y, debajo, el cuento generado. Los cuentos deben ser aptos para toda la familia.

        Genera solo el resultado en un JSON string para usar en TypeScript, json tiene que estar adaptado para poder convertirce correctamente. 
        El JSON debe estar dividido en: 
        - title: el título del cuento que refleje el objetivo del cuento
        - story: el cuento generado
        - summary: una sinopsis breve del cuento
        - image_prompt: prompt para generar una imagen que haga referencia al cuento, y que no use los nombres proporcionados sino que haga referencia directa describiendo la escena.

        No me generes ninguna otra descripción.`;

        try {
            const { text } = await generateText({
                model: perplexity('llama-3-sonar-small-32k-chat'),
                prompt: prompt,
                temperature: 0.3,
                maxTokens: 5500,
                frequencyPenalty: 1
            });

            const cuentoGenerado = JSON.parse(text);
            setCuento(cuentoGenerado);
        } catch (error) {
            console.error('Error generating story:', error);
            // Manejar el error aquí si es necesario
        } finally {
            setIsLoading(false);
        }
    };

    return { cuento, isLoading, generateStory, handleChange, formData, formErrors };
}
