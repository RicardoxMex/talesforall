import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export function useSaveStory({ auth, story }) {
    const [isSave, setIsSave] = useState(false)
    useEffect(() => {
        setIsSave(false)
        if (story === null) return

        let user_id = 0;
        if (auth.user != null) {
            user_id = auth.user.id;
        }
        console.log({ story })
        setIsSave(true)
        router.post('/story', {
             title: story.title,
             story: story.story,
             summary: story.summary,
             image_prompt: story.image_prompt || '',
             categories: story.categories,
             user_id: user_id,
         })
    }, [story])
    return { isSave }
}