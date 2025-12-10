import React from 'react';
import TransferCard from '../components/TransferCard';

type TransfersProps = {
  onOpenAgendamento?: () => void;
};

export default function Transfers({ onOpenAgendamento }: TransfersProps) {
  return (
    <div className="page container">
      <h2>Transfers</h2>
      <p>Aqui estão nossos tipos de transfer. Para reservar, vá para a home e preencha o formulário.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
        <TransferCard title="Aeroporto" description="Retirada no aeroporto e transporte até o destino." price="Tarifa fixa" />
        <TransferCard title="Rodoviária" description="Serviço porta a porta da rodoviária." price="Tarifa fixa" />
        <TransferCard title="Intermunicipal" description="Viagens entre cidades com preço por km." price="R$ por km" />
      </div>

      {/* botão pra abrir o modal */}
      <div style={{ marginTop: 20 }}>
        <button
          type="button"
          onClick={onOpenAgendamento}
          style={{
            background: "#25D366",
            color: "#fff",
            padding: "12px 18px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontWeight: 700
          }}
        >
          📅 Agendar agora
        </button>
      </div>
    </div>
  );
}
