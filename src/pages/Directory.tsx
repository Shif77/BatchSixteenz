import React, { useState } from 'react';
import { Search } from 'lucide-react';
import BatchMateCard from '../components/BatchMateCard';
import BatchMateDetail from '../components/BatchMateDetail';
import { BatchMate } from '../types/BatchMate';
import batchmates from '../data/batchmates';

const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMate, setSelectedMate] = useState<BatchMate | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Filter batchmates based on search term
  const filteredBatchmates = batchmates.filter(mate =>
    mate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <BatchMateCard
                key={mate.id}
                mate={mate}
                onClick={setSelectedMate}
                onMouseEnter={setHoveredCard}
                onMouseLeave={() => setHoveredCard(null)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Modal */}
      {selectedMate && (
        <BatchMateDetail 
          mate={selectedMate} 
          onClose={() => setSelectedMate(null)} 
        />
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