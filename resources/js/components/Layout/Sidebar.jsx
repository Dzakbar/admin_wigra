import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { 
    LayoutDashboard, 
    Film, 
    CalendarDays, 
    Users, 
    Star,
    LogOut,
    UsersRound
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const isSuperAdmin = user?.role === 'super_admin';

    let navItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard', exact: true },
        { path: '/admin/films', icon: <Film size={20} />, label: 'Films' },
        { path: '/admin/events', icon: <CalendarDays size={20} />, label: 'Events' },
        { path: '/admin/applicants', icon: <Users size={20} />, label: 'Applicants' },
        { path: '/admin/team', icon: <Star size={20} />, label: 'Team' },
    ];

    if (!isSuperAdmin) {
        navItems = navItems.filter(item => item.label !== 'Applicants');
    }

    return (
        <aside className="w-64 h-screen bg-wigra-dark border-r border-white/10 flex flex-col fixed left-0 top-0">
            {/* Logo Area */}
            <div className="h-20 flex items-center px-8 border-b border-white/10">
                <h1 className="font-serif text-2xl tracking-widest text-white">WIGRA.</h1>
                <span className="text-[10px] uppercase tracking-widest text-wigra-accent ml-2 mt-1">Admin</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-8 px-4 flex flex-col gap-2 overflow-y-auto">
                <div className="text-xs font-sans text-white/40 uppercase tracking-widest mb-2 px-4">Menu</div>
                
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.exact}
                        className={({ isActive }) => `
                            flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                            ${isActive 
                                ? 'bg-wigra-accent/10 text-wigra-accent border border-wigra-accent/20' 
                                : 'text-white/60 hover:bg-white/5 hover:text-white'}
                        `}
                    >
                        {item.icon}
                        <span className="font-sans text-sm font-medium">{item.label}</span>
                    </NavLink>
                ))}

                {isSuperAdmin && (
                    <>
                        <div className="text-xs font-sans text-white/40 uppercase tracking-widest mt-6 mb-2 px-4">System</div>
                        <NavLink
                            to="/admin/manage-users"
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                                ${isActive 
                                    ? 'bg-wigra-accent/10 text-wigra-accent border border-wigra-accent/20' 
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'}
                            `}
                        >
                            <UsersRound size={20} />
                            <span className="font-sans text-sm font-medium">Manage Users</span>
                        </NavLink>
                    </>
                )}
            </nav>

            {/* User Area / Logout */}
            <div className="p-4 border-t border-white/10">
                <button 
                    onClick={async () => {
                        try {
                            await api.post('/logout');
                        } catch (error) {
                            console.error("Logout failed on server", error);
                        } finally {
                            localStorage.removeItem('auth_token');
                            localStorage.removeItem('user');
                            navigate('/login/admin');
                        }
                    }}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300"
                >
                    <LogOut size={20} />
                    <span className="font-sans text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
