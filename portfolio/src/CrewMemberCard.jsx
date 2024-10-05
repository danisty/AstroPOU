import { Github, Linkedin } from 'lucide-react';
import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const CrewMemberCard = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { opacity } = useSpring({
    scale: isHovered ? 1.05 : 1,
    opacity: isHovered ? 1 : 0.9,
    config: config.wobbly,
  });

  return (
    <animated.div
      style={{ 
        opacity 
      }}
      className="flex-none bg-gray-800 shadow-lg rounded-lg w-64 transition-all duration-300 overflow-hidden ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-96">
        <img 
          src={member.image} 
          alt={member.name} 
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-20% via-transparent to-9% to-gray-900/40"></div>
        <div className="bottom-0 left-0 absolute p-4">
          <h3 className="font-semibold text-lg text-white">{member.name}</h3>
          <p className="text-blue-300 text-sm">{member.role}</p>
        </div>
        <div className="absolute flex justify-between items-center px-4 py-4 w-full">
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
            <Github size={24} />
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors duration-200">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </animated.div>
  );
};

export default CrewMemberCard;