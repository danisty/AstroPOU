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
              src="./PXL_20241006_073814640.RAW-01.MP.COVER.jpg" 
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
              src="./sketch.png" 
              alt="Initial project ideas" 
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="bg-blue-900 shadow-lg mt-10 rounded-lg overflow-hidden">
            <img 
              src="./game.png" 
              alt="Initial project ideas" 
              className="w-full h-auto"
            />
          </div>
      </div>
    </section>
  );
};

export default ProjectDev;