import React from 'react';
import ListLivre from './components/ListLivre';
import LivresEmpruntes from './components/LivresEmpruntes';
import EmpruntProvider  from './context/EmpruntContext';

const App = () => (
  <EmpruntProvider>
    <div className="container mx-auto p-4">
      <ListLivre />
      <LivresEmpruntes />
    </div>
  </EmpruntProvider>
)

export default App;
