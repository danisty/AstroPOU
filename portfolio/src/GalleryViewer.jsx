import React, { useState, useEffect, useRef } from 'react';
import { useTransition, animated } from 'react-spring';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play } from 'lucide-react';

const GalleryViewer = ({ images }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const galleryRef = useRef(null);

  const transitions = useTransition(index, {
    key: index,
    from: { opacity: 0, transform: `translate3d(${100 * direction}%,0,0)` },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: `translate3d(${-100 * direction}%,0,0)` },
  });

  const nextImage = () => {
    setDirection(1);
    setIndex((state) => (state + 1) % images.length);
  };

  const prevImage = () => {
    setDirection(-1);
    setIndex((state) => (state - 1 + images.length) % images.length);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling((prev) => !prev);
  };

  const toggleFullscreen = () => {
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
  };

  useEffect(() => {
    let interval;
    if (isAutoScrolling) {
      setDirection(1);
      interval = setInterval(nextImage, 5000); // Change image every 5 seconds
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, index]);

  return (
    <div 
      ref={galleryRef} 
      className="relative bg-gray-900 shadow-xl mx-auto rounded-lg w-full max-w-4xl overflow-hidden"
      style={{ height: '370px' }}
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
            className="max-w-full max-h-full"
          />
        </animated.div>
      ))}
      <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black to-transparent p-4">
        <p className="text-center text-white">
          {index + 1} / {images.length}
        </p>
      </div>
      <button 
        onClick={prevImage} 
        className="top-1/2 left-4 absolute bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-white transform transition-all -translate-y-1/2"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextImage} 
        className="top-1/2 right-4 absolute bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-white transform transition-all -translate-y-1/2"
      >
        <ChevronRight size={24} />
      </button>
      <div className="top-4 right-4 absolute space-x-2">
        <button 
          onClick={toggleAutoScroll} 
          className="bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-white transition-all"
        >
          {isAutoScrolling ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button 
          onClick={toggleFullscreen} 
          className="bg-black bg-opacity-50 hover:bg-opacity-75 p-2 rounded-full text-white transition-all"
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </div>
    </div>
  );
};

export default GalleryViewer;