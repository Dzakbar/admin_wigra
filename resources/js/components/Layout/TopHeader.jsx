import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const TopHeader = () => {
    const location = useLocation();
    
    // Simple breadcrumb logic based on path
    const getPageTitle = () => {
        const path = location.pathname.split('/').pop();
        if (path === 'admin') return 'Dashboard Overview';
        return path.charAt(0).toUpperCase() + path.slice(1);
    };

    return (
        <header className="h-20 bg-wigra-dark/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center gap-4">
                <button className="lg:hidden text-white/60 hover:text-white">
                    <Menu size={24} />
                </button>
                <div>
                    <h2 className="font-serif text-xl md:text-2xl text-white">{getPageTitle()}</h2>
                    <p className="font-sans text-xs text-white/40 tracking-wider">Welcome back, Admin</p>
                </div>
            </div>

            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2">
                    <Search size={16} className="text-white/40" />
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-transparent border-none outline-none text-sm text-white px-3 w-48 placeholder:text-white/30"
                    />
                </div>

                {/* Notifications */}
                <button className="relative text-white/60 hover:text-white transition-colors">
                    <Bell size={20} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-wigra-accent rounded-full"></span>
                </button>

                {/* Profile Avatar */}
                <div className="flex items-center gap-3 pl-6 border-l border-white/10">
                    <div className="w-10 h-10 rounded-full bg-wigra-muted overflow-hidden border border-white/20">
                        <img 
                            src="https://ui-avatars.com/api/?name=Admin+Wigra&background=1a1a1a&color=fff" 
                            alt="Admin" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="hidden md:block">
                        <p className="font-sans text-sm text-white font-medium">Super Admin</p>
                        <p className="font-sans text-xs text-white/40">admin@wigra.com</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopHeader;
