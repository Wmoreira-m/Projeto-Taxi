import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bookingsRouter from './routes/transferRoutes';
import { config } from "dotenv";

config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', bookingsRouter);

app.get('/api/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend rodando na porta ${port}`));


app.get('/api/whatsapp', (_req, res) => {
  const whatsappNumber = process.env.WHATSAPP_NUMBER;

  if (!whatsappNumber) {
    return res.status(500).json({ error: "Número do WhatsApp não configurado no backend (.env)" });
  }

  return res.json({
    whatsappLink: `https://wa.me/${whatsappNumber}`
  });
});
