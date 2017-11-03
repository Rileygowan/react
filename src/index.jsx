// Application entrypoint.

// Load up the application styles
require('../styles/application.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// Render the top-level React component
ReactDOM.render(<App />, document.getElementById('react-root'));