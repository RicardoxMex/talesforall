
import { createOpenAI } from '@ai-sdk/openai';
import { Head } from '@inertiajs/react';
import { generateText } from 'ai';
import { useState } from 'react';

export default function Index({ auth }) {
    const [cuento, setCuento] = useState(null);
    const prompt = `Genera un cuento con estos parámetros:
- Tema: Amistad
- Escenario: la Luna
- Personajes: Hugo y Antonio
- Tono: triste

el cuento generado debe tener 300 palabras y 4 párrafos

La respuesta debe tener un título que refleje el cuento y, debajo, el cuento generado. Los cuentos deben ser aptos para toda la familia.

Genera solo el resultado en un JSON string para usar en TypeScript, json tiene que estar adaptado para poder convertirce correctamente. 
El JSON debe estar dividido en: 
- title: el título del cuento 
- story: el cuento generado
- summary: una sinopsis breve del cuento
- image_prompt: prompt para generar una imagen que haga referencia al cuento, y que no use los nombres proporcionados sino que haga referencia directa describiendo la escena.

No me generes ninguna otra descripción.`;

    const perplexity = createOpenAI({
        apiKey: import.meta.env.VITE_PER_API_PUBLIC_KEY,
        baseURL: 'https://api.perplexity.ai'
    });

    const handleOnSubmit = async (event) =>  {
        event.preventDefault();
       // console.log("var = ", import.meta.env.VITE_PER_API_PUBLIC_KEY);
        const { text } = await generateText({
            model: perplexity('llama-3-sonar-small-32k-chat'),
            prompt: prompt,
            temperature: 0.6,
            maxTokens: 3000, // Aumenta el límite de tokens si es necesario
            frequencyPenalty: 1
        });
        console.log(text);
        const cuentoGenerado = JSON.parse(text);
        setCuento(cuentoGenerado);
    };
    return (
        <>
            <Head title="Tales For All" />
            <h1>Tales For All</h1>

            <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden md:flex md:flex-row flex-col">
                <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-8 text-white flex-1">
                    <h1 className="text-3xl font-bold mb-4">Nuevo Cuento</h1>
                    <form onSubmit={handleOnSubmit} className="space-y-6 flex-1">
                        <div>
                            <label className="block text-lg mb-2">Tema Principal:</label>
                            <input type="text" name="temaPrincipal" className="w-full p-3 rounded-md border-0 focus:ring-2 focus:ring-purple-300 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-lg mb-2">Escenario:</label>
                            <input type="text" name="escenario" className="w-full p-3 rounded-md border-0 focus:ring-2 focus:ring-purple-300 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-lg mb-2">Personajes:</label>
                            <input type="text" name="personajes" className="w-full p-3 rounded-md border-0 focus:ring-2 focus:ring-purple-300 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-lg mb-2">Tono:</label>
                            <input type="text" name="tono" className="w-full p-3 rounded-md border-0 focus:ring-2 focus:ring-purple-300 focus:outline-none" />
                        </div>
                        <button type='submit' className="w-full bg-purple-700 text-white font-semibold py-3 rounded-md hover:bg-purple-800 transition">Enviar</button>
                    </form>
                </div>
                <div className="w-full md:w-1/2 p-8">
                    {cuento ? (
                        <>
                            <h1 className="text-2xl font-bold mb-4 text-gray-900">{cuento.title}</h1>
                            <p className="text-gray-700 leading-relaxed">{cuento.story}</p>
                        </>
                    ) : (
                        <p className="text-gray-700 leading-relaxed">Aún no se ha generado ningún cuento.</p>
                    )}
                </div>
            </div>


        </>
    );
}
