import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const AdminBlog: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Blog
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage blog posts from here.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminBlog;
