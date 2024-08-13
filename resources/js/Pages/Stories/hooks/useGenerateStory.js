import { useState } from 'react';
import { generateText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { router } from '@inertiajs/react';

const perplexity = createOpenAI({
    apiKey: import.meta.env.VITE_PER_API_PUBLIC_KEY,
    baseURL: 'https://api.perplexity.ai'
});



export function useGenerateStory({ formStory }) {
    const [story, setStory] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const prompt = `Genera un cuento en español con los siguientes parámetros:
    - Tema: ${formStory.mainSubject}
    - Escenario: ${formStory.setting}
    - Personajes: ${formStory.characters}
    - Tono: ${formStory.tones.join(', ')}

    El cuento debe tener al menos 300 palabras, distribuidas en 4 párrafos.
    los caracteres que debes de excluir en todos los cuentos son: " '

    solo genera el json como resultado final, no describas nada mas acontinuacion las reglas:

    Proporciona solo un JSON con las siguientes claves:
    - **title**: Un título que refleje el cuento.
    - **story**: El cuento generado debe ser dirigido para toda la familia por lo que no puede tener insultos, ofensas o violencia como extra el caracter que debe representar el salto de linea entre parrafo es \\n.
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
    const CONFIG_PERPLEXITY = {
        model: perplexity('llama-3-sonar-small-32k-chat'),
        prompt: prompt,
        temperature: .8,
        maxTokens: 5500,
        frequencyPenalty: 1
    }

    const extractJsonString = (text) => {
        const startIndex = text.indexOf('{');
        const endIndex = text.indexOf('}') + 1;
        if (startIndex !== -1 && endIndex !== -1) {
            return text.substring(startIndex, endIndex);
        }
        return null;
    }

    const generateStory = async () => {
        setStory(null);
        setIsLoading(true);
        setIsError(false);

        try {
            const { text } = await generateText(CONFIG_PERPLEXITY);
            const newText = extractJsonString(text)
            const newStory = JSON.parse(newText);
            setStory({
                title:newStory.title,
                story:newStory.story,
                summary:newStory.summary,
                image_prompt: newStory.image_prompt,
                categories:formStory.tones
            });
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return { story, generateStory, isLoading, isError };
}
