import React, { useEffect, useState } from "react";

type ContatoProps = {
  onOpenAgendamento?: () => void;
};

export default function Contato({ onOpenAgendamento }: ContatoProps) {
  const [numero, setNumero] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:4000/api/whatsapp")
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.error || "Erro ao buscar número");
        }
        return res.json();
      })
      .then((data) => {
        if (data.whatsappLink) {
          const number = String(data.whatsappLink).replace("https://wa.me/", "");
          setNumero(number);
          setError(null);
        } else {
          throw new Error("Resposta inválida do servidor");
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar número do WhatsApp:", err);
        setError("Número não configurado no servidor");
        setNumero(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const abrirWhatsApp = () => {
    if (!numero) return alert("Número do motorista não configurado!");
    const msg = encodeURIComponent(
      "Olá! Gostaria de solicitar um transfer com Taxi Wagner. Pode confirmar disponibilidade?"
    );
    window.open(`https://wa.me/${numero}?text=${msg}`, "_blank");
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <div className="contact-info">
          <h2>Contato</h2>
          <p>
            Para contato rápido: abra o WhatsApp do nosso motorista direto pelo botão ao
            lado.
          </p>
          <p>
            Ou use o formulário de reserva na home para agendar e enviar a mensagem
            automaticamente.
          </p>

          <p className="contact-note" style={{ marginTop: 18 }}>
            Horário de atendimento: 06:00 — 23:00
          </p>
          <p className="contact-note" style={{ marginTop: 18 }}>
            Tempo de resposta: normalmente <strong>menos de 15 minutos</strong>.
          </p>
        </div>

        <div className="contact-actions">
          {loading ? (
            <button className="wa-button" disabled type="button">
              Carregando...
            </button>
          ) : error ? (
            <>
              <div style={{ textAlign: "center", color: "#c00" }}>{error}</div>
              <button
                className="wa-button"
                onClick={() => window.location.reload()}
                style={{ background: "#f1f1f1", color: "#333" }}
                type="button"
              >
                Tentar novamente
              </button>

              {/* Se quiser abrir o formulário mesmo com erro no WhatsApp */}
              {onOpenAgendamento ? (
                <button
                  onClick={onOpenAgendamento}
                  type="button"
                  style={{
                    marginTop: 12,
                    background: "#FFD54F",
                    color: "#111",
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  📅 Abrir formulário de agendamento
                </button>
              ) : null}
            </>
          ) : (
            <>
              <button className="wa-button" onClick={abrirWhatsApp} type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" width="22" height="22" fill="#fff">
                  <path d="M20.52 3.48A11.93 11.93 0 0012 .5C6.21.5 1.5 5.21 1.5 11c0 1.98.52 3.83 1.42 5.48L.5 23l6.8-1.78A11.94 11.94 0 0012 22.5c5.79 0 10.5-4.71 10.5-10.5 0-2.85-1.06-5.5-2.98-7.52zM12 20.5c-1.04 0-2.07-.2-3-.58l-.2-.08-4.04 1.06 1.08-3.84-.06-.2A8.5 8.5 0 113.5 11 8.49 8.49 0 0112 19.5zM17.03 14.9c-.3-.15-1.77-.86-2.05-.96-.28-.1-.49-.15-.7.15s-.8.96-.98 1.15c-.18.2-.36.22-.66.07-.3-.15-1.25-.46-2.38-1.46-.88-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.6.13-.12.3-.32.45-.48.15-.15.2-.25.3-.42.1-.17.05-.31-.03-.46-.08-.15-.7-1.68-.96-2.3-.25-.6-.5-.5-.7-.5-.18 0-.38 0-.58 0-.2 0-.52.07-.8.37-.28.3-1.07 1.04-1.07 2.54 0 1.5.9 2.95 1.02 3.16.12.2 1.76 2.8 4.27 3.82 2.5 1.01 2.5.68 2.95.64.45-.04 1.46-.6 1.67-1.18.2-.59.2-1.09.14-1.2-.07-.1-.29-.15-.6-.3z"></path>
                </svg>
                    Abrir WhatsApp
              </button>

              <div className="phone-line" style={{ marginTop: 8 }}>
                Telefone (motorista): <strong>{numero}</strong>
              </div>

              {/* botão pra abrir o modal com o formulário */}
              {onOpenAgendamento ? (
                <button
                  onClick={onOpenAgendamento}
                  type="button"
                  style={{
                    marginTop: 12,
                    background: "#FFD54F",
                    color: "#111",
                    padding: "10px 14px",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  📅 Abrir formulário de agendamento
                </button>
              ) : null}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
