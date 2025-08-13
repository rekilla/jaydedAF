"use client";

import React, { useState, useEffect, useMemo, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

// --- Constants ---
const FLAVOR_COLORS: Record<string, string> = {
  cucumber: '#9ACD32',
  lemon: '#FFD700',
  lavender: '#B57EDC',
};
const DEFAULT_COLOR = '#888888';

// --- Helper Functions ---
const getContrastingColor = (hex: string): '#FFFFFF' | '#1A1A1A' => {
  if (hex.startsWith('#')) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? '#1A1A1A' : '#FFFFFF';
};

// --- Component Props ---
export interface PerfectServeFabProps {
  showZoneId: string;      // The section where FAB should be visible
  hideZoneIds?: string[];  // Sections where FAB should be hidden (overrides show)
  flavor?: "cucumber" | "lemon" | "lavender" | string;
  colorHex?: string;
  label?: string;
  icon?: ReactNode;
  onClick: () => void;
  position?: { bottom?: number; right?: number; left?: number };
  zIndex?: number;
  portalTargetId?: string;
}

// --- Main Component ---
export const PerfectServeFab: React.FC<PerfectServeFabProps> = ({
  showZoneId,
  hideZoneIds = [],
  flavor,
  colorHex,
  label = "PURCHASE",
  icon = "PURCHASE",
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
    const backgroundColor = colorHex || (flavor && FLAVOR_COLORS[flavor]) || DEFAULT_COLOR;
    if (!colorHex && flavor && !FLAVOR_COLORS[flavor] && process.env.NODE_ENV === 'development') {
      console.warn(`[PerfectServeFab] Unknown flavor "${flavor}" provided. Falling back to default color.`);
    }
    const foregroundColor = getContrastingColor(backgroundColor);

    return {
      '--ps-fab-bg': backgroundColor,
      '--ps-fab-fg': foregroundColor,
      '--ps-fab-shadow': `0 8px 20px -2px ${backgroundColor}55`,
      bottom: position.bottom ? `${position.bottom}px` : undefined,
      right: position.right ? `${position.right}px` : undefined,
      left: position.left ? `${position.left}px` : undefined,
      zIndex,
    } as React.CSSProperties;
  }, [colorHex, flavor, position, zIndex]);

  const fabClasses = `
    fixed rounded-lg flex items-center justify-center
    px-6 h-14 sm:h-16
    cursor-pointer transition-all duration-300 ease-in-out
    focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-black
    bg-[var(--ps-fab-bg)] text-[var(--ps-fab-fg)] shadow-[var(--ps-fab-shadow)]
    transform
    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}
    motion-reduce:transition-none
  `;

  const component = (
    <button
      type="button"
      role="button"
      aria-label={label}
      title={label}
      style={fabStyle}
      className={fabClasses}
      onClick={onClick}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
    >
      {icon}
    </button>
  );

  if (!isMounted || !portalNode) {
    return null;
  }

  return createPortal(component, portalNode);
};

export default PerfectServeFab;