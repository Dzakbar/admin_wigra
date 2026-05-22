import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/axios';
import { getCompanyAuthCallbackUrl } from '../utils/companyRedirect';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await api.post('/login', { email, password });
            const { access_token, user } = response.data;
            
            if (access_token) {
                localStorage.setItem('auth_token', access_token);
                localStorage.setItem('user', JSON.stringify(user));
                
                if (user.role === 'admin' || user.role === 'superadmin' || user.role === 'super_admin') {
                    navigate('/admin');
                } else {
                    window.location.href = getCompanyAuthCallbackUrl(access_token, user);
                }
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
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
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-white/60 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all"
                                placeholder="user@gmail.com"
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block font-sans text-xs uppercase tracking-widest text-white/60">Password</label>
                                <a href="#" className="text-xs text-wigra-accent hover:text-white transition-colors">Forgot?</a>
                            </div>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all"
                                placeholder="••••••••"
                            />
                            <p className="text-xs text-white/50 mt-3">
                                silahkah register terlebih dahulu <Link to="/register" className="text-wigra-accent hover:text-white transition-colors">disini</Link>
                            </p>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full btn-accent rounded-lg flex justify-center items-center gap-2 mt-4"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
