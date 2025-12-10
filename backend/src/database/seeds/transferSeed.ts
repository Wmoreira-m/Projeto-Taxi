import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // seed example bookings (opcional)
  await knex('bookings').del();
  await knex('bookings').insert([
    {
      name: 'Cliente Demo',
      email: 'cliente@example.com',
      phone: '+5511999999999',
      serviceType: 'airport',
      origin: 'Aeroporto Guarulhos',
      destination: 'Hotel Centro',
      date: new Date().toISOString(),
      price: 120.00,
      status: 'pending',
      notes: 'Teste seed'
    }
  ]);
}
