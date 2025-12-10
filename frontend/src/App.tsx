import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Transfers from './pages/Transfers';
import Contato from './pages/Contato';
import Agendamento from './pages/Agendamento'; // modal .tsx
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  const [openAgendamento, setOpenAgendamento] = useState(false);

  return (
    <div className="app-container">
      {/* passa a função pro Header caso você tenha um botão lá */}
      <Header onOpenAgendamento={() => setOpenAgendamento(true)} />

      <main className="app-content">
        <Routes>
          <Route
            path="/"
            element={<Home onOpenAgendamento={() => setOpenAgendamento(true)} />}
          />
          <Route
            path="/transfers"
            element={<Transfers onOpenAgendamento={() => setOpenAgendamento(true)} />}
          />
          <Route
            path="/contato"
            element={<Contato onOpenAgendamento={() => setOpenAgendamento(true)} />}
          />
          {/* Não deixe <Home .../> solto aqui — tudo dentro de <Routes> precisa ser <Route ... /> */}
        </Routes>
      </main>

      <Footer />

      {/* Modal agendamento sempre declarado aqui (fora das Routes) */}
      <Agendamento
        isOpen={openAgendamento}
        onClose={() => setOpenAgendamento(false)}
      />
    </div>
  );
}
