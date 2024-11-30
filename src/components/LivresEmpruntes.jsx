import React, { useContext, useState } from 'react';
import { EmpruntContext } from '../context/EmpruntContext';
import Popup from './Popup';

const LivresEmpruntes = () => {
  const { empruntes, returnLivre } = useContext(EmpruntContext);
  const [message, setMessage] = useState('');

  const rendreLivre = (id) => {
    const livre = empruntes.find((livre) => livre.id === id);
    if (livre) {
      returnLivre(id);
      setMessage(`Vous avez rendu "${livre.titre}" avec succès!`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {message && <Popup message={message} onClose={() => setMessage('')} />}

      <h2 className="text-center font-bold text-4xl mb-12 text-indigo-800">Livres Empruntés</h2>
      {empruntes.length > 0 ? (
        <ul className="space-y-4">
          {empruntes.map((livre) => (
            <li key={livre.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-700 mb-2">{livre.titre}</h3>
                  <p className="text-gray-600 mb-4">Auteur : {livre.auteur}</p>
                </div>
                <button
                  onClick={() => rendreLivre(livre.id)}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
                  aria-label={`Rendre le livre : ${livre.titre}`}
                >
                  Rendre
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center bg-gray-100 rounded-lg p-8">
          <p className="text-xl text-indigo-600 text-semibold">Aucun livre n'a été emprunté.</p>
          <p className="mt-2 text-gray-500">Visitez notre bibliothèque pour découvrir de nouveaux livres !</p>
        </div>
      )}
    </div>
  );
};

export default LivresEmpruntes;

