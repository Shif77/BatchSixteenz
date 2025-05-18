import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Box, Container, Button, Grid } from '@mui/material';
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

const VideoBackground = () => (
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: 'fixed',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1,
      filter: 'brightness(0.6)',
    }}
  >
    <source src="/Video/Batch.mp4" type="video/mp4" />
  </video>
);

// Add this new component for announcement details modal
// Add interface for the announcement type
interface Announcement {
  id: number;
  title: string;
  date: string;
  description: string;
  icon: string;
}

// Add interface for the modal props
interface AnnouncementModalProps {
  announcement: Announcement | null;
  open: boolean;
  onClose: () => void;
}

// Fix the AnnouncementModal component with proper typing
const AnnouncementModal = ({ announcement, open, onClose }: AnnouncementModalProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.9 }}
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: open ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
    }}
    onClick={onClose}
  >
    {announcement && (
      <Box
        sx={{
          bgcolor: 'rgba(255,255,255,0.1)',
          p: 4,
          borderRadius: 2,
          maxWidth: '600px',
          width: '90%',
          border: '1px solid rgba(255,255,255,0.2)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Typography variant="h3" sx={{ mb: 3 }}>{announcement.title}</Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>{announcement.description}</Typography>
        <Button variant="outlined" onClick={onClose}>Close</Button>
      </Box>
    )}
  </motion.div>
);

const Home = () => {
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);

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
      description: "We are creating a beautiful directory to keep track of our batchmates, know what they are up to, and stay connected. It’s a great way to find out how everyone is doing, where life has taken them, and celebrate their achievements! 🌟 To make this possible, we need your help! Please fill out the form and keep us posted about your current journey. Let’s strengthen our bond and keep our batch spirit alive! 💪",
      icon: "🚀"
    }
  ];

  return (
    <>
      <Box sx={{ 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridTemplateRows: 'auto 1fr auto',
        gap: 4
      }}>
        <VideoBackground />
        
        {/* Header Section - Reimagined as a side-scrolling banner */}
        <Box sx={{ 
          position: 'relative',
          overflow: 'hidden',
          height: '100vh',
          display: 'flex',
          alignItems: 'center'
        }}>
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ width: '100%' }}
          >
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: 'clamp(3rem, 15vw, 12rem)',
                textAlign: 'left',
                mb: 2,
                pl: 4,
                background: 'linear-gradient(45deg, #ffffff, transparent)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: 'translateX(-5%)'
              }}
            >
              Batch Sixteenz
            </Typography>
          </motion.div>
        </Box>

        {/* Dynamic Grid Layout for Updates and Navigation */}
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 3,
          p: 4,
          position: 'relative'
        }}>
          {/* Latest Updates - As floating cards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              gridColumn: '1 / -1',
              marginBottom: '4rem'
            }}
          >
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}>
              {announcements.map((announcement, index) => (
                <motion.div
                  key={announcement.id}
                  initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 50
                  }}
                >
                  <Box
                    sx={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      p: 4,
                      borderRadius: '30px',
                      ml: index % 2 === 0 ? 0 : 'auto',
                      width: { xs: '100%', md: '80%' },
                      transform: `rotate(${index % 2 === 0 ? '-2' : '2'}deg)`,
                      '&:hover': {
                        transform: 'rotate(0deg) scale(1.02)',
                      }
                    }}
                    onClick={() => setSelectedAnnouncement(announcement)}
                  >
                    <Typography 
                      className="icon"
                      sx={{ 
                        fontSize: '3.5rem',
                        mb: 2,
                        transition: 'transform 0.4s ease',
                        display: 'block'
                      }}
                    >
                      {announcement.icon}
                    </Typography>
                    <Typography variant="h3" sx={{ 
                      mb: 2,
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      fontWeight: 600,
                      letterSpacing: '-0.02em',
                      color: 'rgba(255, 255, 255, 0.95)'
                    }}>
                      {announcement.title}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      opacity: 0.7,
                      mb: 2,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                    }}>
                      {announcement.date}
                    </Typography>
                    <Typography variant="body1" sx={{ 
                      opacity: 0.9,
                      textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                      fontSize: '1.1rem',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}>
                      {announcement.description.substring(0, 100)}...
                    </Typography>
                    <Button 
                      variant="text" 
                      sx={{ 
                        mt: 'auto', 
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
                      onClick={() => setSelectedAnnouncement(announcement)}
                    >
                      Read More
                    </Button>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>

          {/* Navigation Sections - As interactive tiles */}
          {[
            {
              title: 'Directory',
              path: '/directory',  // <-- Correct the path here
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
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ 
                opacity: 0,
                rotateY: 180,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1,
                rotateY: 0,
                scale: 1
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 80
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                transition: { duration: 0.4 }
              }}
            >
              <Link to={section.path} style={{ textDecoration: 'none' }}>
                <Box sx={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  aspectRatio: '1',
                  p: 3,
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  perspective: '1000px',
                  transformStyle: 'preserve-3d',
                  '&:hover': {
                    '& .icon': {
                      transform: 'translateZ(20px) scale(1.2)',
                    }
                  }
                }}>
                  <Typography 
                    className="icon"
                    sx={{ 
                      fontSize: '3.5rem',
                      mb: 2,
                      transition: 'transform 0.4s ease',
                      display: 'block'
                    }}
                  >
                    {section.icon}
                  </Typography>
                  <Typography variant="h3" sx={{ 
                    mb: 2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: 'rgba(255, 255, 255, 0.95)'
                  }}>
                    {section.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    opacity: 0.9,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    {section.description}
                  </Typography>
                </Box>
              </Link>
            </motion.div>
          ))}
        </Box>

        {/* Modal remains unchanged */}
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


