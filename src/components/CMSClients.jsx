import React, { useState } from 'react';
import "../styles.css"; // Import your CSS file
import Pencil from "../assets/img/pencil.png";
import Dustbin from "../assets/img/dustbin.png";

// Import all client images
// Import all client images
import Client1 from '../assets/img/cl1.png';
import Client2 from '../assets/img/cl2.png';
import Client3 from '../assets/img/cl3.png';
import Client4 from '../assets/img/cl4.png';
import Client5 from '../assets/img/cl5.png';
import Client6 from '../assets/img/cl6.png';
import Client7 from '../assets/img/cl7.png';
import Client8 from '../assets/img/cl8.png';
import Client9 from '../assets/img/cl9.png';
import Client10 from '../assets/img/cl10.png';
import Client11 from '../assets/img/cl11.png';
import Client12 from '../assets/img/cl12.png';
import Client13 from '../assets/img/cl14.png';
import Client15 from '../assets/img/cl16.png';
import Client16 from '../assets/img/cl17.png';
import Client17 from '../assets/img/cl18.png';
import Client18 from '../assets/img/cl19.png';
import Client19 from '../assets/img/cl20.png';
import Client20 from '../assets/img/cl211.png';
import Client21 from '../assets/img/cl222.png';
import Client22 from '../assets/img/cl233.png';

// Initial client data with IDs
const initialClients = [
    { id: 1, src: Client1, alt: 'Client 1' },
    { id: 2, src: Client2, alt: 'Client 2' },
    { id: 3, src: Client3, alt: 'Client 3' },
    { id: 4, src: Client4, alt: 'Client 4' },
    { id: 5, src: Client5, alt: 'Client 5' },
    { id: 6, src: Client6, alt: 'Client 6' },
    { id: 7, src: Client7, alt: 'Client 7' },
    { id: 8, src: Client8, alt: 'Client 8' },
    { id: 9, src: Client9, alt: 'Client 9' },
    { id: 10, src: Client10, alt: 'Client 10' },
    { id: 11, src: Client11, alt: 'Client 11' },
    { id: 12, src: Client12, alt: 'Client 12' },
    { id: 13, src: Client13, alt: 'Client 13' },
    { id: 14, src: Client15, alt: 'Client 15' },  // Skipped id 14 for Client14
    { id: 15, src: Client16, alt: 'Client 16' },
    { id: 16, src: Client17, alt: 'Client 17' },
    { id: 17, src: Client18, alt: 'Client 18' },
    { id: 18, src: Client19, alt: 'Client 19' },
    { id: 19, src: Client20, alt: 'Client 20' },
    { id: 20, src: Client21, alt: 'Client 21' },
    { id: 21, src: Client22, alt: 'Client 22' },
];


const CMSClients = () => {
    const [clients, setClients] = useState(initialClients);
    const [newClient, setNewClient] = useState({ id: null, src: '', alt: '' });
    const [editingClient, setEditingClient] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    // Handle file change for adding a new client
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setNewClient({ ...newClient, src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle file change for editing a client
    const handleEditFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditingClient({ ...editingClient, src: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle adding a new client
    const handleAddClient = () => {
        const newId = clients.length ? clients[clients.length - 1].id + 1 : 1;
        setClients([...clients, { id: newId, ...newClient }]);
        setNewClient({ id: null, src: '', alt: '' });
        setImagePreview('');
    };

    // Handle deleting a client
    const handleDeleteClient = (id) => {
        setClients(clients.filter(client => client.id !== id));
    };

    // Handle editing a client
    const handleEditClient = (id) => {
        const clientToEdit = clients.find(client => client.id === id);
        setEditingClient(clientToEdit);
    };

    // Save changes after editing
    const handleSaveEdit = () => {
        setClients(clients.map(client => (client.id === editingClient.id ? editingClient : client)));
        setEditingClient(null);
    };

    return (
        <div className="cms-section">
            <div className="cms-section-header">
                <h2 className="cms-section-title">Clients Section</h2>
                {/* Add new client form */}
                <div className="cms-add-form">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cms-input"
                    />
                    {imagePreview && <img src={imagePreview} alt="New Client Preview" className="cms-preview" />}
                    
                    <input
                        type="text"
                        placeholder="Alt text"
                        value={newClient.alt}
                        onChange={(e) => setNewClient({ ...newClient, alt: e.target.value })}
                        className="cms-input"
                    />
                    
                    <button onClick={handleAddClient} className="cms-button">Add Client</button>
                </div>
            </div>

            {/* Client cards */}
            <div className="cms-cards-container">
                {clients.map((client) => (
                    <div key={client.id} className="cms-card">
                        <img src={client.src} alt={client.alt} className="cms-card-image" />
                        <div className="cms-card-actions">
                            <button onClick={() => handleEditClient(client.id)} className="cms-card-action-button">
                                <img src={Pencil} alt="Edit" />
                            </button>
                            <button onClick={() => handleDeleteClient(client.id)} className="cms-card-action-button">
                                <img src={Dustbin} alt="Delete" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit client modal */}
            {editingClient && (
                <div className="cms-modal">
                    <h3 className="cms-modal-title">Edit Client</h3>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleEditFileChange}
                        className="cms-input"
                    />
                    {editingClient.src && <img src={editingClient.src} alt="Client Preview" className="cms-preview" />}
                    
                    <input
                        type="text"
                        placeholder="Alt text"
                        value={editingClient.alt}
                        onChange={(e) => setEditingClient({ ...editingClient, alt: e.target.value })}
                        className="cms-input"
                    />
                    
                    <div className="cms-modal-actions">
                        <button onClick={handleSaveEdit} className="cms-button">Save</button>
                        <button onClick={() => setEditingClient(null)} className="cms-button cms-button-cancel">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CMSClients;
