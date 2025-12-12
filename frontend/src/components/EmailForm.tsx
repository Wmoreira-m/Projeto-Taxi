import React, { useState } from "react";
import axios from "axios";

type Form = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  origin: string;
  originNumber?: string;
  destination: string;
  destinationNumber?: string;
  date: string;
  time: string;
  notes?: string;
  luggage?: boolean;
  luggageQty?: number;
};

type EmailFormProps = {
  defaultCategory?: string;
};

export default function EmailForm({ defaultCategory = "" }: EmailFormProps) {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    phone: "",
    serviceType: defaultCategory || "",
    origin: "",
    destination: "",
    date: "",
    time: "",
    notes: "",
    originNumber: "",
    destinationNumber: "",
    luggage: false,
    luggageQty: 0
  });

  const [noOriginNumber, setNoOriginNumber] = useState(false);
  const [noDestNumber, setNoDestNumber] = useState(false);

  const [loading, setLoading] = useState(false);

  function phoneMask(value: string) {
    value = value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const api = import.meta.env.VITE_API_URL;
    const finalDateTime = `${form.date} ${form.time}`;

    const payload = {
      ...form,
      datetime: finalDateTime,
      originNumber: noOriginNumber ? "S/N" : form.originNumber,
      destinationNumber: noDestNumber ? "S/N" : form.destinationNumber,
      luggageQty: form.luggage ? form.luggageQty : 0
    };

    try {
      const resp = await axios.post(`${api}/bookings`, payload);

      if (resp.data.waLink) {
        setLoading(false);
        window.open(resp.data.waLink, "_blank");
        return;
      }

      alert("Solicitação enviada com sucesso!");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar reserva");
    }

    setLoading(false);
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <label>Informações</label>

      <input
        required
        placeholder="Nome"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        required
        placeholder="Telefone (ex: (11) 99999-9999)"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: phoneMask(e.target.value) })}
        maxLength={15}
      />

      <label>Categoria</label>
      <select
        required
        value={form.serviceType}
        onChange={(e) => setForm({ ...form, serviceType: e.target.value })}
      >
        <option value="" disabled>Selecione uma categoria</option>
        <option value="Executivos/Corporativos">Executivos/Corporativos</option>
        <option value="Aeroporto">Aeroporto</option>
        <option value="Litoral">Litoral</option>
        <option value="Cruzeiro">Cruzeiro</option>
        <option value="Citytour">City Tour</option>
        <option value="Intermunicipal">Intermunicipal</option>
        <option value="Eventos">Eventos</option>
        <option value="Translado_Internacional">Translado Internacional</option>

      </select>

      {/* ORIGEM */}
      <input
  placeholder="Origem (Rua, Avenida...)"
  value={form.origin}
  onChange={(e) => setForm({ ...form, origin: e.target.value })}
/>

{!noOriginNumber && (
  <input
    placeholder="Número"
    value={form.originNumber}
    onChange={(e) => setForm({ ...form, originNumber: e.target.value })}
  />
)}

<div className="checkbox-line">
  <input
    type="checkbox"
    checked={noOriginNumber}
    onChange={() => setNoOriginNumber(!noOriginNumber)}
  />
  <span>Sem número</span>
</div>

      {/* DESTINO */}
      <input
  placeholder="Destino (Rua, Avenida...)"
  value={form.destination}
  onChange={(e) => setForm({ ...form, destination: e.target.value })}
/>

{!noDestNumber && (
  <input
    placeholder="Número"
    value={form.destinationNumber}
    onChange={(e) => setForm({ ...form, destinationNumber: e.target.value })}
  />
)}

<div className="checkbox-line">
  <input
    type="checkbox"
    checked={noDestNumber}
    onChange={() => setNoDestNumber(!noDestNumber)}
  />
  <span>Sem número</span>
</div>

      {/* DATA E HORA */}
      <div className="row-2">
        <div>
          <label>Data</label>
          <input
            required
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div>
          <label>Hora</label>
          <input
            required
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
      </div>

      {/* MALA */}
<div className="checkbox-line">
  <input
    type="checkbox"
    checked={form.luggage}
    onChange={() => setForm({ ...form, luggage: !form.luggage })}
  />
  <span>Tenho malas</span>
</div>

      {form.luggage && (
        <input
          type="number"
          placeholder="Quantidade de malas"
          min={1}
          max={10}
          value={form.luggageQty}
          onChange={(e) =>
            setForm({ ...form, luggageQty: Number(e.target.value) })
          }
        />
      )}

      <textarea
        placeholder="Observações (opcional)"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />

      <div style={{ display: "flex", gap: 8 }}>
        <button type="submit" disabled={loading}>
          {loading ? "Enviando..." : "Confirmar Agendamento"}
        </button>
      </div>
    </form>
  );
}
