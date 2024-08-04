import React, { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import TalesLayout from '@/Layouts/TalesLayout';
import Story from '@/Components/TalesForAll/Story';

const ShowStory = ({ storyData, auth, page='' }) => {
  console.log(page)
  const story = storyData.data;
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(story.title);
  const [is_public, setIsPublic] = useState(story.is_public);
  const [is_favorite, setIsFavorite] = useState(story.is_favorite); // Estado para favoritos
  const [hasChanged, setHasChanged] = useState(false);


  const curretUser = auth?.user?.id ?? 0
  const author = story?.user_id

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const togglePublicStatus = () => {
    setIsPublic(prev => !prev);
    setHasChanged(true);
  };

  useEffect(() => {
    if (hasChanged) {
      saveData();
      setHasChanged(false);
    }
  }, [hasChanged]);

  const saveData = () => {
    router.post(route('story.update', { story: story.id }), {
      title,
      is_public: is_public,
      _method: 'patch',
    });
    setEditTitle(false);
  };

  const addFavorite = () => {
    setIsFavorite(!is_favorite);
    router.post(route('story.addFav', { story: story.id }), {
      is_favorite: !is_favorite,
      _method: 'patch',
    });
  };


  return (
    <TalesLayout 
    auth={auth}
    >
     <div className="border-gray-300">
  
            {auth.user ? (
              <div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{title}</h1>
                </div>
                {editTitle && (
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full py-2 px-4 text-lg font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Edit title..."
                  />
                )}
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-4 text-gray-800 text-center">{story.title}</h1>
            )}

            {(auth.user && (curretUser==author))  && (
              <div className="p-6 border-t border-gray-300">
                <button
                  onClick={togglePublicStatus}
                  className={`w-full py-2 text-white text-lg rounded-md ${is_public ? 'bg-teal-500 hover:bg-teal-600' : 'bg-red-500 hover:bg-red-600'} transition duration-300`}
                >
                  {is_public ? 'Public' : 'Private'}
                </button>
              </div>
            )}
          </div>

          <div className="p-6">
            <div className="prose prose-sm sm:prose-lg text-gray-800 mb-6">
              <Story cuento={story} title={false} />
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {story.categories.map((category) => (
                <span
                  key={category.id}
                  className="inline-block bg-teal-100 text-teal-800 text-xs sm:text-sm px-3 py-1 rounded-full shadow-sm"
                >
                  {category.name}
                </span>
              ))}
            </div>

            {auth.user && (
              <div className="flex justify-end">
                <button
                  onClick={addFavorite}
                  className={`w-full py-2 text-white text-lg rounded-md ${!is_favorite ? 'bg-teal-500 hover:bg-teal-600' : 'bg-red-500 hover:bg-red-600'} transition duration-300`}
                >
                  {is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            )}
          </div>
    </TalesLayout>
  );
};

export default ShowStory;
