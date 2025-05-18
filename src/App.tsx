import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Typography, Box, Container, Button, Grid, IconButton } from '@mui/material';
import Directory from './pages/Directory';
import Events from './pages/Events';
import Forum from './pages/Forum';
import Gallery from './pages/Gallery';
import Achievements from './pages/Achievements';
import Memoriam from './pages/Memoriam';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
      light: '#ffffff',
      dark: '#cccccc',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#999999',
    },
  },
  typography: {
    fontFamily: '"PP Neue Montreal", "Inter", sans-serif',
    h1: {
      fontSize: 'clamp(2rem, 8vw, 6rem)',
      fontWeight: 500,
      letterSpacing: '-0.02em',
      lineHeight: 1,
    },
    h2: {
      fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
      fontWeight: 400,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.7,
      fontWeight: 300,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0',
          padding: '16px 32px',
          fontSize: '1rem',
          fontWeight: 400,
          textTransform: 'none',
          border: '1px solid #ffffff',
          color: '#ffffff',
          background: 'transparent',
          transition: 'all 0.3s ease',
          '&:hover': {
            background: '#ffffff',
            color: '#000000',
          },
        },
      },
    },
  },
});

// Particle effect component
const ParticleField = () => {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, speed: number, color: string}>>([]);
  
  useEffect(() => {
    if (!particlesRef.current) return;
    
    const container = particlesRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Create particles
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 1 + 0.5,
      color: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`
    }));
    
    setParticles(newParticles);
    
    // Animation loop
    let animationId: number;
    const animate = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5,
        // Reset particles that go off screen
        ...(particle.y < 0 ? { y: height, x: Math.random() * width } : {})
      })));
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => cancelAnimationFrame(animationId);
  }, []);
  
  return (
    <div 
      ref={particlesRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      {particles.map((particle, index) => (
        <div 
          key={index}
          style={{
            position: 'absolute',
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
        />
      ))}
    </div>
  );
};

// Immersive video background with parallax effect
const VideoBackground = () => {
  const { scrollYProgress } = useScroll();
  const yPos = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  return (
    <motion.div
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: -1,
        y: yPos
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.4) contrast(1.2) saturate(1.2)',
        }}
      >
        <source src="/Video/Batch.mp4" type="video/mp4" />
      </video>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
      }} />
    </motion.div>
  );
};

// Interface for announcement type
interface Announcement {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

// Interface for modal props
interface AnnouncementModalProps {
  announcement: Announcement | null;
  open: boolean;
  onClose: () => void;
}

// 3D Floating Modal
const AnnouncementModal = ({ announcement, open, onClose }: AnnouncementModalProps) => (
  <AnimatePresence>
    {open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          perspective: '1000px',
        }}
        onClick={onClose}
      >
        {announcement && (
          <motion.div
            initial={{ rotateX: 30, y: 100, opacity: 0 }}
            animate={{ rotateX: 0, y: 0, opacity: 1 }}
            exit={{ rotateX: -30, y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            style={{
              background: 'linear-gradient(135deg, rgba(30,30,30,0.8) 0%, rgba(10,10,10,0.9) 100%)',
              padding: '2rem',
              borderRadius: '1rem',
              maxWidth: '600px',
              width: '90%',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              position: 'relative',
              transformStyle: 'preserve-3d',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              style={{ 
                position: 'absolute', 
                top: '-2rem', 
                left: '50%', 
                transform: 'translateX(-50%)',
                fontSize: '4rem',
                filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))'
              }}
            >
              {announcement.icon}
            </motion.div>
            
            <Typography variant="h3" sx={{ 
              mb: 3, 
              mt: 4,
              textAlign: 'center',
              background: 'linear-gradient(90deg, #fff, #aaa)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 600,
            }}>
              {announcement.title}
            </Typography>
            
            <Typography variant="body1" sx={{ 
              mb: 4,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.8)',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}>
              {announcement.description}
            </Typography>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="outlined" 
                onClick={onClose}
                sx={{
                  borderRadius: '2rem',
                  padding: '0.8rem 2rem',
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(5px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: 400,
                  display: 'block',
                  margin: '0 auto',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.2)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }
                }}
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

// Timeline Node Component
const TimelineNode = ({ 
  title, 
  description, 
  icon, 
  path, 
  index, 
  isAnnouncement = false,
  onClick
}: { 
  title: string, 
  description: string, 
  icon: string, 
  path?: string, 
  index: number,
  isAnnouncement?: boolean,
  onClick?: () => void
}) => {
  const isEven = index % 2 === 0;
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.2 + index * 0.05, 0.3 + index * 0.05, 1], 
    [0, 0, 1, 1]
  );
  
  const Content = () => (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 50
      }}
      whileHover={{ scale: 1.03, y: -5 }}
      style={{ opacity }}
    >
      <Box
        sx={{
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(10px)',
          p: 4,
          borderRadius: '1rem',
          width: { xs: '100%', md: '90%' },
          ml: isEven ? { xs: 0, md: 'auto' } : 0,
          mr: isEven ? 0 : { xs: 0, md: 'auto' },
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }
        }}
      >
        <Typography 
          className="icon"
          sx={{ 
            fontSize: '3.5rem',
            mb: 2,
            transition: 'transform 0.4s ease',
            display: 'block',
            filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.3))'
          }}
        >
          {icon}
        </Typography>
        <Typography variant="h3" sx={{ 
          mb: 2,
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          color: 'rgba(255, 255, 255, 0.95)',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ 
          opacity: 0.9,
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          fontSize: '1.1rem',
          lineHeight: 1.6,
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          {description}
        </Typography>
        
        {isAnnouncement && (
          <Button 
            variant="text" 
            sx={{ 
              mt: 2, 
              alignSelf: 'flex-start',
              color: 'primary.main',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '10px',
              padding: '8px 16px',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)',
                transform: 'translateY(-2px)'
              }
            }}
            onClick={onClick}
          >
            Read More
          </Button>
        )}
      </Box>
    </motion.div>
  );
  
  return (
    <Box sx={{ 
      position: 'relative',
      mb: 10,
      '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '2px',
        background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.3), transparent)',
        display: { xs: 'none', md: 'block' }
      }
    }}>
      {path ? (
        <Link to={path} style={{ textDecoration: 'none' }}>
          <Content />
        </Link>
      ) : (
        <div onClick={onClick}>
          <Content />
        </div>
      )}
      
      <Box sx={{ 
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: 'white',
        boxShadow: '0 0 20px rgba(255,255,255,0.8)',
        zIndex: 2,
        display: { xs: 'none', md: 'block' }
      }} />
    </Box>
  );
};

// Reimagined Home Component
const Home = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const { scrollYProgress } = useScroll();
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  
  const announcements = [
    {
      id: 1,
      title: "Football Tournament",
      date: "June 6, 2025",
      description: "The KGHSK Batch Football Tournament is an exciting and spirited event that brings together alumni from various batches of KGHSK to compete in the beautiful game. Teams formed by batchmates showcase their football skills, camaraderie, and sportsmanship on the field. The tournament fosters a sense of unity and nostalgia, as old friends reconnect and create new memories. With thrilling matches and passionate support from the sidelines, it promises to be a celebration of both football and lifelong friendships. Get ready to cheer for your batch and witness unforgettable moments!",
      icon: "🎉"
    },
    {
      id: 2,
      title: "🚩 Jersey Design Competition Alert! 🚩",
      date: "June 5, 2025",
      description: "As the KGHSK Batch Football Tournament approaches, it's time to gear up and make a statement on the field! We need an extraordinary jersey that truly represents the spirit of our batch.🏆 🎨 Participate in the Jersey Design Competition and showcase your creativity! The winning design will not only be featured during the tournament but also earn you an exciting prize. Don't miss this chance to make your mark! Submit your designs now and let your creativity shine! 🌟 ",
      icon: "💼"
    },
    {
      id: 3,
      title: "📒 KGHSK Batch Directory Initiative 📒",
      date: "Fillup the Form",
      description: "We are creating a beautiful directory to keep track of our batchmates, know what they are up to, and stay connected. It's a great way to find out how everyone is doing, where life has taken them, and celebrate their achievements! 🌟 To make this possible, we need your help! Please fill out the form and keep us posted about your current journey. Let's strengthen our bond and keep our batch spirit alive! 💪",
      icon: "🚀"
    }
  ];
  
  const navigationSections = [
    {
      title: 'Directory',
      path: '/directory',
      description: 'Connect with fellow alumni',
      icon: '👥'
    },
    { 
      title: 'Events', 
      path: '/events', 
      description: 'Upcoming gatherings and meetups',
      icon: '🎉'
    },
    { 
      title: 'Forum', 
      path: '/forum', 
      description: 'Join the discussion',
      icon: '💭'
    },
    { 
      title: 'Gallery', 
      path: '/gallery', 
      description: 'Memories in pictures',
      icon: '📸'
    },
    { 
      title: 'Achievements', 
      path: '/achievements', 
      description: 'Celebrating our success',
      icon: '🏆'
    },
    { 
      title: 'Memoriam', 
      path: '/memoriam', 
      description: 'Remembering our friends',
      icon: '🕊️'
    },
  ];

  return (
    <>
      <Box sx={{ 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <VideoBackground />
        <ParticleField />
        
        {/* Immersive Header */}
        <motion.div
          style={{ 
            opacity: titleOpacity,
            y: titleY,
            position: 'relative',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            padding: '0 2rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, type: 'spring' }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: 'clamp(3rem, 15vw, 12rem)',
                textAlign: 'center',
                background: 'linear-gradient(45deg, #ffffff, #aaaaaa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 10px 30px rgba(0,0,0,0.5)',
                fontWeight: 600,
                letterSpacing: '-0.05em',
                mb: 2
              }}
            >
              Batch Sixteenz
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                textAlign: 'center',
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '800px',
                mx: 'auto',
                fontWeight: 300,
                letterSpacing: '0.05em',
              }}
            >
              A JOURNEY THROUGH TIME
            </Typography>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'rgba(255,255,255,0.6)',
                textAlign: 'center',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-20px)' },
                  '60%': { transform: 'translateY(-10px)' }
                }
              }}
            >
              Scroll to explore our timeline
              <br />
              ↓
            </Typography>
          </motion.div>
        </motion.div>
        
        {/* Timeline Journey */}
        <Container maxWidth="lg" sx={{ pt: 20, pb: 20 }}>
          <Box sx={{ position: 'relative' }}>
            {/* Announcements */}
            {announcements.map((announcement, index) => (
              <TimelineNode
                key={`announcement-${announcement.id}`}
                title={announcement.title}
                description={announcement.description.substring(0, 120) + '...'}
                icon={announcement.icon}
                index={index}
                isAnnouncement={true}
                onClick={() => setSelectedAnnouncement(announcement)}
              />
            ))}
            
            {/* Navigation Sections */}
            {navigationSections.map((section, index) => (
              <TimelineNode
                key={`section-${section.title}`}
                title={section.title}
                description={section.description}
                icon={section.icon}
                path={section.path}
                index={index + announcements.length}
              />
            ))}
          </Box>
        </Container>
        
        {/* 3D Modal */}
        <AnnouncementModal
          announcement={selectedAnnouncement}
          open={selectedAnnouncement !== null}
          onClose={() => setSelectedAnnouncement(null)}
        />
      </Box>
    </>
  );
};

// Create placeholder pages for each section
// Remove or replace this placeholder
// const Directory = () => <div>Directory Page</div>;

// Import the actual Directory component


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/directory" element={<Directory />} />
          <Route path="/events" element={<Events />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/memoriam" element={<Memoriam />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
// Then use it like this:


