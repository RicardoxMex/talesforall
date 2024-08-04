import { Link } from '@inertiajs/react';
import React from 'react';

const StoryCard = ({ id, title, summary, author, rating, coverImage = '/img/TalesForAll_card.webp', slug, categories, is_public, favorite=false }) => {
  console.log(favorite)
  return (
    <Link 
    href={favorite ? route('favorite-page', slug) : route('story-page', slug)} 
      className="relative bg-white rounded-lg shadow-md overflow-hidden flex flex-row h-[250px] md:flex-col md:h-[400px]"
    >
      {coverImage && (
        <img 
          className="w-40 md:w-auto md:h-44 object-cover object-top" 
          src={coverImage} 
          alt={title} 
          title={title} 
        />
      )}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg sm:text-xl lg:text-lg font-semibold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">{summary}</p>
          <div className="mt-2 flex flex-wrap">
            {categories.slice(0, 3).map((category, index) => (
              <span 
                key={index} 
                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-1 px-2.5 py-0.5 rounded"
              >
                {category.name}
              </span>
            ))}
            {categories.length > 3 && (
              <span className="text-xs text-gray-500 ml-2">+{categories.length - 3} más</span>
            )}
          </div>
        </div>
        <div className="mt-4 sm:mt-0 lg:mt-4">
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
      <div 
        className={`absolute bottom-2 right-2 px-3 py-1 text-white text-xs rounded-full ${
          is_public ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {is_public ? 'Público' : 'Privado'}
      </div>
    </Link>
  );
};

export default StoryCard;
