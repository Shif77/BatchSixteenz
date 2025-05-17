import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography, Box, Container, Button, Grid } from '@mui/material';

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
      title: "Batch 16 Reunion",
      date: "December 15, 2023",
      description: "Join us for an unforgettable evening of reconnection and celebration at the Grand Skyline Hotel. The event will feature dinner, live music, and special presentations from our distinguished alumni. Don't miss this opportunity to reunite with your classmates and share memories from our university days.",
      icon: "🎉"
    },
    {
      id: 2,
      title: "Career Opportunities",
      date: "November 30, 2023",
      description: "Multiple positions available at leading tech companies. Our alumni network has exclusive access to senior positions in software development, project management, and system architecture roles. Visit the forum section for detailed job descriptions and application procedures.",
      icon: "💼"
    },
    {
      id: 3,
      title: "Community Project Launch",
      date: "January 5, 2024",
      description: "We're launching a mentorship program for current AAU students. Share your expertise and help shape the next generation of professionals. The program includes monthly mentoring sessions, workshop opportunities, and networking events.",
      icon: "🚀"
    }
  ];

  return (
    <>
      <Box sx={{ 
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <VideoBackground />
        
        {/* Header Section */}
        <Box sx={{ pt: 8, pb: 4, position: 'relative' }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: 'clamp(3rem, 10vw, 7rem)',
                  textAlign: 'center',
                  mb: 2
                }}
              >
                Batch Sixteenz
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  textAlign: 'center',
                  maxWidth: '800px',
                  mx: 'auto',
                  opacity: 0.8,
                  mb: 6
                }}
              >
                A vibrant community of AAU graduates from 2016, united by shared memories
                and committed to fostering lasting connections and professional growth.
              </Typography>
            </motion.div>
          </Container>
        </Box>

        {/* Enhanced Announcement Section */}
        <Box sx={{ position: 'relative', mb: 12 }}>
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Typography variant="h2" sx={{ 
                mb: 4, 
                textAlign: 'center',
                textShadow: '2px 2px 4px rgba(0,0,0,0.5)' // Add text shadow
              }}>
                Latest Updates
              </Typography>
              <Box sx={{
                display: 'flex',
                gap: 3,
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                {announcements.map((announcement, index) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ flex: '1 1 300px', maxWidth: '400px' }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'rgba(0,0,0,0.75)', // Darker background
                        p: 4,
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        border: '1px solid rgba(255,255,255,0.2)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backdropFilter: 'blur(10px)', // Add blur effect
                        boxShadow: '0 8px 32px rgba(0,0,0,0.3)', // Add shadow
                        '&:hover': {
                          bgcolor: 'rgba(0,0,0,0.85)',
                          transform: 'translateY(-5px)',
                          boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
                        }
                      }}
                      onClick={() => setSelectedAnnouncement(announcement)}
                    >
                      <Typography variant="h1" sx={{ fontSize: '3rem', mb: 2 }}>
                        {announcement.icon}
                      </Typography>
                      <Typography variant="h4" sx={{ mb: 2 }}>
                        {announcement.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.7, mb: 2 }}>
                        {announcement.date}
                      </Typography>
                      <Typography variant="body1" sx={{ opacity: 0.9 }}>
                        {announcement.description.substring(0, 100)}...
                      </Typography>
                      <Button 
                        variant="text" 
                        sx={{ 
                          mt: 'auto', 
                          alignSelf: 'flex-start',
                          color: 'primary.main',
                          '&:hover': {
                            bgcolor: 'rgba(255,255,255,0.1)'
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
          </Container>
        </Box>

        {/* Navigation Sections */}
        <Box sx={{ position: 'relative', pb: 12 }}>
          <Container maxWidth="lg">
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              justifyContent: 'center'
            }}>
              {[
                { title: 'Directory', path: '/directory', description: 'Connect with fellow alumni' },
                { title: 'Events', path: '/events', description: 'Upcoming gatherings and meetups' },
                { title: 'Forum', path: '/forum', description: 'Join the discussion' },
                { title: 'Gallery', path: '/gallery', description: 'Memories in pictures' },
                { title: 'Achievements', path: '/achievements', description: 'Celebrating our success' },
                { title: 'Memoriam', path: '/memoriam', description: 'Remembering our friends' },
              ].map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  style={{
                    flex: '1 1 300px',
                    maxWidth: '400px',
                    minWidth: '280px'
                  }}
                >
                  <Link to={section.path} style={{ textDecoration: 'none' }}>
                    <Box sx={{
                      bgcolor: 'rgba(0,0,0,0.75)', // Darker background
                      p: 4,
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: '1px solid rgba(255,255,255,0.2)',
                      height: '100%',
                      backdropFilter: 'blur(10px)', // Add blur effect
                      boxShadow: '0 8px 32px rgba(0,0,0,0.3)', // Add shadow
                      '&:hover': {
                        bgcolor: 'rgba(0,0,0,0.85)',
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
                      }
                    }}>
                      <Typography variant="h3" sx={{ 
                        mb: 2,
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)' // Add text shadow
                      }}>
                        {section.title}
                      </Typography>
                      <Typography variant="body1" sx={{ 
                        opacity: 0.9,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)' // Add subtle text shadow
                      }}>
                        {section.description}
                      </Typography>
                    </Box>
                  </Link>
                </motion.div>
              ))}
            </Box>
          </Container>
        </Box>

        {/* Add the AnnouncementModal component */}
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
const Directory = () => <div>Directory Page</div>;
const Events = () => <div>Events Page</div>;
const Forum = () => <div>Forum Page</div>;
const Gallery = () => <div>Gallery Page</div>;
const Achievements = () => <div>Achievements Page</div>;
const Memoriam = () => <div>Memoriam Page</div>;

const App = () => {
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


