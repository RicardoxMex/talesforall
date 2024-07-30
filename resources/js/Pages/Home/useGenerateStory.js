import { useEffect, useState } from 'react';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { useForm } from '@inertiajs/react';

const perplexity = createOpenAI({
    apiKey: import.meta.env.VITE_PER_API_PUBLIC_KEY,
    baseURL: 'https://api.perplexity.ai'
});

export default function useGenerateStory() {
    const [cuento, setCuento] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { data, setData, post, errors, reset } = useForm({
        title: '',
        story: '',
        summary: '',
        image_prompt: ''
    });

    const [formData, setFormData] = useState({
        temaPrincipal: '',
        escenario: '',
        personajes: '',
        tono: []
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        const { name, value, checked } = event.target;

        if (name === 'tono') {
            setFormData((prevState) => {
                const newTono = checked
                    ? [...prevState.tono, value]
                    : prevState.tono.filter((tono) => tono !== value);
                return { ...prevState, tono: newTono };
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };


    const validateForm = () => {
        const errors = {};
        if (!formData.temaPrincipal) errors.temaPrincipal = 'El tema principal es obligatorio.';
        if (!formData.escenario) errors.escenario = 'El escenario es obligatorio.';
        if (!formData.personajes) errors.personajes = 'Los personajes son obligatorios.';
        if (formData.tono.length === 0) {
            errors.tono = 'Selecciona al menos un tono.';
        }
        return errors;
    };

    const generateStory = async () => {
        setCuento("");
        setIsLoading(true);
        setIsError(false);
        setFormErrors([])

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setFormErrors(validationErrors);
            setIsLoading(false);
            return;
        }

        const prompt = `Genera un cuento en español con los siguientes parámetros:
        - Tema: ${formData.temaPrincipal}
        - Escenario: ${formData.escenario}
        - Personajes: ${formData.personajes}
        - Tono: ${formData.tono.join(', ')}

        El cuento debe tener al menos 300 palabras, distribuidas en 4 párrafos.
        los caracteres que debes de excuir en todos los cuentos son: " '

        solo genera el json como resultado final, no describas nada mas acontinuacion las reglas:

        Proporciona solo un JSON con las siguientes claves:
        - **title**: Un título que refleje el cuento.
        - **story**: El cuento.
        - **summary**: Una breve sinopsis del cuento.
        - **image_prompt**: Un prompt para generar una imagen que represente el cuento, sin usar los nombres proporcionados.

        Si algún parámetro no es entendible o es inadecuado (por ejemplo, si el Tema es 'dasdsadasd'), devuelve el siguiente JSON:

        json
        {
        "title": "Error en los parámetros",
        "story": "Había una vez una persona que no sabía lo que quería y escribía cosas sin sentido en los campos.",
        "summary": "Los parámetros proporcionados no eran claros o válidos.",
        "image_prompt": "Un campo vacío con papel y lápiz, simbolizando confusión y falta de dirección."
        }
        `;
        try {
            const { text } = await generateText({
                model: perplexity('llama-3-sonar-small-32k-chat'),
                prompt: prompt,
                temperature: 0.7,
                maxTokens: 5500,
                frequencyPenalty: 1
            });
            console.log(text);
            const cuentoGenerado = JSON.parse(text);
            
            
            setCuento(cuentoGenerado);
           /* console.log(cuentoGenerado);
            setData('title', cuento.title )
            setData('story', cuento.story )
            setData('summary', cuento.summary )
            console.log('submit', data)*/
            
        } catch (error) {
            console.error('Error generating story:', error);
            setIsError(true);
            // Manejar el error aquí si es necesario
        } finally {
            
            setIsLoading(false);
        }
    };

    return { cuento, isLoading, generateStory, handleChange, formData, formErrors, isError, post, data};
}
