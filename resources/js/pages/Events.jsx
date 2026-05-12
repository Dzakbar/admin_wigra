import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import { Plus, Edit2, Trash2, X, Calendar, Eye } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingEvent, setViewingEvent] = useState(null);
    const [formData, setFormData] = useState({
        id: null,
        photo: '',
        name: '',
        event_date: '',
        description: ''
    });

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/events');
            setEvents(res.data);
        } catch (error) {
            console.error("Failed to fetch events", error);
        } finally {
            setIsLoading(false);
        }
    };

    const location = useLocation();

    useEffect(() => {
        fetchEvents();
        if (location.state?.openModal) {
            handleOpenModal();
            // Clear the state
            window.history.replaceState({}, '');
        }
    }, [location.state]);

    const handleOpenModal = (event = null) => {
        if (event) {
            setFormData(event);
        } else {
            setFormData({
                id: null,
                photo: '',
                name: '',
                event_date: '',
                description: ''
            });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('event_date', formData.event_date);
        data.append('description', formData.description || '');
        if (formData.photo instanceof File) {
            data.append('photo', formData.photo);
        }

        try {
            if (formData.id) {
                data.append('_method', 'PUT');
                await api.post(`/events/${formData.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/events', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            handleCloseModal();
            fetchEvents();
        } catch (error) {
            console.error("Failed to save event", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await api.delete(`/events/${id}`);
                fetchEvents();
            } catch (error) {
                console.error("Failed to delete event", error);
            }
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-6 animate-fade-up">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif text-white flex items-center gap-3">
                        <Calendar className="w-8 h-8 text-wigra-accent" />
                        Manage Events
                    </h1>
                    <p className="text-white/50 text-sm mt-1">Organize and manage upcoming events.</p>
                </div>
                <button 
                    onClick={() => handleOpenModal()} 
                    className="btn-accent flex items-center gap-2 text-sm px-4 py-2"
                >
                    <Plus className="w-4 h-4" />
                    Create Event
                </button>
            </div>

            <div className="glass-card p-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider text-xs font-medium">
                                <th className="py-3 px-4">Event Name</th>
                                <th className="py-3 px-4">Date</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="3" className="py-10 text-center text-white/50">
                                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                                    </td>
                                </tr>
                            ) : events.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="py-10 text-center text-white/50">No events found. Create one above!</td>
                                </tr>
                            ) : (
                                events.map(event => (
                                    <tr key={event.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="py-4 px-4 flex items-center gap-4">
                                            {event.photo ? (
                                                <div className="w-12 h-12 rounded bg-white/10 bg-cover bg-center" style={{ backgroundImage: `url(${event.photo})` }}></div>
                                            ) : (
                                                <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center text-white/30">
                                                    <Calendar className="w-5 h-5" />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium text-white">{event.name}</div>
                                                <div className="text-xs text-white/40 truncate max-w-xs">{event.description}</div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-white/80">{event.event_date}</td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => setViewingEvent(event)} className="p-2 hover:bg-white/10 text-white/70 hover:text-white rounded-md transition-colors" title="View Details">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleOpenModal(event)} className="p-2 hover:bg-white/10 text-white/70 hover:text-white rounded-md transition-colors" title="Edit Event">
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDelete(event.id)} className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-md transition-colors" title="Delete Event">
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
                            <h2 className="text-xl font-serif text-white">{formData.id ? 'Edit Event' : 'Create Event'}</h2>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Event Name</label>
                                    <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent" placeholder="Annual Film Festival" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Photo</label>
                                    {formData.id && formData.photo && typeof formData.photo === 'string' && (
                                        <div className="mb-3">
                                            <p className="text-xs text-white/50 mb-2">Current photo (leave empty below to keep this):</p>
                                            <img src={formData.photo} alt="Current" className="h-32 object-cover rounded-lg border border-white/10" />
                                        </div>
                                    )}
                                    <input type="file" name="photo" accept="image/*" required={!formData.id} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-wigra-accent/20 file:text-wigra-accent hover:file:bg-wigra-accent/30" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Event Date</label>
                                    <input type="date" name="event_date" required value={formData.event_date} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent style-color-scheme-dark" />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/60 mb-1">Description</label>
                                    <textarea name="description" rows="4" value={formData.description || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-wigra-accent resize-none" placeholder="Details about the event..."></textarea>
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
                                <button type="submit" className="btn-accent px-6 py-2 text-sm">Save Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Detail Modal */}
            {viewingEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="glass-card w-full max-w-2xl overflow-hidden animate-slide-up relative">
                        <button onClick={() => setViewingEvent(null)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10 bg-black/50 p-1 rounded-full">
                            <X className="w-6 h-6" />
                        </button>
                        
                        {viewingEvent.photo ? (
                            <img src={viewingEvent.photo} alt={viewingEvent.name} className="w-full h-64 object-cover" />
                        ) : (
                            <div className="w-full h-64 bg-white/5 flex items-center justify-center">
                                <Calendar className="w-16 h-16 text-white/20" />
                            </div>
                        )}

                        <div className="p-8">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-wigra-accent/20 text-wigra-accent text-xs font-medium rounded-full">
                                    {viewingEvent.event_date}
                                </span>
                            </div>
                            <h2 className="text-3xl font-serif text-white mb-4">{viewingEvent.name}</h2>
                            <div className="prose prose-invert max-w-none text-white/70">
                                {viewingEvent.description ? (
                                    <p className="whitespace-pre-wrap">{viewingEvent.description}</p>
                                ) : (
                                    <p className="italic">No description provided.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
