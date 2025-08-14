"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';

// --- Component Props ---
export interface PerfectServeFabProps {
  showZoneId: string;      // The section where FAB should be visible
  hideZoneIds?: string[];  // Sections where FAB should be hidden (overrides show)
  onClick: () => void;
  position?: { bottom?: number; right?: number; left?: number };
  zIndex?: number;
  portalTargetId?: string;
}

// --- Main Component ---
export const PerfectServeFab: React.FC<PerfectServeFabProps> = ({
  showZoneId,
  hideZoneIds = [],
  onClick,
  position = { bottom: 24, right: 24 },
  zIndex = 1000,
  portalTargetId,
}) => {
  const [isInShowZone, setIsInShowZone] = useState(false);
  const [hideZonesActive, setHideZonesActive] = useState<Set<string>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
  
  // Calculate if FAB should be visible
  const isVisible = isInShowZone && hideZonesActive.size === 0;

  useEffect(() => {
    setIsMounted(true);
    if (portalTargetId) {
      const node = document.getElementById(portalTargetId);
      if (node) {
        setPortalNode(node);
      } else if (process.env.NODE_ENV === 'development') {
        console.warn(`[PerfectServeFab] Portal target with id "${portalTargetId}" not found.`);
      }
    } else {
      setPortalNode(document.body);
    }
  }, [portalTargetId]);

  useEffect(() => {
    if (typeof window === 'undefined' || !isMounted) return;

    const observers: IntersectionObserver[] = [];
    
    // Setup observer for show zone
    const showZoneEl = document.getElementById(showZoneId);
    if (showZoneEl) {
      const showObserver = new IntersectionObserver(
        ([entry]) => {
          // FAB shows when ANY part of the show zone is visible
          setIsInShowZone(entry.isIntersecting);
          
          if (process.env.NODE_ENV === 'development') {
            console.log(`[FAB] Show zone "${showZoneId}" is ${entry.isIntersecting ? 'visible' : 'not visible'}`);
          }
        },
        {
          rootMargin: '0px',
          threshold: 0 // Trigger as soon as any part enters
        }
      );
      showObserver.observe(showZoneEl);
      observers.push(showObserver);
    } else if (process.env.NODE_ENV === 'development') {
      console.warn(`[PerfectServeFab] Show zone element not found: "${showZoneId}"`);
    }
    
    // Setup observers for hide zones
    hideZoneIds.forEach(zoneId => {
      const hideZoneEl = document.getElementById(zoneId);
      if (hideZoneEl) {
        const hideObserver = new IntersectionObserver(
          ([entry]) => {
            setHideZonesActive(prev => {
              const next = new Set(prev);
              if (entry.isIntersecting) {
                next.add(zoneId);
              } else {
                next.delete(zoneId);
              }
              
              if (process.env.NODE_ENV === 'development') {
                console.log(`[FAB] Hide zone "${zoneId}" is ${entry.isIntersecting ? 'visible' : 'not visible'}`);
                console.log(`[FAB] Active hide zones:`, Array.from(next));
              }
              
              return next;
            });
          },
          {
            rootMargin: '0px',
            threshold: 0
          }
        );
        hideObserver.observe(hideZoneEl);
        observers.push(hideObserver);
      } else if (process.env.NODE_ENV === 'development') {
        console.warn(`[PerfectServeFab] Hide zone element not found: "${zoneId}"`);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [showZoneId, hideZoneIds, isMounted]);

  const fabStyle = useMemo(() => {
    return {
      bottom: position.bottom ? `${position.bottom}px` : undefined,
      right: position.right ? `${position.right}px` : undefined,
      left: position.left ? `${position.left}px` : undefined,
      zIndex,
    } as React.CSSProperties;
  }, [position, zIndex]);

  const fabClasses = `
    fixed w-[127.25px] h-[56px] rounded-none border border-white bg-transparent text-white
    hover:bg-white hover:text-black
    transition-all duration-300
    uppercase tracking-wider text-sm font-light group
    transform
    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
    motion-reduce:transition-none
  `;

  const component = (
    <button
      type="button"
      role="button"
      aria-label="Purchase"
      title="Purchase"
      style={fabStyle}
      className={fabClasses}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      <span className="relative z-10 transition-opacity flex h-full w-full items-center justify-center gap-2">
        <span className="w-3 h-px bg-white group-hover:bg-black"></span>
        Purchase
        <span className="w-3 h-px bg-white group-hover:bg-black"></span>
      </span>
    </button>
  );

  if (!isMounted || !portalNode) {
    return null;
  }

  return createPortal(component, portalNode);
};

export default PerfectServeFab;
