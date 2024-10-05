import { ArrowUpCircle, Award, BookOpen, ChartBar, ChevronLeft, ChevronRight, Code, Cpu, Globe, Lightbulb, Menu, Presentation, Rocket, Smartphone, Telescope, Users, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import CrewMemberCard from './CrewMemberCard';
import GalleryViewer from './GalleryViewer';

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


const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-blue-900 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
);

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
            <span className="text-xl font-bold">AstroPOU</span>
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

const useAutoScroll = (scrollRef, duration = 20000, pauseDuration = 1000) => {
  const [isScrolling, setIsScrolling] = useState(true);
  const scrollPositionRef = useRef(0);
  const lastTimestampRef = useRef(0);
  
  const [, setY] = useSpring(() => ({ y: 0 }));

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    let animationFrameId;
    let pauseStartTime = 0;
    let isPaused = false;

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }
      lastTimestampRef.current = timestamp;

      if (!isScrolling) {
        scrollPositionRef.current = scrollElement.scrollLeft;
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      if (isPaused) {
        if (timestamp - pauseStartTime > pauseDuration) {
          setY({
            y: 0,
            reset: true,
            from: { y: scrollRef.current.scrollLeft },
            config: config.gentle,
            onChange: (props) => {
              scrollRef.current.scrollLeft = props.value.y;
              if (props.value.y < 5) {
                setTimeout(()  => isPaused = false, pauseDuration);
              }
            },
          });
        }
      } else {
        const scrollWidth = scrollElement.scrollWidth - scrollElement.clientWidth;
        scrollPositionRef.current += 0.7;
        
        if (scrollPositionRef.current >= scrollWidth) {
          isPaused = true;
          pauseStartTime = timestamp;
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
    };
  }, [scrollRef, duration, pauseDuration, isScrolling]);

  return setIsScrolling;
};

const NASAPortfolio = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef(null);
  const setIsScrolling = useAutoScroll(scrollRef);

  const [, setY] = useSpring(() => ({ y: 0 }));

  const projectImages = [
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

      <section id="project" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">AstroPOU</h2>
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="text-xl mb-6">
              AstroPOU (Power Of Understanding) is a dynamic immersive experience that educates users about exoplanet research and NASA's Exoplanet Exploration Program through compelling storytelling and interactive mini-games.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <FeatureCard 
              icon={<Smartphone size={32} className="text-blue-400" />}
              title="Multi-Platform"
              description="A lightweight application compatible with Android, iOS, and desktop environments, including Raspberry Pi."
            />
            <FeatureCard 
              icon={<Users size={32} className="text-green-400" />}
              title="Inclusive Design"
              description="Tailored for elementary school students and populations with limited digital resources, featuring accessibility options for those with hearing or visual impairments."
            />
            <FeatureCard 
              icon={<Globe size={32} className="text-yellow-400" />}
              title="Personalized Experience"
              description="Users create accounts specifying their username, country, and language, leading to a customized learning journey."
            />
            <FeatureCard 
              icon={<BookOpen size={32} className="text-purple-400" />}
              title="Educational Content"
              description="Incorporates principles of connectivism and constructivism, with content sourced from NASA's Exoplanets website and the Exoplanet Archive."
            />
            <FeatureCard 
              icon={<Cpu size={32} className="text-red-400" />}
              title="Interactive Learning"
              description="Features mini-games and quizzes to test and reinforce knowledge, making the learning experience enjoyable and effective."
            />
            <FeatureCard 
              icon={<Code size={32} className="text-indigo-400" />}
              title="Technical Innovation"
              description="Developed using Python for compatibility with Raspberry Pi, with potential for real-time data fetching from the Exoplanet Archive API."
            />
          </div>

          <div className="bg-blue-900 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Development Process</h3>
            <p className="text-lg mb-6">
              Our team leveraged a variety of tools and technologies to bring AstroPOU to life:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>IDE:</strong> Visual Studio Code</li>
              <li><strong>Version Control:</strong> Git</li>
              <li><strong>Languages:</strong> Python (demo), HTML5, CSS, JavaScript, and React (web page)</li>
              <li><strong>Design Tools:</strong> Adobe Illustrator, Adobe Photoshop</li>
              <li><strong>Presentation:</strong> Microsoft PowerPoint</li>
            </ul>
            <p className="mt-6 text-lg">
              Our development approach focused on creating a lightweight, accessible solution that could run on various platforms, including resource-constrained devices like Raspberry Pi. We incorporated educational principles and interactive elements to ensure an engaging learning experience for our young audience.
            </p>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-lg">
              With AstroPOU, we aim to inspire young minds to explore the fascinating world of exoplanets and space exploration. By providing an interactive and immersive experience, we hope to cultivate a passion for space and science, stimulate critical thinking skills, and make quality space education accessible to all, regardless of technological resources.
            </p>
          </div>
        </div>
      </section>

      <section id="gallery" className="pt-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center">Project Gallery</h2>
          <GalleryViewer images={projectImages} />
        </div>
      </section>

      <section id="team" className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center">Our Crew</h2>
          <div className="relative" 
               onMouseEnter={() => setIsScrolling(false)}
               onMouseLeave={() => setIsScrolling(true)}>
            <div ref={scrollRef} className="flex overflow-x-scroll space-x-6 no-scrollbar">
              {teamMembers.map((member, index) => (
                <CrewMemberCard key={index} member={member} />
              ))}
            </div>
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <button className="bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300" 
                      onClick={() => scrollTo(-1)}>
                <ChevronLeft size={24} />
              </button>
            </div>
            <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <button className="bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300" 
                      onClick={() => scrollTo(1)}>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </section>

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