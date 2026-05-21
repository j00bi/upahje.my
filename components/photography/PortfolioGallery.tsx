'use client';

import React, { useState, useMemo } from 'react';

export interface PortfolioImage {
  id: string;
  src: string;
  title: string;
  category: string;
  width?: number;
  height?: number;
}

export interface PortfolioGalleryProps {
  images: PortfolioImage[];
  categories?: string[];
  onImageClick?: (image: PortfolioImage, index: number) => void;
}

const categories = ['All', 'Wedding', 'Event', 'Portrait', 'Product', 'Pre-wedding'];

export function PortfolioGallery({ images, categories: propCategories, onImageClick }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('All');
  const displayCategories = propCategories || categories;

  const filteredImages = useMemo(() => {
    if (activeCategory === 'All') return images;
    return images.filter(img => img.category === activeCategory);
  }, [images, activeCategory]);

  return (
    <div className="w-full">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {displayCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-gray-900 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {filteredImages.map((image, index) => (
          <div
            key={image.id}
            className="break-inside-avoid mb-4 relative group cursor-pointer"
            onClick={() => onImageClick?.(image, index)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 group-hover:scale-[1.02] group-hover:shadow-xl">
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              {/* Category Badge Overlay */}
              <div className="absolute top-3 left-3">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  {image.category}
                </span>
              </div>
              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-white text-sm font-medium truncate">{image.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No images found in this category.
        </div>
      )}
    </div>
  );
}
