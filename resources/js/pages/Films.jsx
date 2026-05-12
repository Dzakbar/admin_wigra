import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { Plus, Edit2, Trash2, X, Search, Film, Eye } from 'lucide-react';

const Films = () => {
    const [films, setFilms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingFilm, setViewingFilm] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        video: '',
        name: '',
        director_name: '',
        duration: '',
        genre: '',
        synopsis: ''
    });

    const fetchFilms = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/films');
            setFilms(res.data);
        } catch (error) {
            console.error("Failed to fetch films", error);
        } finally {
            setIsLoading(false);
        }
    };

    const location = useLocation();

    useEffect(() => {
        fetchFilms();
        if (location.state?.openModal) {
            handleOpenModal();
            // Clear the state
            window.history.replaceState({}, '');
        }
    }, [location.state]);

    const handleOpenModal = (film = null) => {
        if (film) {
            setFormData(film);
        } else {
            setFormData({
                id: null,
                video: '',
                name: '',
                director_name: '',
                duration: '',
                genre: '',
                synopsis: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await api.put(`/films/${formData.id}`, formData);
            } else {
                await api.post('/films', formData);
            }
            handleCloseModal();
            fetchFilms();
        } catch (error) {
            console.error("Failed to save film", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this film?")) {
            try {
                await api.delete(`/films/${id}`);
                fetchFilms();
            } catch (error) {
                console.error("Failed to delete film", error);
            }
        }
    };

    const getEmbedUrl = (url) => {
        if (!url) return '';
        let videoId = '';
        if (url.includes('youtube.com/watch?v=')) {
            videoId = url.split('v=')[1];
            const ampersandPosition = videoId.indexOf('&');
            if (ampersandPosition !== -1) {
                videoId = videoId.substring(0, ampersandPosition);
            }
        } else if (url.includes('youtu.be/')) {
            videoId = url.split('youtu.be/')[1];
            const queryPosition = videoId.indexOf('?');
            if (queryPosition !== -1) {
                videoId = videoId.substring(0, queryPosition);
            }
        }
        
        if (videoId) {
            return `https://www.youtube.com/embed/${videoId}`;
        }
        
        return url; // fallback
    };

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white flex items-center gap-3">
                        <Film className="w-8 h-8 text-wigra-accent" />
                        Manage Films
                    </h1>
                    <p className="text-white/50 text-sm mt-1">Add, edit, or remove films from the database.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()} 
                    className="btn-accent flex items-center gap-2 text-sm px-4 py-2"
                >
                    <Plus className="w-4 h-4" />
                    Add New Film
                </button>
            </div>

            <div className="glass-card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider text-xs font-medium">
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Director</th>
                                <th className="py-3 px-4">Duration</th>
                                <th className="py-3 px-4">Genre</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-center text-white/50">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                    </td>
                                </tr>
                            ) : films.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-10 text-center text-white/50">No films found. Create one above!</td>
                                </tr>
                            ) : (
                                films.map(film => (
                                    <tr key={film.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="py-4 px-4">
                                            <div className="font-medium text-white">{film.name}</div>
                                            <div className="text-xs text-white/40 truncate max-w-xs">{film.video}</div>
                                        </td>
                                        <td className="py-4 px-4 text-white/80">{film.director_name}</td>
                                        <td className="py-4 px-4 text-white/80">{film.duration} min</td>
                                        <td className="py-4 px-4">
                                            <span className="px-2 py-1 bg-white/10 text-white text-xs rounded-md">
                                                {film.genre}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setViewingFilm(film)} className="p-2 hover:bg-white/10 text-white/70 hover:text-white rounded-md transition-colors" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleOpenModal(film)} className="p-2 hover:bg-white/10 text-white/70 hover:text-white rounded-md transition-colors" title="Edit Film">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(film.id)} className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md transition-colors" title="Delete Film">
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card w-full max-w-lg overflow-hidden animate-slide-up relative flex flex-col max-h-[90vh]">
                        <button onClick={handleCloseModal} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10">
                            <X className="w-5 h-5" />
                        </button>
                        
                        <div className="p-6 border-b border-white/10 shrink-0">
                            <h2 className="text-xl font-serif text-white">{formData.id ? 'Edit Film' : 'Add New Film'}</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Film Name</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent" placeholder="Interstellar" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Video Link (URL)</label>
                                    <input type="text" name="video" required value={formData.video} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent" placeholder="https://youtube.com/..." />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Director</label>
                                    <input type="text" name="director_name" required value={formData.director_name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent" placeholder="Christopher Nolan" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Genre</label>
                                    <input type="text" name="genre" required value={formData.genre} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent" placeholder="Sci-Fi" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Duration (minutes)</label>
                                    <input type="number" name="duration" required value={formData.duration} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent" placeholder="169" />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Synopsis</label>
                                    <textarea name="synopsis" rows="3" value={formData.synopsis || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent resize-none" placeholder="A team of explorers travel through a wormhole..."></textarea>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                                <button type="submit" className="btn-accent px-6 py-2 text-sm">Save Film</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Detail Modal */}
            {viewingFilm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card w-full max-w-4xl overflow-hidden animate-slide-up relative flex flex-col md:flex-row h-[80vh] md:h-auto">
                        <button onClick={() => setViewingFilm(null)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10 bg-black/50 p-1 rounded-full">
                            <X className="w-6 h-6" />
                        </button>
                        
                        <div className="w-full md:w-2/3 bg-black aspect-video md:aspect-auto flex items-center justify-center">
                            {viewingFilm.video.includes('youtube.com') || viewingFilm.video.includes('youtu.be') ? (
                                <iframe 
                                    className="w-full h-full aspect-video" 
                                    src={getEmbedUrl(viewingFilm.video)} 
                                    title={viewingFilm.name}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            ) : (
                                <div className="text-center p-8">
                                    <Film className="w-16 h-16 text-white/20 mx-auto mb-4" />
                                    <a href={viewingFilm.video} target="_blank" rel="noreferrer" className="text-wigra-accent hover:underline">Watch Video External Link</a>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-1/3 p-8 overflow-y-auto bg-wigra-black/50">
                            <div className="flex items-center gap-2 mb-4 flex-wrap">
                                <span className="px-3 py-1 bg-wigra-accent/20 text-wigra-accent text-xs font-medium rounded-full">
                                    {viewingFilm.genre}
                                </span>
                                <span className="px-3 py-1 bg-white/10 text-white/70 text-xs font-medium rounded-full">
                                    {viewingFilm.duration} mins
                                </span>
                            </div>
                            <h2 className="text-3xl font-serif text-white mb-2">{viewingFilm.name}</h2>
                            <p className="text-sm text-white/50 mb-6 font-medium tracking-wide">Directed by {viewingFilm.director_name}</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-xs uppercase tracking-wider text-white/40 mb-2">Synopsis</h3>
                                    <div className="prose prose-invert max-w-none text-white/70 text-sm">
                                        {viewingFilm.synopsis ? (
                                            <p className="whitespace-pre-wrap">{viewingFilm.synopsis}</p>
                                        ) : (
                                            <p className="italic">No synopsis provided.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Films;
