import React from 'react';
import { Container, Card, CardContent, Typography, TextField, Box } from '@mui/material';

interface BatchMate {
  name: string;
  graduationYear: number;
  city?: string;
  profession?: string;
  contact?: string;
}

const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Sample data - replace with actual data from backend
  const batchmates: BatchMate[] = [
    {
      name: "John Doe",
      graduationYear: 2016,
      city: "New York",
      profession: "Software Engineer",
      contact: "john@example.com"
    },
    // Add more batchmates here
  ];

  const filteredBatchmates = batchmates.filter(mate =>
    mate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mate.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mate.profession?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Batchmate Directory</Typography>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search batchmates..."
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'flex-start'
      }}>
        {filteredBatchmates.map((mate, index) => (
          <Box
            key={index}
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
              <CardContent>
                <Typography variant="h6">{mate.name}</Typography>
                <Typography color="textSecondary">Class of {mate.graduationYear}</Typography>
                {mate.city && <Typography>📍 {mate.city}</Typography>}
                {mate.profession && <Typography>💼 {mate.profession}</Typography>}
                {mate.contact && <Typography>📧 {mate.contact}</Typography>}
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Directory;