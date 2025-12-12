import React from 'react';
import TransferCard from '../components/TransferCard';

type TransfersProps = {
  onOpenAgendamento?: (category?: string) => void;
};

export default function Transfers({ onOpenAgendamento }: TransfersProps) {

  function openWithCategory(category: string) {
    if (onOpenAgendamento) {
      onOpenAgendamento(category);
    }
  }

  return (
    <div className="page container">

      <h2 style={{ textAlign: "center", marginBottom: 10, marginTop: 30 }}>Transfers disponíveis</h2>
      <p style={{ textAlign: "center", marginBottom: 30 }}>
        Escolha um tipo de transfer e clique em agendar.
      </p>

      <div 
        className="transfers-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 16,
        }}
      >

        <TransferCard
          title="Aeroporto"
          description="Conexão entre cidades e aeroportos (GRU, VCP, CGH), com monitoramento de voo e recepção."
          image={import.meta.env.BASE_URL + "img/aeroporto.jpeg"}
          onClick={() => openWithCategory("Aeroporto")}
        />

        <TransferCard
          title="Cruzeiro"
          description="Serviço de embarque e desembarque no ponto de encontro combinado pelo passageiro."
          image={import.meta.env.BASE_URL + "img/cruzeiro.jpeg"}
          onClick={() => openWithCategory("Cruzeiro")}
        />

        <TransferCard
          title="Executivos/Corporativos"
          description="Para negócios, congressos, feiras, com veículos confortáveis e motoristas profissionais."
          image={import.meta.env.BASE_URL + "img/citytour.jpeg"}
          onClick={() => openWithCategory("Executivos/Corporativos")}
        />

        <TransferCard
          title="Intermunicipal"
          description="Transporte para cidades próximas ou do interior, como Campos do Jordão, Holambra, etc.."
          image={import.meta.env.BASE_URL + "img/intermunicipal.jpeg"}
          onClick={() => openWithCategory("Intermunicipal")}
        />

        <TransferCard
          title="Litoral"
          description="Transfers/Viagens para Litorais, incluindo Litoral Norte, Litoral Sul e Baixada Santista. "
          image={import.meta.env.BASE_URL + "img/litoral.jpeg"}
          onClick={() => openWithCategory("Litoral")}
        />

        <TransferCard
          title="City Tour"
          description="Roteiros que incluem pontos como Avenida Paulista, Parque Ibirapuera, Centro Histórico, etc..."
          image={import.meta.env.BASE_URL + "img/transfercomum.jpeg"}
          onClick={() => openWithCategory("Citytour")}
        />

                <TransferCard
          title="Eventos e Lazer"
          description="Para shows, parques, casamentos, congressos , lazeres, eventos exclusivos, etc..."
          image={import.meta.env.BASE_URL + "img/eventos.jpeg"}
          onClick={() => openWithCategory("Eventos")}
        />

                <TransferCard
          title="Translado Internacional"
          description="Viagens Internacionais podendo ser Buenos Aires, Foz do Iguaçu, Uruguaiana, etc..."
          image={import.meta.env.BASE_URL + "img/internacional.jpeg"}
          onClick={() => openWithCategory("Translado_Internacional")}
        />
      </div>
    </div>
  );
}
