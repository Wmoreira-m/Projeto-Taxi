import React, { useState } from 'react';
import axios from 'axios';

type Form = {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  origin: string;
  destination: string;
  date: string;
  time: string;
  price?: number;
  notes?: string;
};

export default function EmailForm() {
  const [form, setForm] = useState<Form>({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    origin: '',
    destination: '',
    date: '',
    time: '',
    price: undefined,
    notes: ''
  });

  const [loading, setLoading] = useState(false);

  // ⭐ MÁSCARA DE TELEFONE (FORMATO AUTOMÁTICO)
  function phoneMask(value: string) {
    value = value.replace(/\D/g, ""); // remove tudo que não é número

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
      // fixo -> (11) 3456-7890
      return value
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    // celular -> (11) 98765-4321
    return value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }


  async function calcPrice() {
    try {
      const resp = await axios.post('/api/bookings/calc', { distanceKm: 10, serviceType: form.serviceType });
      setForm(prev => ({ ...prev, price: resp.data.price }));
      alert('Preço estimado: R$ ' + resp.data.price);
    } catch (e) {
      alert('Erro ao calcular preço');
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const finalDateTime = `${form.date} ${form.time}`;

    try {
      const resp = await axios.post('/api/bookings', { ...form, datetime: finalDateTime });
      setLoading(false);
      if (resp.data.waLink) {
        window.open(resp.data.waLink, '_blank');
      } else {
        alert('Reserva criada. ID: ' + resp.data.id);
      }
    } catch (err) {
      setLoading(false);
      alert('Erro ao criar reserva');
    }
  }

  return (
    <form className="booking-form" onSubmit={submit}>

      <label>Informações</label>
      <input
        required
        placeholder="Nome"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        required
        placeholder="Telefone (ex: (11) 99999-9999)"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: phoneMask(e.target.value) })}
        maxLength={15}
      />

      <label>Categoria</label>
      <select
        value={form.serviceType}
        onChange={e => setForm({ ...form, serviceType: e.target.value })}
      >
        <option value="" disabled>Selecione uma categoria</option>
        <option value="airport">Aeroporto</option>
        <option value="transfer">Transfer</option>
        <option value="intercity">Intermunicipal</option>
      </select>

      <input
        placeholder="Origem"
        value={form.origin}
        onChange={e => setForm({ ...form, origin: e.target.value })}
      />

      <input
        placeholder="Destino"
        value={form.destination}
        onChange={e => setForm({ ...form, destination: e.target.value })}
      />

      <div className="row-2">
        <div>
          <label>Data</label>
          <input
            required
            type="date"
            value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
        </div>

        <div>
          <label>Hora</label>
          <input
            required
            type="time"
            value={form.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
          />
        </div>
      </div>

      <textarea
        placeholder="Observações (opcional)"
        value={form.notes}
        onChange={e => setForm({ ...form, notes: e.target.value })}
      />

      <div style={{ display: 'flex', gap: 8 }}>
        <button type="submit" disabled={loading}>
          {loading ? 'Enviando...' : 'Confirmar Agendamento'}
        </button>
      </div>

      {form.price !== undefined && (
        <p>Preço estimado: R$ {form.price}</p>
      )}

    </form>
  );
}
