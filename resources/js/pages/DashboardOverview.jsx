import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Film, CalendarDays, ArrowUpRight, TrendingUp, Star } from 'lucide-react';
import api from '../api/axios';

const StatCard = ({ title, value, icon, trend, trendValue, isLoading }) => (
    <div className="glass-card p-6 flex flex-col hover-lift">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-lg text-white/80 border border-white/10">
                {icon}
            </div>
            {trend && !isLoading && (
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {trend === 'up' ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
                    {trendValue}
                </div>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-serif text-white mb-1">
                {isLoading ? (
                    <div className="h-9 w-24 bg-white/10 rounded animate-pulse"></div>
                ) : value}
            </h3>
            <p className="font-sans text-sm text-white/50 tracking-wider uppercase">{title}</p>
        </div>
    </div>
);

const DashboardOverview = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalApplicants: 0,
        activeFilms: 0,
        upcomingEvents: 0,
        teamMembers: 0,
        recentApplicants: []
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/dashboard/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="space-y-8 animate-fade-up">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Applicants" 
                    value={stats.totalApplicants} 
                    icon={<Users size={24} />} 
                    isLoading={isLoading}
                />
                <StatCard 
                    title="Active Films" 
                    value={stats.activeFilms} 
                    icon={<Film size={24} />} 
                    isLoading={isLoading}
                />
                <StatCard 
                    title="Upcoming Events" 
                    value={stats.upcomingEvents} 
                    icon={<CalendarDays size={24} />} 
                    isLoading={isLoading}
                />
                <StatCard 
                    title="Team Members" 
                    value={stats.teamMembers} 
                    icon={<Star size={24} />} 
                    isLoading={isLoading}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Applicants */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl text-white">Recent Applicants</h3>
                        <button onClick={() => navigate('/admin/applicants')} className="text-wigra-accent hover:text-white transition-colors text-sm font-sans flex items-center gap-1">
                            View All <ArrowUpRight size={16} />
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm">
                            <thead>
                                <tr className="text-white/40 uppercase tracking-widest border-b border-white/10">
                                    <th className="pb-4 font-medium">Name</th>
                                    <th className="pb-4 font-medium">Film Applied</th>
                                    <th className="pb-4 font-medium">Date</th>
                                    <th className="pb-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="4" className="py-10 text-center text-white/50">
                                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                        </td>
                                    </tr>
                                ) : stats.recentApplicants.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-10 text-center text-white/50">No recent applications found.</td>
                                    </tr>
                                ) : (
                                    stats.recentApplicants.map((row) => (
                                        <tr key={row.id} className="hover:bg-white/5 transition-colors">
                                            <td className="py-4 font-medium text-white">{row.name}</td>
                                            <td className="py-4 text-white/60">{row.film ? row.film.name : 'Unknown Film'}</td>
                                            <td className="py-4 text-white/60">{formatDate(row.created_at)}</td>
                                            <td className="py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs border capitalize ${
                                                    row.status === 'accepted' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                                                    row.status === 'rejected' ? 'border-red-500/30 text-red-400 bg-red-500/10' :
                                                    row.status === 'reviewing' ? 'border-blue-500/30 text-blue-400 bg-blue-500/10' :
                                                    'border-yellow-500/30 text-yellow-400 bg-yellow-500/10'
                                                }`}>
                                                    {row.status || 'Pending'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                    <h3 className="font-serif text-xl text-white mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                        <button 
                            onClick={() => navigate('/admin/films', { state: { openModal: true } })}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-wigra-accent hover:bg-wigra-accent/5 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-white/80 group-hover:text-wigra-accent transition-colors">
                                    <Film size={20} />
                                </div>
                                <span className="font-sans text-sm text-white/80">Add New Film</span>
                            </div>
                            <ArrowUpRight size={16} className="text-white/40 group-hover:text-wigra-accent" />
                        </button>
                        <button 
                            onClick={() => navigate('/admin/events', { state: { openModal: true } })}
                            className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-wigra-accent hover:bg-wigra-accent/5 transition-all group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-white/80 group-hover:text-wigra-accent transition-colors">
                                    <CalendarDays size={20} />
                                </div>
                                <span className="font-sans text-sm text-white/80">Create Event</span>
                            </div>
                            <ArrowUpRight size={16} className="text-white/40 group-hover:text-wigra-accent" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
