import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const types = await ticketService.getTypes();
    return res.status(httpStatus.OK).send(types);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send([]);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  try {
    const ticket = await ticketService.getUserTicket(userId);

    if (!ticket) {
      return res.sendStatus(404);
    }

    res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send(error);
  }
}

export async function postTickets(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const ticketTypeId: number = req.body.ticketTypeId;
  try {
    const ticket = await ticketService.createNewTicket(userId, ticketTypeId);
    res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
