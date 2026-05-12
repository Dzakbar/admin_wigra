import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import DashboardOverview from './pages/DashboardOverview';
import Login from './pages/Login';
import Register from './pages/Register';
import Films from './pages/Films';
import Events from './pages/Events';
import FilmApplications from './pages/FilmApplications';
import ApplyFilm from './pages/ApplyFilm';
import Team from './pages/Team';
import ManageUser from './pages/ManageUser';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login/admin" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/apply" element={<ApplyFilm />} />
                <Route path="/admin" element={<Layout />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="films" element={<Films />} />
                    <Route path="events" element={<Events />} />
                    <Route path="applicants" element={<FilmApplications />} />
                    <Route path="team" element={<Team />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
                <Route path="*" element={<Navigate to="/login/admin" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = createRoot(rootElement);
    root.render(<App />);
}
