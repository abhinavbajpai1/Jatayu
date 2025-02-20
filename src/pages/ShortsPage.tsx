import React, { useState, useMemo } from 'react';
import { ShortsGrid } from '../components/shorts/ShortsGrid';
import { ShortsFilters } from '../components/shorts/ShortsFilters';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Short } from '../types';

const MOCK_SHORTS: Short[] = [
  {
    id: '1',
    user: {
      id: '1',
      username: 'JohnWatson124',
      fullName: 'John Watson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64',
      followers: 10000,
      following: 500,
      isVerified: true,
      socialCreditScore: 88,
      tokens: 800,
      protestsParticipated: 15
    },
    videoUrl: '/assets/s1.mp4',
    videoUrls: ['/assets/s1.mp4'],
    description: 'Quick update from today\'s community meeting #LocalGov',
    likes: 25000,
    comments: 10000,
    views: 25000,
    timestamp: Date.now(),
    tags: ['Governance', 'Local News']
  },
  {
    id: '2',
    user: {
      id: '2',
      username: 'AmmaWatson@123',
      fullName: 'Amma Watson',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64',
      followers: 15000,
      following: 300,
      isVerified: true,
      socialCreditScore: 92,
      tokens: 1200,
      protestsParticipated: 20
    },
    videoUrl: '/mock-video-2.mp4',
    videoUrls: ['/assets/s2.mp4'],
    description: 'Understanding digital privacy rights in the modern age #DigitalRights',
    likes: 2300,
    comments: 156,
    views: 35000,
    timestamp: Date.now() - 3600000,
    tags: ['Digital Rights', 'Privacy']
  },
  {
    id: '3',
    user: {
      id: '3',
      username: 'techpolicy',
      fullName: 'Tech Policy Network',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64',
      followers: 20000,
      following: 400,
      isVerified: true,
      socialCreditScore: 95,
      tokens: 1500,
      protestsParticipated: 25
    },
    videoUrl: '/mock-video-3.mp4',
    videoUrls: [],
    description: 'New policy proposals for tech regulation #TechPolicy',
    likes: 3100,
    comments: 245,
    views: 45000,
    timestamp: Date.now() - 7200000,
    tags: ['Tech Policy', 'Governance']
  }
];

export function ShortsPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>(['All']);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => {
      if (tag === 'All') return ['All'];
      
      const newTags = prev.filter(t => t !== 'All');
      if (prev.includes(tag)) {
        return newTags.filter(t => t !== tag);
      }
      return [...newTags, tag];
    });
  };

  const handleNextShort = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % MOCK_SHORTS.length);
  };

  const handlePrevShort = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + MOCK_SHORTS.length) % MOCK_SHORTS.length);
  };

  const filteredShorts = useMemo(() => {
    if (selectedTags.includes('All')) return MOCK_SHORTS;
    return MOCK_SHORTS.filter(short => 
      short.tags.some(tag => selectedTags.includes(tag))
    );
  }, [selectedTags]);

  return (
    <div className="py-4 relative">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Shorts</h1>
        <p className="text-gray-400">Watch and share important moments</p>
      </div>

      <ShortsFilters
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
      />
      <button
        onClick={handlePrevShort}
        className="absolute top-60 right-40 bg-black/50 p-3 rounded-full hover:bg-black/80"
        aria-label="Previous Video"
      >
        <ChevronUp className="w-7 h-7 text-white" />
      </button>

      <ShortsGrid shorts={[filteredShorts[currentIndex]]} />
      
      {/* Navigation Buttons */}
      
      
      <button
        onClick={handleNextShort}
        className="absolute bottom-40 right-40 bg-black/50 p-3 rounded-full hover:bg-black/80"
        aria-label="Next Video"
      >
        <ChevronDown className="w-7 h-7 text-white" />
      </button>
    </div>
  );
}