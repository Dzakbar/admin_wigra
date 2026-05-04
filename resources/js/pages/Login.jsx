import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/admin');
        }, 1500);
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
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block font-sans text-xs uppercase tracking-widest text-white/60 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all"
                                placeholder="admin@wigra.com"
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
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-wigra-accent focus:ring-1 focus:ring-wigra-accent transition-all"
                                placeholder="••••••••"
                            />
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
