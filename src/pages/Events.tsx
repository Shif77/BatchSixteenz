import React from 'react';
import { Container, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl?: string;
}

const Events: React.FC = () => {
  // Sample events - replace with actual data
  const events: Event[] = [
    {
      title: "Annual Reunion 2024",
      date: "December 25, 2024",
      location: "School Auditorium",
      description: "Join us for our annual reunion celebration with dinner and cultural program.",
      imageUrl: "https://example.com/reunion.jpg"
    },
    // Add more events here
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Events & Announcements</Typography>
      
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        justifyContent: 'flex-start'
      }}>
        {events.map((event, index) => (
          <Box
            key={index}
            sx={{
              flexBasis: {
                xs: '100%',
                sm: 'calc(50% - 2rem)'
              },
              minWidth: 0
            }}
          >
            <Card sx={{ height: '100%' }}>
              {event.imageUrl && (
                <CardMedia
                  component="img"
                  height="200"
                  image={event.imageUrl}
                  alt={event.title}
                />
              )}
              <CardContent>
                <Typography variant="h5" gutterBottom>{event.title}</Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography color="textSecondary">📅 {event.date}</Typography>
                  <Typography color="textSecondary">📍 {event.location}</Typography>
                </Box>
                <Typography>{event.description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Events;