import { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

/**
 * Custom hook to dynamically switch between mobile and PC styles based on media query.
 * @param {object} mobileStyles - The css modules styles for mobile view.
 * @param {object} pcStyles - The css modules styles for PC view.
 * @returns {object} - The styles to be applied based on the media query.
 */
export default (mobileStyles, pcStyles) => {
  const theme = useTheme();
  const matchesPc = useMediaQuery(theme.breakpoints.up('sm'));
  const styles = useMemo(() => {
    return matchesPc ? pcStyles : mobileStyles;
  }, [matchesPc]);

  return styles;
};
