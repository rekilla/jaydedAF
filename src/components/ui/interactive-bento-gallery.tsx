"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from "../../lib/utils";

// --- Types ---
export interface MediaItemType {
    id: number | string;
    type: 'image' | 'video';
    title: string;
    desc: string;
    url: string;
    span: string; // Should use lg: prefix, e.g., 'lg:col-span-2 lg:row-span-2'
}

// --- MediaItem Component ---
// (Keep existing MediaItem component code as it was correct)
const MediaItem = ({ item, className, onClick }: { item: MediaItemType, className?: string, onClick?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    useEffect(() => {
        const options = { root: null, rootMargin: '50px', threshold: 0.1 };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setIsInView(entry.isIntersecting));
        }, options);

        if (item.type === 'video' && videoRef.current) {
            observer.observe(videoRef.current);
        }
        return () => {
            if (item.type === 'video' && videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, [item.type]);

    useEffect(() => {
        let mounted = true;
        const videoElement = videoRef.current;

        const handleVideoPlay = async () => {
            if (!videoElement || !isInView || !mounted) return;
            try {
                if (videoElement.readyState >= 3) {
                    setIsBuffering(false); await videoElement.play();
                } else {
                    setIsBuffering(true);
                    await new Promise<void>((resolve) => {
                        if (videoElement) {
                            const canPlayHandler = () => { resolve(); videoElement.removeEventListener('canplay', canPlayHandler); };
                            videoElement.addEventListener('canplay', canPlayHandler);
                        } else { resolve(); }
                    });
                    if (mounted && videoElement) { setIsBuffering(false); await videoElement.play(); }
                }
            } catch (error) { console.warn("Video playback failed:", error); setIsBuffering(false); }
        };

        if (item.type === 'video') {
            if (isInView) { handleVideoPlay(); }
            else if (videoElement) { videoElement.pause(); setIsBuffering(true); }
        }

        return () => {
            mounted = false;
            if (videoElement) { videoElement.pause(); videoElement.removeAttribute('src'); videoElement.load(); }
        };
    }, [isInView, item.type]);

    if (item.type === 'video') {
        return (
            <div className={cn("relative overflow-hidden w-full h-full", className)}>
                <video ref={videoRef} className="w-full h-full object-cover" onClick={onClick} playsInline muted loop preload="metadata" style={{ opacity: isBuffering ? 0.5 : 1, transition: 'opacity 0.3s ease-in-out', transform: 'translateZ(0)', willChange: 'transform' }} src={item.url} />
                {isBuffering && (<div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none"><div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /></div>)}
            </div>
        );
    }
    return (<img src={item.url} alt={item.title} className={cn("object-cover w-full h-full", className)} onClick={onClick} loading="lazy" decoding="async" />);
};


// --- GalleryModal Component ---
// (Keep existing GalleryModal component code as it was correct)
interface GalleryModalProps { selectedItem: MediaItemType; isOpen: boolean; onClose: () => void; setSelectedItem: (item: MediaItemType | null) => void; mediaItems: MediaItemType[]; }
const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems }: GalleryModalProps) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });
    useEffect(() => { const handleKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') { onClose(); } }; if (isOpen) { window.addEventListener('keydown', handleKeyDown); } return () => { window.removeEventListener('keydown', handleKeyDown); }; }, [isOpen, onClose]);
    if (!isOpen) return null;
    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" onClick={onClose} />
            <motion.div initial={{ scale: 0.95, opacity: 0.8 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} className="fixed inset-0 m-auto w-[95vw] h-[90vh] sm:w-[90vw] sm:h-[85vh] md:w-[80vw] md:max-w-[1000px] md:h-[75vh] flex flex-col bg-brand-dark/80 backdrop-blur-lg rounded-lg md:rounded-xl overflow-hidden shadow-2xl z-50">
                <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div key={selectedItem.id} className="relative w-full h-full max-w-full max-h-full flex items-center justify-center" initial={{ y: 15, scale: 0.98, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 30, mass: 0.7 } }} exit={{ y: -15, scale: 0.98, opacity: 0, transition: { duration: 0.15 } }}>
                            <div className="relative w-auto h-auto max-w-full max-h-full aspect-video rounded-md overflow-hidden shadow-md bg-black/30">
                                <MediaItem item={selectedItem} className="w-full h-full object-contain" />
                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 bg-gradient-to-t from-black/70 via-black/40 to-transparent pointer-events-none">
                                    <h3 className="text-white text-base sm:text-lg md:text-xl font-semibold line-clamp-1">{selectedItem.title}</h3>
                                    <p className="text-white/80 text-xs sm:text-sm mt-1 line-clamp-2">{selectedItem.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                <motion.button className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 p-1.5 rounded-full bg-white/20 text-white/80 hover:bg-white/30 hover:text-white backdrop-blur-sm transition-colors z-50" onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} aria-label="Close modal">
                    <X className='w-4 h-4 sm:w-5 sm:h-5' />
                </motion.button>
            </motion.div>
            <motion.div drag dragMomentum={false} dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }} dragElastic={0.1} initial={{ x: 0, y: 0 }} className="fixed z-[60] left-1/2 bottom-4 sm:bottom-6 -translate-x-1/2 touch-none">
                <motion.div className="relative rounded-xl bg-black/40 backdrop-blur-md border border-white/20 shadow-lg cursor-grab active:cursor-grabbing">
                    <div className="flex items-center -space-x-2 px-3 py-2">
                        {mediaItems.map((item, index) => (
                            <motion.div key={item.id} onClick={(e: React.MouseEvent) => { e.stopPropagation(); setSelectedItem(item); }} style={{ zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index }} className={cn(`relative group w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 flex-shrink-0 rounded-lg overflow-hidden border border-white/10 cursor-pointer hover:z-20 shadow-md`, selectedItem.id === item.id ? 'ring-2 ring-brand-gold/80' : 'hover:ring-2 hover:ring-white/40')} initial={{ rotate: index % 2 === 0 ? -10 : 10, scale: 0.9 }} animate={{ scale: selectedItem.id === item.id ? 1.15 : 1, rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -10 : 10, y: selectedItem.id === item.id ? -6 : 0, }} whileHover={{ scale: 1.25, rotate: 0, y: -8, transition: { type: "spring", stiffness: 400, damping: 20 } }}>
                                <MediaItem item={item} className="w-full h-full" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
                                {selectedItem.id === item.id && (<motion.div layoutId="activeDockGlow" className="absolute -inset-1 bg-brand-gold/30 blur-lg rounded-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />)}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};


// --- InteractiveBentoGallery Component ---
interface InteractiveBentoGalleryProps {
    mediaItems: MediaItemType[];
    title: string;
    description: string;
    className?: string;
}

const InteractiveBentoGallery: React.FC<InteractiveBentoGalleryProps> = ({ mediaItems, title, description, className }) => {
    const [selectedItem, setSelectedItem] = useState<MediaItemType | null>(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);
    const constraintsRef = useRef(null);

    // Simplified handleReorder - not fully implemented for masonry/responsive grid
    const handleReorder = (draggedIndex: number, hoverIndex: number) => {
        // Basic swap logic - might need refinement for grid/column layouts
        const newItems = [...items];
        const temp = newItems[draggedIndex];
        newItems[draggedIndex] = newItems[hoverIndex];
        newItems[hoverIndex] = temp;
        setItems(newItems);
    };


    return (
        <div className={cn("container mx-auto px-4 py-12 sm:py-16", className)}>
            {/* Title and Description */}
            <div className="mb-10 sm:mb-12 text-center">
                <motion.h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-gold" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    {title}
                </motion.h2>
                <motion.p className="mt-3 text-base sm:text-lg text-brand-text/80 max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                    {description}
                </motion.p>
            </div>

        {/* Responsive Grid Container: 1 col -> lg:4 cols (Bento) */}
        <motion.div
            ref={constraintsRef}
            className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:auto-rows-[120px] lg:gap-4" // 1 col default, 4 cols from lg
        >
            {items.map((item, index) => (
                <motion.div
                    key={item.id}
                    layoutId={`media-${item.id}`}
                    // Apply item span only on lg and up, add bottom margin below lg
                    className={cn(
                        "relative overflow-hidden rounded-xl cursor-pointer group shadow-md mb-4 lg:mb-0", // Base styles + mobile/tablet margin
                        item.span // Apply grid span classes (will only take effect from lg:)
                    )}
                    onClick={() => !isDragging && setSelectedItem(item)}
                    variants={{
                            hidden: { y: 30, scale: 0.95, opacity: 0 },
                            visible: { y: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 25, delay: index * 0.05 } }
                        }}
                        initial="hidden"
                        animate="visible"
                        whileHover={{ scale: 1.03, zIndex: 20, transition: { duration: 0.15 } }}
                        drag
                        dragConstraints={constraintsRef}
                        dragElastic={0.2}
                        onDragStart={() => setIsDragging(true)}
                        onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
                    >
                        <MediaItem
                            item={item}
                            className="absolute inset-0 w-full h-full"
                            onClick={() => !isDragging && setSelectedItem(item)}
                        />
                        <motion.div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" initial={{ opacity: 0 }} whileHover={{ opacity: 1 }} />
                        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 bg-gradient-to-t from-black/70 via-black/30 to-transparent pointer-events-none">
                            <h3 className="relative text-white text-xs sm:text-sm md:text-base font-medium line-clamp-1">{item.title}</h3>
                            <p className="relative text-white/70 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-2">{item.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <GalleryModal selectedItem={selectedItem} isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} setSelectedItem={setSelectedItem} mediaItems={items} />
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;
