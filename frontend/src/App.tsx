import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import "./styles.css";

import Home from './pages/Home';
import Transfers from './pages/Transfers';
import Contato from './pages/Contato';
import Agendamento from './pages/Agendamento';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  const [openAgendamento, setOpenAgendamento] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // 👉 Função única usada pela Home, Header e Transfers
  function openModalWithCategory(category?: string) {
    if (category) {
      setSelectedCategory(category);  // salva a categoria escolhida
    } else {
      setSelectedCategory(""); // se abrir manualmente, deixa vazio
    }

    setOpenAgendamento(true); // abre modal
  }

  return (
    <>
      <ScrollToTop />
      <div className="app-container">

        <Header onOpenAgendamento={() => openModalWithCategory()} />

        <main className="app-content">
          <Routes>
            <Route 
              path="/" 
              element={<Home onOpenAgendamento={() => openModalWithCategory()} />} 
            />

            <Route 
              path="/transfers"
              element={<Transfers onOpenAgendamento={openModalWithCategory} />} 
            />

            <Route 
              path="/contato"
              element={<Contato onOpenAgendamento={() => openModalWithCategory()} />} 
            />
          </Routes>
        </main>

        <Footer />

        {/* Modal */}
        <Agendamento
          isOpen={openAgendamento}
          onClose={() => setOpenAgendamento(false)}
          category={selectedCategory}  
        />
      </div>
    </>
  );
}
