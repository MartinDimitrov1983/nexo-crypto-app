import React from 'react';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Router from './router';

function App() {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    );
}

export default App;
