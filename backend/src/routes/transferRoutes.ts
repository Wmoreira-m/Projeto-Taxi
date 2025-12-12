import { Router } from "express";
import { createBooking } from "../controllers/transferController";

const router = Router();

// criar agendamento → WhatsApp
router.post("/bookings", createBooking);

export default router;
