import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { UsersRound, ShieldAlert } from 'lucide-react';

const ManageUser = () => {
    const userString = localStorage.getItem('user');
    const loggedInUser = userString ? JSON.parse(userString) : null;
    const isSuperAdmin = loggedInUser?.role === 'super_admin';

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isSuperAdmin) {
            fetchUsers();
        }
    }, [isSuperAdmin]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/users');
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        // Prevent demoting yourself accidentally
        if (userId === loggedInUser.id && newRole !== 'super_admin') {
            alert("You cannot demote yourself from Super Admin!");
            return;
        }

        try {
            await api.put(`/users/${userId}/role`, { role: newRole });
            fetchUsers(); // Refresh the list
        } catch (error) {
            console.error("Failed to update role", error);
            alert("Failed to update user role.");
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
                    <p className="text-white/60">You must be a Super Admin to manage user roles.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white flex items-center gap-3">
                        <UsersRound className="w-8 h-8 text-wigra-accent" />
                        Manage Users
                    </h1>
                    <p className="text-white/50 text-sm mt-1">Control access levels and manage registered users.</p>
                </div>
            </div>

            <div className="glass-card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider text-xs font-medium">
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Contact Info</th>
                                <th className="py-3 px-4">Joined</th>
                                <th className="py-3 px-4">Role Management</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center text-white/50">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="py-10 text-center text-white/50">No users found.</td>
                                </tr>
                            ) : (
                                users.map(user => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-wigra-dark shrink-0">
                                                    {user.profile_photo ? (
                                                        <img src={user.profile_photo} alt={user.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=1a1a1a&color=fff`} alt={user.name} className="w-full h-full object-cover" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-white flex items-center gap-2">
                                                        {user.name}
                                                        {user.id === loggedInUser.id && (
                                                            <span className="text-[10px] uppercase tracking-wider bg-wigra-accent/20 text-wigra-accent px-2 py-0.5 rounded-full">You</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-white/80">{user.email}</div>
                                            <div className="text-xs text-white/50">{user.telephone_number || 'No phone'}</div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="text-sm text-white/60">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-2">
                                                {user.role === 'super_admin' ? (
                                                    <div className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-purple-500/30 text-purple-400 bg-purple-500/10">
                                                        <ShieldAlert className="w-3 h-3" /> Super Admin
                                                    </div>
                                                ) : (
                                                    <select 
                                                        value={user.role}
                                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                        className={`text-xs px-3 py-1.5 rounded-md border focus:outline-none focus:ring-1 focus:ring-wigra-accent bg-wigra-dark transition-colors
                                                            ${user.role === 'admin' ? 'border-wigra-accent/50 text-wigra-accent bg-wigra-accent/10' : 
                                                              'border-white/20 text-white/70'}`
                                                        }
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                        <option value="super_admin">Super Admin</option>
                                                    </select>
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

export default ManageUser;
