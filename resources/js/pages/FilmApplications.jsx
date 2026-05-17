import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Trash2, UserCheck, FileText, X } from 'lucide-react';

const FilmApplications = () => {
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;
    const isSuperAdmin = user?.role === 'super_admin' || user?.role === 'superadmin';

    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Auth info
    const [userRole, setUserRole] = useState('user');
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.role) {
            setUserRole(user.role);
        }
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/film-applications');
            setApplications(res.data);
        } catch (error) {
            console.error("Failed to fetch applications", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        // Find existing application to retain other fields
        const app = applications.find(a => a.id === id);
        if (!app) return;
        
        try {
            await api.put(`/film-applications/${id}`, { ...app, status: newStatus });
            fetchApplications();
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            try {
                await api.delete(`/film-applications/${id}`);
                fetchApplications();
            } catch (error) {
                console.error("Failed to delete application", error);
            }
        }
    };

    if (!isSuperAdmin) {
        return (
            <div className="p-6 md:p-8 animate-fade-up">
                <div className="glass-card p-12 text-center flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                        <span className="text-red-500 text-2xl font-bold">!</span>
                    </div>
                    <h2 className="text-2xl font-serif text-white mb-2">Unauthorized Access</h2>
                    <p className="text-white/60">You must be a Super Admin to view and manage film applications.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white flex items-center gap-3">
                        <UserCheck className="w-8 h-8 text-wigra-accent" />
                        Film Applications
                    </h1>
                    <p className="text-white/50 text-sm mt-1">Review user applications for film positions.</p>
                </div>
            </div>

            <div className="glass-card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider text-xs font-medium">
                                <th className="py-3 px-4">Applicant</th>
                                <th className="py-3 px-4">Contact</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Project</th>
                                <th className="py-3 px-4">Details</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="py-10 text-center text-white/50">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                    </td>
                                </tr>
                            ) : applications.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="py-10 text-center text-white/50">No applications found.</td>
                                </tr>
                            ) : (
                                applications.map(app => (
                                    <tr key={app.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-white">{app.name}</div>
                                        </td>
                                        <td className="py-4 px-4 text-xs text-white/60">
                                            <div>{app.contact}</div>
                                            {app.phone_number && (
                                                <div className="mt-1 text-white/40">{app.phone_number}</div>
                                            )}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span className="px-2 py-0.5 bg-wigra-accent/10 border border-wigra-accent/20 text-wigra-accent text-[10px] rounded uppercase font-medium">
                                                {app.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-white/80">
                                            {app.film ? app.film.name : `ID: ${app.film_id}`}
                                        </td>
                                        <td className="py-4 px-4">
                                            {app.portfolio_link && (
                                                <a href={app.portfolio_link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs text-wigra-accent hover:underline mb-1">
                                                    <FileText className="w-3 h-3" /> Portfolio
                                                </a>
                                            )}
                                            <div className="text-[10px] text-white/40 italic max-w-[150px] truncate" title={app.notes}>
                                                {app.notes || 'No notes provided.'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <select 
                                                value={app.status}
                                                onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                                className={`text-xs px-2 py-1 rounded-md border focus:outline-none focus:ring-1 focus:ring-wigra-accent bg-transparent
                                                    ${app.status === 'accepted' ? 'border-green-500/30 text-green-400' : 
                                                      app.status === 'rejected' ? 'border-red-500/30 text-red-400' : 
                                                      app.status === 'reviewing' ? 'border-blue-500/30 text-blue-400' : 
                                                      'border-yellow-500/30 text-yellow-400'}`
                                                }
                                            >
                                                <option value="pending" className="bg-wigra-black">Pending</option>
                                                <option value="reviewing" className="bg-wigra-black">Reviewing</option>
                                                <option value="accepted" className="bg-wigra-black">Accepted</option>
                                                <option value="rejected" className="bg-wigra-black">Rejected</option>
                                            </select>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {isSuperAdmin && (
                                                    <button onClick={() => handleDelete(app.id)} className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md transition-colors" title="Delete (Super Admin only)">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FilmApplications;
