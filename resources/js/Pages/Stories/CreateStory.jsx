import { Head, router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import TalesLayout from '@/Layouts/TalesLayout';
import useGenerateStory from './data/useGenerateStory';
import Story from '@/Components/TalesForAll/Story';

export default function CreateStory({ auth, categories }) {
    console.log(auth);
   // const { data, setData, post, errors, reset } = useForm();
    const { cuento, isLoading, generateStory, handleChange, formData, formErrors, isError } = useGenerateStory();
    console.log(categories)

    const selectedCategoryIds = formData.tono.map(selectedName => {
        console.log(categories.data)
        // Encuentra la categoría cuyo nombre coincide con el nombre seleccionado
        const category = categories.data.find(cat => cat.name === selectedName);

        console.log('categori', category);
        // Devuelve el ID de la categoría encontrada, o null si no se encuentra
        return category ? category.id : null;
      }).filter(id => id !== null); // Filtra los valores null para obtener solo los IDs válidos
      
      console.log(selectedCategoryIds); 

    useEffect(() => {
        console.log(cuento?.length);
        if (cuento?.length != 0 && cuento !=  undefined
        ) {
            let user_id = 0;
            if(auth.user != null){
                user_id = auth.user.id;
            }
            router.post('/story', {
                title:cuento.title,
                story:cuento.story,
                summary:cuento.summary,
                image_prompt:cuento.image_prompt || '',
                categories: selectedCategoryIds,
                user_id: user_id, 
               })
        }
    }, [cuento]); // Este efecto se activará cuando 'cuento' cambie

    const handleOnSubmit = async (event) => {
        event.preventDefault();
        await generateStory();
        
    };
    

    return (
        <TalesLayout
            auth={auth}
        >
            <Head title='Crear Historia'/>
            <h1>Tales For All</h1>

            <div className="main-container">
                <div className="form-container">
                    <h1>Nuevo Cuento</h1>
                    <form onSubmit={handleOnSubmit}>
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
                            type="submit"
                            className={`w-full bg-blue-800 rounded-lg p-3 text-white ${!isLoading ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                            disabled={isLoading}
                        >
                            Crear cuento
                        </button>
                        
                    </form>
                </div>
                <div className="cuento-container p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col items-center justify-center">
                    {isLoading ? (
                        <div className="spinner border-4 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    ) : (
                        cuento ? (
                            <div className="cuento p-4 bg-white rounded-lg shadow-md">
                                <Story cuento={cuento} />
                            </div>
                        ) : (
                            !isError ? (
                                <p className="mensaje text-gray-700">Aún no se ha generado ningún cuento.</p>
                            ) : (
                                <p className="mensaje bg-red-500 text-white p-4 rounded-md shadow-md flex items-center justify-center">
                                    Hubo un error. Intente de nuevo.
                                    <span className="text-2xl ml-2">😅</span>
                                </p>
                            )
                        )
                    )}
                </div>
            </div>
        </TalesLayout>
    );
}
