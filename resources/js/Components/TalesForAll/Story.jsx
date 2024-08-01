import React from 'react';
const Story = ({ cuento }) => {

    return (
        <>
            <h1 className="text-5xl font-serif font-bold mb-4 text-brown">{cuento.title}</h1>
            <p className="text-lg italic mb-6">{cuento.author != null ? `Por ${cuento.author}` : 'Cuento generado'}</p>
            <img
              src={cuento?.coverImage || 'https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_590/https://www.mumablue.com/blog/wp-content/uploads/2022/09/cuentos-infantiles-audio.jpg'}
              alt={`${cuento.title} cover`}
              className="w-full h-auto rounded-lg mb-6"
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