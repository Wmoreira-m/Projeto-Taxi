import { Request, Response } from "express";
import { buildWhatsAppMessage, whatsappUrlFor } from "../services/whatsappService";
import config from "../config";

export async function createBooking(req: Request, res: Response) {
  try {
    const {
      name,
      phone,
      serviceType,
      origin,
      originNumber,
      originNoNumber,
      destination,
      destinationNumber,
      destinationNoNumber,
      date,
      time,
      datetime,
      notes,
      luggage,
      luggageQty
    } = req.body;

    if (!name || !phone || !serviceType) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios: name, phone e serviceType." });
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const finalDateTime = datetime || (date && time ? `${date} ${time}` : "");

    // pega número do motorista
    let driverNumber =
      config.driverWhatsApp ||
      process.env.WHATSAPP_NUMBER ||
      process.env.DRIVER_WHATSAPP_NUMBER ||
      "";

    driverNumber = driverNumber.replace(/\D/g, "");

    if (!driverNumber) {
      return res.status(500).json({
        error: "Número do motorista não configurado no backend (.env → WHATSAPP_NUMBER)."
      });
    }

    // MONTA OBJETO COMPLETO PARA O ZAP
    const booking = {
      name,
      phone: cleanPhone,
      serviceType,
      origin,
      originNumber: originNoNumber ? "Sem número" : originNumber || "",
      originNoNumber,

      destination,
      destinationNumber: destinationNoNumber ? "Sem número" : destinationNumber || "",
      destinationNoNumber,

      datetime: finalDateTime,
      notes: notes || "",

      luggage,
      luggageQty: luggage ? luggageQty || 1 : 0
    };

    const msg = buildWhatsAppMessage(driverNumber, booking);
    const waLink = whatsappUrlFor(driverNumber, msg);

    const clientMsg = `Olá ${name}, sua solicitação foi enviada à Taxi Wagner. Aguarde confirmação. 🚕✨`;
    const waClientLink = whatsappUrlFor(cleanPhone, clientMsg);

    return res.json({ ok: true, waLink, waClientLink, booking });

  } catch (err) {
    console.error("Erro createBooking:", err);
    return res.status(500).json({ error: "Erro ao gerar link para WhatsApp." });
  }
}
