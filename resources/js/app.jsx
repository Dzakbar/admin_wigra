import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import DashboardOverview from './pages/DashboardOverview';
import Login from './pages/Login';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login/admin" element={<Login />} />
                <Route path="/admin" element={<Layout />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="films" element={<div className="p-6"><h1 className="text-2xl font-serif">Manage Films</h1></div>} />
                    <Route path="events" element={<div className="p-6"><h1 className="text-2xl font-serif">Manage Events</h1></div>} />
                    <Route path="applicants" element={<div className="p-6"><h1 className="text-2xl font-serif">Manage Applicants</h1></div>} />
                    <Route path="content" element={<div className="p-6"><h1 className="text-2xl font-serif">Manage Content</h1></div>} />
                </Route>
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
