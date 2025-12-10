import React from 'react';
import TransferCard from '../components/TransferCard';

type HomeProps = {
  onOpenAgendamento?: () => void;
};

export default function Home({ onOpenAgendamento }: HomeProps) {
  return (
    <div className="page container">
      <section className="hero">
        <h1>Taxi Wagner — Conforto e pontualidade</h1>
        <p>Transfers, aeroporto, city-tours e viagens intermunicipais.</p>

        <button
          onClick={onOpenAgendamento}
          style={{
            display: "inline-block",
            marginTop: 20,
            background: "#25D366",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "600",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 8px 20px rgba(37,211,102,0.25)"
          }}
          type="button"
        >
          📅 Agendar agora
        </button>
      </section>

      <section style={{ marginTop: 18 }}>
        <h3>Serviços populares</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          <TransferCard title="Transfer Aeroporto" description="Tarifa fixa até 30min de espera." price="Consultar" />
          <TransferCard title="City Tour" description="Roteiro personalizado" price="Sob consulta" />
          <TransferCard title="Viagem Intermunicipal" description="Preço por km" price="Sob consulta" />
        </div>
      </section>
    </div>
  );
}
