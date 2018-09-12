import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// import registerServiceWorker from './registerServiceWorker';
ReactDOM.render(<App page_type={window.config.page_type}/>, document.getElementById('root'));
// registerServiceWorker();
