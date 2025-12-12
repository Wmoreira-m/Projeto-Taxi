import { useEffect, useRef } from "react";
import EmailForm from "../components/EmailForm";

type AgendamentoProps = {
  isOpen: boolean;
  onClose?: () => void;
  category?: string;
};

export default function Agendamento({ isOpen, onClose, category }: AgendamentoProps) {
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
      const first = wrapRef.current.querySelector("input, textarea, select") as HTMLElement;
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
          <EmailForm defaultCategory={category} />
        </div>
      </div>
    </div>
  );
}
