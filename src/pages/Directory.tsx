import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Droplet, Mail, Phone, Edit3, X, Github, Linkedin, Twitter, Instagram, Briefcase } from 'lucide-react';

interface BatchMate {
  id: number;
  name: string;
  picture: string;
  dob: string;
  bloodGroup: string;
  description: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  email?: string;
  phone?: string;
  profession?: string;
  location?: string;
}

const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMate, setSelectedMate] = useState<BatchMate | null>(null);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Sample data for 50 people
  const [batchmates, setBatchmates] = useState<BatchMate[]>(
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Alexandra Chen ${i + 1}`,
      picture: `/api/placeholder/150/150`,
      dob: `199${i % 10}-0${(i % 9) + 1}-1${(i % 9) + 1}`,
      bloodGroup: i % 4 === 0 ? 'A+' : i % 4 === 1 ? 'B+' : i % 4 === 2 ? 'O+' : 'AB+',
      description: `Senior ${i % 3 === 0 ? 'Product Manager' : i % 3 === 1 ? 'Design Director' : 'Technology Lead'} with extensive experience in digital transformation and strategic innovation. Passionate about creating meaningful solutions that drive business growth and enhance user experiences.`,
      socialMedia: {
        instagram: `https://instagram.com/alex${i + 1}`,
        twitter: `https://twitter.com/alex${i + 1}`,
        linkedin: `https://linkedin.com/in/alex${i + 1}`,
        github: i % 2 === 0 ? `https://github.com/alex${i + 1}` : undefined,
      },
      email: `alexandra.chen${i + 1}@company.com`,
      phone: `+1 (555) 123-${String(i + 1).padStart(4, '0')}`,
      profession: i % 3 === 0 ? 'Senior Product Manager' : i % 3 === 1 ? 'Design Director' : 'Technology Lead',
      location: `${['New York', 'San Francisco', 'London', 'Toronto', 'Sydney'][i % 5]}, ${['USA', 'USA', 'UK', 'Canada', 'Australia'][i % 5]}`,
    }))
  );

  const filteredBatchmates = batchmates.filter(mate =>
    mate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SocialIcon = ({ platform, url }: { platform: string; url?: string }) => {
    if (!url) return null;
    
    const icons = {
      instagram: Instagram,
      twitter: Twitter,
      linkedin: Linkedin,
      github: Github,
    };
    
    const Icon = icons[platform as keyof typeof icons];
    
    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all duration-200 group"
      >
        <Icon size={16} className="text-zinc-600 group-hover:text-zinc-800 transition-colors duration-200" />
      </a>
    );
  };

  return (
    <div className="min-h-screen relative bg-black overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-blue-900/30 animate-gradient"></div>
      </div>
      
      {/* Floating Particles */}
      <div className="fixed inset-0 opacity-30">
        <div id="particles-js" className="absolute inset-0"></div>
      </div>
      
      {/* Glowing Orbs */}
      <div className="fixed inset-0 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div 
            key={i}
            className={`absolute rounded-full blur-3xl animate-float-${i+1}`}
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 255)}, 0.15), transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 20}s`
            }}
          />
        ))}
      </div>
      
      {/* Digital Circuit Lines */}
      <div className="fixed inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10 10 H90 V90 H10 Z" fill="none" stroke="#4F46E5" strokeWidth="0.5" />
              <circle cx="10" cy="10" r="2" fill="#4F46E5" />
              <circle cx="90" cy="90" r="2" fill="#4F46E5" />
              <path d="M10 50 H40 V90" fill="none" stroke="#4F46E5" strokeWidth="0.5" />
              <path d="M50 10 V40 H90" fill="none" stroke="#4F46E5" strokeWidth="0.5" />
              <circle cx="40" cy="90" r="2" fill="#4F46E5" />
              <circle cx="90" cy="40" r="2" fill="#4F46E5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl font-light text-white mb-3 tracking-tight">
              Batch 16 Directory
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent mx-auto mb-8"></div>
            <p className="text-zinc-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Connect with exceptional professionals from our distinguished cohort, 
              building meaningful relationships across industries and borders.
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative z-10 px-6 mb-16">
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <Search className="text-zinc-500" size={20} />
            </div>
            <input
              type="text"
              placeholder="Search professionals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-zinc-900/80 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:bg-zinc-900/90 transition-all duration-200 text-sm"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-zinc-600 text-sm">
              {filteredBatchmates.length} members
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBatchmates.map((mate, index) => (
              <div
                key={mate.id}
                onClick={() => setSelectedMate(mate)}
                onMouseEnter={() => setHoveredCard(mate.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group cursor-pointer slide-up-animation"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="relative bg-gradient-to-b from-zinc-900/30 to-zinc-900/20 backdrop-blur-md border border-zinc-800/50 hover:border-zinc-700/70 transition-all duration-300 overflow-hidden h-full">
                  {/* Content */}
                  <div className="relative p-6">
                    {/* Profile Section */}
                    <div className="mb-6">
                      <div className="relative w-16 h-16 mx-auto mb-4">
                        <img
                          src={mate.picture}
                          alt={mate.name}
                          className="w-full h-full object-cover rounded-full border-2 border-zinc-700 group-hover:border-zinc-600 transition-colors duration-300"
                        />
                      </div>
                      <div className="text-center">
                        <h3 className="text-white font-medium text-lg mb-1 group-hover:text-zinc-200 transition-colors duration-300">
                          {mate.name}
                        </h3>
                        <p className="text-zinc-400 text-sm font-light">
                          {mate.profession}
                        </p>
                      </div>
                    </div>
                    {/* Minimal Info */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center text-zinc-500 text-sm">
                        <MapPin size={14} className="mr-2 flex-shrink-0" />
                        <span className="font-light truncate">{mate.location}</span>
                      </div>
                    </div>
                    {/* Social Links */}
                    <div className="flex justify-center space-x-3">
                      {Object.entries(mate.socialMedia).map(([platform, url]) => (
                        <SocialIcon key={platform} platform={platform} url={url} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedMate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
          <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMate(null)}
              className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all duration-200"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="p-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-8 mb-8">
                <div className="relative">
                  <img
                    src={selectedMate.picture}
                    alt={selectedMate.name}
                    className="w-28 h-28 object-cover rounded-full border-2 border-zinc-700"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-light text-white mb-2">
                    {selectedMate.name}
                  </h2>
                  <div className="flex items-center text-zinc-400 mb-4">
                    <Briefcase size={16} className="mr-2" />
                    <span className="font-light">{selectedMate.profession}</span>
                  </div>
                  <div className="flex items-center text-zinc-500">
                    <MapPin size={16} className="mr-2" />
                    <span className="font-light">{selectedMate.location}</span>
                  </div>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  { icon: Calendar, label: 'Date of Birth', value: selectedMate.dob },
                  { icon: Droplet, label: 'Blood Group', value: selectedMate.bloodGroup },
                  { icon: Mail, label: 'Email', value: selectedMate.email },
                  { icon: Phone, label: 'Phone', value: selectedMate.phone },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="border border-zinc-800 p-4 bg-zinc-900/50">
                    <div className="flex items-center mb-2">
                      <Icon className="text-zinc-500 mr-3" size={18} />
                      <span className="text-zinc-400 text-sm font-light">{label}</span>
                    </div>
                    <div className="text-white font-light">{value}</div>
                  </div>
                ))}
              </div>

              {/* About Section */}
              <div className="border border-zinc-800 p-6 bg-zinc-900/50 mb-8">
                <h3 className="text-white font-medium text-lg mb-4">About</h3>
                <p className="text-zinc-300 leading-relaxed font-light">
                  {selectedMate.description}
                </p>
              </div>

              {/* Professional Network */}
              <div className="border border-zinc-800 p-6 bg-zinc-900/50 mb-8">
                <h3 className="text-white font-medium text-lg mb-4">Professional Network</h3>
                <div className="flex justify-center space-x-4">
                  {Object.entries(selectedMate.socialMedia).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-white transition-all duration-200 text-sm font-light"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>

              {/* Remove the Actions section with the Edit Profile button */}
            </div>
          </div>
        </div>
      )}

      {/* Inline styles for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideUp {
            0% { 
              opacity: 0; 
              transform: translateY(30px);
            }
            100% { 
              opacity: 1; 
              transform: translateY(0);
            }
          }
          .slide-up-animation {
            animation: slideUp 0.6s ease-out forwards;
          }
          
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
          }
          
          @keyframes float-1 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(50px, 25px) rotate(90deg); }
            50% { transform: translate(0, 50px) rotate(180deg); }
            75% { transform: translate(-50px, 25px) rotate(270deg); }
          }
          @keyframes float-2 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(-30px, 40px) rotate(-45deg); }
            50% { transform: translate(0, 80px) rotate(-90deg); }
            75% { transform: translate(30px, 40px) rotate(-135deg); }
          }
          @keyframes float-3 {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(25px, -25px) rotate(45deg); }
            66% { transform: translate(-25px, -25px) rotate(-45deg); }
          }
          @keyframes float-4 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(15px, 15px) scale(1.1); }
          }
          @keyframes float-5 {
            0%, 100% { transform: translate(0, 0) scale(1); }
            50% { transform: translate(-15px, -15px) scale(0.9); }
          }
          
          .animate-float-1 { animation: float-1 25s ease-in-out infinite; }
          .animate-float-2 { animation: float-2 30s ease-in-out infinite; }
          .animate-float-3 { animation: float-3 35s ease-in-out infinite; }
          .animate-float-4 { animation: float-4 20s ease-in-out infinite; }
          .animate-float-5 { animation: float-5 22s ease-in-out infinite; }
        `
      }} />
    </div>
  );
};

export default Directory;