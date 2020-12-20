import React, { useState } from 'react';
import './styles.css';
import { Box } from 'theme-ui';

import { Helmet } from 'react-helmet';

import { ThemeProvider } from 'emotion-theming';
import light from './Theme';
import dark from './Theme/dark';
import Choreography from './pages/Choreography';
import Home from './pages/Home';
import { Router } from '@reach/router';

export default function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeProvider theme={theme === 'light' ? light : dark}>
      <Box bg={'background'} className="App">
        <Helmet>
          <style>
            {`html,body {
            margin: 0;
            body: 0;
          }`}
          </style>
        </Helmet>
        <Router>
          <Home path={'/'}
            theme={theme}
            setTheme={setTheme}
          />
          <Choreography
            path={'/choreography/:id/:tagline'}
            theme={theme}
            setTheme={setTheme}
          />
        </Router>
      </Box>
    </ThemeProvider>
  );
}
