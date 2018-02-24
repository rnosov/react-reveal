import React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import config from 'react-reveal/globals';

config({ ssrFadeout: false });
render(<ErrorBoundary><BrowserRouter><App /></BrowserRouter></ErrorBoundary>, document.getElementById('root'));
