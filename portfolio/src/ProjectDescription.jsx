import { BookOpen, Code, Cpu, Globe, Smartphone, Users } from 'lucide-react';
import React from 'react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-blue-900 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
    <div className="flex items-center space-x-4 mb-4">
      {icon}
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <p className="text-gray-300">{description}</p>
  </div>
);

const ProjectDescription = () => {
  return (
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
  );
};

export default ProjectDescription;