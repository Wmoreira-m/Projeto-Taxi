// backend/src/config.ts
import { config } from "dotenv";
config();

const driverWhatsApp =
  process.env.WHATSAPP_NUMBER ||
  process.env.DRIVER_WHATSAPP_NUMBER ||
  '';

const baseUrl = process.env.BASE_URL || 'http://localhost:5173';

export default {
  driverWhatsApp,
  baseUrl
};