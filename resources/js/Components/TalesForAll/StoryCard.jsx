import { Link } from '@inertiajs/react';
import React from 'react';

const StoryCard = ({id,  title, summary, author, rating, coverImage, slug, categories }) => {
  return (
    <Link href={route('story-page', slug)} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row mb-6">
      {coverImage && (
        <img className="h-48 md:h-auto md:w-48 flex-none bg-center object-cover object-top" src='/img/TalesForAll.webp' title={title} ></img>
      )}
      <div className="p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm line-clamp-3">{summary}</p>
          <div className="mt-2 flex flex-wrap">
            {categories.map((category, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                {category.name}
              </span>
            ))}
          </div>
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
