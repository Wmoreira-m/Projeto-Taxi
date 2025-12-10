import { Router } from 'express';
import { createBooking, calcPrice } from '../controllers/emailController';

const router = Router();

/**
 * POST /api/bookings/calc
 * body: { distanceKm, perKm, serviceType, waitingMinutes }
 * returns: { price }
 */
router.post('/bookings/calc', calcPrice);

/**
 * POST /api/bookings
 * body: { name, email, phone, serviceType, origin, destination, date, price, notes }
 * returns: { ok, id, waLink, waClientLink, booking }
 */
router.post('/bookings', createBooking);

export default router;
