import React, { createContext, useState } from 'react';

export const EmpruntContext = createContext();

const EmpruntProvider = ({ children }) => {
    const [livres, setLivres] = useState([]);
    const [empruntes, setEmpruntes] = useState([]);

    const returnLivre = (id) => {
        const livreToReturn = empruntes.find((livre) => livre.id === id);
        
        if (livreToReturn) {
            setEmpruntes((prevEmpruntes) =>
                prevEmpruntes.filter((livre) => livre.id !== id)
            );
            
            setLivres((prevLivres) =>
                prevLivres.map((livre) =>
                    livre.id === id ? { ...livre, disponible: true } : livre
                )
            );
        }
    };

    return (
        <EmpruntContext.Provider value={{ livres, setLivres, empruntes, setEmpruntes, returnLivre }}>
            {children}
        </EmpruntContext.Provider>
    );
};

export default EmpruntProvider;

