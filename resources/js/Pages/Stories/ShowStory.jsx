import React from 'react';
import { Head, Link } from '@inertiajs/react';
import TalesLayout from '@/Layouts/TalesLayout';
import Story from '@/Components/TalesForAll/Story';
import Modal from '@/Components/Modal';

const ShowStory = ({ storyData, auth }) => {
  const story = storyData.data;
 const handleDelete = (id) => {
    console.log(id)
 }

  return (
    <TalesLayout auth={auth}>
      <div className="py-12 bg-beige min-h-screen">
        <Head title={story.title} />
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <div className="prose text-gray-700 mb-6">
              <Story cuento={story} />
            </div>

            
            {/**
             * 
             * <div className="flex justify-between items-center">
              {auth.user && auth.user.id === story.user_id && (
                <>
                  <Link
                    href={`/stories/${story.id}/edit`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
                  >
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(story.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800"
                  >
                    Eliminar
                  </button>
                </>
              )}
              <Link
                href="#"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
              >
                Marcar como Favorito
              </Link>
            </div>
             */}
          </div>
        </div>
      </div>
    
    
    </TalesLayout>
  );
};

export default ShowStory;
