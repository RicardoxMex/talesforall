import Pagination from '@/Components/TalesForAll/Pagination';
import StoryCard from '@/Components/TalesForAll/StoryCard';
import TalesLayout from '@/Layouts/TalesLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Stories({ auth, stories }) {
    console.log(stories)
    const [storieslist , setStoriesList] = useState(stories.data ?? [])

    return (
    <TalesLayout auth={auth}>
      <Head title="Mis Historias" />
      <div className="py-12 bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Mis Historias</h1>
            {storieslist.length > 0 ? (
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
                    categories={story.categories}
                    is_public={story.is_public}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <p className="text-lg font-medium">No tienes cuentos creados. unu</p>
              </div>
            )}
            {storieslist.length > 0 && (
              <div className="mt-6">
                <Pagination links={stories.meta.links} />
              </div>
            )}
          </div>
        </div>
      </div>
    </TalesLayout>
    );
}
