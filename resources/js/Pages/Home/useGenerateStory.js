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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const generateStory = async () => {
        setIsLoading(true);

        const prompt = `Genera un cuento con estos parámetros:
        - Tema: ${formData.temaPrincipal}
        - Escenario: ${formData.escenario}
        - Personajes: ${formData.personajes}
        - Tono: ${formData.tono}

        el cuento generado debe tener 300 palabras y 4 párrafos

        La respuesta debe tener un título que refleje el cuento y, debajo, el cuento generado. Los cuentos deben ser aptos para toda la familia.

        Genera solo el resultado en un JSON string para usar en TypeScript, json tiene que estar adaptado para poder convertirce correctamente. 
        El JSON debe estar dividido en: 
        - title: el título del cuento 
        - story: el cuento generado
        - summary: una sinopsis breve del cuento
        - image_prompt: prompt para generar una imagen que haga referencia al cuento, y que no use los nombres proporcionados sino que haga referencia directa describiendo la escena.

        No me generes ninguna otra descripción.`;

        const { text } = await generateText({
            model: perplexity('llama-3-sonar-small-32k-chat'),
            prompt: prompt,
            temperature: 0.6,
            maxTokens: 3000,
            frequencyPenalty: 1
        });

        const cuentoGenerado = JSON.parse(text);
        setCuento(cuentoGenerado);
        setIsLoading(false);
    };

    return { cuento, isLoading, generateStory, handleChange, formData };
}
