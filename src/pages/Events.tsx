import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  CardMedia, 
  Box, 
  Grid, 
  Button, 
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  category: string;
  imageUrl?: string;
  isUpcoming: boolean;
}

const Events: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  // Sample events - replace with actual data
  const events: Event[] = [
    {
      id: 1,
      title: "Annual Reunion 2025",
      date: "June 6, 2025",
      location: "School Field",
      description: "Join us for our annual reunion celebration with dinner and cultural program. This year's theme is 'Nostalgia Nights' where we'll recreate some of our favorite school memories. There will be performances by our talented batchmates, a special tribute to our teachers, and of course, plenty of time to catch up with old friends.",
      category: "Reunion",
      imageUrl: "/images/reunion.jpg",
      isUpcoming: true
    },
    {
      id: 2,
      title: "Football Tournament",
      date: "June 6, 2025",
      location: "School Field",
      description: "The KGHSK Batch Football Tournament is an exciting and spirited event that brings together alumni from various batches of KGHSK to compete in the beautiful game. Teams formed by batchmates showcase their football skills, camaraderie, and sportsmanship on the field.",
      category: "Sports",
      imageUrl: "/images/shoeb.jpeg",
      isUpcoming: true
    },
    {
      id: 3,
      title: "Jersey Design Competition",
      date: "June 5, 2025",
      location: "Online",
      description: "As the KGHSK Batch Football Tournament approaches, it's time to gear up and make a statement on the field! We need an extraordinary jersey that truly represents the spirit of our batch. Submit your creative designs and the winning design will be produced for our team.",
      category: "Competition",
      imageUrl: "/images/jersey.png",
      isUpcoming: true
    },
    {
      id: 4,
      title: "Career Networking Night",
      date: "June 9, 2025",
      location: "Dharla Bridge",
      description: "Connect with fellow batch mates in various industries for professional networking, mentorship opportunities, and career growth. Special guest speakers from our own batch who have achieved remarkable success in their fields will share their insights and experiences.",
      category: "Networking",
      imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isUpcoming: true
    },
    {
      id: 5,
      title: "Batch 16 Charity Drive",
      date: "june 10, 2024",
      location: "Community Center",
      description: "Let's give back to our community! Join us for a day of service as we organize a charity drive to support underprivileged students at our society. We'll be collecting school supplies, books, and funds to establish a scholarship program.",
      category: "Charity",
      imageUrl: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      isUpcoming: true
    },
    {
      id: 6,
      title: "Summer tour 2025",
      date: "May 10, 2025",
      location: "SONAICHORI TRAIL",
      description: "Our last summer tour was a huge success with games, barbecue, and catching up with old friends. We had over 50 batch mates attend with their families for a day of fun in the sun.",
      category: "Social",
      imageUrl: "/images/tour.jpeg",
      isUpcoming: true
    }
  ];

  // Get unique categories for filter
  const categories = Array.from(new Set(events.map(event => event.category)));

  // Filter events based on search, category, and upcoming status
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;
    const matchesUpcoming = showUpcomingOnly ? event.isUpcoming : true;
    
    return matchesSearch && matchesCategory && matchesUpcoming;
  });

  const handleSaveEvent = (eventId: number) => {
    if (savedEvents.includes(eventId)) {
      setSavedEvents(savedEvents.filter(id => id !== eventId));
    } else {
      setSavedEvents([...savedEvents, eventId]);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
  };

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
            fontWeight: 600,
            mb: 1,
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Events & Announcements
        </Typography>
        
        <Typography 
          variant="subtitle1" 
          sx={{ 
            mb: 4, 
            color: 'text.secondary',
            maxWidth: '800px'
          }}
        >
          Stay connected with Batch 16 through our upcoming events, reunions, and important announcements. Don't miss out on opportunities to reconnect with your classmates!
        </Typography>
      </motion.div>
      
      {/* Search and Filter Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' }, 
          gap: 2, 
          mb: 4,
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          background: 'rgba(255,255,255,0.05)',
          p: 2,
          borderRadius: 2
        }}
      >
        <TextField
          placeholder="Search events..."
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
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button 
            size="small"
            variant={showUpcomingOnly ? "contained" : "outlined"}
            onClick={() => setShowUpcomingOnly(!showUpcomingOnly)}
            startIcon={<CalendarTodayIcon />}
            sx={{ borderRadius: '20px' }}
          >
            Upcoming Only
          </Button>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FilterListIcon fontSize="small" />
            {categories.map(category => (
              <Chip 
                key={category}
                label={category}
                clickable
                color={selectedCategory === category ? "primary" : "default"}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                sx={{ borderRadius: '20px' }}
              />
            ))}
          </Box>
        </Box>
      </Box>
      
      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <Grid container spacing={3}>
          {filteredEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    position: 'relative',
                    '&:hover': {
                      boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
                    }
                  }}
                >
                  {event.imageUrl && (
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="180"
                        image={event.imageUrl}
                        alt={event.title}
                        sx={{ 
                          objectFit: 'cover',
                          filter: 'brightness(0.85)'
                        }}
                      />
                      <Chip 
                        label={event.category} 
                        size="small"
                        sx={{ 
                          position: 'absolute', 
                          top: 12, 
                          right: 12,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          color: 'white',
                          fontWeight: 500
                        }} 
                      />
                      {!event.isUpcoming && (
                        <Box sx={{ 
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(0,0,0,0.5)',
                        }}>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: 'white', 
                              transform: 'rotate(-15deg)',
                              border: '2px solid white',
                              px: 2,
                              py: 0.5,
                              borderRadius: 1
                            }}
                          >
                            PAST EVENT
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  )}
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                      {event.title}
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.date}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {event.location}
                        </Typography>
                      </Box>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ 
                      mb: 2,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {event.description}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={() => handleEventClick(event)}
                        sx={{ borderRadius: '20px' }}
                      >
                        View Details
                      </Button>
                      <Box>
                        <IconButton 
                          size="small" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveEvent(event.id);
                          }}
                          color={savedEvents.includes(event.id) ? "primary" : "default"}
                        >
                          {savedEvents.includes(event.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                        </IconButton>
                        <IconButton size="small">
                          <ShareIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ 
          textAlign: 'center', 
          py: 8, 
          background: 'rgba(255,255,255,0.05)',
          borderRadius: 2
        }}>
          <Typography variant="h6">No events found matching your criteria</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search or filters
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 3 }}
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory(null);
              setShowUpcomingOnly(false);
            }}
          >
            Clear All Filters
          </Button>
        </Box>
      )}
      
      {/* Event Detail Dialog */}
      <Dialog 
        open={selectedEvent !== null} 
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
      >
        {selectedEvent && (
          <>
            <DialogTitle sx={{ 
              pb: 1,
              pt: 3,
              px: { xs: 2, sm: 3 }
            }}>
              <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                {selectedEvent.title}
              </Typography>
              <Box sx={{ display: 'flex', mt: 1 }}>
                <Chip 
                  label={selectedEvent.category} 
                  size="small" 
                  sx={{ mr: 1 }} 
                />
                {selectedEvent.isUpcoming ? (
                  <Chip 
                    label="Upcoming" 
                    size="small" 
                    color="primary" 
                  />
                ) : (
                  <Chip 
                    label="Past Event" 
                    size="small" 
                    color="default" 
                  />
                )}
              </Box>
            </DialogTitle>
            <DialogContent sx={{ px: { xs: 2, sm: 3 } }}>
              {selectedEvent.imageUrl && (
                <Box sx={{ mb: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <img 
                    src={selectedEvent.imageUrl} 
                    alt={selectedEvent.title} 
                    style={{ 
                      width: '100%', 
                      maxHeight: '300px', 
                      objectFit: 'cover' 
                    }} 
                  />
                </Box>
              )}
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Event Details
                  </Typography>
                  <Typography paragraph>
                    {selectedEvent.description}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    background: 'rgba(0,0,0,0.03)', 
                    p: 2, 
                    borderRadius: 2,
                    mb: 2
                  }}>
                    <Typography variant="h6" gutterBottom>
                      Date & Time
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        {selectedEvent.date}
                      </Typography>
                    </Box>
                    
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      Location
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body1">
                        {selectedEvent.location}
                      </Typography>
                    </Box>
                  </Box>
                  
                  {selectedEvent.isUpcoming && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button 
                        variant="contained" 
                        fullWidth
                        sx={{ borderRadius: '20px' }}
                      >
                        RSVP for this Event
                      </Button>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        startIcon={<CalendarTodayIcon />}
                        sx={{ borderRadius: '20px' }}
                      >
                        Add to Calendar
                      </Button>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions sx={{ px: 3, py: 2 }}>
              <Button 
                onClick={() => handleSaveEvent(selectedEvent.id)}
                startIcon={savedEvents.includes(selectedEvent.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              >
                {savedEvents.includes(selectedEvent.id) ? 'Saved' : 'Save Event'}
              </Button>
              <Button startIcon={<ShareIcon />}>
                Share
              </Button>
              <Button onClick={handleCloseDialog} variant="contained">
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Add Event Suggestion Section */}
      <Box 
        sx={{ 
          mt: 8, 
          p: 4, 
          borderRadius: 2, 
          background: 'linear-gradient(135deg, rgba(66,66,74,0.6) 0%, rgba(25,25,25,0.6) 100%)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Have an event idea for Batch 16?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, maxWidth: '700px', mx: 'auto' }}>
          We're always looking for new ways to bring our batch together. If you have an idea for an event or would like to organize a meetup, let us know!
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ 
            borderRadius: '20px',
            px: 4,
            py: 1
          }}
        >
          Suggest an Event
        </Button>
      </Box>
    </Container>
  );
};

export default Events;