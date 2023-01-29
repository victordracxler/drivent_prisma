import ticketRepository from '@/repositories/tickets-repository';

export async function getTypes() {
  const types = await ticketRepository.findTicketTypes();

  if (!types) {
    throw {
      name: 'NoTypesError',
      message: 'There are no types',
    };
  }

  return types;
}

export async function getUserTicket(userId: number) {
  const enrollmentId = await ticketRepository.findEnrollmentId(userId);
  const ticket = await ticketRepository.findTicket(enrollmentId);

  return ticket;
}

const ticketService = {
  getTypes,
  getUserTicket,
};

export default ticketService;
