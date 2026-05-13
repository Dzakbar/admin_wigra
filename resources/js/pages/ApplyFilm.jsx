import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ApplyFilm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [films, setFilms] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        user_id: user ? user.id : '',
        film_id: '',
        name: user ? user.name : '',
        contact: user ? `${user.email} / ${user.telephone_number || ''}` : '',
        role: 'Talent',
        portfolio_link: '',
        notes: ''
    });

    useEffect(() => {
        // Fetch films
        const fetchFilms = async () => {
            try {
                const res = await api.get('/films');
                setFilms(res.data);
                if (res.data.length > 0) {
                    setFormData(prev => ({ ...prev, film_id: res.data[0].id }));
                }
            } catch (err) {
                console.error("Failed to load films", err);
            }
        };
        fetchFilms();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in to apply.');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            await api.post('/film-applications', formData);
            setSuccess('Your application has been submitted successfully!');
            // Reset form
            setFormData({
                user_id: user.id,
                film_id: films.length > 0 ? films[0].id : '',
                name: user.name,
                contact: `${user.email} / ${user.telephone_number || ''}`,
                role: 'Talent',
                portfolio_link: '',
                notes: ''
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit application.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-wigra-black flex flex-col relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-wigra-accent/10 blur-[150px] rounded-full pointer-events-none"></div>

            <div className="container mx-auto px-4 py-16 relative z-10 max-w-2xl animate-fade-up">
                <div className="mb-10 text-center">
                    <h1 className="font-serif text-5xl text-white mb-4">Apply for a Film</h1>
                    <p className="text-white/60">Join our upcoming projects. Fill in your details below.</p>
                </div>

                <div className="glass-card p-8">
                    {!user ? (
                        <div className="text-center py-10">
                            <h2 className="text-xl text-white mb-4">Authentication Required</h2>
                            <p className="text-white/60 mb-6">You need to sign in or create an account to apply.</p>
                            <div className="flex justify-center gap-4">
                                <button onClick={() => navigate('/login/admin')} className="px-6 py-2 border border-wigra-accent text-wigra-accent rounded-lg hover:bg-wigra-accent hover:text-white transition-colors">Sign In</button>
                                <button onClick={() => navigate('/register')} className="btn-accent px-6 py-2">Sign Up</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-lg mb-6">
                                    {error}
                                </div>
                            )}

                            {success && (
                                <div className="bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-lg mb-6">
                                    {success}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Select Film</label>
                                    <select
                                        name="film_id"
                                        value={formData.film_id}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wigra-accent"
                                    >
                                        {films.map(film => (
                                            <option key={film.id} value={film.id} className="bg-wigra-black">{film.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Full Name</label>
                                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wigra-accent" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Contact Info (Email / WhatsApp)</label>
                                        <input type="text" name="contact" required value={formData.contact} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wigra-accent" placeholder="example@mail.com / 0812..." />
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Target Role</label>
                                        <select name="role" required value={formData.role} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wigra-accent">
                                            <option value="Talent" className="bg-wigra-black">Talent</option>
                                            <option value="Astrada" className="bg-wigra-black">Astrada</option>
                                            <option value="DOP" className="bg-wigra-black">DOP</option>
                                            <option value="ART" className="bg-wigra-black">ART</option>
                                            <option value="Wardrobe" className="bg-wigra-black">Wardrobe</option>
                                            <option value="Sound" className="bg-wigra-black">Sound</option>
                                            <option value="Gaffer" className="bg-wigra-black">Gaffer</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Portfolio Link</label>
                                        <input type="url" name="portfolio_link" required value={formData.portfolio_link} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wigra-accent" placeholder="https://..." />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs uppercase tracking-wider text-white/60 mb-2">Notes / Experience</label>
                                        <textarea name="notes" rows="4" value={formData.notes} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-wigra-accent resize-none" placeholder="Tell us more about your experience..."></textarea>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full btn-accent rounded-lg flex justify-center items-center gap-2 mt-8 py-4 font-medium transition-all text-lg"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ApplyFilm;
