import { getTickets, getTicketTypes } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketTypes);

ticketsRouter.get('/', authenticateToken, getTickets);

export { ticketsRouter };
