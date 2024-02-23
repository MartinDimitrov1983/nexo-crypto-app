import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { INDEX, PAIR, TRADE_DETAILS } from '../constants/router';

import HomePage from '../pages/HomePage/HomePage';
import DetailsPage from '../pages/Detailspage/DetailsPage';

const routeConfig = [
    { path: PAIR, element: <HomePage urlParams={true} /> },
    { path: TRADE_DETAILS, element: <DetailsPage /> },
    { path: INDEX, element: <HomePage urlParams={false} /> }, // Default route
];

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {routeConfig.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
