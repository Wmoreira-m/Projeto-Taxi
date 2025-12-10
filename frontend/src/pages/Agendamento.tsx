// Agendamento.tsx — SUBSTITUA TODO O ARQUIVO POR ESTE CÓDIGO

import { useEffect, useRef } from "react";
import EmailForm from "../components/EmailForm";

type AgendamentoProps = {
  isOpen: boolean;
  onClose?: () => void;
};

export default function Agendamento({ isOpen, onClose }: AgendamentoProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKey);

    const timer = setTimeout(() => {
      if (!wrapRef.current) return;
      const first = wrapRef.current.querySelector<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >("input, textarea, select");
      first?.focus();
    }, 80);

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay open"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="modal-wrap" ref={wrapRef}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-card modal-clean">

          {/* FORMULÁRIO SOMENTE */}
          <EmailForm />
        </div>
      </div>
    </div>
  );
}
