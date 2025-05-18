import React, { useState } from 'react';
import { Container, Card, CardContent, Typography, TextField, Box, Avatar } from '@mui/material';
import Navbar from '../components/Navbar';

interface BatchMate {
  name: string;
  picture: string;
  location: string;
  profession: string;
  birthdate: string;
  bloodGroup: string;
  contact: string;
}

const Directory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  // Sample data - replace with actual data from backend
  const batchmates: BatchMate[] = Array.from({ length: 264 }, (_, i) => ({
    name: `Batchmate ${i + 1}`,
    picture: '', // Removed non-existent image paths
    location: `City ${i + 1}`,
    profession: `Profession ${i + 1}`,
    birthdate: `199${i % 10}-0${(i % 9) + 1}-1${(i % 9) + 1}`,
    bloodGroup: i % 4 === 0 ? 'A+' : i % 4 === 1 ? 'B+' : i % 4 === 2 ? 'O+' : 'AB+',
    contact: `batchmate${i + 1}@example.com`,
  }));

  const filteredBatchmates = batchmates.filter(mate =>
    mate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mate.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mate.profession.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box sx={{ 
        pt: 10, // Add padding top to account for the navbar
        minHeight: '100vh',
        bgcolor: darkMode ? '#121212' : '#f5f5f5'
      }}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ 
            textAlign: 'center', 
            mb: 4, 
            fontWeight: 600,
            color: darkMode ? 'white' : 'inherit'
          }}>
            Batch 16 Directory
          </Typography>

          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <TextField
              fullWidth
              label="Search batchmates by name, location, or profession..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ maxWidth: 600, mx: 'auto' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 3,
            }}
          >
            {filteredBatchmates.map((mate, index) => (
              <Box
                key={index}
                sx={{
                  flex: '1 1 calc(25% - 1rem)',
                  minWidth: 250,
                  maxWidth: 300,
                  p: 1,
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': { transform: 'scale(1.03)' },
                }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(145deg, #e0e0e0, #f5f5f5)',
                    borderRadius: 3,
                    boxShadow: '4px 4px 10px rgba(0,0,0,0.1)',
                  }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3,
                    }}
                  >
                    <Avatar
                      alt={mate.name}
                      sx={{ width: 90, height: 90, mb: 2, border: '2px solid #ddd' }}
                    >
                      {mate.name.charAt(0)}
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {mate.name}
                    </Typography>
                    <Typography color="textSecondary" sx={{ mb: 1 }}>
                      {mate.profession}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
                      📍 {mate.location}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
                      🎂 {mate.birthdate}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', mb: 1 }}>
                      🩸 {mate.bloodGroup}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', color: '#555' }}>
                      📧 {mate.contact}
                    </Typography>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Directory;
