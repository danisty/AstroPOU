import React from 'react';
import { Lightbulb, Notebook } from 'lucide-react';

const ProjectDev = () => {
  return (
    <section id="project-ideas" className="bg-gray-800 pt-20">
      <div className="mx-auto px-4 max-w-[930px] container">
        <h2 className="mb-12 font-bold text-4xl text-center">Project Development</h2>
        <div className="items-center gap-8 grid grid-cols-1 md:grid-cols-2">
          <div className="bg-blue-900 shadow-lg rounded-lg overflow-hidden">
            <img 
              src="https://media.discordapp.net/attachments/723112662954672128/1292413513222062111/PXL_20241006_073814640.RAW-01.MP.COVER.jpg?ex=6703a561&is=670253e1&hm=5793a1a207ea25bf2088aedbc9b27b9dc6627fd0591286074c5221b4741002fb" 
              alt="Initial project ideas" 
              className="w-full h-auto"
            />
          </div>
          <div className="bg-blue-900 shadow-lg p-6 rounded-lg">
            <h3 className="flex items-center mb-4 font-bold text-2xl">
              <Lightbulb className="mr-2" size={24} />
              Initial Brainstorming
            </h3>
            <p className="text-gray-300">
              First brainstorming session for the ExoQuest project. It showcases the main ideas and features we planned to incorporate into our exoplanet education game. From localization aspects to mini-games simulating astronomical research, this early concept map laid the foundation for our development process.
            </p>
          </div>
        </div>
        <div className="items-center gap-8 grid grid-cols-1 md:grid-cols-2 mt-10">
          <div className="bg-blue-900 shadow-lg p-6 rounded-lg">
            <h3 className="flex items-center mb-4 font-bold text-2xl">
              <Notebook className="mr-2" size={24} />
              Game Design Sketches
            </h3>
            <p className="text-gray-300">
            These sketches and wireframes outline the user interface and flow of ExoQuest. They showcase our process of translating initial concepts into game mechanics, including language selection, exoplanet discovery features, and satellite-based gameplay elements.
            </p>
          </div>
          <div className="bg-blue-900 shadow-lg rounded-lg overflow-hidden">
            <img 
              src="https://media.discordapp.net/attachments/1292047329301495843/1292189901076299857/image.png?ex=67037de0&is=67022c60&hm=4dfed5d13279e53dcc8f4ef468776f3307183e29cd8e1f7c72f7786a013a63b1" 
              alt="Initial project ideas" 
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="bg-blue-900 shadow-lg mt-10 rounded-lg overflow-hidden">
            <img 
              src="https://media.discordapp.net/attachments/1292047329301495843/1292418337380241458/image.png?ex=6703a9df&is=6702585f&hm=9d69a3954c55e616975f1e14eeac36594ff3857c7425de96545fe32087cc08ef" 
              alt="Initial project ideas" 
              className="w-full h-auto"
            />
          </div>
      </div>
    </section>
  );
};

export default ProjectDev;