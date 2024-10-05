import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const CrewMemberCard = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  const { scale, opacity } = useSpring({
    scale: isHovered ? 1.05 : 1,
    opacity: isHovered ? 1 : 0.9,
    config: config.wobbly,
  });

  return (
    <animated.div
      style={{ 
        transform: scale.to(s => `scale(${s})`),
        opacity 
      }}
      className="flex-none bg-gray-800 shadow-lg rounded-lg w-64 transition-all duration-300 overflow-hidden ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-36">
        <img 
          src={member.image} 
          alt={member.name} 
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        <div className="bottom-0 left-0 absolute p-4">
          <h3 className="font-semibold text-lg text-white">{member.name}</h3>
          <p className="text-blue-300 text-sm">{member.role}</p>
        </div>
      </div>
      <div className="p-4 h-20">
        <p className="line-clamp-3 text-gray-300 text-sm">{member.description}</p>
      </div>
    </animated.div>
  );
};

export default CrewMemberCard;