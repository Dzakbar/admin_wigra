import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

const Layout = () => {
    return (
        <div className="min-h-screen bg-wigra-black flex">
            {/* Sidebar is fixed, so we don't need it in normal flow */}
            <div className="hidden lg:block w-64 flex-shrink-0">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <TopHeader />
                
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
