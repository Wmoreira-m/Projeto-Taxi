# Backend Taxi Wagner
- Endpoints:
  POST /api/bookings/calc  -> calcula preço
  POST /api/bookings       -> cria reserva e retorna links WhatsApp (motorista e cliente)
- Configure DRIVER_WHATSAPP_NUMBER no .env (ex: DRIVER_WHATSAPP_NUMBER=5511999998888)
- Rode migrations e seeds se desejar persistência (knex + sqlite)
