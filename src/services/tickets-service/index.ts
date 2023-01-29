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

const ticketService = {
  getTypes,
};

export default ticketService;
