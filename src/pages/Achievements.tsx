import React from 'react';
import { Container, Box, Card, CardContent, Typography, CardMedia } from '@mui/material';

interface Achievement {
  name: string;
  achievement: string;
  year: number;
  field: string;
  description: string;
  photo?: string;
}

const Achievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      name: "Sarah Johnson",
      achievement: "Nobel Prize in Physics",
      year: 2023,
      field: "Science",
      description: "Groundbreaking research in quantum computing...",
      photo: "/images/placeholder.jpg"
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Alumni Achievements</Typography>
      
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
      }}>
        {achievements.map((achievement, index) => (
          <Box 
            key={index}
            sx={{
              flexBasis: {
                xs: '100%',
                md: 'calc(50% - 2rem)'
              }
            }}
          >
            <Card>
              {achievement.photo && (
                <CardMedia
                  component="img"
                  height="200"
                  image={achievement.photo}
                  alt={achievement.name}
                />
              )}
              <CardContent>
                <Typography variant="h5" gutterBottom>{achievement.name}</Typography>
                <Typography variant="h6" color="primary">{achievement.achievement}</Typography>
                <Typography color="textSecondary">
                  {achievement.year} - {achievement.field}
                </Typography>
                <Typography sx={{ mt: 2 }}>{achievement.description}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Achievements;