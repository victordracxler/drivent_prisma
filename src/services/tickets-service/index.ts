import { TicketCreation } from '@/protocols';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import { Prisma } from '@prisma/client';
import { itemNotFoundError } from './errors';

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
  const enrollmentId = await enrollmentRepository.findEnrollmentId(userId);
  const ticket = await ticketRepository.findTicket(enrollmentId);

  return ticket;
}

export async function createNewTicket(userId: number, ticketTypeId: number) {
  const enrollmentId = await enrollmentRepository.findEnrollmentId(userId);
  const ticketTypeExists = await ticketRepository.findTicketTypeById(ticketTypeId);

  if (!ticketTypeExists) {
    throw itemNotFoundError();
  }
  if (!enrollmentId) {
    throw itemNotFoundError();
  }

  const ticket: Prisma.TicketUncheckedCreateInput = {
    ticketTypeId,
    enrollmentId,
    status: 'RESERVED',
  };

  await ticketRepository.createTicket(ticket);
  return await ticketRepository.findTicket(enrollmentId);
}

export async function checkUserEnrollment(userId: number) {
  const enrollment = await enrollmentRepository.findEnrollment(userId);
  if (!enrollment) {
    throw itemNotFoundError();
  }
  return enrollment;
}

const ticketService = {
  getTypes,
  getUserTicket,
  createNewTicket,
};

export default ticketService;
