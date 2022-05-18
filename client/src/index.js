import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
    );