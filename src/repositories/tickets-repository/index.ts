import { prisma } from '@/config';

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findTicket(enrollmentId: number) {
  const ticket = await prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });

  return ticket;
}

async function findEnrollmentId(userId: number) {
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId },
  });
  return enrollment.id;
}
const ticketRepository = {
  findTicketTypes,
  findTicket,
  findEnrollmentId,
};

export default ticketRepository;
