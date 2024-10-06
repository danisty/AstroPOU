import { ArrowUpCircle, Award, Menu, Presentation, Rocket, Users, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import CrewViewer from './CrewViewer';
import GalleryViewer from './GalleryViewer';
import ProjectDescription from './ProjectDescription';
import ProjectDev from './ProjectDev';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
  
    const headerAnimation = useSpring({
      backgroundColor: scrolled ? 'rgba(17, 24, 39, 0.9)' : 'rgba(17, 24, 39, 0)',
      boxShadow: scrolled ? '0 2px 4px rgba(0,0,0,.1)' : '0 0px 0px rgba(0,0,0,0)',
      config: config.slow,
    });
  
    const logoAnimation = useSpring({
      transform: scrolled ? 'scale(0.8)' : 'scale(1)',
      config: config.wobbly,
    });
  
    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 50);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  
    const navItems = [
      { name: 'Project', href: '#project', icon: <Presentation size={20} /> },
      { name: 'Challenge', href: 'https://www.spaceappschallenge.org/nasa-space-apps-2024/challenges/chronicles-of-exoplanet-exploration/', icon: <Award size={20} /> },
      { name: 'Crew', href: '#team', icon: <Users size={20} /> },
    ];
  
    return (
      <animated.header style={headerAnimation} className="fixed w-full z-50 transition-all duration-300">
        <div className="px-4 py-4 flex justify-between items-center">
          <animated.div style={logoAnimation} className="flex items-center space-x-4">
            <Rocket size={32} className="text-blue-400" />
            <span className="text-xl font-bold">ExoQuest</span>
          </animated.div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200">
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button onClick={toggleMobileMenu} className="md:hidden text-white">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="md:hidden bg-gray-800 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href} 
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
                    onClick={toggleMobileMenu}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </animated.header>
    );
  };

const NASAPortfolio = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Header />

      <section id="home" className="h-screen flex items-center justify-center px-10" style={{backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&h=1080&q=80')", backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">Chronicles of Exoplanet Exploration</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We're a team of passionate students from the University of Alicante, taking on the Chronicles of Exoplanet Exploration challenge. Our mission: to revolutionize how people learn about the wonders of exoplanets through innovation and creativity.
          </p>
          <a href="#team" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Meet the Crew
          </a>
          <a href="https://github.com/danisty/AstroPOU" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ml-4">
            Source code
          </a>
        </div>
      </section>

      <ProjectDescription />

      <ProjectDev />

      <section id="gallery" className="pt-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Gallery</h2>
          <GalleryViewer />
        </div>
      </section>

      <CrewViewer />

      <footer className="bg-blue-900 py-8 text-center">
        <p>&copy; 2024 AstroPOU. All rights reserved. Ad astra per aspera.</p>
      </footer>

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