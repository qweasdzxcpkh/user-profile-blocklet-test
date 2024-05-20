'use client';

import mobileStyles from '../styles/Home.mobile.module.scss';
import pcStyles from '../styles/Home.module.scss';
import { useState } from 'react';
import { Box, Skeleton, Snackbar, Alert, CloseIcon, IconButton } from '@mui/material';

import { useQuery } from '@tanstack/react-query';
import useMediaQueryStyles from '../hooks/useMediaQueryStyles';
import Display from '../components/Profile/Display';
import Edit from '../components/Profile/Edit';

const Home = () => {
  const styles = useMediaQueryStyles(mobileStyles, pcStyles);
  const query = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      setLoading(true);
      try {
        const result = await fetch('/api/profile').then(res => res.json());
        // Mock for display skeleton
        await new Promise(resolve => setTimeout(resolve, 1000));
        return result;
      } catch (err) {
        setError('There is something wrong. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <Box className={styles.container}>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(undefined)}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setError(undefined);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {error}
        </Alert>
      </Snackbar>
      <Box className={styles.fields}>
        {isEdit ? (
          <Edit user={query?.data} onDisplay={() => setIsEdit(false)} />
        ) : (
          <Display loading={loading} user={query?.data} onEdit={() => setIsEdit(true)} />
        )}
      </Box>
    </Box>
  );
};
export default Home;
