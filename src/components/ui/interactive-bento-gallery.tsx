"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// --- Types ---
export interface MediaItemType {
    id: number | string;
    type: 'image' | 'video';
    title: string;
    desc: string;
    url: string;
    aspectRatio?: 'portrait' | 'landscape' | 'square'; // Auto-detected or manual
}

// --- Gallery Modal Component ---
interface GalleryModalProps {
    selectedItem: MediaItemType;
    isOpen: boolean;
    onClose: () => void;
    mediaItems: MediaItemType[];
    setSelectedItem: (item: MediaItemType | null) => void;
}

const GalleryModal = ({ selectedItem, isOpen, onClose, mediaItems, setSelectedItem }: GalleryModalProps) => {
    if (!isOpen) return null;

    const currentIndex = mediaItems.findIndex(item => item.id === selectedItem.id);
    
    const handleNext = () => {
        const nextIndex = (currentIndex + 1) % mediaItems.length;
        setSelectedItem(mediaItems[nextIndex]);
    };
    
    const handlePrev = () => {
        const prevIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
        setSelectedItem(mediaItems[prevIndex]);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-50"
                onClick={onClose}
            />
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="fixed inset-4 md:inset-8 lg:inset-16 flex items-center justify-center z-50"
            >
                <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-4">
                        <div className="relative w-full h-full flex items-center justify-center">
                            {selectedItem.type === 'video' ? (
                                <video
                                    src={selectedItem.url}
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={selectedItem.url}
                                    alt={selectedItem.title}
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                />
                            )}
                        </div>
                    </div>
                    
                    <div className="p-4 text-center">
                        <h3 className="text-white text-2xl font-bold">{selectedItem.title}</h3>
                        <p className="text-white/80 mt-2 text-lg">{selectedItem.desc}</p>
                    </div>

                    <button
                        className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
                        onClick={onClose}
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
                        onClick={handlePrev}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
                        onClick={handleNext}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </motion.div>
        </>
    );
};

// --- Gallery Item Component ---
interface GalleryItemProps {
    item: MediaItemType;
    index: number;
    onImageLoad: (id: string | number, aspectRatio: number) => void;
    onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, onImageLoad, onClick }) => {
    const [hoveredId, setHoveredId] = useState<string | number | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (item.type === 'image' && imgRef.current) {
            const img = new Image();
            img.onload = () => {
                const aspectRatio = img.width / img.height;
                onImageLoad(item.id, aspectRatio);
            };
            img.src = item.url;
        }
    }, [item.id, item.url, item.type, onImageLoad]);

    return (
        <motion.div
            className="relative overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={onClick}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
        >
            {/* Image/Video Container */}
            <div className="relative w-full h-full overflow-hidden bg-gray-900">
                {item.type === 'video' ? (
                    <video
                        src={item.url}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                    />
                ) : (
                    <img
                        ref={imgRef}
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                )}

                {/* Always visible gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Hover Content */}
                <AnimatePresence>
                    {hoveredId === item.id && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-0 left-0 right-0 p-4 md:p-6"
                        >
                            <h3 className="text-white font-bold text-lg md:text-xl mb-1">
                                {item.title}
                            </h3>
                            <p className="text-white/90 text-sm md:text-base line-clamp-2">
                                {item.desc}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Expand Icon on Hover */}
                <div className={`absolute top-4 right-4 p-2.5 bg-black/50 backdrop-blur-sm rounded-full transition-all duration-300 ${
                    hoveredId === item.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                </div>

                {/* Video Indicator */}
                {item.type === 'video' && (
                    <div className="absolute top-4 left-4 p-2 bg-black/50 backdrop-blur-sm rounded-full">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                        </svg>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

// --- Main Gallery Component ---
interface TightGalleryProps {
    mediaItems: MediaItemType[];
    title?: string;
    description?: string;
}

const TightGallery: React.FC<TightGalleryProps> = ({ 
    mediaItems, 
    title, 
    description
}) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [imageAspectRatios, setImageAspectRatios] = useState<Record<string | number, number>>({});

    const handleImageLoad = (id: string | number, aspectRatio: number) => {
        setImageAspectRatios(prev => ({ ...prev, [id]: aspectRatio }));
    };

    // Dynamic grid span calculation based on aspect ratio
    const getGridSpan = (item: MediaItemType) => {
        const aspectRatio = imageAspectRatios[item.id];
        
        if (!aspectRatio) {
            // Default before image loads
            return 'col-span-1 row-span-1';
        }

        // Portrait images (taller than wide)
        if (aspectRatio < 0.8) {
            return 'col-span-1 row-span-2';
        }
        // Landscape images (wider than tall)
        else if (aspectRatio > 1.5) {
            return 'col-span-2 row-span-1';
        }
        // Wide landscape
        else if (aspectRatio > 2) {
            return 'col-span-2 md:col-span-3 row-span-1';
        }
        // Square-ish images
        else {
            return 'col-span-1 row-span-1';
        }
    };

    return (
        <>
            {/* Optional Header */}
            {(title || description) && (
                <div className="text-center py-8 md:py-12 px-4">
                    {title && (
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Adaptive Gallery Grid */}
            <div className="w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[150px] md:auto-rows-[180px] lg:auto-rows-[200px] gap-0">
                    {mediaItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={getGridSpan(item)}
                        >
                            <GalleryItem
                                item={item}
                                index={index}
                                onImageLoad={handleImageLoad}
                                onClick={() => setSelectedItem(item)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={!!selectedItem}
                        onClose={() => setSelectedItem(null)}
                        mediaItems={mediaItems}
                        setSelectedItem={setSelectedItem}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

// Example usage with demo data
const DemoGallery = () => {
    const demoItems: MediaItemType[] = [
        {
            id: 1,
            type: 'image',
            title: 'Elegant Pour',
            desc: 'Artisanal spirits served with precision and style',
            url: '/images/home/gallery/G1 (1).png'
        },
        {
            id: 2,
            type: 'image',
            title: 'Crystal Clear',
            desc: 'Premium glassware collection',
            url: '/images/home/gallery/G1 (2).png'
        },
        {
            id: 3,
            type: 'image',
            title: 'Golden Hour',
            desc: 'Whiskey in perfect lighting',
            url: '/images/home/gallery/G1 (3).png'
        },
        {
            id: 4,
            type: 'image',
            title: 'Craft Cocktails',
            desc: 'Mixology at its finest',
            url: '/images/home/gallery/G1 (4).png'
        },
        {
            id: 5,
            type: 'image',
            title: 'Wine Selection',
            desc: 'Curated wine collection from around the world',
            url: '/images/home/gallery/G1 (5).png'
        },
        {
            id: 6,
            type: 'image',
            title: 'Bar Essentials',
            desc: 'Professional bar setup',
            url: '/images/home/gallery/G1 (6).png'
        },
        {
            id: 7,
            type: 'image',
            title: 'Celebration Time',
            desc: 'Toast to special moments',
            url: '/images/home/gallery/G1 (7).png'
        },
        {
            id: 8,
            type: 'image',
            title: 'Vintage Collection',
            desc: 'Aged to perfection',
            url: '/images/home/gallery/G1 (8).png'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <TightGallery 
                mediaItems={demoItems} 
                title="Premium Spirits Gallery" 
                description="Discover our exclusive collection of fine spirits and cocktails"
            />
        </div>
    );
};

export { TightGallery, DemoGallery };
