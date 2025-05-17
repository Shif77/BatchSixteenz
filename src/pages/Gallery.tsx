import React from 'react';
import { Container, Card, CardMedia, Typography, Box } from '@mui/material';

interface Photo {
  id: string;
  url: string;
  title: string;
  year: number;
  category: string;
}

const Gallery: React.FC = () => {
  // Sample photos - replace with actual data
  const photos: Photo[] = [
    {
      id: "1",
      url: "/images/school-day.jpg", // Use local image path
      title: "School Day Celebration",
      year: 2016,
      category: "School Events"
    },
    {
      id: "2",
      url: "/images/reunion.jpg",
      title: "Annual Reunion",
      year: 2023,
      category: "Reunions"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Photo Gallery</Typography>
      
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'flex-start'
      }}>
        {photos.map((photo) => (
          <Box
            key={photo.id}
            sx={{
              flexBasis: {
                xs: '100%',
                sm: 'calc(50% - 1.5rem)',
                md: 'calc(33.333% - 2rem)'
              },
              minWidth: 0
            }}
          >
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="200"
                image={photo.url}
                alt={photo.title}
                sx={{ 
                  cursor: 'pointer',
                  objectFit: 'cover',
                  '&.MuiCardMedia-img': {
                    objectPosition: 'center'
                  }
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
              <Box sx={{ p: 2 }}>
                <Typography variant="h6">{photo.title}</Typography>
                <Typography color="textSecondary">
                  {photo.year} - {photo.category}
                </Typography>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Gallery;