import React, { useState, useEffect, useContext } from 'react';
import { EmpruntContext } from '../context/EmpruntContext';
import { fetchLivres } from '../services/api';

const ListLivres = () => {
    const { livres, setLivres, setEmpruntes } = useContext(EmpruntContext);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getLivres = async () => {
            try {
                const data = await fetchLivres();
                setLivres(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des livres :', error);
                setMessage('Erreur lors de la récupération des livres. Veuillez réessayer.');
            }
        };

        getLivres();
    }, [setLivres]);

    const empruntLivre = (id) => {
        const livreEmprunte = livres.find((livre) => livre.id === id);
        
        if (livreEmprunte && livreEmprunte.disponible) {
            setLivres((prevLivres) =>
                prevLivres.map((livre) =>
                    livre.id === id ? { ...livre, disponible: false } : livre
                )
            );

            setEmpruntes((prevEmpruntes) => [...prevEmpruntes, livreEmprunte]);

            setMessage(`${livreEmprunte.titre} a été emprunté avec succès !`);
            
            setTimeout(() => setMessage(''), 3000);
        }
    };

    return (
        <div className="container mx-auto px-4 py-12 bg-gray-100 min-h-screen">
            <h2 className="text-center font-bold text-4xl mb-12 text-indigo-800">
                Bibliothèque Numérique
            </h2>
            
            {message && (
                <div className="bg-green-500 text-white text-center py-2 mb-4 rounded">
                    {message}
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {livres.map((livre) => (
                    <div
                        key={livre.id}
                        className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
                    >
                        <div className="p-6">
                            <h3 className="font-bold text-xl mb-2 text-indigo-700 truncate">
                                {livre.titre}
                            </h3>
                            <p className="text-gray-600 mb-4">par {livre.auteur}</p>
                            <div className="h-24 overflow-hidden text-sm text-gray-500 mb-4">
                                {livre.description || 'Aucune description disponible pour ce livre.'}
                            </div>
                        </div>
                        <div className="px-6 py-4 bg-gray-50">
                            {livre.disponible ? (
                                <button
                                    onClick={() => empruntLivre(livre.id)}
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
                                    aria-label={`Emprunter ${livre.titre}`}
                                >
                                    Emprunter
                                </button>
                            ) : (
                                <p className="text-center text-red-500 font-semibold">
                                    Non disponible
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListLivres;

