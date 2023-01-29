import { getTicketTypes } from '@/controllers';
import { Router } from 'express';

const ticketsRouter = Router();

ticketsRouter.get('/types', getTicketTypes);

export { ticketsRouter };
