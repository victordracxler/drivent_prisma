import { prisma } from '@/config';
import { Enrollment } from '@prisma/client';

async function findWithAddressByUserId(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
    include: {
      Address: true,
    },
  });
}

async function upsert(
  userId: number,
  createdEnrollment: CreateEnrollmentParams,
  updatedEnrollment: UpdateEnrollmentParams,
) {
  return prisma.enrollment.upsert({
    where: {
      userId,
    },
    create: createdEnrollment,
    update: updatedEnrollment,
  });
}
async function findEnrollmentId(userId: number) {
  const enrollment = await prisma.enrollment.findFirst({
    where: { userId: userId },
  });
  return enrollment.id;
}

async function findEnrollment(userId: number) {
  return prisma.enrollment.findFirst({
    where: { userId },
  });
}
export type CreateEnrollmentParams = Omit<Enrollment, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateEnrollmentParams = Omit<CreateEnrollmentParams, 'userId'>;

const enrollmentRepository = {
  findWithAddressByUserId,
  upsert,
  findEnrollment,
  findEnrollmentId,
};

export default enrollmentRepository;
