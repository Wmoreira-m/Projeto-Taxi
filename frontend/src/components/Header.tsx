import React, { useState } from "react";
import { Link } from "react-router-dom";

type HeaderProps = { onOpenAgendamento?: () => void };

export default function Header({ onOpenAgendamento }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* overlay para fechar ao clicar fora */}
      <div
        className={`menu-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <header className="site-header">
        <div className="header-inner">
          
          {/* BRAND */}
          <div className="brand">
            <Link to="/"><strong>Taxi Wagner</strong></Link>
          </div>

          {/* AÇÕES DESKTOP */}
          <div className="header-actions desktop-only">
            <nav className="links">
              <Link to="/">Home</Link>
              <Link to="/transfers">Transfers</Link>
              <Link to="/contato">Contato</Link>
            </nav>

            <button
              onClick={onOpenAgendamento}
              className="header-agendar"
              type="button"
            >
              Agendar
            </button>
          </div>

          {/* BOTÃO HAMBÚRGUER */}
          <button
            className="hamburger mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>

        {/* MENU MOBILE */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/transfers" onClick={() => setMenuOpen(false)}>Transfers</Link>
          <Link to="/contato" onClick={() => setMenuOpen(false)}>Contato</Link>

          <button
            onClick={() => {
              setMenuOpen(false);
              onOpenAgendamento?.();
            }}
            className="header-agendar"
          >
            Agendar
          </button>
        </div>
      </header>
    </>
  );
}
