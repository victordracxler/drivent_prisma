import { AuthenticatedRequest } from '@/middlewares';
import { NewPayment } from '@/protocols';
import paymentService from '@/services/payments-service';
import { Payment } from '@prisma/client';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function newPayment(req: AuthenticatedRequest, res: Response) {
  const { ticketId, cardData } = req.body;
  const { cardIssuer, number } = cardData;

  const cardLastDigits = number.substr(-4);

  const paymentData: NewPayment = {
    ticketId,
    cardIssuer,
    cardLastDigits,
  };

  try {
    const payment = paymentService.createNewPayment(req.userId, paymentData);
    return res.status(httpStatus.OK).send(payment);
  } catch (error) {}
}
