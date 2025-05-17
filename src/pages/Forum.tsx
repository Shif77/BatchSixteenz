import React from 'react';
import { Container, Card, CardContent, Typography, Box, Divider } from '@mui/material';

interface ForumPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  replies: number;
}

const Forum: React.FC = () => {
  // Sample forum posts - replace with actual data
  const posts: ForumPost[] = [
    {
      id: "1",
      title: "Remember our first school trip?",
      author: "John Doe",
      date: "2024-01-15",
      content: "Let's share memories from our first school trip to the museum...",
      replies: 5
    },
    // Add more posts here
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
      <Typography variant="h4" gutterBottom>Discussion Forum</Typography>
      
      {posts.map((post, index) => (
        <Box key={post.id} sx={{ mb: 3 }}>
          <Card>
            <CardContent>
              <Typography variant="h6">{post.title}</Typography>
              <Typography color="textSecondary" sx={{ mb: 2 }}>
                Posted by {post.author} on {new Date(post.date).toLocaleDateString()}
              </Typography>
              <Typography paragraph>{post.content}</Typography>
              <Divider sx={{ my: 2 }} />
              <Typography color="textSecondary">
                {post.replies} replies
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Container>
  );
};

export default Forum;