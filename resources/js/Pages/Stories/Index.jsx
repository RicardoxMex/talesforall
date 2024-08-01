import Pagination from '@/Components/TalesForAll/Pagination';
import StoryCard from '@/Components/TalesForAll/StoryCard';
import TalesLayout from '@/Layouts/TalesLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth, stories }) {
    const storieslist = stories.data ?? []
    console.log(stories)
    console.log(storieslist)
    return (
        <TalesLayout auth={auth}>
            <Head title="Mis Historias" />
            <div className="py-12 bg-gray-100">
                <Head title="Mis Historias" />
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {storieslist.map(story => (
                                <StoryCard
                                    key={story.id}
                                    id={story.id}
                                    title={story.title}
                                    summary={story.summary}
                                    author={story.author}
                                    rating={story.rating}
                                    slug={story.slug}
                                    coverImage="https://imgs.search.brave.com/BAg9ProDJhVKjEavhStUY0Rc8dtsTCqcorOBTUCNqb0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zcC1h/by5zaG9ydHBpeGVs/LmFpL2NsaWVudC90/b19hdXRvLHFfZ2xv/c3N5LHJldF9pbWcs/d181OTAsaF81OTAv/aHR0cHM6Ly93d3cu/bXVtYWJsdWUuY29t/L2Jsb2cvd3AtY29u/dGVudC91cGxvYWRz/LzIwMjIvMDkvY3Vl/bnRvcy1pbmZhbnRp/bGVzLWF1ZGlvLmpw/Zw"
                                />
                            ))}
                        </div>
                        <Pagination links={stories.meta.links} />
                    </div>
                </div>
            </div>
        </TalesLayout>
    );
}
