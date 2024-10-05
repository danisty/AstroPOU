import { ChevronRight } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import CrewMemberCard from './CrewMemberCard'

const exoplanets = [
    {
      name: "Hot Jupiter",
      description: "A gas giant planet orbiting very close to its star.",
      image: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80"
    },
    {
      name: "Super-Earth",
      description: "A rocky planet larger than Earth but smaller than Neptune.",
      image: "https://images.unsplash.com/photo-1451562545042-681ab85cf788?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80"
    },
    {
      name: "Mini-Neptune",
      description: "A planet smaller than Neptune but larger than Earth, with a thick atmosphere.",
      image: "https://images.unsplash.com/photo-1543722530-d2c3201371e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450&q=80"
    }
  ];
  
  const ExoplanetCard = ({ exoplanet, isActive }) => {
    const { opacity, transform } = useSpring({
      opacity: isActive ? 1 : 0.3,
      transform: `scale(${isActive ? 1.1 : 1})`,
      config: config.wobbly,
    });
  
    return (
      <animated.div 
        style={{ opacity, transform }}
        className="relative shadow-lg rounded-lg w-64 h-36 overflow-hidden"
      >
        <img src={exoplanet.image} alt={exoplanet.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="bottom-0 left-0 absolute p-4">
          <h3 className="font-semibold text-lg text-white">{exoplanet.name}</h3>
        </div>
      </animated.div>
    );
  };
  
  const MissionControl = () => {
    const [activeExoplanet, setActiveExoplanet] = useState(0);
  
    useEffect(() => {
      const interval = setInterval(() => {
        setActiveExoplanet((prev) => (prev + 1) % exoplanets.length);
      }, 5000);
      return () => clearInterval(interval);
    }, []);
  
    return (
      <section id="home" className="flex flex-col justify-center items-center bg-gray-900 py-20 min-h-screen">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-bold text-5xl">Chronicles of Exoplanet Exploration</h2>
          <p className="mb-8 text-xl">Embark on a thrilling journey to revolutionize exoplanet education!</p>
        </div>
        <div className="relative w-full max-w-4xl">
          <div className="flex justify-center items-center space-x-8">
            {exoplanets.map((exoplanet, index) => (
              <ExoplanetCard 
                key={exoplanet.name} 
                exoplanet={exoplanet} 
                isActive={index === activeExoplanet} 
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <h3 className="mb-2 font-semibold text-2xl">{exoplanets[activeExoplanet].name}</h3>
            <p className="text-lg">{exoplanets[activeExoplanet].description}</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="mb-6 text-xl">Join us in creating engaging and accessible learning materials about exoplanets!</p>
          <a href="#team" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-bold text-white transition duration-300">
            Meet Our Team
            <ChevronRight className="ml-2" />
          </a>
        </div>
      </section>
    );
  };

export default MissionControl;