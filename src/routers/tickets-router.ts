import { getTickets, getTicketTypes, postTickets } from '@/controllers';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketTypes);

ticketsRouter.get('/', authenticateToken, getTickets);

ticketsRouter.post('/', authenticateToken, postTickets);

export { ticketsRouter };
