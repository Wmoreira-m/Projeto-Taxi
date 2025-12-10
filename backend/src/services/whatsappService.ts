// Serviço simples que cria a URL de WhatsApp com mensagem pré-preenchida.
// Não envia pelo servidor — retorna link para o frontend abrir (melhor experiência).
import config from '../config';

export function buildWhatsAppMessage(driverNumber: string, booking: any) {
  // booking contains name, phone, serviceType, origin, destination, date, price, notes
  const parts = [
    `*Nova Reserva — Taxi Wagner*`,
    `Cliente: ${booking.name}`,
    `Telefone: ${booking.phone}`,
    `Serviço: ${booking.serviceType}`,
    booking.origin ? `Origem: ${booking.origin}` : null,
    booking.destination ? `Destino: ${booking.destination}` : null,
    `Data/Hora: ${booking.date}`,
    `Preço estimado: R$ ${booking.price}`,
    booking.notes ? `Observações: ${booking.notes}` : null,
    '',
    'Favor confirmar a corrida. Obrigado!'
  ].filter(Boolean);

  return parts.join('\n');
}

export function whatsappUrlFor(driverNumber: string, text: string) {
  // driverNumber must be in format like '5511999998888' (no +, no spaces)
  const encoded = encodeURIComponent(text);
  return `https://wa.me/${driverNumber}?text=${encoded}`;
}
