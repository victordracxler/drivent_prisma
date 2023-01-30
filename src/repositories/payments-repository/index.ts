import { Prisma } from '@prisma/client';
import { prisma } from '@/config';
import { NewPayment } from '@/protocols';

async function createPayment(payment: Prisma.PaymentUncheckedCreateInput) {
  return prisma.payment.create({
    data: payment,
  });
}

async function findPayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

const paymentRepository = {
  createPayment,
  findPayment,
};

export default paymentRepository;
