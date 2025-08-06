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
    width?: number;
    height?: number;
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
                <div className="relative max-h-[90vh] w-auto max-w-full mx-auto flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-4">
                        <div className="relative max-w-full max-h-[90vh] flex items-center justify-center">
                            {selectedItem.type === 'video' ? (
                                <video
                                    src={selectedItem.url}
                                    className="max-w-full max-h-[90vh] object-contain"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={selectedItem.url}
                                    alt={selectedItem.title}
                                    className="max-w-full max-h-[90vh] object-contain"
                                />
                            )}
                        </div>
                    </div>
                    
                    <div className="p-4 text-center">
                        
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
    onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, onClick }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '50px' }
        );

        if (itemRef.current) {
            observer.observe(itemRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={itemRef}
            className="relative overflow-hidden cursor-pointer group bg-gray-900 aspect-square"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={onClick}
        >
            {/* Loading skeleton */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}

            {item.type === 'video' ? (
                isInView && (
                    <video
                        src={item.url}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        poster="/fallback-thumb.jpg"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                        onLoadedData={() => setIsLoaded(true)}
                    />
                )
            ) : (
                isInView && (
                    <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onLoad={() => setIsLoaded(true)}
                    />
                )
            )}

            {/* Hover Effect - Only expand icon */}
            <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300`}>
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300 ${
                    isLoaded ? 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100' : 'opacity-0'
                }`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                    </svg>
                </div>
            </div>

            {/* Video Indicator */}
            {item.type === 'video' && isLoaded && (
                <div className="absolute top-3 left-3 p-2 bg-black/50 backdrop-blur-sm rounded-full">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                    </svg>
                </div>
            )}
        </motion.div>
    );
};

// --- Main Gallery Component ---
interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[];
    title?: string;
    description?: string;
}

export const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({
    mediaItems,
    title,
    description
}) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);

    return (
        <>
            {/* Header */}
            {(title || description) && (
                <div className="text-center pt-8 md:pt-12 pb-6 px-4">
                    {title && (
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider text-white">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="mt-3 text-lg text-gray-200 max-w-2xl mx-auto">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Grid Gallery */}
            <div className="w-full px-4 md:px-8 lg:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1">
                    {mediaItems.map((item, index) => (
                        <GalleryItem
                            key={item.id}
                            item={item}
                            index={index}
                            onClick={() => setSelectedItem(item)}
                        />
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

// Demo Gallery
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
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8">
            <InteractiveBentoGallery
                mediaItems={demoItems}
                title="Moments of Individuality"
                description="Explore the essence of the Jayded AF lifestyle."
            />
        </div>
    );
};

export default DemoGallery;
