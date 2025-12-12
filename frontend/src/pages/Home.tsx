import React from 'react';
import TransferCard from '../components/TransferCard';
import { Link } from "react-router-dom";

type HomeProps = {
  onOpenAgendamento?: () => void;
};

export default function Home({ onOpenAgendamento }: HomeProps) {
  return (
    <div className="page container">
      <section className="hero hero-bg">
        <h1>Conforto e pontualidade</h1>
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
        <h3 style={{ textAlign: "center", fontSize: 25 }}>Serviços populares</h3>

        <div 
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 10,
            marginTop: 18,
          }}
        >
          <Link to="/transfers" className='cardsLink'><TransferCard
            title="Transfer Aeroporto"
            description="Tarifa fixa até 30min de espera."
            image={import.meta.env.BASE_URL + "img/aeroporto.jpeg"}
            /></Link>

          <Link to="/transfers" className='cardsLink'><TransferCard
            title="City Tour"
            description="Roteiro personalizado"
            image={import.meta.env.BASE_URL + "img/citytour.jpeg"}
          /></Link>

          <Link to="/transfers" className='cardsLink'><TransferCard
            title="Cruzeiro"
            description="Preço por km"
            image={import.meta.env.BASE_URL + "img/cruzeiro.jpeg"}
          /></Link>

          <Link to="/transfers" className='cardsLink'><TransferCard
            title="Executivos/Corporativos"
            description="Preço por km"
            image={import.meta.env.BASE_URL + "img/citytour.jpeg"}
          /></Link>
        </div>

        <div className="transfers-button-wrap">
          <button
            className="transfers-button"
          >
            <Link to="/transfers">🔎 Todos os Transfers</Link>
          </button>
        </div>

        <section className="about-card-section">
          <div className="about-card">
            <h3>Sobre a Taxi Wagner</h3>
            <p>
              A Taxi Wagner nasceu com o propósito de oferecer uma experiência de transporte
              segura, confortável e totalmente confiável para cada passageiro. Atuamos com
              transfers para aeroporto, city tours, viagens intermunicipais, deslocamentos para
              cruzeiros e atendimento personalizado, sempre com foco no que realmente importa:
              qualidade, pontualidade e respeito ao cliente.
            </p>

            <p>
              Entendemos que cada viagem tem um motivo — trabalho, lazer, compromissos
              familiares, passeios ou deslocamentos importantes — e por isso tratamos cada
              atendimento de forma única. Nossa equipe garante clareza nas informações,
              comunicação rápida e um suporte atento às necessidades do passageiro.
            </p>

            <p>
              Nossa frota é composta por veículos confortáveis, bem cuidados e preparados para
              proporcionar uma viagem tranquila em qualquer trajeto. Prezamos pela segurança,
              higienização, condução responsável e compromisso com horários, garantindo que o
              cliente chegue ao seu destino sem preocupações.
            </p>

            <p>
              Na Taxi Wagner, acreditamos que transportar pessoas é muito mais do que levá-las
              de um ponto ao outro. É oferecer confiança, cuidado e a certeza de que cada
              passageiro está sendo tratado com profissionalismo e atenção.
            </p>

            <p className="about-highlight">
              Porque para nós, cada viagem é importante — e cada cliente importa ainda mais. 🚕✨
            </p>
          </div>
        </section>


      </section>
        <section className="car-carousel-section">
          <h3 style={{ textAlign: "center", marginTop: 40, fontSize: 27 }}>Nossa frota</h3>

          <div className="car-carousel">
            <div className="car-carousel-track">
              {[1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,
              5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5,1,2,3,4,5
              ].map((n, i) => (
                <img
                  key={i}
                  src={import.meta.env.BASE_URL + `carros/car${n}.jpeg`}
                  className="car-img"
                />
              ))}
            </div>
          </div>
        </section>

    </div> 



  );
}
