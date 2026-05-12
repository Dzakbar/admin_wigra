import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Edit2, Trash2, Users, Eye, X } from 'lucide-react';

const Team = () => {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [currentTeam, setCurrentTeam] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        role: 'Talent',
        photo: null
    });

    // Roles
    const teamRoles = [
        'Talent', 'Astrada', 'DOP', 'ART', 'Wadrobe', 'Sound', 'Gaffer', 'Director'
    ];

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/teams');
            setTeams(res.data);
        } catch (error) {
            console.error("Failed to fetch teams", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (team = null) => {
        if (team) {
            setFormData({
                id: team.id,
                name: team.name,
                role: team.role,
                photo: null 
            });
            setCurrentTeam(team);
        } else {
            setFormData({
                id: null,
                name: '',
                role: 'Talent',
                photo: null
            });
            setCurrentTeam(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleOpenDetailModal = (team) => {
        setCurrentTeam(team);
        setIsDetailModalOpen(true);
    };

    const handleCloseDetailModal = () => {
        setIsDetailModalOpen(false);
        setCurrentTeam(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('role', formData.role);

        if (formData.photo) {
            data.append('photo', formData.photo);
        }

        try {
            if (formData.id) {
                // For updates with FormData in Laravel, we often need to spoof PUT via POST
                data.append('_method', 'PUT');
                await api.post(`/teams/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/teams', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            fetchTeams();
            handleCloseModal();
        } catch (error) {
            console.error("Failed to save team member", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this team member?")) {
            try {
                await api.delete(`/teams/${id}`);
                fetchTeams();
            } catch (error) {
                console.error("Failed to delete team member", error);
            }
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white flex items-center gap-3">
                        <Users className="w-8 h-8 text-wigra-accent" />
                        Team Production
                    </h1>
                    <p className="text-white/50 text-sm mt-1">Manage the Wigra Production House team members.</p>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="btn-accent rounded-lg flex items-center gap-2 px-6 py-2.5 font-medium shadow-lg shadow-wigra-accent/20"
                >
                    <Plus className="w-5 h-5" /> Add Member
                </button>
            </div>

            <div className="glass-card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider text-xs font-medium">
                                <th className="py-3 px-4">Photo</th>
                                <th className="py-3 px-4">Name</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center text-white/50">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                    </td>
                                </tr>
                            ) : teams.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center text-white/50">No team members found.</td>
                                </tr>
                            ) : (
                                teams.map(team => (
                                    <tr key={team.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="py-4 px-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 bg-white/5">
                                                {team.photo ? (
                                                    <img src={team.photo} alt={team.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-white/30 font-serif text-xl bg-wigra-muted">
                                                        {team.name.charAt(0)}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 font-medium text-white">{team.name}</td>
                                        <td className="py-4 px-4 text-white/60">
                                            <span className="px-2.5 py-1 rounded-md border border-wigra-accent/30 text-wigra-accent text-xs bg-wigra-accent/10">
                                                {team.role}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleOpenDetailModal(team)} className="p-2 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 rounded-md transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleOpenModal(team)} className="p-2 hover:bg-white/10 text-white/60 hover:text-white rounded-md transition-colors">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(team.id)} className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create / Edit Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card w-full max-w-lg overflow-hidden animate-slide-up relative flex flex-col max-h-[90vh]">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="p-6 border-b border-white/10 shrink-0">
                            <h2 className="text-xl font-serif text-white">{formData.id ? 'Edit Team Member' : 'Add New Member'}</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Production Role</label>
                                <select
                                    required
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    className="w-full bg-wigra-black border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent"
                                >
                                    {teamRoles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Photo Profile</label>
                                {currentTeam?.photo && !formData.photo && (
                                    <div className="mb-2 w-20 h-20 rounded-full overflow-hidden border border-white/10">
                                        <img src={currentTeam.photo} alt="Current" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-medium file:bg-wigra-accent/20 file:text-wigra-accent hover:file:bg-wigra-accent/30 transition-all"
                                />
                                <p className="text-xs text-white/40 mt-1">Leave empty to keep existing photo.</p>
                            </div>

                            <div className="pt-4 flex justify-end gap-3 border-t border-white/10 mt-6">
                                <button type="button" onClick={handleCloseModal} className="px-5 py-2 rounded-lg text-white/60 hover:bg-white/5 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit" className="btn-accent px-5 py-2 rounded-lg">
                                    Save Member
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Detail Modal */}
            {isDetailModalOpen && currentTeam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card w-full max-w-sm overflow-hidden animate-slide-up relative">
                        <button onClick={handleCloseDetailModal} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors bg-black/50 p-1 rounded-full z-10">
                            <X className="w-5 h-5" />
                        </button>

                        <div className="h-48 w-full bg-wigra-dark relative border-b border-white/10">
                            {currentTeam.photo ? (
                                <img src={currentTeam.photo} alt={currentTeam.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/20 font-serif text-6xl">
                                    {currentTeam.name.charAt(0)}
                                </div>
                            )}
                            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="px-2.5 py-1 rounded-md border border-wigra-accent/50 text-white text-xs bg-wigra-accent/30 font-medium tracking-wide">
                                    {currentTeam.role}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 text-center">
                            <h2 className="text-2xl font-serif text-white mb-1">{currentTeam.name}</h2>
                            <p className="text-white/50 font-sans text-sm tracking-widest uppercase">Wigra Production Team</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Team;
