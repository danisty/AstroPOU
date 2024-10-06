import { ChevronLeft, ChevronRight, Github, Linkedin } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { config, useSpring } from 'react-spring';
import { animated } from 'react-spring';

const teamMembers = [
  {
    name: "Abel Gandía Ruiz",
    role: "Estudiante en Ingeniería Informática",
    image: "https://media.discordapp.net/attachments/723112662954672128/1292113060428906496/PXL_20241005_130906833.PORTRAIT.ORIGINAL2.jpg?ex=67028d8f&is=67013c0f&hm=ee56468b26ef62fc2947ae2a7fae9a4cca0f53d2980f7a60845358e01ff30812",
    github: "https://github.com/danisty",
    linkedin: "https://www.linkedin.com/in/abel-gand%C3%ADa-ruiz-5369a130b/"
  },
  {
    name: "Miquel Ivorra Mollà",
    role: "Estudiante en Ingeniería Informática",
    image: "https://media.discordapp.net/attachments/1202556644815540245/1292122258567073933/PXL_20241005_135151611.PORTRAIT.ORIGINAL2.jpg?ex=67029620&is=670144a0&hm=ece1ad4a2dc87a2ed4912bb1ae7eca3c19fc48fae991dd20eb7553f409d6fbf6",
    github: "https://github.com/mim29-ua",
    linkedin: "https://www.linkedin.com/in/miquel-ivorra-molla-344a27291/"
  },
  {
    name: "Sergio Muñoz Vázquez",
    role: "Estudiante en Ingeniería Informática",
    image: "https://media.discordapp.net/attachments/1202556644815540245/1292122440390017135/PXL_20241005_135117526.PORTRAIT.ORIGINAL.jpg?ex=6702964c&is=670144cc&hm=d102b101ce47c845ce226a5f4f416fe2d2647219f89fa6c92b195427f4763e3c",
    github: "https://github.com/smv58-ua",
    linkedin: "https://www.linkedin.com/in/sergio-mu%C3%B1oz-v%C3%A1zquez-987190325/"
  },
  {
    name: "Alex García Martínez",
    role: "Estudiante en Ingeniería Informática",
    image: "https://media.discordapp.net/attachments/1202556644815540245/1292110617632833556/PXL_20241005_130448793.PORTRAIT.ORIGINAL.jpg?ex=67028b49&is=670139c9&hm=7c7b8009933c4b42d5d424487132683187eba34c16e8daf59063e5159d9ccf89",
    github: "https://github.com/agm454-ua",
    linkedin: "https://www.linkedin.com/in/alex-garcia-martinez-0b1a5a319/"
  },
  {
    name: "Lucas Alberola Pastor",
    role: "Estudiante en Ingeniería Informática",
    image: "https://media.discordapp.net/attachments/1202556644815540245/1292111874787381372/PXL_20241005_131011213.PORTRAIT.ORIGINAL.jpg?ex=67028c75&is=67013af5&hm=f815022469421afe57d19010deb4f8fff4ef60dcb486145e682ca0562d1cb0d8"
  },
  {
    name: "Javier Antón Sala",
    role: "Estudiante en Ingeniería Informática",
    image: "https://media.discordapp.net/attachments/1202556644815540245/1292112250362134619/PXL_20241005_131228562.PORTRAIT.jpg?ex=67028cce&is=67013b4e&hm=08f9c84075ee582e2b4e01ac578a89bac43f523b361e3bc8c8398ca2375247e0",
    github: "https://github.com/jas77-ua",
    linkedin: "https://www.linkedin.com/in/javier-ant%C3%B3n-sala-1b979524a/"
  }
];

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
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(17,24,39,0.80)_0%,rgba(17,24,39,0)_30%,rgba(17,24,39,0)_80%,rgba(17,24,39,0.70)_100%)]"></div>
        <div className="bottom-0 left-0 absolute p-4">
          <h3 className="font-semibold text-lg text-white">{member.name}</h3>
          <p className="text-blue-300 text-sm">{member.role}</p>
        </div>
        <div className="absolute flex justify-between items-center px-4 py-4 w-full">
          <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors duration-200">
            <Github size={24} />
          </a>
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors duration-200">
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </animated.div>
  );
};

const useAutoScroll = (scrollRef, duration = 20000, pauseDuration = 2000) => {
  const [isScrolling, setIsScrolling] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const pauseStartTime = useRef(0);
  const scrollPositionRef = useRef(0);
  const lastTimestampRef = useRef(0);
  
  const [, setY] = useSpring(() => ({ y: 0 }));

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationFrameId;
    let timeout;

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }
      lastTimestampRef.current = timestamp;

      if (!isScrolling) {
        scrollPositionRef.current = scrollElement.scrollLeft;
        animationFrameId = requestAnimationFrame(animate);

        pauseStartTime.current = timestamp;
        setIsPaused(true);

        return;
      }

      const scrollWidth = scrollElement.scrollWidth - scrollElement.clientWidth;

      if (isPaused) {
        if (timestamp - pauseStartTime.current > pauseDuration) {
          if (scrollPositionRef.current >= scrollWidth) {
            setY({
              y: 0,
              reset: true,
              from: { y: scrollRef.current.scrollLeft },
              config: config.gentle,
              onChange: (props) => {
                scrollRef.current.scrollLeft = props.value.y;
                if (props.value.y < 5) {
                  timeout = setTimeout(()  => setIsPaused(false), pauseDuration);
                }
              },
            });
          } else {
            timeout = setTimeout(() => setIsPaused(false), pauseDuration)
          }
        }
      } else {
        scrollPositionRef.current += 0.7;
        
        if (scrollPositionRef.current >= scrollWidth) {
          pauseStartTime.current = timestamp;
          setIsPaused(true);
        }

        scrollElement.scrollLeft = scrollPositionRef.current;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleScroll = () => {
      scrollPositionRef.current = scrollElement.scrollLeft;
    };

    scrollElement.addEventListener('scroll', handleScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollElement.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [scrollRef, duration, pauseDuration, isScrolling, isPaused]);

  return setIsScrolling;
};

const CrewViewer = () => {
  const scrollRef = useRef(null);
  const setIsScrolling = useAutoScroll(scrollRef);

  const [, setY] = useSpring(() => ({ y: 0 }));

  const scrollTo = (direction) => {
    const element = scrollRef.current;
    const currentScroll = element.scrollLeft;
    const targetScroll = currentScroll + direction * 300;

    setY({
      y: targetScroll,
      reset: true,
      from: { y: currentScroll },
      config: config.default,
      onChange: (props) => {
        element.scrollLeft = props.value.y;
      },
    });
  };

  return (
    <section id="team" className="bg-gray-800 py-16">
      <div className="mx-auto px-4 container">
        <h2 className="mb-12 font-bold text-4xl text-center">Our Crew</h2>
        <div className="relative"
          onMouseEnter={() => setIsScrolling(false)}
          onMouseLeave={() => setIsScrolling(true)}>
          <div ref={scrollRef} className="flex space-x-6 overflow-x-scroll no-scrollbar">
            {teamMembers.map((member, index) => (
              <CrewMemberCard key={index} member={member} />
            ))}
          </div>
          <div className="top-1/2 left-2 absolute transform -translate-y-1/2">
            <button className="bg-blue-600 hover:bg-blue-700 shadow-lg p-2 rounded-full transition duration-300"
              onClick={() => scrollTo(-1)}>
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="top-1/2 right-2 absolute transform -translate-y-1/2">
            <button className="bg-blue-600 hover:bg-blue-700 shadow-lg p-2 rounded-full transition duration-300"
              onClick={() => scrollTo(1)}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CrewViewer;