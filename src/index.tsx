import * as React from 'react';
import { hydrate } from 'react-dom';
import App from './client/components/App';
import { BrowserRouter } from 'react-router-dom';
hydrate(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('app')
);