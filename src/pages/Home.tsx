import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Batchmate Directory",
      description: "Connect with your classmates and stay in touch with their current endeavors.",
      link: "/directory"
    },
    {
      title: "Events & Reunions",
      description: "Stay updated with upcoming gatherings and never miss a reunion.",
      link: "/events"
    },
    {
      title: "Photo Gallery",
      description: "Relive memories through our collection of photos from school days to recent meetups.",
      link: "/gallery"
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        mt: 8, 
        mb: 6, 
        textAlign: 'center',
        background: 'linear-gradient(45deg, #6C63FF 30%, #2EC4B6 90%)',
        p: 8,
        borderRadius: 2,
        color: 'white'
      }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Batch 16
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          Connecting Classmates, Preserving Memories
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'space-between'
      }}>
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: {
                xs: '100%',
                md: 'calc(33.333% - 2rem)'
              },
              minWidth: 0
            }}
          >
            <Paper 
              sx={{ 
                p: 4, 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: 6
                }
              }}
            >
              <Typography variant="h5" gutterBottom>
                {feature.title}
              </Typography>
              <Typography sx={{ mb: 3 }}>
                {feature.description}
              </Typography>
              <Button 
                variant="contained" 
                color="primary"
                onClick={() => navigate(feature.link)}
                sx={{ mt: 'auto' }}
              >
                Explore
              </Button>
            </Paper>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Home;