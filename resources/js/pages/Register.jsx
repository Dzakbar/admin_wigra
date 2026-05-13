import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telephone_number, setTelephoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [profile_photo, setProfilePhoto] = useState(null);
    const [error, setError] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('telephone_number', telephone_number);
        data.append('password', password);
        if (profile_photo) {
            data.append('profile_photo', profile_photo);
        }

        try {
            const response = await api.post('/register', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const { access_token, user } = response.data;
            
            if (access_token) {
                localStorage.setItem('auth_token', access_token);
                localStorage.setItem('user', JSON.stringify(user));
                
                if (user.role === 'admin' || user.role === 'superadmin' || user.role === 'super_admin') {
                    navigate('/admin');
                } else {
                    const companyUrl = `http://localhost:8181/auth-callback?token=${access_token}&user=${encodeURIComponent(JSON.stringify(user))}`;
                    window.location.href = companyUrl;
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-wigra-black flex items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-wigra-accent/20 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-wigra-gold/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md p-8 relative z-10 animate-fade-up">
                <div className="text-center mb-10">
                    <h1 className="font-serif text-4xl tracking-widest text-white mb-2">WIGRA.</h1>
                    <p className="font-sans text-sm text-white/50 tracking-widest uppercase">Admin System Portal</p>
                </div>

                <div className="glass-card p-8">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-400 text-sm p-3 rounded-lg mb-4 text-center">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleRegister} className="space-y-6">
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-white/60 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all"
                                placeholder="John Doe"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-white/60 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all"
                                placeholder="admin@wigra.com"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-white/60 mb-2">Telephone Number</label>
                            <input 
                                type="tel" 
                                required
                                value={telephone_number}
                                onChange={(e) => setTelephoneNumber(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all"
                                placeholder="+1234567890"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-white/60 mb-2">Password</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-white/60 mb-2">Profile Photo (Optional)</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => setProfilePhoto(e.target.files[0])}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-wigra-accent/20 file:text-wigra-accent hover:file:bg-wigra-accent/30"
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full btn-accent rounded-lg flex justify-center items-center gap-2 mt-4 py-3 font-medium transition-all"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Sign Up"
                            )}
                        </button>

                        <div className="text-center mt-4">
                            <p className="text-xs text-white/50">
                                Already have an account? <Link to="/login/admin" className="text-wigra-accent hover:text-white transition-colors">Sign in</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
