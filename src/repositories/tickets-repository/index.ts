import { prisma } from '@/config';
import { TicketCreation } from '@/protocols';
import { Prisma } from '@prisma/client';

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}
async function findTicketTypeById(ticketTypeId: number) {
  return prisma.ticketType.findUnique({
    where: {
      id: ticketTypeId,
    },
  });
}

async function findTicket(enrollmentId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });

  return ticket;
}

async function createTicket(ticket: Prisma.TicketUncheckedCreateInput) {
  await prisma.ticket.create({
    data: ticket,
  });
}
const ticketRepository = {
  findTicketTypes,
  findTicket,
  findTicketTypeById,
  createTicket,
};

export default ticketRepository;
