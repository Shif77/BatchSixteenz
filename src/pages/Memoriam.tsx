import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Divider, 
  Button,
  TextField,
  InputAdornment,
  Paper,
  Fade,
  Dialog,
  DialogContent,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import CandlestickChartIcon from '@mui/icons-material/CandlestickChart';
import FavoriteIcon from '@mui/icons-material/Favorite';
// Removed Navbar import

interface Memorial {
  id: number;
  name: string;
  yearBorn: string;
  yearPassed: string;
  tribute: string;
  photo: string;
  memories: string[];
  quotes?: string;
  addedBy?: string;
}

const Memoriam: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMemorial, setSelectedMemorial] = useState<Memorial | null>(null);
  const [tributeMessage, setTributeMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [lightCandle, setLightCandle] = useState<number[]>([]);
  const [leaveFlower, setLeaveFlower] = useState<number[]>([]);
  
  // Sample memorials - replace with actual data
  const memorials: Memorial[] = [
    {
      id: 1,
      name: "USER1",
      yearBorn: "1998",
      yearPassed: "2020",
      tribute: "A beloved classmate whose kindness and infectious laughter brightened our school days. User1 was known for his academic brilliance and athletic prowess, but most importantly for his genuine friendship that touched everyone who knew him.",
      photo: "",
      memories: [
        "I remember how user1 helped me through calculus in our final year. He never gave up on anyone. - user",
        "The school football team was never the same without him. His spirit lives on in every game we play. - user"
      ],
      quotes: "Live each day as if it were your last, learn as if you'll live forever."
    },
    {
      id: 2,
      name: "USER2",
      yearBorn: "1997",
      yearPassed: "2022",
      tribute: "USER2 creative spirit and determination inspired everyone around him. His artwork still hangs in the school gallery, a testament to his talent and the legacy he left behind. He fought his illness with grace and never lost his smile.",
      photo: "",
      memories: [
        "USER@ taught me to see beauty in everything. His perspective changed how I view the world. - USER",
        "I'll never forget our late-night study sessions and his endless encouragement. - USER"
      ],
      quotes: "Art is how we decorate space; Music is how we decorate time."
    },
    {
      id: 3,
      name: "USER3",
      yearBorn: "1998",
      yearPassed: "2021",
      tribute: "USER3 was the heart of our class gatherings, always bringing people together with his warm personality and inclusive nature. His dedication to community service inspired many of us to give back. The local shelter where he volunteered has named a program after him.",
      photo: "",
      memories: [
        "USER3 convinced our whole class to join the field cleanup. That day changed my life's direction. - User",
        "His passion for helping others was contagious. I still volunteer at the shelter because of him. - User"
      ],
      quotes: "The meaning of life is to find your gift. The purpose of life is to give it away."
    }
  ];

  useEffect(() => {
    // Simulate loading images
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter memorials based on search
  const filteredMemorials = memorials.filter(memorial =>
    memorial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memorial.tribute.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMemorialClick = (memorial: Memorial) => {
    setSelectedMemorial(memorial);
  };

  const handleCloseDialog = () => {
    setSelectedMemorial(null);
    setTributeMessage('');
  };

  const handleAddTribute = () => {
    if (!tributeMessage.trim() || !selectedMemorial) return;
    
    // In a real app, you would send this to your backend
    console.log(`Adding tribute to ${selectedMemorial.name}: ${tributeMessage}`);
    setTributeMessage('');
  };

  const handleLightCandle = (id: number) => {
    if (lightCandle.includes(id)) {
      setLightCandle(lightCandle.filter(item => item !== id));
    } else {
      setLightCandle([...lightCandle, id]);
    }
  };

  const handleLeaveFlower = (id: number) => {
    if (leaveFlower.includes(id)) {
      setLeaveFlower(leaveFlower.filter(item => item !== id));
    } else {
      setLeaveFlower([...leaveFlower, id]);
    }
  };

  return (
    <>
      {/* Removed Navbar component */}
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #000000, #1c1c1c)',
          pt: 4, // Reduced padding-top since we removed the navbar
          pb: 8
        }}
      >
        {/* Animated stars background */}
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            overflow: 'hidden',
            background: 'radial-gradient(circle at center, rgba(33, 33, 33, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%)'
          }}
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <Box
              key={i}
              component="span"
              sx={{
                position: 'absolute',
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                animation: `twinkle ${Math.random() * 5 + 5}s infinite`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                '@keyframes twinkle': {
                  '0%': { opacity: Math.random() },
                  '50%': { opacity: Math.random() },
                  '100%': { opacity: Math.random() }
                }
              }}
            />
          ))}
        </Box>

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography 
              variant="h2" 
              align="center" 
              sx={{ 
                mb: 1,
                fontWeight: 300,
                letterSpacing: '0.2em',
                color: 'white',
                textTransform: 'uppercase'
              }}
            >
              In Memoriam
            </Typography>
            
            <Box 
              sx={{ 
                width: '100px', 
                height: '1px', 
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', 
                mx: 'auto',
                mb: 3
              }}
            />
            
            <Typography 
              variant="h6" 
              align="center" 
              sx={{ 
                mb: 6, 
                fontWeight: 300,
                color: 'rgba(255,255,255,0.7)',
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              Honoring the memory of our dear batchmates who are no longer with us.
              Their light continues to shine in our hearts and memories.
            </Typography>
          </motion.div>

          {/* Search */}
          <Box sx={{ mb: 6, maxWidth: '500px', mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="Search memorials..."
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'rgba(255,255,255,0.5)' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '30px',
                  background: 'rgba(255,255,255,0.05)',
                  '& fieldset': {
                    borderColor: 'rgba(255,255,255,0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255,255,255,0.2) !important',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'rgba(255,255,255,0.3) !important',
                  }
                }
              }}
            />
          </Box>

          {/* Memorial Cards */}
          <Grid container spacing={4}>
            {filteredMemorials.map((memorial, index) => (
              <Grid item xs={12} md={4} key={memorial.id}>
                <Fade in={isLoaded} timeout={500 + index * 300}>
                  <motion.div
                    whileHover={{ 
                      y: -10,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                  >
                    <Card 
                      sx={{ 
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'rgba(30,30,30,0.4)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleMemorialClick(memorial)}
                    >
                      <Box 
                        sx={{ 
                          height: '250px', 
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 100%)',
                            zIndex: 1
                          }}
                        />
                        <img 
                          src={memorial.photo} 
                          alt={memorial.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            filter: 'grayscale(30%)'
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            p: 2,
                            zIndex: 2,
                            textAlign: 'center'
                          }}
                        >
                          <Typography 
                            variant="h5" 
                            sx={{ 
                              color: 'white',
                              fontWeight: 300,
                              textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                            }}
                          >
                            {memorial.name}
                          </Typography>
                          <Typography 
                            variant="subtitle1" 
                            sx={{ 
                              color: 'rgba(255,255,255,0.8)',
                              fontWeight: 300
                            }}
                          >
                            {memorial.yearBorn} - {memorial.yearPassed}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography 
                          sx={{ 
                            color: 'rgba(255,255,255,0.8)',
                            mb: 2,
                            fontSize: '0.95rem',
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 4,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                          }}
                        >
                          {memorial.tribute}
                        </Typography>
                        
                        {memorial.quotes && (
                          <Paper
                            elevation={0}
                            sx={{
                              p: 2,
                              background: 'rgba(255,255,255,0.05)',
                              borderLeft: '3px solid rgba(255,255,255,0.2)',
                              mb: 2
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{
                                fontStyle: 'italic',
                                color: 'rgba(255,255,255,0.7)'
                              }}
                            >
                              "{memorial.quotes}"
                            </Typography>
                          </Paper>
                        )}
                      </CardContent>
                      
                      <Divider sx={{ background: 'rgba(255,255,255,0.1)' }} />
                      
                      <Box 
                        sx={{ 
                          display: 'flex', 
                          justifyContent: 'space-around',
                          p: 1.5
                        }}
                      >
                        <Button 
                          startIcon={<CandlestickChartIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLightCandle(memorial.id);
                          }}
                          sx={{ 
                            color: lightCandle.includes(memorial.id) ? 'orange' : 'rgba(255,255,255,0.6)',
                            '&:hover': {
                              background: 'rgba(255,255,255,0.05)'
                            }
                          }}
                        >
                          Light a Candle
                        </Button>
                        
                        <Button 
                          startIcon={<LocalFloristIcon />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLeaveFlower(memorial.id);
                          }}
                          sx={{ 
                            color: leaveFlower.includes(memorial.id) ? '#9c27b0' : 'rgba(255,255,255,0.6)',
                            '&:hover': {
                              background: 'rgba(255,255,255,0.05)'
                            }
                          }}
                        >
                          Leave Flowers
                        </Button>
                      </Box>
                    </Card>
                  </motion.div>
                </Fade>
              </Grid>
            ))}
          </Grid>
          
          {filteredMemorials.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center', 
                py: 8,
                color: 'rgba(255,255,255,0.6)'
              }}
            >
              <Typography variant="h6">No memorials found</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Try adjusting your search terms
              </Typography>
            </Box>
          )}
          
          {/* Memorial Detail Dialog */}
          <Dialog 
            open={!!selectedMemorial} 
            onClose={handleCloseDialog}
            maxWidth="md"
            fullWidth
            PaperProps={{
              sx: {
                borderRadius: '16px',
                background: 'rgba(30,30,30,0.95)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                overflow: 'hidden'
              }
            }}
          >
            {selectedMemorial && (
              <>
                <IconButton
                  onClick={handleCloseDialog}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: 'white',
                    zIndex: 10,
                    background: 'rgba(0,0,0,0.3)',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.5)'
                    }
                  }}
                >
                  <CloseIcon />
                </IconButton>
                
                <DialogContent sx={{ p: 0 }}>
                  <Grid container>
                    <Grid item xs={12} md={5}>
                      <Box sx={{ position: 'relative', height: '100%', minHeight: { xs: '300px', md: '100%' } }}>
                        <img 
                          src={selectedMemorial.photo} 
                          alt={selectedMemorial.name}
                          style={{ 
                            width: '100%', 
                            height: '100%', 
                            objectFit: 'cover',
                            filter: 'grayscale(30%)'
                          }}
                        />
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                            zIndex: 1
                          }}
                        />
                      </Box>
                    </Grid>
                    
                    <Grid item xs={12} md={7}>
                      <Box sx={{ p: 4 }}>
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            mb: 1,
                            fontWeight: 300,
                            color: 'white'
                          }}
                        >
                          {selectedMemorial.name}
                        </Typography>
                        
                        <Typography 
                          variant="subtitle1" 
                          sx={{ 
                            mb: 3,
                            color: 'rgba(255,255,255,0.7)',
                            fontWeight: 300
                          }}
                        >
                          {selectedMemorial.yearBorn} - {selectedMemorial.yearPassed}
                        </Typography>
                        
                        <Divider sx={{ mb: 3, background: 'rgba(255,255,255,0.1)' }} />
                        
                        <Typography 
                          sx={{ 
                            mb: 4,
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.8,
                            fontSize: '1.1rem'
                          }}
                        >
                          {selectedMemorial.tribute}
                        </Typography>
                        
                        {selectedMemorial.quotes && (
                          <Paper
                            elevation={0}
                            sx={{
                              p: 3,
                              background: 'rgba(255,255,255,0.05)',
                              borderLeft: '3px solid rgba(255,255,255,0.2)',
                              mb: 4
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                fontStyle: 'italic',
                                color: 'rgba(255,255,255,0.8)',
                                lineHeight: 1.6
                              }}
                            >
                              "{selectedMemorial.quotes}"
                            </Typography>
                          </Paper>
                        )}
                        
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            mb: 2,
                            fontWeight: 400,
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <FavoriteIcon sx={{ mr: 1, fontSize: '1rem', color: 'rgba(255,255,255,0.6)' }} />
                          Shared Memories
                        </Typography>
                        
                        {selectedMemorial.memories.map((memory, idx) => (
                          <Paper
                            key={idx}
                            elevation={0}
                            sx={{
                              p: 2,
                              mb: 2,
                              background: 'rgba(255,255,255,0.03)',
                              borderRadius: '8px'
                            }}
                          >
                            <Typography
                              sx={{
                                color: 'rgba(255,255,255,0.8)',
                                fontSize: '0.95rem'
                              }}
                            >
                              {memory}
                            </Typography>
                          </Paper>
                        ))}
                        
                        <Box sx={{ mt: 4 }}>
                          <Typography 
                            variant="subtitle2" 
                            sx={{ 
                              mb: 1,
                              color: 'rgba(255,255,255,0.7)'
                            }}
                          >
                            Share your memory or tribute
                          </Typography>
                          
                          <TextField
                            fullWidth
                            multiline
                            rows={3}
                            placeholder="Write your message here..."
                            variant="outlined"
                            value={tributeMessage}
                            onChange={(e) => setTributeMessage(e.target.value)}
                            sx={{
                              mb: 2,
                              '& .MuiOutlinedInput-root': {
                                background: 'rgba(255,255,255,0.05)',
                                '& fieldset': {
                                  borderColor: 'rgba(255,255,255,0.1)',
                                },
                              }
                            }}
                          />
                          
                          <Button
                            variant="contained"
                            onClick={handleAddTribute}
                            sx={{
                              background: 'rgba(255,255,255,0.1)',
                              color: 'white',
                              '&:hover': {
                                background: 'rgba(255,255,255,0.2)',
                              }
                            }}
                          >
                            Add Tribute
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </DialogContent>
              </>
            )}
          </Dialog>
          
          {/* Footer Quote */}
          <Box sx={{ mt: 10, textAlign: 'center' }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 300,
                color: 'rgba(255,255,255,0.7)',
                fontStyle: 'italic',
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.8
              }}
            >
              "To live in hearts we leave behind is not to die."
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: 'rgba(255,255,255,0.5)',
                mt: 1
              }}
            >
              — Thomas Campbell
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Memoriam;