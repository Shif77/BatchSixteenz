import React from 'react';
import { X, Calendar, Droplet, Mail, Phone, MapPin, Briefcase, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { BatchMate } from '../types/BatchMate';

interface BatchMateDetailProps {
  mate: BatchMate;
  onClose: () => void;
}

const BatchMateDetail: React.FC<BatchMateDetailProps> = ({ mate, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
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
                src={mate.picture}
                alt={mate.name}
                className="w-28 h-28 object-cover rounded-full border-2 border-zinc-700"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-light text-white mb-2">
                {mate.name}
              </h2>
              <div className="flex items-center text-zinc-400 mb-4">
                <Briefcase size={16} className="mr-2" />
                <span className="font-light">{mate.profession}</span>
              </div>
              <div className="flex items-center text-zinc-500">
                <MapPin size={16} className="mr-2" />
                <span className="font-light">{mate.location}</span>
              </div>
            </div>
          </div>

          {/* Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              { icon: Calendar, label: 'Date of Birth', value: mate.dob },
              { icon: Droplet, label: 'Blood Group', value: mate.bloodGroup },
              { icon: Mail, label: 'Email', value: mate.email },
              { icon: Phone, label: 'Phone', value: mate.phone },
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
              {mate.description}
            </p>
          </div>

          {/* Professional Network */}
          <div className="border border-zinc-800 p-6 bg-zinc-900/50 mb-8">
            <h3 className="text-white font-medium text-lg mb-4">Professional Network</h3>
            <div className="flex justify-center space-x-4">
              {Object.entries(mate.socialMedia).map(([platform, url]) => (
                url && (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 border border-zinc-700 text-zinc-300 hover:border-zinc-600 hover:text-white transition-all duration-200 text-sm font-light"
                  >
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </a>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchMateDetail;