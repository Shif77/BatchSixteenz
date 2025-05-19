import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { motion } from 'framer-motion';

interface Achievement {
  name: string;
  achievement: string;
  year: number;
  field: string;
  description: string;
  photo?: string;
}

const Achievements: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [openDialog, setOpenDialog] = useState(false);
  const [newAchievement, setNewAchievement] = useState<Partial<Achievement>>({
    name: '',
    achievement: '',
    year: new Date().getFullYear(),
    field: '',
    description: ''
  });
  
  const achievements: Achievement[] = [
    {
      name: "Sarah Johnson",
      achievement: "Nobel Prize in Physics",
      year: 2023,
      field: "Science",
      description: "Groundbreaking research in quantum computing that revolutionized the field and opened new possibilities for secure communications and advanced computational methods.",
      photo: "/images/placeholder.jpg"
    },
    {
      name: "Michael Chen",
      achievement: "Pulitzer Prize for Fiction",
      year: 2022,
      field: "Literature",
      description: "Award-winning novel 'Echoes of Tomorrow' that explores themes of identity and belonging in a post-digital world.",
      photo: "/images/placeholder.jpg"
    },
    {
      name: "Priya Patel",
      achievement: "Olympic Gold Medal",
      year: 2024,
      field: "Sports",
      description: "Gold medal in badminton singles at the 2024 Summer Olympics, becoming the youngest champion in the sport's history.",
      photo: "/images/placeholder.jpg"
    },
    {
      name: "David Okafor",
      achievement: "Forbes 30 Under 30",
      year: 2023,
      field: "Business",
      description: "Founded a sustainable energy startup that has brought affordable solar power to over 100,000 homes in developing regions.",
      photo: "/images/placeholder.jpg"
    }
  ];

  // Get unique fields for filter
  const fields = Array.from(new Set(achievements.map(item => item.field)));

  // Filter and sort achievements
  const filteredAchievements = achievements
    .filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesField = selectedField ? item.field === selectedField : true;
      
      return matchesSearch && matchesField;
    })
    .sort((a, b) => {
      return sortOrder === 'desc' ? b.year - a.year : a.year - b.year;
    });

  const handleFieldChange = (event: SelectChangeEvent) => {
    setSelectedField(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value as 'asc' | 'desc');
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewAchievement({
      name: '',
      achievement: '',
      year: new Date().getFullYear(),
      field: '',
      description: ''
    });
  };
  
  const handleSubmit = () => {
    // In a real app, you would send this to your backend
    console.log('Submitted:', newAchievement);
    handleCloseDialog();
  };

  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [isDetailView, setIsDetailView] = useState(false);
  
  const getGradientForField = (field: string) => {
    switch(field) {
      case 'Science': return 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)';
      case 'Literature': return 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)';
      case 'Sports': return 'linear-gradient(135deg, #FF9966 0%, #FF5E62 100%)';
      case 'Business': return 'linear-gradient(135deg, #184E68 0%, #57CA85 100%)';
      default: return 'linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)';
    }
  };
  
  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsDetailView(true);
  };
  
  const handleCloseDetailView = () => {
    setIsDetailView(false);
    setTimeout(() => setSelectedAchievement(null), 300);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{ 
            fontWeight: 800,
            mb: 1,
            background: 'linear-gradient(45deg, #FF4500 0%, #FFD700 50%, #FF4500 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradient 3s ease infinite',
            textShadow: '0 0 20px rgba(255,165,0,0.3)',
            letterSpacing: '1px',
            position: 'relative',
            display: 'inline-block',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '5px',
              bottom: '-10px',
              left: 0,
              background: 'linear-gradient(90deg, rgba(255,69,0,0.8) 0%, rgba(255,215,0,0.8) 50%, rgba(255,69,0,0.8) 100%)',
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
          Hall of Fame
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 4, 
            color: 'text.secondary',
            maxWidth: '800px',
            mt: 3,
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}
        >
          Celebrating the extraordinary achievements of our Batch 16 alumni who have made remarkable impacts across various fields.
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
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 2,
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between'
        }}>
          <TextField
            placeholder="Search achievements..."
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
            }}
          />
          
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Field</InputLabel>
              <Select
                value={selectedField}
                label="Field"
                onChange={handleFieldChange}
              >
                <MenuItem value="">All Fields</MenuItem>
                {fields.map(field => (
                  <MenuItem key={field} value={field}>{field}</MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Sort By Year</InputLabel>
              <Select
                value={sortOrder}
                label="Sort By Year"
                onChange={handleSortChange}
              >
                <MenuItem value="desc">Newest First</MenuItem>
                <MenuItem value="asc">Oldest First</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Paper>
      
      {/* Add Achievement Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleOpenDialog}
          startIcon={<AddIcon />}
          sx={{ 
            borderRadius: '20px',
            px: 3,
            background: 'linear-gradient(45deg, #FF4500, #FFD700)',
            boxShadow: '0 4px 20px rgba(255,165,0,0.3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF4500, #FFD700)',
              boxShadow: '0 6px 25px rgba(255,165,0,0.5)',
            }
          }}
        >
          Submit Achievement
        </Button>
      </Box>
      
      {/* Detail View */}
      {isDetailView && selectedAchievement ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: '20px',
              background: getGradientForField(selectedAchievement.field),
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              mb: 4
            }}
          >
            <IconButton
              onClick={handleCloseDetailView}
              sx={{
                position: 'absolute',
                top: 16,
                right: 16,
                color: 'white',
                background: 'rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'rgba(0,0,0,0.4)'
                }
              }}
            >
              <CloseIcon />
            </IconButton>
            
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="overline" sx={{ opacity: 0.8 }}>
                  {selectedAchievement.field} • {selectedAchievement.year}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
                  {selectedAchievement.achievement}
                </Typography>
                <Typography variant="h5" sx={{ mb: 3 }}>
                  {selectedAchievement.name}
                </Typography>
                
                <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                  {selectedAchievement.description}
                </Typography>
                
                <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    sx={{ 
                      background: 'rgba(255,255,255,0.2)', 
                      '&:hover': { background: 'rgba(255,255,255,0.3)' } 
                    }}
                  >
                    Share Story
                  </Button>
                  <Button 
                    variant="outlined" 
                    sx={{ 
                      borderColor: 'rgba(255,255,255,0.5)', 
                      color: 'white',
                      '&:hover': { borderColor: 'white' } 
                    }}
                  >
                    Contact {selectedAchievement.name.split(' ')[0]}
                  </Button>
                </Box>
              </Box>
              
              <Box sx={{ 
                width: { xs: '100%', md: '300px' }, 
                height: { xs: '300px', md: '400px' },
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                <img 
                  src={selectedAchievement.photo} 
                  alt={selectedAchievement.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                />
              </Box>
            </Box>
          </Paper>
        </motion.div>
      ) : (
        <Grid container spacing={3}>
          {filteredAchievements.map((achievement, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" 
                }}
                onClick={() => handleAchievementClick(achievement)}
              >
                <Card sx={{ 
                  height: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.3s ease',
                }}>
                  <Box
                    sx={{
                      height: '120px',
                      background: getGradientForField(achievement.field),
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white'
                    }}
                  >
                    <Typography variant="h3" sx={{ fontWeight: 700 }}>
                      {achievement.year}
                    </Typography>
                    <Chip
                      label={achievement.field}
                      sx={{
                        position: 'absolute',
                        bottom: '10px',
                        right: '10px',
                        background: 'rgba(255,255,255,0.2)',
                        color: 'white'
                      }}
                    />
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                      {achievement.achievement}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {achievement.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {achievement.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Achievement Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="sm" 
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            background: 'rgba(30,30,30,0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      >
        <DialogTitle sx={{ 
          background: 'linear-gradient(45deg, #FF4500, #FFD700)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 700,
          fontSize: '1.5rem'
        }}>
          Add New Achievement
        </DialogTitle>
        <IconButton
          onClick={handleCloseDialog}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Name"
              fullWidth
              value={newAchievement.name}
              onChange={(e) => setNewAchievement({...newAchievement, name: e.target.value})}
            />
            <TextField
              label="Achievement"
              fullWidth
              value={newAchievement.achievement}
              onChange={(e) => setNewAchievement({...newAchievement, achievement: e.target.value})}
            />
            <TextField
              label="Year"
              type="number"
              fullWidth
              value={newAchievement.year}
              onChange={(e) => setNewAchievement({...newAchievement, year: parseInt(e.target.value)})}
            />
            <TextField
              label="Field"
              fullWidth
              value={newAchievement.field}
              onChange={(e) => setNewAchievement({...newAchievement, field: e.target.value})}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={newAchievement.description}
              onChange={(e) => setNewAchievement({...newAchievement, description: e.target.value})}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: '8px',
              background: 'linear-gradient(45deg, #FF4500, #FFD700)',
              '&:hover': {
                background: 'linear-gradient(45deg, #FF4500, #FFD700)',
                boxShadow: '0 6px 20px rgba(255,165,0,0.4)'
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Achievements;