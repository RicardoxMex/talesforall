import StoryList from '@/Components/TalesForAll/StoryList';
import TalesLayout from '@/Layouts/TalesLayout';
import { useState } from 'react';

export default function Favorites({ auth, stories, page }) {
    const [storieslist , setStoriesList] = useState(stories.data ?? [])
    return (
    <TalesLayout auth={auth} title="Mis Historias Favoritas">      
      <StoryList stories={storieslist} auth={auth} page={page} links={stories.meta.links} />
    </TalesLayout>
    );
}
