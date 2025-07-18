import React from 'react';
import { Loader } from '../Context/LoaderContext.jsx';
import { CircularProgress, Backdrop } from '@mui/material';

const GlobalLoader = () => {
  const { loading } = Loader();

  return (
    <Backdrop
      open={loading}
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 9999 }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalLoader;
