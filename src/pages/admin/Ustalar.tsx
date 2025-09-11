import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const AdminUstalar: React.FC = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Ustalar
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage ustalar from here.
        </Typography>
      </Box>
    </Container>
  );
};

export default AdminUstalar;
