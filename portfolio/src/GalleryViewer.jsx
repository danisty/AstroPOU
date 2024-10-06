import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80",
  "https://images.unsplash.com/photo-1581822261290-991b38693d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80",
  "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80",
  "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80",
  "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80",
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80",
  "https://media.discordapp.net/attachments/1292047329301495843/1292123665021931620/rabbit.jpg?ex=67029770&is=670145f0&hm=b8f1a118659956eef8de93f43713dd598cefddfc292caed610bb0d6466757db5&=&format=webp&width=384&height=579",
  "https://images.unsplash.com/photo-1590341328520-63256eb32bc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80",
  "https://images.unsplash.com/photo-1608178398319-48f814d0750c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2048&h=1024&q=80"
];

const GalleryViewer = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const galleryRef = useRef(null);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0, transform: `translate3d(${100 * direction}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: `translate3d(${-100 * direction}%,0,0)` },
  });

  const changeImage = useCallback((step) => {
    setDirection(step);
    setIndex((prevIndex) => (prevIndex + step + images.length) % images.length);
  }, [images.length]);

  const nextImage = useCallback(() => changeImage(1), [changeImage]);
  const prevImage = useCallback(() => changeImage(-1), [changeImage]);

  const toggleAutoScroll = useCallback(() => {
    setIsAutoScrolling((prev) => !prev);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!isFullscreen) {
      if (galleryRef.current.requestFullscreen) {
        galleryRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen((prev) => !prev);
  }, [isFullscreen]);

  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      interval = setInterval(nextImage, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, nextImage, index]);

  return (
    <div 
      ref={galleryRef} 
      className="relative bg-gray-900 shadow-xl mx-auto rounded-lg w-full max-w-4xl overflow-hidden h-[420px]"
    >
      {transitions((style, i) => (
        <animated.div
          style={{
            ...style,
            position: 'absolute',
            width: '100%',
            height: '100%',
            willChange: 'transform, opacity',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img 
            src={images[i]} 
            alt={`Gallery image ${i + 1}`}
          />
        </animated.div>
      ))}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent p-4">
        <p className="text-center text-white">
          {index + 1} / {images.length}
        </p>
      </div>
      <button 
        onClick={prevImage} 
        className="absolute top-1/2 left-4 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white transform -translate-y-1/2 transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextImage} 
        className="absolute top-1/2 right-4 bg-black/50 hover:bg-black/75 p-2 rounded-full text-white transform -translate-y-1/2 transition-all"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute top-4 right-4 space-x-2">
        <button 
          onClick={toggleAutoScroll} 
          className="bg-black/50 hover:bg-black/75 p-2 rounded-full text-white transition-all"
          aria-label={isAutoScrolling ? "Pause auto-scroll" : "Start auto-scroll"}
        >
          {isAutoScrolling ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button 
          onClick={toggleFullscreen} 
          className="bg-black/50 hover:bg-black/75 p-2 rounded-full text-white transition-all"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </div>
  );
};

export default GalleryViewer;