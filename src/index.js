import React from 'react';
import { render } from 'react-snapshot';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

render(<ErrorBoundary><BrowserRouter><App /></BrowserRouter></ErrorBoundary>, document.getElementById('root'));
