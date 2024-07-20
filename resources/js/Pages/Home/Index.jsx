import { Head, useForm } from '@inertiajs/react';
import useGenerateStory from './useGenerateStory';
import { useEffect } from 'react';

export default function Index({ auth }) {
    const { data, setData, post, errors, reset, patch, put } = useForm({
        title: '',
        story: '',
        summa: '',
        image_prompt: ''
    })
    const { cuento, isLoading, generateStory, handleChange, formData } = useGenerateStory();

    const handleOnSubmit = (event) => {
        event.preventDefault();
    }
    useEffect(() => {
        // Aquí puedes realizar cualquier acción adicional cuando el cuento cambia.
    }, [cuento]);

    return (
        <>
            <Head title="Tales For All" />
            <h1>Tales For All</h1>

            <div className="main-container">
                <div className="form-container">
                    <h1>Nuevo Cuento</h1>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div>
                            <label>Tema Principal:</label>
                            <input
                                type="text"
                                name="temaPrincipal"
                                value={formData.temaPrincipal}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Escenario:</label>
                            <input
                                type="text"
                                name="escenario"
                                value={formData.escenario}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Personajes:</label>
                            <input
                                type="text"
                                name="personajes"
                                value={formData.personajes}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label>Tono:</label>
                            <input
                                type="text"
                                name="tono"
                                value={formData.tono}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            onClick={generateStory}
                            type='button'
                            className='w-full bg-blue-800 rounded-lg p-3 text-white cursor-pointer'>
                            Crear cuento
                        </button>
                        <button
                            type='submit'
                            className='w-full mt-2 bg-green-300 rounded-lg p-3 text-white'
                            disabled>
                            Guardar
                        </button>
                    </form>
                </div>
                <div className="cuento-container">
                    {isLoading ? (
                        <div className="spinner"></div>
                    ) : (
                        cuento ? (
                            <div className="cuento">
                                <h1>{cuento.title}</h1>
                                <p>{cuento.story}</p>
                            </div>
                        ) : (
                            <p className="mensaje">Aún no se ha generado ningún cuento.</p>
                        )
                    )}
                </div>

            </div>
        </>
    );
}
