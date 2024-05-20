import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const initialProfiles = [
  {
    name: 'Carson',
    handle: 'qweasdzxcpkh',
    email: 'qweasdzxcpkh@gmail.com',
    phoneNumber: '15918079373',
  },
];

const seed = async () => {
  // clean up before the seeding (optional)
  await prisma.profile.deleteMany();

  // you could also use createMany
  // but it is not supported for databases
  // e.g. SQLite https://github.com/prisma/prisma/issues/10710
  for (const profile of initialProfiles) {
    await prisma.profile.create({
      data: profile,
    });
  }
};

seed();
