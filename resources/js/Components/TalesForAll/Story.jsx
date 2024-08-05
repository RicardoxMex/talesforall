import React from 'react';
const Story = ({ cuento, title=true }) => {

    return (
        <>
            {title ? (
                 <h1 className="text-5xl font-serif font-bold mb-4 text-brown">{cuento.title}</h1>
            ):''}
           
            <p className="text-lg italic mb-6">{cuento.author != null ? `Por ${cuento.author}` : 'Cuento generado'}</p>
            <img
              src={cuento?.coverImage || '/img/TalesForAll.webp'}
              alt={`${cuento.title} cover`}
              className="w-full h-auto rounded-lg mb-6"
              title={cuento.image_prompt}
            />
            {cuento.story.split('\n').map((line, index) => (
                <p className="mb-4 text-gray-700" key={index}>
                    {line}
                </p>
            ))}
        </>
    )
}

export default Story