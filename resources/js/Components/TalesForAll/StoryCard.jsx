import { Link } from '@inertiajs/react';
import React from 'react';

const StoryCard = ({id,  title, summary, author, rating, coverImage, slug }) => {
  return (
    <Link href={route('story-page', slug)} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row mb-6">
      {coverImage && (
        <div className="h-48 md:h-auto md:w-48 flex-none bg-cover bg-center" style={{ backgroundImage: `url(${coverImage})` }} title={title}></div>
      )}
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{summary}</p>
        </div>
        <div className="mt-4">
          <div className="text-sm text-gray-500">
            <p>Autor: <span className="font-medium text-gray-700">{author}</span></p>
            {rating && (
              <p className="mt-1">
                Puntuación: <span className="font-medium text-gray-700">{rating}/5</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoryCard;
