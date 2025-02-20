import React, { useState } from 'react';
import { X } from 'lucide-react';

const images = [
  'https://images.unsplash.com/photo-1464349153735-7db50ed83c84',
  'https://images.unsplash.com/photo-1513151233558-d860c5398176',
  'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d',
  'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2',
  'https://images.unsplash.com/photo-1519225421980-715cb0215aed'
];

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image}
              alt={`Gallery image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Selected gallery image"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </>
  );
};

export default Gallery;