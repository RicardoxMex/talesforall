import Pagination from '@/Components/TalesForAll/Pagination';
import StoryCard from '@/Components/TalesForAll/StoryCard';
import StoryList from '@/Components/TalesForAll/StoryList';
import TalesLayout from '@/Layouts/TalesLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function ExploreStories({ auth, stories, page }) {
    const [storieslist , setStoriesList] = useState(stories.data ?? [])
    //console.log(page)
    return (
        <TalesLayout auth={auth} title='Explorar Historias'>
            <StoryList 
                stories={storieslist} 
                auth={auth} 
                links={stories.meta.links} 
                page={page}
                />
        </TalesLayout>
    );
}
