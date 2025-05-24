import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Chip, 
  TextField, 
  InputAdornment, 
  Dialog, 
  DialogContent,
  IconButton,
  Tabs,
  Tab,
  Fade,
  Zoom,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';

interface Photo {
  id: string;
  url: string;
  title: string;
  year: number;
  category: string;
  description?: string;
}

const Gallery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<number>(0);
  const [tabValue, setTabValue] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Sample photos - replace with actual data
  const photos: Photo[] = [
    {
      id: "1",
      url: "/images/school-day.jpg",
      title: "School Day Celebration",
      year: 2016,
      category: "School Events",
      description: "Our class celebrating the annual school day with performances and activities."
    },
    {
      id: "2",
      url: "/images/reunion.jpg",
      title: "Annual Reunion",
      year: 2025,
      category: "Reunions",
      description: "Batch 16 reunion after 9 years - it was amazing to see how everyone has grown!"
    },
    {
      id: "3",
      url: "/images/sports-day.jpg",
      title: "Annual Sports Meet",
      year: 2018,
      category: "Sports",
      description: "The inter-house sports competition where our house won the overall championship."
    },
    {
      id: "4",
      url: "/images/cultural-fest.jpg",
      title: "Cultural Festival",
      year: 2019,
      category: "School Events",
      description: "Our class performance at the cultural festival that won first prize."
    },
    {
      id: "5",
      url: "/images/graduation.jpg",
      title: "Graduation Ceremony",
      year: 2016,
      category: "Graduation",
      description: "The day we officially completed our school journey together."
    },
    {
      id: "6",
      url: "/images/picnic.jpg",
      title: "Batch Picnic",
      year: 2022,
      category: "Reunions",
      description: "Our first post-pandemic gathering at the city park."
    }
  ];

  useEffect(() => {
    // Simulate loading images
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Get unique categories and years for filter
  const categories = Array.from(new Set(photos.map(photo => photo.category)));
  const years = Array.from(new Set(photos.map(photo => photo.year))).sort((a, b) => b - a);
  
  // Filter photos based on search, category, and year
  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? photo.category === selectedCategory : true;
    const matchesYear = selectedYear ? photo.year === selectedYear : true;
    
    return matchesSearch && matchesCategory && matchesYear;
  });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    const index = filteredPhotos.findIndex(p => p.id === photo.id);
    setCurrentPhotoIndex(index);
  };

  const handleCloseDialog = () => {
    setSelectedPhoto(null);
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < filteredPhotos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
      setSelectedPhoto(filteredPhotos[currentPhotoIndex + 1]);
    } else {
      setCurrentPhotoIndex(0);
      setSelectedPhoto(filteredPhotos[0]);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
      setSelectedPhoto(filteredPhotos[currentPhotoIndex - 1]);
    } else {
      setCurrentPhotoIndex(filteredPhotos.length - 1);
      setSelectedPhoto(filteredPhotos[filteredPhotos.length - 1]);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setSelectedYear(null);
  };

  // Different layout views
  const renderGridView = () => (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
        lg: 'repeat(3, 1fr)'
      },
      gap: 3
    }}>
      {filteredPhotos.map((photo, index) => (
        <Fade in={isLoaded} timeout={500 + index * 100} key={photo.id}>
          <Paper 
            elevation={3}
            sx={{ 
              height: '100%',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              borderRadius: '12px',
              position: 'relative',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              },
              '&:hover .photo-overlay': {
                opacity: 1
              }
            }}
            onClick={() => handlePhotoClick(photo)}
          >
            <Box 
              sx={{ 
                height: 250, 
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <img 
                src={photo.url} 
                alt={photo.title}
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease'
                }}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/images/placeholder.jpg';
                }}
              />
              <Box 
                className="photo-overlay"
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: 2,
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }}
              >
                <Typography variant="h6" sx={{ color: 'white', textShadow: '1px 1px 3px rgba(0,0,0,0.7)' }}>
                  {photo.title}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', opacity: 0.8 }}>
                  {photo.year}
                </Typography>
                <IconButton 
                  size="small" 
                  sx={{ 
                    position: 'absolute', 
                    top: 8, 
                    right: 8,
                    color: 'white',
                    background: 'rgba(0,0,0,0.3)',
                    '&:hover': {
                      background: 'rgba(0,0,0,0.5)'
                    }
                  }}
                >
                  <FullscreenIcon />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" noWrap>{photo.title}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Chip 
                  label={photo.year.toString()} 
                  size="small" 
                  variant="outlined"
                />
                <Chip 
                  label={photo.category} 
                  size="small" 
                  color="primary" 
                  variant="outlined"
                />
              </Box>
            </Box>
          </Paper>
        </Fade>
      ))}
    </Box>
  );

  const renderMasonryView = () => (
    <Box sx={{
      columns: {
        xs: '1',
        sm: '2',
        md: '3'
      },
      gap: 3
    }}>
      {filteredPhotos.map((photo, index) => (
        <Zoom in={isLoaded} style={{ transitionDelay: `${index * 100}ms` }} key={photo.id}>
          <Paper 
            elevation={3}
            sx={{ 
              display: 'inline-block',
              width: '100%',
              marginBottom: 3,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              borderRadius: '12px',
              breakInside: 'avoid',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }
            }}
            onClick={() => handlePhotoClick(photo)}
          >
            <img 
              src={photo.url} 
              alt={photo.title}
              style={{ 
                width: '100%', 
                display: 'block'
              }}
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
            <Box sx={{ p: 2 }}>
              <Typography variant="h6">{photo.title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {photo.year} • {photo.category}
              </Typography>
            </Box>
          </Paper>
        </Zoom>
      ))}
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h3" 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            mb: 1,
            background: 'linear-gradient(45deg, #FF6B6B 0%, #FFD166 50%, #06D6A0 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 5s ease infinite',
            textShadow: '0 0 20px rgba(255,165,0,0.3)',
            letterSpacing: '1px',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '60%',
              height: '4px',
              bottom: '-10px',
              left: 0,
              background: 'linear-gradient(90deg, #FF6B6B 0%, #FFD166 50%, #06D6A0 100%)',
              borderRadius: '10px',
            },
            '@keyframes gradient': {
              '0%': {
                backgroundPosition: '0% center'
              },
              '50%': {
                backgroundPosition: '100% center'
              },
              '100%': {
                backgroundPosition: '0% center'
              }
            }
          }}
        >
          Memories Gallery
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 4, 
            color: 'text.secondary',
            maxWidth: '800px',
            mt: 3
          }}
        >
          A visual journey through our shared moments and milestones. Explore our collection of memories from school days to recent reunions.
        </Typography>
      </motion.div>
      
      {/* Search and Filter Section */}
      <Paper
        elevation={3}
        sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: '16px',
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' }, 
            gap: 2, 
            alignItems: { xs: 'stretch', md: 'center' },
            justifyContent: 'space-between',
            mb: 2
          }}
        >
          <TextField
            placeholder="Search photos..."
            variant="outlined"
            fullWidth
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ 
              maxWidth: { xs: '100%', md: '300px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.05)'
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange}
              sx={{ 
                minHeight: '40px',
                '& .MuiTab-root': {
                  minHeight: '40px',
                  py: 0.5
                }
              }}
            >
              <Tab label="Grid View" />
              <Tab label="Masonry" />
            </Tabs>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
          <FilterListIcon fontSize="small" sx={{ mr: 1 }} />
          
          <Box sx={{ mr: 2 }}>
            <Typography variant="caption" sx={{ mr: 1, color: 'text.secondary' }}>
              Category:
            </Typography>
            {categories.map(category => (
              <Chip 
                key={category}
                label={category}
                clickable
                color={selectedCategory === category ? "primary" : "default"}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                sx={{ 
                  borderRadius: '20px',
                  m: 0.5
                }}
                size="small"
              />
            ))}
          </Box>
          
          <Box>
            <Typography variant="caption" sx={{ mr: 1, color: 'text.secondary' }}>
              Year:
            </Typography>
            {years.map(year => (
              <Chip 
                key={year}
                label={year.toString()}
                clickable
                color={selectedYear === year ? "secondary" : "default"}
                onClick={() => setSelectedYear(selectedYear === year ? null : year)}
                sx={{ 
                  borderRadius: '20px',
                  m: 0.5
                }}
                size="small"
              />
            ))}
          </Box>
          
          {(selectedCategory || selectedYear || searchTerm) && (
            <Chip 
              label="Clear All Filters" 
              onClick={clearFilters}
              sx={{ ml: 'auto' }}
              color="error"
              size="small"
            />
          )}
        </Box>
      </Paper>
      
      {/* Photos Display */}
      {tabValue === 0 ? renderGridView() : renderMasonryView()}
      
      {/* Empty state */}
      {filteredPhotos.length === 0 && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8,
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '16px',
            border: '1px dashed rgba(255,255,255,0.1)',
            mt: 4
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No photos found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search or filters
          </Typography>
          <Chip 
            label="Clear All Filters" 
            onClick={clearFilters}
            sx={{ mt: 3 }}
            color="primary"
            variant="outlined"
          />
        </Box>
      )}
      
      {/* Photo Detail Dialog */}
      <Dialog
        open={!!selectedPhoto}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#111'
          }
        }}
      >
        {selectedPhoto && (
          <Box sx={{ position: 'relative' }}>
            <DialogContent sx={{ p: 0, position: 'relative', height: '80vh', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                p: 2, 
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                zIndex: 10,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  {selectedPhoto.title} ({selectedPhoto.year})
                </Typography>
                <IconButton onClick={handleCloseDialog} sx={{ color: 'white' }}>
                  <CloseIcon />
                </IconButton>
              </Box>
              
              <Box sx={{ 
                flex: 1, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative'
              }}>
                <IconButton 
                  sx={{ 
                    position: 'absolute', 
                    left: 16, 
                    zIndex: 2,
                    color: 'white',
                    background: 'rgba(0,0,0,0.3)',
                    '&:hover': { background: 'rgba(0,0,0,0.5)' }
                  }}
                  onClick={handlePrevPhoto}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title}
                  style={{ 
                    maxWidth: '100%', 
                    maxHeight: 'calc(80vh - 120px)', 
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto'
                  }}
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder.jpg';
                  }}
                />
                
                <IconButton 
                  sx={{ 
                    position: 'absolute', 
                    right: 16, 
                    zIndex: 2,
                    color: 'white',
                    background: 'rgba(0,0,0,0.3)',
                    '&:hover': { background: 'rgba(0,0,0,0.5)' }
                  }}
                  onClick={handleNextPhoto}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
              
              <Box 
                sx={{ 
                  p: 3, 
                  background: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  borderTop: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <Typography variant="h5" gutterBottom>
                  {selectedPhoto.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {selectedPhoto.description || "No description available."}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    label={selectedPhoto.year.toString()} 
                    size="small" 
                    sx={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
                  />
                  <Chip 
                    label={selectedPhoto.category} 
                    size="small" 
                    sx={{ background: 'rgba(255,255,255,0.1)', color: 'white' }}
                  />
                  <Typography variant="caption" sx={{ ml: 'auto', opacity: 0.7 }}>
                    {currentPhotoIndex + 1} of {filteredPhotos.length}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </Container>
  );
};

export default Gallery;