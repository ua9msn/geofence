import React from 'react';
import ReactDOM from 'react-dom';
import './wydr';
import {App} from './App/App';
import config from './config.json';
import 'normalize.css';
import './global.css';

export const AppContext = React.createContext(config);

ReactDOM.render(
    <AppContext.Provider value={config}>
        <App />
    </AppContext.Provider>,
    document.getElementById('root')
);
