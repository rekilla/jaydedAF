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
                                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
                                    controls
                                    autoPlay
                                />
                            ) : (
                                <img
                                    src={selectedItem.url}
                                    alt={selectedItem.title}
                                    className="max-w-full max-h-[90vh] object-contain rounded-lg"
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
    onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ item, index, onClick }) => {
    const [hoveredId, setHoveredId] = useState<string | number | null>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (item.type === 'image' && containerRef.current) {
            const img = new Image();
            img.onload = () => {
                const containerWidth = containerRef.current?.offsetWidth || 300;
                const aspectRatio = img.width / img.height;
                const height = containerWidth / aspectRatio;
                setDimensions({ width: containerWidth, height });
            };
            img.src = item.url;
        }
    }, [item.url, item.type]);

    return (
        <motion.div
            ref={containerRef}
            className="relative overflow-hidden cursor-pointer group rounded-lg bg-gray-900"
            style={{ height: dimensions.height || 'auto' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={onClick}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
        >
            {item.type === 'video' ? (
                <video
                    src={item.url}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    poster="/fallback-thumb.jpg"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => e.currentTarget.pause()}
                />
            ) : (
                <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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

            {/* Expand Icon */}
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
    const [columns, setColumns] = useState(3);

    // Responsive columns
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 640) setColumns(1);
            else if (window.innerWidth < 1024) setColumns(2);
            else if (window.innerWidth < 1536) setColumns(3);
            else setColumns(4);
        };

        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    // Distribute items into columns for masonry layout
    const distributeItems = () => {
        const cols: MediaItemType[][] = Array.from({ length: columns }, () => []);
        
        mediaItems.forEach((item, index) => {
            const colIndex = index % columns;
            cols[colIndex].push(item);
        });
        
        return cols;
    };

    const columnizedItems = distributeItems();

    return (
        <>
            {/* Header */}
            {(title || description) && (
                <div className="text-center py-8 md:py-12 px-4">
                    {title && (
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
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

            {/* Masonry Gallery */}
            <div className="w-full px-4 md:px-8 lg:px-12">
                <div className="flex gap-4">
                    {columnizedItems.map((column, colIndex) => (
                        <div key={colIndex} className="flex-1 space-y-4">
                            {column.map((item, itemIndex) => (
                                <GalleryItem
                                    key={item.id}
                                    item={item}
                                    index={colIndex * mediaItems.length + itemIndex}
                                    onClick={() => setSelectedItem(item)}
                                />
                            ))}
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

// Alternative: CSS Columns Masonry Layout (simpler but less control)
export const MasonryGallery: React.FC<InteractiveBentoGalleryProps> = ({
    mediaItems,
    title,
    description
}) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);

    return (
        <>
            {/* Header */}
            {(title || description) && (
                <div className="text-center py-8 md:py-12 px-4">
                    {title && (
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
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

            {/* CSS Columns Gallery */}
            <div className="w-full px-4 md:px-8 lg:px-12">
                <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-4 space-y-4">
                    {mediaItems.map((item, index) => (
                        <div key={item.id} className="break-inside-avoid">
                            <GalleryItem
                                item={item}
                                index={index}
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
            <InteractiveBentoGallery
                mediaItems={demoItems}
                title="Moments of Individuality"
                description="Explore the essence of the Jayded AF lifestyle."
            />
        </div>
    );
};

export { DemoGallery };
