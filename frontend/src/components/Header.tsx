import React from "react";
import { Link } from "react-router-dom";

type HeaderProps = { onOpenAgendamento?: () => void };

export default function Header({ onOpenAgendamento }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand"><strong>Taxi Wagner</strong></div>

        <div className="header-anim-wrap" aria-hidden="true">
          <div className="road">
            <div className="tire-marks" />
            {/* SVG simples e leve do taxi */}
            <svg className="taxi-svg" viewBox="0 0 64 32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="carro taxi">
              {/* carro */}
              <rect x="6" y="12" width="44" height="12" rx="2" fill="#FFD54F"/>

              {/* cabine */}
              <rect x="20" y="6" width="18" height="8" rx="2" fill="#FFD54F"/>

              {/* janelas */}
              <rect x="22" y="8.5" width="6" height="4" rx="0.8" fill="#fff" opacity="0.9"/>
              <rect x="30" y="8.5" width="6" height="4" rx="0.8" fill="#fff" opacity="0.9"/>

              {/* triângulo de taxi no teto */}
              <polygon 
                points="32,3 26,6 38,6" 
                fill="#FFD54F" 
                stroke="#111" 
                strokeWidth="0.8"
              />

              {/* bolinhas estilo taxi pattern */}
              <circle cx="29" cy="18" r="1.0" fill="#111" />
              <circle cx="32" cy="19" r="1.0" fill="#111" />
              <circle cx="35" cy="18" r="1.0" fill="#111" />
              <circle cx="38" cy="19" r="1.0" fill="#111" />
              <circle cx="41" cy="18" r="1.0" fill="#111" />

              {/* rodas */}
              <circle cx="16" cy="26" r="3.4" fill="#111"/>
              <circle cx="16" cy="26" r="1.5" fill="#ffffffff"/>
              <circle cx="46" cy="26" r="3.4" fill="#111"/>
              <circle cx="46" cy="26" r="1.5" fill="#ffffffff"/>
            </svg>
          </div>
        </div>

        <div className="header-actions">
          <nav className="links">
            <Link to="/">Home</Link>
            <Link to="/transfers">Transfers</Link>
            <Link to="/contato">Contato</Link>
          </nav>

          <button
            onClick={onOpenAgendamento}
            className="header-agendar"
            type="button"
            aria-label="Abrir agendamento"
          >
            Agendar
          </button>
        </div>
      </div>
    </header>
  );
}
