import TalesLayout from '@/Layouts/TalesLayout';
import Story from '@/Components/TalesForAll/Story';
import { useStoryForm } from './hooks/useStoryForm';
import { useGenerateStory } from './hooks/useGenerateStory';
import { useSaveStory } from './hooks/useSaveStory';






export default function CreateStory({ auth, categories }) {
    const { formStory, updateForm, validateForm, formErrors } = useStoryForm()
    const { story, generateStory, isError, isLoading } = useGenerateStory({ formStory })
    const {isSave} = useSaveStory({auth, story})

    const handleOnSubmit = (event) => {
        event.preventDefault()
        console.log(validateForm())
        if (validateForm()) {
            generateStory()
        }
    }

    return (
        <TalesLayout
            auth={auth}
            title='Crear Historia'
            style='bg-gray-100/[.9] shadow-none'
        >
            <div className="main-container">
                <div className="form-container">
                    <h1 className='text-2xl'>Nuevo Cuento</h1>
                    <form onSubmit={handleOnSubmit}>
                        <div>
                            <label>Tema Principal:</label>
                            <input
                                type="text"
                                name="mainSubject"
                                value={formStory.mainSubject}
                                onChange={updateForm}
                                maxLength={100}
                            />
                            {formErrors.mainSubject && <p className="error">{formErrors.mainSubject}</p>}
                        </div>
                        <div>
                            <label>Escenario:</label>
                            <input
                                type="text"
                                name="setting"
                                value={formStory.setting}
                                onChange={updateForm}
                                maxLength={100}
                            />
                            {formErrors.setting && <p className="error">{formErrors.setting}</p>}
                        </div>
                        <div>
                            <label>Personajes:</label>
                            <input
                                type="text"
                                name="characters"
                                value={formStory.characters}
                                onChange={updateForm}
                                maxLength={100}
                            />
                            {formErrors.characters && <p className="error">{formErrors.characters}</p>}
                        </div>
                        <div>
                            <label>Tono:</label>
                            <div className="checkbox-group">
                                {categories.data.map((category) => (
                                    <label key={category.name}>
                                        <input
                                            type="checkbox"
                                            name="tone"
                                            value={category.name}
                                            checked={formStory.tones.includes(category.name)}
                                            onChange={updateForm}
                                        />
                                        {category.name}
                                    </label>
                                ))}
                            </div>
                            {formErrors.tones && <p className="error">{formErrors.tones}</p>}
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
                        story ? (
                            <div className="cuento p-4 bg-white rounded-lg shadow-md">
                                <Story cuento={story} />
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