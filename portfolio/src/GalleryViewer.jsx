import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Pause, Play } from 'lucide-react';

const images = [
  "https://media.discordapp.net/attachments/1292047329301495843/1292087293049307247/PXL_20241005_083414889.jpg?ex=67031e50&is=6701ccd0&hm=472b06fd8ffd49b6d3924465f29cec7c49d3f96a5bb6e7d380e44281460abd8d",
  "https://media.discordapp.net/attachments/723112662954672128/1292419109484498974/PXL_20241005_124456497.jpg?ex=6703aa97&is=67025917&hm=f86707c14ebb00ad47e0d42c41eb456cb7f4fa3f338110ae359b952f85ce16ef",
  "https://media.discordapp.net/attachments/723112662954672128/1292419110067503196/PXL_20241005_115607370.RAW-01.MP.COVER.jpg?ex=6703aa97&is=67025917&hm=370e7e3931e66c600c949e3c943afa600d9c738bf7109311d4b390f5aabf0c6f",
  "https://media.discordapp.net/attachments/723112662954672128/1292419110608830474/PXL_20241004_165006234.jpg?ex=6703aa97&is=67025917&hm=aa452d9089c8d07431ec2f9a906f240a055219be676d947d3099e8a4ded0dff9",
  "https://media.discordapp.net/attachments/1292047329301495843/1292087292302983178/PXL_20241005_110325389.jpg?ex=67031e50&is=6701ccd0&hm=ac1b0fa201d0caba78842d3ac0d1ef23c7cc6a43cb29615e795d04aff58f3145"
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
      className="relative bg-gray-900 shadow-xl mx-auto rounded-lg w-full max-w-4xl h-[420px] overflow-hidden"
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
      <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-black to-transparent p-4">
        <p className="text-center text-white">
          {index + 1} / {images.length}
        </p>
      </div>
      <button 
        onClick={prevImage} 
        className="top-1/2 left-4 absolute bg-black/50 hover:bg-black/75 p-2 rounded-full text-white transform transition-all -translate-y-1/2"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextImage} 
        className="top-1/2 right-4 absolute bg-black/50 hover:bg-black/75 p-2 rounded-full text-white transform transition-all -translate-y-1/2"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>
      <div className="top-4 right-4 absolute space-x-2">
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