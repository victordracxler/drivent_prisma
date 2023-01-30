import { notFoundError, unauthorizedError } from '@/errors';
import { NewPayment } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payments-repository';
import ticketRepository from '@/repositories/tickets-repository';
import { Payment } from '@prisma/client';

export async function createNewPayment(userId: number, paymentData: NewPayment) {
  const ticket = await ticketRepository.findTicketById(paymentData.ticketId);
  const enrollment = await enrollmentRepository.findEnrollment(userId);

  if (!ticket) {
    throw notFoundError();
  }
  if (!enrollment || userId !== enrollment.userId) {
    throw unauthorizedError();
  }

  const ticketType = await ticketRepository.findTicketTypeById(ticket.ticketTypeId);

  if (!ticketType) {
    throw notFoundError();
  }
  const newPay = { ...paymentData, value: ticketType.price };
  const payment = await paymentRepository.createPayment(newPay);

  await ticketRepository.paymentStatusUpdate(ticket.id);

  return payment;
}

const paymentService = {
  createNewPayment,
};

export default paymentService;
