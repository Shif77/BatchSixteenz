import React from 'react';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';

interface Memorial {
  name: string;
  yearPassed: string;
  tribute: string;
  photo?: string;
}

const Memoriam: React.FC = () => {
  // Sample memorials - replace with actual data
  const memorials: Memorial[] = [
    {
      name: "James Smith",
      yearPassed: "2020",
      tribute: "A beloved classmate who always brought joy to everyone around him.",
      photo: "https://example.com/james.jpg"
    },
    // Add more memorials here
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">In Memoriam</Typography>
      <Typography variant="subtitle1" align="center" sx={{ mb: 4 }}>
        Remembering our dear batchmates who are no longer with us
      </Typography>
      
      {memorials.map((memorial, index) => (
        <Box key={index} sx={{ mb: 4 }}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>{memorial.name}</Typography>
              <Typography color="textSecondary">{memorial.yearPassed}</Typography>
              <Typography sx={{ mt: 2 }}>{memorial.tribute}</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Container>
  );
};

export default Memoriam;