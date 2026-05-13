import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    if (user && user.role === 'user') {
        return (
            <div className="min-h-screen bg-wigra-black flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                    <span className="text-red-500 text-2xl font-bold">!</span>
                </div>
                <h1 className="text-3xl font-serif text-white mb-2">Inaccessible</h1>
                <p className="text-white/60 font-sans max-w-md">
                    This is the administrative dashboard. Normal users do not have access to this portal.
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-wigra-black flex">
            {/* Desktop spacer to reserve fixed sidebar width */}
            <div className="hidden lg:block w-64 flex-shrink-0"></div>

            {/* Unified Sidebar for both mobile and desktop */}
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <TopHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
