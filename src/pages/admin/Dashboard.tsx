import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome to the admin dashboard.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;
