import React from 'react';
import { Users, Film, CalendarDays, ArrowUpRight, TrendingUp } from 'lucide-react';

const StatCard = ({ title, value, icon, trend, trendValue }) => (
    <div className="glass-card p-6 flex flex-col hover-lift">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-lg text-white/80 border border-white/10">
                {icon}
            </div>
            {trend && (
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${trend === 'up' ? 'text-green-400 bg-green-400/10' : 'text-red-400 bg-red-400/10'}`}>
                    {trend === 'up' ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
                    {trendValue}
                </div>
            )}
        </div>
        <div>
            <h3 className="text-3xl font-serif text-white mb-1">{value}</h3>
            <p className="font-sans text-sm text-white/50 tracking-wider uppercase">{title}</p>
        </div>
    </div>
);

const DashboardOverview = () => {
    return (
        <div className="space-y-8 animate-fade-up">
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Applicants" 
                    value="1,248" 
                    icon={<Users size={24} />} 
                    trend="up" 
                    trendValue="+12%" 
                />
                <StatCard 
                    title="Active Films" 
                    value="24" 
                    icon={<Film size={24} />} 
                />
                <StatCard 
                    title="Upcoming Events" 
                    value="8" 
                    icon={<CalendarDays size={24} />} 
                    trend="up" 
                    trendValue="+2" 
                />
                <StatCard 
                    title="Website Visitors" 
                    value="45.2K" 
                    icon={<TrendingUp size={24} />} 
                    trend="up" 
                    trendValue="+5.4%" 
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Applicants */}
                <div className="lg:col-span-2 glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-xl text-white">Recent Applicants</h3>
                        <button className="text-wigra-accent hover:text-white transition-colors text-sm font-sans flex items-center gap-1">
                            View All <ArrowUpRight size={16} />
                        </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans text-sm">
                            <thead>
                                <tr className="text-white/40 uppercase tracking-widest border-b border-white/10">
                                    <th className="pb-4 font-medium">Name</th>
                                    <th className="pb-4 font-medium">Role Applied</th>
                                    <th className="pb-4 font-medium">Date</th>
                                    <th className="pb-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-white/80">
                                {[
                                    { name: "Sarah Jenkins", role: "Actor", date: "Today, 14:30", status: "Pending" },
                                    { name: "Michael Chen", role: "Camera Operator", date: "Today, 10:15", status: "Reviewing" },
                                    { name: "Aisha Patel", role: "Director", date: "Yesterday", status: "Accepted" },
                                    { name: "David Miller", role: "Voice Actor", date: "Yesterday", status: "Pending" },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="py-4 font-medium text-white">{row.name}</td>
                                        <td className="py-4">{row.role}</td>
                                        <td className="py-4 text-white/60">{row.date}</td>
                                        <td className="py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs border ${
                                                row.status === 'Accepted' ? 'border-green-500/30 text-green-400 bg-green-500/10' :
                                                row.status === 'Reviewing' ? 'border-yellow-500/30 text-yellow-400 bg-yellow-500/10' :
                                                'border-white/20 text-white/60 bg-white/5'
                                            }`}>
                                                {row.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card p-6">
                    <h3 className="font-serif text-xl text-white mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-wigra-accent hover:bg-wigra-accent/5 transition-all group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-white/80 group-hover:text-wigra-accent transition-colors">
                                    <Film size={20} />
                                </div>
                                <span className="font-sans text-sm text-white/80">Add New Film</span>
                            </div>
                            <ArrowUpRight size={16} className="text-white/40 group-hover:text-wigra-accent" />
                        </button>
                        <button className="w-full flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-wigra-accent hover:bg-wigra-accent/5 transition-all group">
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
