import React, { useState, useEffect, useRef } from 'react';
import { ArrowUpCircle, Menu, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';
import CrewMemberCard from './CrewMemberCard';

const teamMembers = [
  {
    name: "Abel Gandía Ruiz",
    role: "Mission Specialist",
    description: "Leading innovative projects with expertise in advanced propulsion systems and spacecraft design.",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=225&q=80"
  },
  {
    name: "Miquel Ivorra Mollà",
    role: "Data Science Commander",
    description: "Pioneering data-driven approaches to space exploration and satellite communications.",
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=225&q=80"
  },
  {
    name: "Sergio Muñoz Vázquez",
    role: "Aerospace Engineer",
    description: "Developing cutting-edge technologies for next-generation space vehicles and habitats.",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=225&q=80"
  },
  {
    name: "Alex García Martínez",
    role: "Astrophysics Researcher",
    description: "Unraveling the mysteries of the universe through advanced computational models and observations.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=225&q=80"
  },
  {
    name: "Lucas Alberola Pastor",
    role: "Robotics Specialist",
    description: "Creating autonomous systems for space exploration and planetary surface operations.",
    image: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=225&q=80"
  },
  {
    name: "Javier Antón Sala",
    role: "Exoplanet Hunter",
    description: "Leading the search for habitable worlds beyond our solar system using state-of-the-art detection methods.",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=225&q=80"
  }
];

const useAutoScroll = (scrollRef, duration = 20000, pauseDuration = 3000) => {
  const [isScrolling, setIsScrolling] = useState(true);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationFrameId;
    let startTime;
    let pauseStartTime = 0;
    let isPaused = false;

    const animate = (timestamp) => {
      if (!isScrolling) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;

      if (isPaused) {
        if (timestamp - pauseStartTime > pauseDuration) {
          isPaused = false;
          startTime = timestamp - elapsedTime;
        }
      } else {
        const progress = (elapsedTime % duration) / duration;
        const scrollPosition = progress * (scrollElement.scrollWidth - scrollElement.clientWidth);
        scrollElement.scrollLeft = scrollPosition;

        if (elapsedTime % duration < 100) {
          isPaused = true;
          pauseStartTime = timestamp;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [scrollRef, duration, pauseDuration, isScrolling]);

  return setIsScrolling;
};

const NASAPortfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef(null);
  const setIsScrolling = useAutoScroll(scrollRef);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Header */}
      <header className="bg-blue-900 bg-opacity-80 fixed w-full z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Galactic Professionals</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="#home" className="hover:text-blue-300">Mission Control</a></li>
              <li><a href="#team" className="hover:text-blue-300">Crew</a></li>
            </ul>
          </nav>
          <button onClick={toggleMobileMenu} className="md:hidden">
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden bg-blue-800 p-4">
            <ul className="space-y-2">
              <li><a href="#home" className="block hover:text-blue-300" onClick={toggleMobileMenu}>Mission Control</a></li>
              <li><a href="#team" className="block hover:text-blue-300" onClick={toggleMobileMenu}>Crew</a></li>
            </ul>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80')", backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
        <div className="text-center">
          <h2 className="text-5xl font-bold mb-4">Exploring New Frontiers in Technology</h2>
          <p className="text-xl mb-8">Join our mission to push the boundaries of innovation</p>
          <a href="#team" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Meet the Crew
          </a>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Elite Crew</h2>
          <div className="relative" 
               onMouseEnter={() => setIsScrolling(false)}
               onMouseLeave={() => setIsScrolling(true)}>
            <div ref={scrollRef} className="flex overflow-x-hidden space-x-6 pb-8 hide-scrollbar">
              {teamMembers.map((member, index) => (
                <CrewMemberCard key={index} member={member} index={index} />
              ))}
            </div>
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
              <button className="bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300" onClick={() => scrollRef.current.scrollBy(-300, 0)}>
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
              <button className="bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300" onClick={() => scrollRef.current.scrollBy(300, 0)}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 py-8 text-center">
        <p>&copy; 2024 Galactic Professionals. All rights reserved. Ad astra per aspera.</p>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
        >
          <ArrowUpCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default NASAPortfolio;