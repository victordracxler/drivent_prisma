import ticketService from '@/services/tickets-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketTypes(req: Request, res: Response) {
  try {
    const types = await ticketService.getTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send([]);
  }
}
