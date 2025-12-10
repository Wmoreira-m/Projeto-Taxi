import { Request, Response } from 'express';
import db from '../database/knex';
import { buildWhatsAppMessage, whatsappUrlFor } from '../services/whatsappService';
import config from '../config';

// cria reserva e retorna link do WhatsApp para enviar ao motorista
export async function createBooking(req: Request, res: Response) {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      origin,
      destination,
      date,
      price,
      notes
    } = req.body;

    if (!name || !phone || !date || !serviceType) {
      return res.status(400).json({ error: 'Campos obrigatórios: name, phone, date, serviceType' });
    }

    const cleanPhone = phone.replace(/\D/g, '');

    let driverNumber =
      config.driverWhatsApp ||
      process.env.WHATSAPP_NUMBER ||
      process.env.DRIVER_WHATSAPP_NUMBER ||
      '';

    driverNumber = driverNumber.replace(/\D/g, '');

    if (!driverNumber) {
      return res.status(500).json({
        error: 'Número do motorista não configurado no backend. Configure WHATSAPP_NUMBER no .env.'
      });
    }

    const [id] = await db('bookings').insert({
      name,
      email,
      phone: cleanPhone,
      serviceType,
      origin: origin || '',
      destination: destination || '',
      date,
      price: price || 0,
      notes: notes || ''
    });

    const booking = {
      id,
      name,
      email,
      phone: cleanPhone,
      serviceType,
      origin,
      destination,
      date,
      price: price || 0,
      notes: notes || ''
    };

    const msg = buildWhatsAppMessage(driverNumber, booking);
    const waLink = whatsappUrlFor(driverNumber, msg);

    const clientMsg = `Olá ${name}, sua reserva foi recebida. ID: ${id} — Taxi Wagner.`;
    const waClientLink = cleanPhone ? whatsappUrlFor(cleanPhone, clientMsg) : null;

    return res.json({ ok: true, id, waLink, waClientLink, booking });

  } catch (err) {
    console.error('Erro createBooking', err);
    return res.status(500).json({ error: 'Erro ao criar reserva' });
  }
}

// endpoint para calcular preço
export function calcPrice(req: Request, res: Response) {
  try {
    const { distanceKm = 10, perKm = 2.5, serviceType = 'city', waitingMinutes = 0 } = req.body;

    let base = 12;
    if (serviceType === 'airport') base = 35;
    if (serviceType === 'transfer') base = 20;
    if (serviceType === 'intercity') base = 50;

    let price = Number(base) + Number(distanceKm) * Number(perKm) + Number(waitingMinutes) * 0.5;

    if (serviceType === 'intercity') price *= 1.15;

    price = Math.round(price * 100) / 100;

    return res.json({ price });

  } catch (err) {
    console.error('Erro calcPrice', err);
    return res.status(500).json({ error: 'Erro ao calcular preço' });
  }
}
