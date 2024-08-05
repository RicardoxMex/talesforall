import Pagination from '@/Components/TalesForAll/Pagination';
import StoryCard from '@/Components/TalesForAll/StoryCard';
import TalesLayout from '@/Layouts/TalesLayout';
//stories.meta.links
export default function StoryList({ auth, stories, links, page }) {
    return (
    <>      
            {stories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-6 ">
                {stories.map(story => (
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
                    is_favorite = {story.is_favorite}
                    page={page}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <p className="text-lg font-medium">No tienes cuentos favoritos.</p>
              </div>
            )}
            {stories.length > 0 && (
              <div className="mt-6">
                <Pagination links={links} />
              </div>
            )}
    </>
    );
}
