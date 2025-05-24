import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Divider, 
  Button, 
  TextField, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  IconButton,
  Avatar,
  Chip,
  InputAdornment,
  Grid,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  authorAvatar?: string;
  date: string;
  content: string;
  replies: number;
  likes: number;
  category: string;
  isLiked?: boolean;
  isSaved?: boolean;
}

interface Reply {
  id: string;
  author: string;
  authorAvatar?: string;
  date: string;
  content: string;
  likes: number;
}

const Forum: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openNewPostDialog, setOpenNewPostDialog] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostCategory, setNewPostCategory] = useState('');
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [replyContent, setReplyContent] = useState('');
  
  // Sample forum posts - replace with actual data
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: "1",
      title: "Remember last tournament?",
      author: "Shoeb Reza",
      authorAvatar: "/images/shoeb2.jpg",
      date: "2024-01-15",
      content: "Tomader ki mone ache ami kibhabe last time football tournament e goal miss korchi?",
      replies: 5,
      likes: 12,
      category: "Memories",
      isLiked: false,
      isSaved: false
    },
    {
      id: "2",
      title: "Match",
      author: "Sadman Jawad Sakib",
      authorAvatar: "/images/sakib.jpg",
      date: "2024-02-20",
      content: "Ekta ki Barca v Real match er ayojon kora jayna?",
      replies: 8,
      likes: 24,
      category: "Events",
      isLiked: false,
      isSaved: false
    },
    {
      id: "3",
      title: "Question",
      author: "Ahmed Toukir",
      authorAvatar: "/images/babu.jpg",
      date: "2024-03-05",
      content: "Ekta Meye Dau nahole Collection dau!?",
      replies: 15,
      likes: 32,
      category: "Questions",
      isLiked: false,
      isSaved: false
    }
  ]);
  
  // Sample replies for the first post
  const [replies, setReplies] = useState<Reply[]>([    
    {
      id: "r1",
      author: "Shifat Hasan",
      authorAvatar: "/images/shifat.jpg",
      date: "2024-01-16",
      content: "IDOLO",
      likes: 8
    },
    {
      id: "r2",
      author: "Julfekar Hasan Ontor",
      authorAvatar: "/images/ontor.jpg",
      date: "2024-01-17",
      content: "Tor thaki mui hajar gun e bhalo khelang",
      likes: 5
    },
    // Replies for the second post (id: "2")
    {
      id: "r3",
      author: "Asadujjaman Akash",
      authorAvatar: "/images/akash.jpg",
      date: "2024-02-21",
      content: "Aj injured bole khelte parina!",
      likes: 7
    },
    {
      id: "r4",
      author: "Shoeb Reja",
      authorAvatar: "/images/shoeb2.jpg",
      date: "2024-02-22",
      content: "Ami goalkeeper hote chai!",
      likes: 4
    },
    {
      id: "r5",
      author: "Hasin Arman Shifa",
      authorAvatar: "/images/shifa.jpg",
      date: "2024-02-23",
      content: "Barcar to player e nai! Khelbe ke?",
      likes: 10
    },
    // Replies for the third post (id: "3")
    {
      id: "r6",
      author: "Md. Jion Khan",
      authorAvatar: "/images/jion.jpg",
      date: "2024-03-06",
      content: "Babu amakeo ekta dao",
      likes: 15
    },
    {
      id: "r7",
      author: "Hasin Arman Shifa",
      authorAvatar: "/images/shifa.jpg",
      date: "2024-03-07",
      content: "Amar Sosshokhetro",
      likes: 12
    },
    {
      id: "r8",
      author: "Fahim Hossain Sykot",
      authorAvatar: "/images/bhau.jpg",
      date: "2024-03-08",
      content: "Babu e moru te monehoyna ar kono din pani ashbe",
      likes: 8
    },
    {
      id: "r9",
      author: "Shifat Hasan",
      authorAvatar: "/images/shifat.jpg",
      date: "2024-03-09",
      content: "Ami ekta meye dite pari, kintu collection dite parbo na!",
      likes: 20
    },
    {
      id: "r10",
      author: "Rakibul Hasan Rony",
      authorAvatar: "/images/rony.jpg",
      date: "2024-03-10",
      content: "Mor Barit ay",
      likes: 18
    }
  ]);

  // Get unique categories for filter
  const categories = Array.from(new Set(posts.map(post => post.category)));

  // Filter posts based on search and category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });

  const handleOpenNewPostDialog = () => {
    setOpenNewPostDialog(true);
  };

  const handleCloseNewPostDialog = () => {
    setOpenNewPostDialog(false);
    setNewPostTitle('');
    setNewPostContent('');
    setNewPostCategory('');
  };

  const handleCreateNewPost = () => {
    const newPost: ForumPost = {
      id: (posts.length + 1).toString(),
      title: newPostTitle,
      author: "Current User", // Replace with actual user name
      authorAvatar: "https://i.pravatar.cc/150?img=3", // Replace with actual user avatar
      date: new Date().toISOString().split('T')[0],
      content: newPostContent,
      replies: 0,
      likes: 0,
      category: newPostCategory || "General",
      isLiked: false,
      isSaved: false
    };
    
    setPosts([newPost, ...posts]);
    handleCloseNewPostDialog();
  };

  const handlePostClick = (post: ForumPost) => {
    setSelectedPost(post);
  };

  const handleClosePostDialog = () => {
    setSelectedPost(null);
    setReplyContent('');
  };

  const handleSavePost = (postId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
    } else {
      setSavedPosts([...savedPosts, postId]);
    }
    
    // Update the posts array to reflect the saved status
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, isSaved: !post.isSaved } : post
    ));
  };

  const handleLikePost = (postId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
      // Decrease like count
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes - 1, isLiked: false } : post
      ));
    } else {
      setLikedPosts([...likedPosts, postId]);
      // Increase like count
      setPosts(posts.map(post => 
        post.id === postId ? { ...post, likes: post.likes + 1, isLiked: true } : post
      ));
    }
  };

  const handleSubmitReply = () => {
    if (!selectedPost || !replyContent.trim()) return;
    
    const newReply: Reply = {
      id: `r${replies.length + 1}`,
      author: "Current User", // Replace with actual user name
      authorAvatar: "https://i.pravatar.cc/150?img=3", // Replace with actual user avatar
      date: new Date().toISOString().split('T')[0],
      content: replyContent,
      likes: 0
    };
    
    setReplies([...replies, newReply]);
    
    // Update the post's reply count
    setPosts(posts.map(post => 
      post.id === selectedPost.id ? { ...post, replies: post.replies + 1 } : post
    ));
    
    setReplyContent('');
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
          Batch 16 Forum
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
          Connect with your batchmates, share memories, discuss upcoming events, and stay in touch with the Batch 16 community.
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
          placeholder="Search discussions..."
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
        
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
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
          
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />}
            onClick={handleOpenNewPostDialog}
            sx={{ 
              ml: { xs: 0, md: 2 },
              borderRadius: '20px',
              px: 2
            }}
          >
            New Post
          </Button>
        </Box>
      </Box>
      
      {/* Forum Posts */}
      <Grid container spacing={3}>
        {filteredPosts.map((post, index) => (
          <Grid item xs={12} key={post.id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Paper 
                elevation={3}
                onClick={() => handlePostClick(post)}
                sx={{ 
                  p: 3, 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 6
                  },
                  background: 'rgba(30,30,30,0.7)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={post.authorAvatar} 
                    alt={post.author}
                    sx={{ width: 40, height: 40, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {post.author}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(post.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </Typography>
                  </Box>
                  <Chip 
                    label={post.category} 
                    size="small" 
                    sx={{ ml: 'auto' }}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
                
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {post.title}
                </Typography>
                
                <Typography 
                  variant="body2" 
                  color="textSecondary" 
                  sx={{ 
                    mb: 3,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {post.content}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton 
                        size="small" 
                        onClick={(e) => handleLikePost(post.id, e)}
                        color={likedPosts.includes(post.id) ? "primary" : "inherit"}
                      >
                        <ThumbUpIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption" sx={{ ml: 0.5 }}>
                        {post.likes}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton size="small">
                        <CommentIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption" sx={{ ml: 0.5 }}>
                        {post.replies}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box>
                    <IconButton 
                      size="small"
                      onClick={(e) => handleSavePost(post.id, e)}
                      color={savedPosts.includes(post.id) ? "primary" : "inherit"}
                    >
                      {savedPosts.includes(post.id) ? (
                        <BookmarkIcon fontSize="small" />
                      ) : (
                        <BookmarkBorderIcon fontSize="small" />
                      )}
                    </IconButton>
                    
                    <IconButton size="small">
                      <ShareIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
      </Grid>
      
      {/* New Post Dialog */}
      <Dialog 
        open={openNewPostDialog} 
        onClose={handleCloseNewPostDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            label="Category"
            type="text"
            fullWidth
            variant="outlined"
            value={newPostCategory}
            onChange={(e) => setNewPostCategory(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <TextField
            label="Content"
            multiline
            rows={6}
            fullWidth
            variant="outlined"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewPostDialog}>Cancel</Button>
          <Button 
            onClick={handleCreateNewPost} 
            variant="contained" 
            color="primary"
            disabled={!newPostTitle.trim() || !newPostContent.trim()}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Post Detail Dialog */}
      <Dialog 
        open={!!selectedPost} 
        onClose={handleClosePostDialog}
        fullWidth
        maxWidth="md"
        scroll="paper"
      >
        {selectedPost && (
          <>
            <DialogContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar 
                  src={selectedPost.authorAvatar} 
                  alt={selectedPost.author}
                  sx={{ width: 48, height: 48, mr: 2 }}
                />
                <Box>
                  <Typography variant="h6">
                    {selectedPost.author}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(selectedPost.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </Typography>
                </Box>
                <Chip 
                  label={selectedPost.category} 
                  size="small" 
                  sx={{ ml: 'auto' }}
                  color="primary"
                />
              </Box>
              
              <Typography variant="h5" gutterBottom>
                {selectedPost.title}
              </Typography>
              
              <Typography paragraph>
                {selectedPost.content}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <Button 
                  startIcon={<ThumbUpIcon />} 
                  variant="outlined" 
                  size="small"
                  color={likedPosts.includes(selectedPost.id) ? "primary" : "inherit"}
                  onClick={(e) => handleLikePost(selectedPost.id, e)}
                >
                  {selectedPost.likes} Likes
                </Button>
                
                <Button 
                  startIcon={<CommentIcon />} 
                  variant="outlined" 
                  size="small"
                >
                  {selectedPost.replies} Replies
                </Button>
                
                <Button 
                  startIcon={savedPosts.includes(selectedPost.id) ? <BookmarkIcon /> : <BookmarkBorderIcon />} 
                  variant="outlined" 
                  size="small"
                  onClick={(e) => handleSavePost(selectedPost.id, e)}
                >
                  {savedPosts.includes(selectedPost.id) ? "Saved" : "Save"}
                </Button>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Replies
              </Typography>
              
              {replies
                .filter(reply => {
                  if (selectedPost.id === "1") {
                    return reply.id === "r1" || reply.id === "r2";
                  } else if (selectedPost.id === "2") {
                    return reply.id === "r3" || reply.id === "r4" || reply.id === "r5";
                  } else if (selectedPost.id === "3") {
                    return reply.id === "r6" || reply.id === "r7" || reply.id === "r8" || 
                           reply.id === "r9" || reply.id === "r10";
                  }
                  return false;
                })
                .map((reply) => (
                <Box key={reply.id} sx={{ mb: 3, pl: { xs: 0, md: 2 } }}>
                  <Box sx={{ display: 'flex', mb: 2 }}>
                    <Avatar 
                      src={reply.authorAvatar} 
                      alt={reply.author}
                      sx={{ width: 36, height: 36, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="subtitle2">
                        {reply.author}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {new Date(reply.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ pl: 6 }}>
                    {reply.content}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, pl: 6 }}>
                    <IconButton size="small">
                      <ThumbUpIcon fontSize="small" />
                    </IconButton>
                    <Typography variant="caption" sx={{ mr: 2 }}>
                      {reply.likes}
                    </Typography>
                    <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>
                      Reply
                    </Typography>
                  </Box>
                </Box>
              ))}
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Add a reply
                </Typography>
                <TextField
                  multiline
                  rows={3}
                  fullWidth
                  variant="outlined"
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button 
                  variant="contained" 
                  color="primary"
                  onClick={handleSubmitReply}
                  disabled={!replyContent.trim()}
                >
                  Post Reply
                </Button>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClosePostDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Forum;