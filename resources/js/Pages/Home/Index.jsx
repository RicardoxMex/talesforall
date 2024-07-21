import { Head, useForm } from '@inertiajs/react';
import useGenerateStory from './useGenerateStory';
import { useEffect } from 'react';
import TalesLayout from '@/Layouts/TalesLayout';

export default function Index({ auth, categories }) {
    const { data, setData, post, errors, reset, patch, put } = useForm({
        title: '',
        story: '',
        summa: '',
        image_prompt: ''
    })
    const { cuento, isLoading, generateStory, handleChange, formData, formErrors } = useGenerateStory();

    const handleOnSubmit = (event) => {
        event.preventDefault();
    }


    useEffect(() => {
        // Aquí puedes realizar cualquier acción adicional cuando el cuento cambia.
    }, [cuento]);

    return (
        <TalesLayout
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
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
                                maxLength={50}
                            />
                            {formErrors.temaPrincipal && <p className="error">{formErrors.temaPrincipal}</p>}
                        </div>
                        <div>
                            <label>Escenario:</label>
                            <input
                                type="text"
                                name="escenario"
                                value={formData.escenario}
                                onChange={handleChange}
                                maxLength={50}
                            />
                            {formErrors.escenario && <p className="error">{formErrors.escenario}</p>}
                        </div>
                        <div>
                            <label>Personajes:</label>
                            <input
                                type="text"
                                name="personajes"
                                value={formData.personajes}
                                onChange={handleChange}
                                maxLength={50}
                            />
                            {formErrors.personajes && <p className="error">{formErrors.personajes}</p>}
                        </div>
                        <div>
                            <label>Tono:</label>
                            <div className="checkbox-group">

                                {categories.data.map((category) => (
                                    <label key={category.name}>
                                        <input
                                            type="checkbox"
                                            name="tono"
                                            value={category.name}
                                            checked={formData.tono.includes(category.name)}
                                            onChange={handleChange}
                                        />
                                        {category.name}
                                    </label>
                                ))}


                            </div>
                            {formErrors.tono && <p className="error">{formErrors.tono}</p>}
                        </div>
                        <button
                            onClick={generateStory}
                            type='button'
                            className={`w-full bg-blue-800 rounded-lg p-3 text-white ${!isLoading ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            disabled={isLoading}
                            >
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

                                {cuento.story.split('\n').map((line, index) => (
                                    <p className='mb-4' key={index}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <p className="mensaje">Aún no se ha generado ningún cuento.</p>
                        )
                    )}
                </div>

            </div>
        </TalesLayout>
    );
}
