import { BookOpen, Code, Cpu, Globe, Smartphone, Users } from 'lucide-react';
import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-blue-900 shadow-lg hover:shadow-xl p-6 rounded-lg transition-all duration-300">
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <h3 className="font-bold text-xl">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
);

const ProjectDescription = () => {
  return (
    <section id="project" className="bg-gray-900 py-20">
      <div className="mx-auto px-4 container">
        <h2 className="mb-8 font-bold text-4xl text-center">ExoQuest</h2>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-6 text-xl">
            ExoQuest is a dynamic immersive experience that educates users about exoplanet research and NASA's Exoplanet Exploration Program through compelling storytelling and interactive mini-games.
          </p>
        </div>

        <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
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

        <div className="bg-blue-900 shadow-lg p-8 rounded-lg">
          <h3 className="mb-4 font-bold text-2xl">Development Process</h3>
          <p className="mb-6 text-lg">
            Our team leveraged a variety of tools and technologies to bring ExoQuest to life:
          </p>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>IDE:</strong> Visual Studio Code</li>
            <li><strong>Version Control:</strong> Git</li>
            <li><strong>Languages:</strong> Python (demo), HTML5, CSS, JavaScript, TailwindCSS, and React (web page)</li>
            <li><strong>Design Tools:</strong> Adobe Illustrator, Adobe Photoshop</li>
            <li><strong>Presentation:</strong> Microsoft PowerPoint</li>
          </ul>
          <p className="mt-6 text-lg">
            Our development approach focused on creating a lightweight, accessible solution that could run on various platforms, including resource-constrained devices like Raspberry Pi. We incorporated educational principles and interactive elements to ensure an engaging learning experience for our young audience.
          </p>
        </div>

        <div className="mt-12 text-center">
          <h3 className="mb-4 font-bold text-2xl">Our Vision</h3>
          <p className="text-lg">
            With ExoQuest, we aim to inspire young minds to explore the fascinating world of exoplanets and space exploration. By providing an interactive and immersive experience, we hope to cultivate a passion for space and science, stimulate critical thinking skills, and make quality space education accessible to all, regardless of technological resources.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectDescription;