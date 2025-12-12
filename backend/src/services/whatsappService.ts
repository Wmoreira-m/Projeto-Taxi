// Serviço simples que cria a URL de WhatsApp com mensagem pré-preenchida.
// Não envia pelo servidor — retorna link para o frontend abrir (melhor experiência).
import config from '../config';

export function buildWhatsAppMessage(driverNumber: string, booking: any) {
  const parts = [
    `*Nova Solicitação – Taxi Wagner*`,
    `Cliente: ${booking.name}`,
    `Telefone: ${booking.phone}`,
    `Serviço: ${booking.serviceType}`,

    booking.origin ? `Origem: ${booking.origin}` : null,
    booking.originNumber ? `Número origem: ${booking.originNumber}` : null,

    booking.destination ? `Destino: ${booking.destination}` : null,
    booking.destinationNumber ? `Número destino: ${booking.destinationNumber}` : null,

    booking.datetime ? `Data/Hora: ${booking.datetime}` : null,

    booking.luggage ? `Malas: ${booking.luggageQty}` : `Malas: Não`,

    booking.notes ? `Observações: ${booking.notes}` : null,

    "",
    "Favor confirmar a corrida. Obrigado!"
  ].filter(Boolean);

  return parts.join("\n");
}

export function whatsappUrlFor(driverNumber: string, text: string) {
  return `https://wa.me/${driverNumber}?text=${encodeURIComponent(text)}`;
}
