'use client';

import React from 'react';
import Image from 'next/image';

export interface PhotographerCardProps {
  id: string;
  name: string;
  avatar: string;
  location: string;
  specialities: string[];
  rating: number;
  reviewCount: number;
  rate: number;
  portfolioThumbnails: string[];
  verified?: boolean;
  onPortfolioClick?: () => void;
  onContactClick?: () => void;
}

export function PhotographerCard({
  name,
  avatar,
  location,
  specialities,
  rating,
  reviewCount,
  rate,
  portfolioThumbnails,
  verified = false,
  onPortfolioClick,
  onContactClick,
}: PhotographerCardProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-yellow-400" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" />
              </linearGradient>
            </defs>
            <path fill={`url(#half-${i})`} d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-300 fill-current" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header with Avatar and Info */}
      <div className="p-4 flex items-start gap-3">
        <div className="relative flex-shrink-0">
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            unoptimized
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
          />
          {verified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">{name}</h3>
            {verified && (
              <span className="text-blue-500 text-xs font-medium bg-blue-50 px-2 py-0.5 rounded-full">
                Verified
              </span>
            )}
          </div>
          <p className="text-gray-500 text-sm flex items-center gap-1 mt-0.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </p>
        </div>

        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-gray-900">RM{rate}</p>
          <p className="text-gray-500 text-xs">/hour</p>
        </div>
      </div>

      {/* Specialities */}
      <div className="px-4 pb-3">
        <div className="flex flex-wrap gap-1.5">
          {specialities.map((spec, idx) => (
            <span
              key={idx}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="px-4 pb-3 flex items-center gap-2">
        <div className="flex">{renderStars(rating)}</div>
        <span className="text-gray-500 text-sm">
          {rating.toFixed(1)} ({reviewCount} reviews)
        </span>
      </div>

      {/* Portfolio Thumbnails */}
      <div className="px-4 pb-3">
        <div className="grid grid-cols-4 gap-1.5">
          {portfolioThumbnails.slice(0, 4).map((thumb, idx) => (
            <div
              key={idx}
              className="aspect-square rounded-md overflow-hidden bg-gray-100"
            >
              <Image
                src={thumb}
                alt={`Portfolio ${idx + 1}`}
                width={100}
                height={100}
                unoptimized
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 pb-4 flex gap-2">
        <button
          onClick={onPortfolioClick}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          View Portfolio
        </button>
        <button
          onClick={onContactClick}
          className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Hubungi
        </button>
      </div>
    </div>
  );
}
