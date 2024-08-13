import { useState } from "react"

export function useStoryForm(){
    const [formStory, setFormStory] = useState({
        mainSubject: '',
        setting: '',
        characters: '',
        tones: []
    })

    const [formErrors, setFormErrors] = useState({});

    const updateForm = (event) => {
        const {name, value, checked} =event.target

        if(name !== 'tone'){
            setFormStory({
                ...formStory, 
                [name]:value
            })
        }else{
            setFormStory((prevState)=>{
                const newTone = checked
                ? [...prevState.tones, value]
                : prevState.tones.filter((tone)=>tone!=value)
                return {...formStory, tones:newTone}
            })
        }
    }

    const getErrors = () =>{
        const errors = {};
        if (!formStory.mainSubject) errors.mainSubject = 'El tema principal es obligatorio.';
        if (!formStory.setting) errors.setting = 'El escenario es obligatorio.';
        if (!formStory.characters) errors.characters = 'Los personajes son obligatorios.';
        if (formStory.tones.length === 0) {
            errors.tones = 'Selecciona al menos un tono.';
        }
        return errors
    }

    const validateForm = () => {
        setFormErrors({})
        const errors = getErrors()
        if(Object.keys(errors).length > 0){
            setFormErrors(errors)
            return false;
        }
        return true;
    };
    return {formStory, updateForm, formErrors, validateForm}
}